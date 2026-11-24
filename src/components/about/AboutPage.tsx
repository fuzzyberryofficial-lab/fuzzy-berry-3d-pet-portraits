"use client";

import { Fraunces, Poppins } from "next/font/google";
import siteStyles from "../site/site.module.css";
import styles from "./AboutPage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import SiteImage from "../site/SiteImage";
import { useLang } from "../site/useLang";
import { TR } from "./translations";

const baloo = Fraunces({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export default function AboutPage() {
  const [lang, setLang] = useLang();
  const t = TR[lang];

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <SiteNav t={t} lang={lang} onLangChange={setLang} current="about" />

      <section className={styles.hero}>
        <SiteImage src="/images/The Story Behind Fuzzy Berry.JPG" alt={t.cocoAlt} className={styles.photo} priority />
        <div lang={lang}>
          <p className={siteStyles.kicker}>{t.kicker}</p>
          <h1 className={styles.title}>{t.title}</h1>
          {[t.p1, t.p2, t.p3, t.p4, t.p5].map((text, i) => (
            // Long paragraphs are too many lines for the browser to balance, so they
            // get "pretty" wrapping instead (no single word left on the last line).
            <p key={i} className={`${styles.paragraph} ${text.length > 230 ? styles.longParagraph : ""}`}>
              {text}
            </p>
          ))}
        </div>
      </section>

      <SiteFooter
        links={[
          { href: "/faqs", label: t.navFaqs },
          { href: "/contact", label: t.navContact },
          { href: "/gift-card", label: t.navGift },
          { href: "/policies#privacy", label: t.privacy },
          { href: "/policies#returns", label: t.returns },
        ]}
      />
    </div>
  );
}
