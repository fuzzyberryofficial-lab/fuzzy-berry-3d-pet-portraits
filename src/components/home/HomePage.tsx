"use client";

import { useEffect, useMemo, useState } from "react";
import { Baloo_2, Poppins } from "next/font/google";
import Link from "next/link";
import siteStyles from "../site/site.module.css";
import styles from "./HomePage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import Reveal from "../site/Reveal";
import ImageUploadSlot from "../site/ImageUploadSlot";
import { useLang } from "../site/useLang";
import { TR } from "./translations";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export default function HomePage() {
  const [lang, setLang] = useLang();
  const [heroPhoto, setHeroPhoto] = useState<File | null>(null);
  const [singlePhoto, setSinglePhoto] = useState<File | null>(null);
  const [multiPhoto, setMultiPhoto] = useState<File | null>(null);
  const [unboxPhoto, setUnboxPhoto] = useState<File | null>(null);
  const [craftVideo, setCraftVideo] = useState<File | null>(null);

  const t = TR[lang];
  const isEn = lang === "en";

  const craftVideoUrl = useMemo(() => (craftVideo ? URL.createObjectURL(craftVideo) : null), [craftVideo]);
  useEffect(() => {
    return () => {
      if (craftVideoUrl) URL.revokeObjectURL(craftVideoUrl);
    };
  }, [craftVideoUrl]);

  const styleCards = [
    {
      key: "single",
      kicker: isEn ? "Single Pet" : "Einzeltier",
      title: isEn ? "Single Pet" : "Einzeltier",
      body: isEn ? "One companion, in focus." : "Ein Begleiter, im Fokus.",
      cta: isEn ? "View collection" : "Zur Kollektion",
      href: "/collection#single-pet",
      placeholder: isEn ? "Drop a single pet photo" : "Einzeltier-Foto hierher ziehen",
      accent: "var(--berry)",
      shadowColor: "var(--berry)",
      rotate: -1,
      photo: singlePhoto,
      setPhoto: setSinglePhoto,
    },
    {
      key: "multi",
      kicker: isEn ? "Multi Pet" : "Mehrere Tiere",
      title: isEn ? "Multi Pet" : "Mehrere Tiere",
      body: isEn ? "Your whole crew together." : "Ihre ganze Truppe zusammen.",
      cta: isEn ? "View collection" : "Zur Kollektion",
      href: "/collection#multi-pet",
      placeholder: isEn ? "Drop a multi pet photo" : "Mehrtier-Foto hierher ziehen",
      accent: "var(--plum)",
      shadowColor: "var(--plum)",
      rotate: 1,
      photo: multiPhoto,
      setPhoto: setMultiPhoto,
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
          <ImageUploadSlot
            placeholder={t.dropHero}
            file={heroPhoto}
            onChange={setHeroPhoto}
            style={{ width: "100%", height: 420, borderWidth: 4 }}
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
                <ImageUploadSlot
                  placeholder={card.placeholder}
                  file={card.photo}
                  onChange={card.setPhoto}
                  className={styles.cardImage}
                  style={{ borderWidth: 2.5 }}
                />
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
              {craftVideoUrl ? (
                <video src={craftVideoUrl} controls autoPlay loop muted playsInline className={styles.craftVideo} />
              ) : (
                <label className={styles.craftUploadLabel}>
                  <span>🎬</span>
                  <span>{t.dropCraftVideo}</span>
                  <input
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={(e) => setCraftVideo(e.target.files?.[0] ?? null)}
                  />
                </label>
              )}
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
            <ImageUploadSlot placeholder={t.dropBox} file={unboxPhoto} onChange={setUnboxPhoto} className={styles.unboxImage} />
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
