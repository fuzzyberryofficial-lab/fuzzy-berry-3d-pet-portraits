"use client";

import { useEffect, useState } from "react";
import { Fraunces, Poppins } from "next/font/google";
import Link from "@/components/site/LocalLink";
import siteStyles from "../site/site.module.css";
import styles from "./GiftCard.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import { useLang } from "../site/useLang";
import { TR as HOME_TR } from "../home/translations";
import GiftReveal, { type RevealVoucher } from "./GiftReveal";
import { TR } from "./translations";

const baloo = Fraunces({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

type View = "loading" | "ready" | "invalid";

// The page a recipient lands on from a gift link or QR code: the gift box, then
// the voucher. `demo` shows a made-up voucher so the look can be previewed.
export default function GiftOpenPage({ demo = false }: { demo?: boolean }) {
  const [lang, setLang] = useLang();
  const t = TR[lang];
  const nav = HOME_TR[lang];

  const [view, setView] = useState<View>("loading");
  const [voucher, setVoucher] = useState<RevealVoucher | null>(null);

  useEffect(() => {
    if (demo) {
      const threeYears = new Date();
      threeYears.setFullYear(threeYears.getFullYear() + 3);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVoucher({
        code: "FB-DEMO-00000",
        amountEur: 100,
        recipientName: "Coco",
        senderName: "Anna",
        message: "Frohe Weihnachten! 🎄",
        expiresAt: Math.floor(threeYears.getTime() / 1000),
      });
      setView("ready");
      return;
    }

    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
      setView("invalid");
      return;
    }

    let cancelled = false;
    let timer: number | undefined;
    // The code is made when the payment is confirmed; if it isn't there yet, ask again.
    const load = (attempt: number) => {
      fetch(`/api/gift-card?session_id=${encodeURIComponent(id)}`)
        .then((r) => r.json())
        .then((data: { paid?: boolean; voucher?: RevealVoucher | null }) => {
          if (cancelled) return;
          if (!data.paid) return setView("invalid");
          if (data.voucher) {
            setVoucher(data.voucher);
            setView("ready");
          } else if (attempt < 6) {
            timer = window.setTimeout(() => load(attempt + 1), 2500);
          } else {
            setView("invalid");
          }
        })
        .catch(() => {
          if (!cancelled) setView("invalid");
        });
    };
    load(0);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [demo]);

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <SiteNav t={nav} lang={lang} onLangChange={setLang} current="gift" />

      <main className={styles.main} lang={lang}>
        {demo && (
          <div className={`${styles.notice} ${styles.noticeMuted}`} role="note">
            <p>{t.demoBanner}</p>
          </div>
        )}

        {view === "invalid" ? (
          <>
            <h1 className={`${styles.title} ${styles.titleWrap}`}>{t.recipientTitle}</h1>
            <p className={styles.sub}>{t.linkInvalid}</p>
            <div className={styles.backRow}>
              <Link href="/" className={`${siteStyles.btn} ${siteStyles.btnOutline}`}>
                {t.backHome}
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className={siteStyles.kicker}>{t.kicker}</p>
            <h1 className={`${styles.title} ${styles.titleWrap}`}>{t.recipientTitle}</h1>
            {view === "loading" || !voucher ? (
              <p className={styles.sub}>{t.loading}</p>
            ) : (
              <>
                <p className={styles.sub}>{t.recipientBody}</p>
                <GiftReveal voucher={voucher} t={t} lang={lang} mode="recipient" />
              </>
            )}
          </>
        )}
      </main>

      <SiteFooter
        links={[
          { href: "/faqs", label: nav.navFaqs },
          { href: "/contact", label: nav.navContact },
          { href: "/policies#privacy", label: t.privacy },
          { href: "/policies#returns", label: t.returns },
        ]}
      />
    </div>
  );
}
