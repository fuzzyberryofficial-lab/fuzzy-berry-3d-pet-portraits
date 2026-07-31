"use client";

import { Baloo_2, Poppins } from "next/font/google";
import Link from "next/link";
import siteStyles from "../site/site.module.css";
import styles from "./ShowroomPage.module.css";
import LangSwitch from "../site/LangSwitch";
import ProcessSteps from "../site/ProcessSteps";
import { useLang } from "../site/useLang";
import { GOOGLE_MAPS_URL, SHOWROOM_ADDRESS, TR } from "./translations";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export default function ShowroomPage() {
  const [lang, setLang] = useLang();
  const t = TR[lang];

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SHOWROOM_ADDRESS)}&output=embed`;

  const steps = [
    { title: t.step1Title, caption: t.step1Text, icon: "order" as const },
    { title: t.step2Title, caption: t.step2Text, icon: "paint" as const },
    { title: t.step3Title, caption: t.step3Text, icon: "enjoy" as const },
  ];

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <nav className={siteStyles.navStatic}>
        <Link href="/" className={siteStyles.brand} style={{ fontSize: 32 }}>
          <span className={siteStyles.brandFuzzy}>Fuzzy</span> <span className={siteStyles.brandBerry}>Berry</span>
        </Link>
        <div style={{ marginLeft: "auto" }}>
          <LangSwitch lang={lang} onChange={setLang} />
        </div>
        <Link href="/contact" className={siteStyles.backLink}>
          {t.backToSite}
        </Link>
      </nav>

      <div className={styles.wrap}>
        <div className={styles.hero}>
          <p className={siteStyles.kicker}>{t.kicker}</p>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.intro}>{t.intro}</p>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoCol}>
            <h2 className={styles.storeInfoTitle}>{t.storeInfoTitle}</h2>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <p className={styles.infoLabel}>{t.addressLabel}</p>
                <p className={styles.infoText}>{t.addressLine}</p>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>🕒</span>
              <div>
                <p className={styles.infoLabel}>{t.hoursLabel}</p>
                <p className={styles.infoText}>{t.hoursWeekday}</p>
                <p className={styles.infoText}>{t.hoursSaturday}</p>
                <p className={styles.infoTextMuted}>{t.hoursClosed}</p>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>✨</span>
              <div>
                <p className={styles.infoLabel}>{t.featuresLabel}</p>
                <p className={styles.infoText}>{t.featuresText}</p>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener"
              className={`${siteStyles.btn} ${siteStyles.btnPrimary} ${styles.directionsBtn}`}
            >
              {t.directionsBtn} →
            </a>
          </div>

          <div className={styles.mapCol}>
            <iframe
              title="Fuzzy Berry Showroom Location Map"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className={styles.guideSection}>
          <h2 className={styles.guideTitle}>{t.guideTitle}</h2>
          <ProcessSteps steps={steps} />
        </div>
      </div>
    </div>
  );
}
