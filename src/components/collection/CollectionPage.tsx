"use client";

import { useEffect, useState } from "react";
import { Baloo_2, Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import siteStyles from "../site/site.module.css";
import styles from "./CollectionPage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import Reveal from "../site/Reveal";
import SiteImage from "../site/SiteImage";
import { useLang } from "../site/useLang";
import { GALLERY_ROTATIONS, MULTI_GALLERY_ITEMS, MULTI_PET_ROWS, SINGLE_GALLERY_ITEMS, SINGLE_PET_ROWS, TR, type GalleryItem } from "./translations";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className={styles.gallery}>
      {items.map((item, i) => (
        <div key={item.src} className={styles.galleryItem} style={{ transform: `rotate(${GALLERY_ROTATIONS[i]}deg)` }}>
          <SiteImage
            src={item.src}
            alt={item.name}
            className={styles.galleryImage}
            objectPosition={item.objectPosition}
            imageStyle={
              item.transform ? { transform: item.transform } : item.scale ? { transform: `scale(${item.scale})` } : undefined
            }
          />
          <span className={styles.galleryLabel}>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function CollectionPage() {
  const [lang, setLang] = useLang();
  const [showFrameGuide, setShowFrameGuide] = useState(false);

  const t = TR[lang];
  const singleRows = SINGLE_PET_ROWS[lang];
  const multiRows = MULTI_PET_ROWS[lang];

  useEffect(() => {
    if (!showFrameGuide) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFrameGuide(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showFrameGuide]);

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
          <Gallery items={SINGLE_GALLERY_ITEMS} />
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
                  <button type="button" className={styles.frameGuideLink} onClick={() => setShowFrameGuide(true)}>
                    🖼️ {t.frameGuideLink}
                  </button>
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
          <Gallery items={MULTI_GALLERY_ITEMS} />
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
                  <button type="button" className={styles.frameGuideLink} onClick={() => setShowFrameGuide(true)}>
                    🖼️ {t.frameGuideLink}
                  </button>
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

      {showFrameGuide && (
        <div className={styles.frameGuideOverlay} onClick={() => setShowFrameGuide(false)}>
          <button
            type="button"
            className={styles.frameGuideCloseBtn}
            onClick={() => setShowFrameGuide(false)}
            aria-label={t.frameGuideClose}
          >
            ×
          </button>
          <div className={styles.frameGuideImageWrap} onClick={(e) => e.stopPropagation()}>
            <Image
              src="/images/frame-color-guide.jpg"
              alt={t.frameGuideTitle}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
