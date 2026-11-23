"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Fraunces, Poppins } from "next/font/google";
import siteStyles from "../site/site.module.css";
import styles from "./GiftCardPage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import { useLang } from "../site/useLang";
import { TR } from "./translations";
import GiftCardVisual from "./GiftCardVisual";
import { GIFT_CARD_AMOUNTS, GIFT_CARD_LIMITS, GIFT_CARD_VALID_DAYS, type GiftCardAmount } from "@/lib/giftCardShared";
import { trackPixelEvent } from "@/lib/metaPixel";

const baloo = Fraunces({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

interface PaidCard {
  code: string;
  amount: number;
  expiresAt: number;
  recipientName: string;
  fromName: string;
  message: string;
}

type View = "form" | "verifying" | "done" | "verify-error" | "not-paid";

const formatDate = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

export default function GiftCardPage() {
  const [lang, setLang] = useLang();
  const t = TR[lang];

  const [amount, setAmount] = useState<GiftCardAmount>(100);
  const [email, setEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [fromName, setFromName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const [view, setView] = useState<View>("form");
  const [card, setCard] = useState<PaidCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewValidUntil] = useState(() =>
    formatDate(new Date(Date.now() + GIFT_CARD_VALID_DAYS * 24 * 60 * 60 * 1000)),
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("stripe");
    const sessionId = params.get("session_id");
    if (status === "cancel") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCancelled(true);
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }
    if (status !== "success" || !sessionId) return;

    // The session id stays in the URL on purpose: reloading or bookmarking
    // this page shows the same gift card again.
    setView("verifying");
    fetch(`/api/gift-card?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data: { paid?: boolean; card?: PaidCard }) => {
        if (data.paid && data.card) {
          setCard(data.card);
          setView("done");
          try {
            const key = `fb_gc_tracked_${sessionId}`;
            if (!window.sessionStorage.getItem(key)) {
              window.sessionStorage.setItem(key, "1");
              trackPixelEvent("Purchase", { value: data.card.amount, currency: "EUR", content_type: "gift_card" });
            }
          } catch {}
        } else if (data.paid === false) {
          setView("not-paid");
        } else {
          setView("verify-error");
        }
      })
      .catch(() => setView("verify-error"));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    setCancelled(false);
    trackPixelEvent("InitiateCheckout", { value: amount, currency: "EUR", content_type: "gift_card" });
    try {
      const res = await fetch("/api/gift-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email, recipientName, fromName, message, lang }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(true);
    } catch {
      setError(true);
    }
    setSubmitting(false);
  };

  const copyCode = async () => {
    if (!card) return;
    try {
      await navigator.clipboard.writeText(card.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <div className={styles.noPrint}>
        <SiteNav t={t} lang={lang} onLangChange={setLang} current="home" hideCtaOnMobile />
      </div>

      {view === "form" && (
        <section className={styles.grid}>
          <div>
            <p className={siteStyles.kicker}>🎁 {t.kicker}</p>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.sub}>{t.sub}</p>

            {cancelled && <div className={styles.notice}>{t.cancelled}</div>}

            <form className={styles.form} onSubmit={handleSubmit}>
              <div>
                <span className={siteStyles.fieldLabel}>{t.chooseAmount}</span>
                <div className={styles.amounts} role="radiogroup" aria-label={t.chooseAmount}>
                  {GIFT_CARD_AMOUNTS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={amount === value}
                      className={`${styles.amount} ${amount === value ? styles.amountActive : ""}`}
                      onClick={() => setAmount(value)}
                    >
                      <span className={styles.amountValue}>€{value}</span>
                      <span className={styles.amountNote}>{t.amountNote[value]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={siteStyles.fieldLabel} htmlFor="gc-email">
                  {t.email}
                </label>
                <input
                  id="gc-email"
                  className={siteStyles.input}
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className={styles.hint}>{t.emailHint}</p>
              </div>

              <div className={styles.twoCol}>
                <div>
                  <label className={siteStyles.fieldLabel} htmlFor="gc-to">
                    {t.recipientName} <span className={styles.optional}>({t.optional})</span>
                  </label>
                  <input
                    id="gc-to"
                    className={siteStyles.input}
                    maxLength={GIFT_CARD_LIMITS.name}
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className={siteStyles.fieldLabel} htmlFor="gc-from">
                    {t.fromName} <span className={styles.optional}>({t.optional})</span>
                  </label>
                  <input
                    id="gc-from"
                    className={siteStyles.input}
                    maxLength={GIFT_CARD_LIMITS.name}
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={siteStyles.fieldLabel} htmlFor="gc-message">
                  {t.message} <span className={styles.optional}>({t.optional})</span>
                </label>
                <textarea
                  id="gc-message"
                  className={`${siteStyles.input} ${styles.messageInput}`}
                  rows={2}
                  maxLength={GIFT_CARD_LIMITS.message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {error && <p className={styles.error}>{t.errorMsg}</p>}

              <button
                type="submit"
                className={`${siteStyles.btn} ${siteStyles.btnPrimary} ${styles.submit}`}
                disabled={submitting}
              >
                {submitting ? t.starting : t.pay(amount)}
              </button>
              <p className={styles.finePrint}>{t.finePrint}</p>
            </form>
          </div>

          <div className={styles.previewCol}>
            <span className={styles.previewTag}>{t.previewNote}</span>
            <GiftCardVisual
              t={t}
              amount={amount}
              code="FB-XXXX-XXXX"
              recipientName={recipientName.trim()}
              fromName={fromName.trim()}
              message={message.trim()}
              validUntil={previewValidUntil}
              preview
            />
          </div>
        </section>
      )}

      {view === "verifying" && (
        <section className={styles.centered}>
          <p className={styles.sub}>{t.verifying}</p>
        </section>
      )}

      {(view === "verify-error" || view === "not-paid") && (
        <section className={styles.centered}>
          <p className={styles.error}>{view === "not-paid" ? t.notPaid : t.verifyError}</p>
          <Link href="/gift-card" className={`${siteStyles.btn} ${siteStyles.btnOutline}`}>
            {t.another}
          </Link>
        </section>
      )}

      {view === "done" && card && (
        <section className={styles.doneWrap}>
          <div className={styles.noPrint}>
            <p className={siteStyles.kicker}>{t.doneKicker}</p>
            <h1 className={styles.title}>{t.doneTitle}</h1>
            <p className={styles.sub}>{t.doneBody}</p>
          </div>

          <div className={styles.printArea}>
            <GiftCardVisual
              t={t}
              amount={card.amount}
              code={card.code}
              recipientName={card.recipientName}
              fromName={card.fromName}
              message={card.message}
              validUntil={formatDate(new Date(card.expiresAt * 1000))}
            />
            <div className={styles.howBox}>
              <p className={styles.howTitle}>{t.howTitle}</p>
              <ol className={styles.howList}>
                {t.howSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className={`${styles.doneActions} ${styles.noPrint}`}>
            <button type="button" className={`${siteStyles.btn} ${siteStyles.btnPrimary}`} onClick={() => window.print()}>
              {t.print}
            </button>
            <button type="button" className={`${siteStyles.btn} ${siteStyles.btnOutline}`} onClick={copyCode}>
              {copied ? t.copied : `${t.copy} · ${card.code}`}
            </button>
          </div>
          <Link href="/gift-card" className={`${styles.anotherLink} ${styles.noPrint}`}>
            {t.another} →
          </Link>
        </section>
      )}

      <div className={styles.noPrint}>
        <SiteFooter
          links={[
            { href: "/policies#privacy", label: t.privacy },
            { href: "/policies#returns", label: t.returns },
          ]}
        />
      </div>
    </div>
  );
}
