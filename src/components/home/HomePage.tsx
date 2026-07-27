"use client";

import { Baloo_2, Poppins } from "next/font/google";
import Link from "next/link";
import siteStyles from "../site/site.module.css";
import styles from "./HomePage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import Reveal from "../site/Reveal";
import SiteImage from "../site/SiteImage";
import { useLang } from "../site/useLang";
import { TR } from "./translations";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export default function HomePage() {
  const [lang, setLang] = useLang();

  const t = TR[lang];
  const isEn = lang === "en";

  const styleCards = [
    {
      key: "single",
      kicker: isEn ? "Single Pet" : "Einzeltier",
      title: isEn ? "Single Pet" : "Einzeltier",
      body: isEn ? "One companion, in focus." : "Ein Begleiter, im Fokus.",
      cta: isEn ? "View collection" : "Zur Kollektion",
      href: "/collection#single-pet",
      alt: isEn ? "Single pet portrait example" : "Beispiel eines Einzeltier-Porträts",
      src: "/images/Choose Your Style-single pet.png",
      accent: "var(--berry)",
      shadowColor: "var(--berry)",
      rotate: -1,
    },
    {
      key: "multi",
      kicker: isEn ? "Multi Pet" : "Mehrere Tiere",
      title: isEn ? "Multi Pet" : "Mehrere Tiere",
      body: isEn ? "Your whole crew together." : "Ihre ganze Truppe zusammen.",
      cta: isEn ? "View collection" : "Zur Kollektion",
      href: "/collection#multi-pet",
      alt: isEn ? "Multi pet portrait example" : "Beispiel eines Mehrtier-Porträts",
      src: "/images/Choose Your Style-multi pet.jpg",
      accent: "var(--plum)",
      shadowColor: "var(--plum)",
      rotate: 1,
    },
  ];

  const boxItems = isEn
    ? [
        { n: "1", text: "Six layers of 3D acrylic artwork", color: "var(--sun)" },
        { n: "2", text: "A wooden or acrylic display stand", color: "var(--mint)" },
        { n: "3", text: "A thank-you card", color: "var(--berry)" },
      ]
    : [
        { n: "1", text: "Sechs Schichten 3D-Acrylkunst", color: "var(--sun)" },
        { n: "2", text: "Ein Holz- oder Acryl-Ständer", color: "var(--mint)" },
        { n: "3", text: "Eine Dankeskarte", color: "var(--berry)" },
      ];

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <SiteNav t={t} lang={lang} onLangChange={setLang} current="home" />

      <section className={styles.hero}>
        <p className={siteStyles.kicker}>{t.heroKicker}</p>
        <h1 className={styles.heroTitle}>
          {t.heroTitleA} <span style={{ color: "var(--berry)" }}>{t.heroTitleB}</span>
        </h1>
        <p className={styles.heroBody}>{t.heroBody}</p>
        <div className={styles.heroActions}>
          <Link href="/collection#single-pet" className={`${siteStyles.btn} ${siteStyles.btnOutline}`}>
            {t.tagSingle}
          </Link>
          <Link href="/collection#multi-pet" className={`${siteStyles.btn} ${siteStyles.btnOutline}`}>
            {t.tagMulti}
          </Link>
          <Link href="/checkout" className={`${siteStyles.btn} ${siteStyles.btnPrimary}`}>
            {t.startPortrait} →
          </Link>
        </div>
      </section>

      <section className={styles.heroImageSection}>
        <div className={styles.heroImageWrap}>
          <SiteImage
            src="/images/home-hero.jpg"
            alt={isEn ? "A pet portrait brought to life on acrylic" : "Ein Tierporträt, zum Leben erweckt auf Acrylglas"}
            style={{ width: "100%", height: 420, borderWidth: 4 }}
            priority
          />
          <div className={styles.heroSticker}>{t.heroSticker}</div>
        </div>
      </section>

      <div className={siteStyles.stripe} />

      <Reveal>
        <section className={styles.section}>
          <p className={siteStyles.kicker} style={{ textAlign: "center", display: "block" }}>
            {t.styleKicker}
          </p>
          <h2 className={`${styles.sectionTitle} ${styles.sectionCentered}`}>{t.styleTitle}</h2>
          <p className={`${styles.sectionSub} ${styles.sectionCentered}`}>{t.styleSub}</p>
          <div className={styles.styleGrid}>
            {styleCards.map((card) => (
              <div
                key={card.key}
                className={siteStyles.card}
                style={{ boxShadow: `6px 6px 0 ${card.shadowColor}`, transform: `rotate(${card.rotate}deg)` }}
              >
                <SiteImage src={card.src} alt={card.alt} className={styles.cardImage} style={{ borderWidth: 2.5 }} />
                <p className={styles.cardKicker} style={{ color: card.accent }}>
                  {card.kicker}
                </p>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
                <Link href={card.href} className={`${siteStyles.btn} ${siteStyles.btnOutline} ${styles.cardCta}`}>
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={`${styles.section} ${styles.mintSection}`}>
          <div className={styles.splitGrid}>
            <div className={styles.craftMedia}>
              <video src="/video/Art You Can Feel.MP4" controls autoPlay loop muted playsInline className={styles.craftVideo} />
            </div>
            <div>
              <p className={siteStyles.kicker}>{t.craftKicker}</p>
              <h2 className={styles.craftTitle}>{t.craftTitle}</h2>
              <p className={styles.craftBody}>{t.craftBody}</p>
            </div>
          </div>
        </section>
      </Reveal>

      <div className={siteStyles.stripe} />

      <Reveal>
        <section className={styles.section}>
          <div className={styles.splitGrid}>
            <div>
              <p className={siteStyles.kicker}>{t.boxKicker}</p>
              <h2 className={styles.boxTitle}>{t.boxTitle}</h2>
              <div className={styles.boxItems}>
                {boxItems.map((item) => (
                  <div key={item.n} className={styles.boxItem}>
                    <span className={styles.boxItemNumber} style={{ background: item.color }}>
                      {item.n}
                    </span>
                    <p className={styles.boxItemText}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <SiteImage
              src="/images/Unboxing.png"
              alt={isEn ? "Unboxing a Fuzzy Berry portrait" : "Auspacken eines Fuzzy-Berry-Porträts"}
              className={styles.unboxImage}
              objectPosition="50% 42%"
            />
          </div>
        </section>
      </Reveal>

      <SiteFooter
        social
        links={[
          { href: "/about", label: t.navAbout },
          { href: "/faqs", label: t.navFaqs },
          { href: "/contact", label: t.navContact },
          { href: "/policies#privacy", label: t.privacy },
          { href: "/policies#returns", label: t.returns },
        ]}
      />
    </div>
  );
}
