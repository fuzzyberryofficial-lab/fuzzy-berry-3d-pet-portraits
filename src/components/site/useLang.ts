"use client";

import { useEffect, useState } from "react";
import type { Lang } from "./navTypes";

const LANG_CHANGE_EVENT = "fb-lang-change";

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
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // One-time correction after hydration: the server always renders "en"
    // (localStorage and navigator aren't available there), so the visitor's
    // preference can only be applied once the client has mounted.
    const preferred = readPreferredLang();
    if (preferred !== "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(preferred);
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
  }, []);

  const setLang = (next: Lang) => {
    try {
      window.localStorage.setItem("fb_lang", next);
    } catch {}
    setLangState(next);
    window.dispatchEvent(new CustomEvent<Lang>(LANG_CHANGE_EVENT, { detail: next }));
  };

  return [lang, setLang];
}
