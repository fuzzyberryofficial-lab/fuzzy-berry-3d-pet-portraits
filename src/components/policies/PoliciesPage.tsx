"use client";

import { Baloo_2, Poppins } from "next/font/google";
import Link from "next/link";
import siteStyles from "../site/site.module.css";
import styles from "./PoliciesPage.module.css";
import LangSwitch from "../site/LangSwitch";
import { useLang } from "../site/useLang";
import { TR } from "./translations";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export default function PoliciesPage() {
  const [lang, setLang] = useLang();
  const t = TR[lang];

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <nav className={siteStyles.navStatic}>
        <Link href="/" className={siteStyles.brand} style={{ fontSize: 32 }}>
          <span className={siteStyles.brandFuzzy}>Fuzzy</span> <span className={siteStyles.brandBerry}>Berry</span>
        </Link>
        <div style={{ marginLeft: "auto" }}>
          <LangSwitch lang={lang} onChange={setLang} />
        </div>
        <Link href="/" className={siteStyles.backLink}>
          {t.backToSite}
        </Link>
      </nav>

      <div className={styles.wrap}>
        <section id="privacy" className={styles.section}>
          <p className={styles.legal}>{t.legal}</p>
          <h1 className={styles.title}>{t.privacyTitle}</h1>
          <p className={styles.paragraph}>{t.privacy1}</p>
          <p className={styles.paragraph}>{t.privacy2}</p>
          <p className={styles.paragraph}>{t.privacy3}</p>
          <p className={styles.paragraph}>
            {t.contactLine}{" "}
            <a href="mailto:fuzzyberry.official@gmail.com" className={styles.link}>
              fuzzyberry.official@gmail.com
            </a>
            .
          </p>
        </section>

        <section id="returns" className={styles.section}>
          <p className={styles.legal}>{t.legal}</p>
          <h1 className={styles.title}>{t.returnsTitle}</h1>
          <p className={styles.paragraph}>{t.returns1}</p>
          <p className={styles.paragraph}>{t.returns2}</p>
          <p className={styles.paragraph}>{t.returns3}</p>
          <p className={styles.paragraph}>
            {t.contactLine}{" "}
            <a href="mailto:fuzzyberry.official@gmail.com" className={styles.link}>
              fuzzyberry.official@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
