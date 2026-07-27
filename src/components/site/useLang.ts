"use client";

import { useEffect, useState } from "react";
import type { Lang } from "./navTypes";

export function useLang(): [Lang, (lang: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // One-time correction after hydration: the server always renders "en"
    // (localStorage isn't available there), so the stored preference can
    // only be applied once the client has mounted.
    const stored = window.localStorage.getItem("fb_lang");
    if (stored === "en" || stored === "de") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    }
  }, []);

  const setLang = (next: Lang) => {
    try {
      window.localStorage.setItem("fb_lang", next);
    } catch {}
    setLangState(next);
  };

  return [lang, setLang];
}
