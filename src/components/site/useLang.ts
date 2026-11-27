"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "./navTypes";
import { DE_PAGES, langFromPath, pathForLang, stripDe } from "@/lib/langRoutes";

const LANG_CHANGE_EVENT = "fb-lang-change";

function storeLang(lang: Lang) {
  try {
    window.localStorage.setItem("fb_lang", lang);
  } catch {}
}

// An explicit choice (the EN/DE switch) wins; otherwise follow the visitor's
// primary browser/phone language so German and Austrian visitors land on the
// German site without having to find the switch.
export function readPreferredLang(): Lang {
  try {
    const stored = window.localStorage.getItem("fb_lang");
    if (stored === "en" || stored === "de") return stored;
  } catch {}
  const primary = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
  return primary.startsWith("de") ? "de" : "en";
}

export function useLang(): [Lang, (lang: Lang) => void] {
  const pathname = usePathname();
  const router = useRouter();
  // /de/... pages are German on the server already (that is what Google reads).
  const urlLang = langFromPath(pathname);
  const [lang, setLangState] = useState<Lang>(urlLang ?? "en");

  useEffect(() => {
    if (urlLang) {
      // Remember it, so pages without a /de version (checkout) stay German too.
      storeLang(urlLang);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(urlLang);
    } else {
      // One-time correction after hydration: the server renders "en" for the
      // normal URLs (localStorage and navigator aren't available there), so the
      // visitor's preference can only be applied once the client has mounted.
      const preferred = readPreferredLang();
      if (preferred !== "en") setLangState(preferred);
    }

    // Other useLang() instances elsewhere in the tree (e.g. the announcement
    // bar in the root layout) aren't re-rendered by this component's own
    // setLangState, since each call site holds independent state synced from
    // localStorage only on mount. Listen for this custom event so every
    // instance updates together within the same tab.
    const onLangChange = (e: Event) => {
      const next = (e as CustomEvent<Lang>).detail;
      setLangState(next);
    };
    window.addEventListener(LANG_CHANGE_EVENT, onLangChange);
    return () => window.removeEventListener(LANG_CHANGE_EVENT, onLangChange);
  }, [urlLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    storeLang(next);
    setLangState(next);
    window.dispatchEvent(new CustomEvent<Lang>(LANG_CHANGE_EVENT, { detail: next }));
    // Pages with a German version switch URL too (/faqs <-> /de/faqs).
    if (pathname && DE_PAGES.includes(stripDe(pathname))) {
      const target = pathForLang(pathname, next) + window.location.search + window.location.hash;
      if (target !== pathname + window.location.search + window.location.hash) router.push(target);
    }
  };

  return [lang, setLang];
}
