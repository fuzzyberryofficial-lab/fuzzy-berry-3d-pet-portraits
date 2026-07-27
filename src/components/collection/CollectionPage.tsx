"use client";

import { useState } from "react";
import { Baloo_2, Poppins } from "next/font/google";
import Link from "next/link";
import siteStyles from "../site/site.module.css";
import styles from "./CollectionPage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import Reveal from "../site/Reveal";
import ImageUploadSlot from "../site/ImageUploadSlot";
import { useLang } from "../site/useLang";
import { GALLERY_ROTATIONS, MULTI_GALLERY_NAMES, MULTI_PET_ROWS, SINGLE_GALLERY_NAMES, SINGLE_PET_ROWS, TR } from "./translations";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

function Gallery({
  names,
  photos,
  onChange,
  placeholder,
}: {
  names: string[];
  photos: (File | null)[];
  onChange: (index: number, file: File | null) => void;
  placeholder: string;
}) {
  return (
    <div className={styles.gallery}>
      {names.map((name, i) => (
        <div key={i} className={styles.galleryItem} style={{ transform: `rotate(${GALLERY_ROTATIONS[i]}deg)` }}>
          <ImageUploadSlot
            placeholder={placeholder}
            file={photos[i]}
            onChange={(f) => onChange(i, f)}
            className={styles.galleryImage}
          />
          <span className={styles.galleryLabel}>{name}</span>
        </div>
      ))}
    </div>
  );
}

export default function CollectionPage() {
  const [lang, setLang] = useLang();
  const [singlePhotos, setSinglePhotos] = useState<(File | null)[]>([null, null, null, null]);
  const [multiPhotos, setMultiPhotos] = useState<(File | null)[]>([null, null, null, null]);

  const t = TR[lang];
  const singleRows = SINGLE_PET_ROWS[lang];
  const multiRows = MULTI_PET_ROWS[lang];
  const galleryPlaceholder = lang === "en" ? "Drop an example photo" : "Beispielfoto hierher ziehen";

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <SiteNav t={t} lang={lang} onLangChange={setLang} current="collection" />

      <section className={styles.hero}>
        <p className={siteStyles.kicker}>{t.pageKicker}</p>
        <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
        <p className={styles.pageSub}>{t.pageSub}</p>
      </section>

      <div className={siteStyles.stripe} />

      <Reveal>
        <section id="single-pet" className={`${styles.section} ${styles.sectionNoTop}`}>
          <h2 className={styles.sectionTitle}>{t.singleTitle}</h2>
          <p className={styles.sectionSub}>{t.singleSub}</p>
          <Gallery
            names={SINGLE_GALLERY_NAMES}
            photos={singlePhotos}
            placeholder={galleryPlaceholder}
            onChange={(i, f) => setSinglePhotos((prev) => prev.map((p, idx) => (idx === i ? f : p)))}
          />
          <table className={siteStyles.table}>
            <thead>
              <tr>
                <th>{t.thType}</th>
                <th>{t.thSize}</th>
                <th>{t.thPrice}</th>
              </tr>
            </thead>
            <tbody>
              {singleRows.map((r, i) => (
                <tr key={i}>
                  <td>{r.type}</td>
                  <td>{r.size}</td>
                  <td>€{r.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} style={{ textAlign: "left", fontStyle: "italic", opacity: 0.8 }}>
                  + {t.frameAddon}
                </td>
                <td style={{ color: "var(--berry-dark)" }}>€20</td>
              </tr>
            </tbody>
          </table>
        </section>
      </Reveal>

      <Reveal>
        <section id="multi-pet" className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.multiTitle}</h2>
          <p className={styles.sectionSub}>{t.multiSub}</p>
          <Gallery
            names={MULTI_GALLERY_NAMES}
            photos={multiPhotos}
            placeholder={galleryPlaceholder}
            onChange={(i, f) => setMultiPhotos((prev) => prev.map((p, idx) => (idx === i ? f : p)))}
          />
          <table className={siteStyles.table}>
            <thead>
              <tr>
                <th>{t.thType}</th>
                <th>{t.thSize}</th>
                <th>{t.thPrice}</th>
              </tr>
            </thead>
            <tbody>
              {multiRows.map((r, i) => (
                <tr key={i}>
                  <td>{r.type}</td>
                  <td>{r.size}</td>
                  <td>€{r.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} style={{ textAlign: "left", fontStyle: "italic", opacity: 0.8 }}>
                  + {t.frameAddon}
                </td>
                <td style={{ color: "var(--berry-dark)" }}>€20</td>
              </tr>
            </tbody>
          </table>
        </section>
      </Reveal>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
        <p className={styles.ctaSub}>{t.ctaSub}</p>
        <Link href="/checkout" className={`${siteStyles.btn} ${siteStyles.btnPrimary}`}>
          {t.startPortrait}
        </Link>
      </section>

      <SiteFooter
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
