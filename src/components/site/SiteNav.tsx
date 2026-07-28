"use client";

import Link from "next/link";
import styles from "./site.module.css";
import LangSwitch from "./LangSwitch";
import type { Lang, NavPage, NavTranslation } from "./navTypes";

interface SiteNavProps {
  t: NavTranslation;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  current: NavPage;
}

const LINKS: { key: NavPage; href: string; label: keyof NavTranslation }[] = [
  { key: "home", href: "/", label: "navHome" },
  { key: "collection", href: "/collection", label: "navCollection" },
  { key: "about", href: "/about", label: "navAbout" },
  { key: "faqs", href: "/faqs", label: "navFaqs" },
  { key: "contact", href: "/contact", label: "navContact" },
];

export default function SiteNav({ t, lang, onLangChange, current }: SiteNavProps) {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand}>
        <span className={styles.brandFuzzy}>Fuzzy</span> <span className={styles.brandBerry}>Berry</span>
      </Link>
      <div className={styles.navLinks}>
        {LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            aria-current={link.key === current ? "page" : undefined}
            className={link.key === current ? styles.navLinkCurrent : ""}
          >
            {t[link.label]}
          </Link>
        ))}
      </div>
      <LangSwitch lang={lang} onChange={onLangChange} />
      <Link href="/checkout" className={`${styles.btn} ${styles.btnPrimary}`}>
        {t.startPortrait}
      </Link>
    </nav>
  );
}
