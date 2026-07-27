"use client";

import styles from "./site.module.css";
import type { Lang } from "./navTypes";

interface LangSwitchProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

export default function LangSwitch({ lang, onChange }: LangSwitchProps) {
  return (
    <div className={styles.langSwitch}>
      <button
        type="button"
        className={`${styles.langPill} ${lang === "en" ? styles.langPillActive : ""}`}
        onClick={() => onChange("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`${styles.langPill} ${lang === "de" ? styles.langPillActive : ""}`}
        onClick={() => onChange("de")}
      >
        DE
      </button>
    </div>
  );
}
