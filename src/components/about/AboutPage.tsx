"use client";

import { Baloo_2, Poppins } from "next/font/google";
import siteStyles from "../site/site.module.css";
import styles from "./AboutPage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import SiteImage from "../site/SiteImage";
import { useLang } from "../site/useLang";
import { TR } from "./translations";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export default function AboutPage() {
  const [lang, setLang] = useLang();
  const t = TR[lang];

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <SiteNav t={t} lang={lang} onLangChange={setLang} current="about" />

      <section className={styles.hero}>
        <SiteImage src="/images/The Story Behind Fuzzy Berry.JPG" alt={t.cocoAlt} className={styles.photo} priority />
        <div>
          <p className={siteStyles.kicker}>{t.kicker}</p>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.paragraph}>{t.p1}</p>
          <p className={styles.paragraph}>{t.p2}</p>
          <p className={styles.paragraph}>{t.p3}</p>
          <p className={styles.paragraph}>{t.p4}</p>
          <p className={styles.paragraph}>{t.p5}</p>
        </div>
      </section>

      <SiteFooter
        links={[
          { href: "/faqs", label: t.navFaqs },
          { href: "/contact", label: t.navContact },
          { href: "/policies#privacy", label: t.privacy },
          { href: "/policies#returns", label: t.returns },
        ]}
      />
    </div>
  );
}
