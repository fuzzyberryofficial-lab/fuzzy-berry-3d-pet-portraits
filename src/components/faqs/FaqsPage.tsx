"use client";

import { Baloo_2, Poppins } from "next/font/google";
import siteStyles from "../site/site.module.css";
import styles from "./FaqsPage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import { useLang } from "../site/useLang";
import { FAQ_DE, FAQ_EN, TR } from "./translations";
import ProcessSteps from "../site/ProcessSteps";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export default function FaqsPage() {
  const [lang, setLang] = useLang();
  const t = TR[lang];
  const faqGroups = lang === "en" ? FAQ_EN : FAQ_DE;

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <SiteNav t={t} lang={lang} onLangChange={setLang} current="faqs" />

      <div className={styles.wrap}>
        <p className={siteStyles.kicker}>{t.kicker}</p>
        <h1 className={styles.title}>{t.title}</h1>
        {faqGroups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h4 className={styles.groupTitle}>{group.title}</h4>
            {group.items.map((qa) => (
              <details key={qa.q} className={styles.item}>
                <summary>{qa.q}</summary>
                <p className={styles.answerSummary}>{qa.summary}</p>
                {qa.process ? (
                  <ProcessSteps steps={qa.process} />
                ) : (
                  <ul className={styles.answerBullets}>
                    {qa.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>
        ))}
      </div>

      <SiteFooter
        links={[
          { href: "/about", label: t.navAbout },
          { href: "/contact", label: t.navContact },
          { href: "/policies#privacy", label: t.privacy },
          { href: "/policies#returns", label: t.returns },
        ]}
      />
    </div>
  );
}
