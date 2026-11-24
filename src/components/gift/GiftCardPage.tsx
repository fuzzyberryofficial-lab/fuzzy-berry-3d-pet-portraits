"use client";

import { useEffect, useState } from "react";
import { Fraunces, Poppins } from "next/font/google";
import Link from "next/link";
import siteStyles from "../site/site.module.css";
import styles from "./GiftCard.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import { useLang } from "../site/useLang";
import { TR as HOME_TR } from "../home/translations";
import { trackPixelEvent } from "@/lib/metaPixel";
import GiftReveal, { type RevealVoucher } from "./GiftReveal";
import { TR, PRESET_AMOUNTS, MIN_AMOUNT, MAX_AMOUNT } from "./translations";

const baloo = Fraunces({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

type Status = "idle" | "success" | "cancel";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {}
    document.body.removeChild(ta);
  }
}

export default function GiftCardPage() {
  const [lang, setLang] = useLang();
  const t = TR[lang];
  const nav = HOME_TR[lang];

  const [preset, setPreset] = useState<number | null>(179);
  const [custom, setCustom] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [voucher, setVoucher] = useState<RevealVoucher | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [qr, setQr] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  // The link the buyer can send on: it opens the gift-box surprise for the recipient.
  const shareUrl =
    typeof window !== "undefined" && sessionId
      ? `${window.location.origin}/gift-card/gift?id=${encodeURIComponent(sessionId)}`
      : "";

  // German writes the euro sign after the number ("50 €"), English before it.
  const money = (n: number) => (lang === "de" ? `${n} €` : `€${n}`);

  const customNumber = custom.trim() === "" ? null : Number(custom);
  const customValid =
    customNumber !== null && Number.isInteger(customNumber) && customNumber >= MIN_AMOUNT && customNumber <= MAX_AMOUNT;
  const amount = custom.trim() !== "" ? (customValid ? customNumber : null) : preset;

  // Back from Stripe: confirm the payment server-side before thanking the buyer
  // or telling Meta about the purchase.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stripe = params.get("stripe");
    if (stripe === "cancel") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("cancel");
      return;
    }
    const sessionId = params.get("session_id");
    if (stripe !== "success" || !sessionId) return;
    setSessionId(sessionId);
    let cancelled = false;
    let timer: number | undefined;

    // The code is created the moment the payment is confirmed. If Stripe is a
    // beat slow, ask again a few times instead of leaving the buyer waiting.
    const load = (attempt: number) => {
      fetch(`/api/gift-card?session_id=${encodeURIComponent(sessionId)}`)
        .then((r) => r.json())
        .then((data: { paid?: boolean; amount?: number | null; voucher?: RevealVoucher | null }) => {
          if (cancelled || !data.paid) return;
          setStatus("success");
          if (attempt === 0) {
            let alreadySent = false;
            try {
              alreadySent = window.sessionStorage.getItem(`fb_gift_${sessionId}`) === "1";
              window.sessionStorage.setItem(`fb_gift_${sessionId}`, "1");
            } catch {}
            if (!alreadySent && data.amount) trackPixelEvent("Purchase", { value: data.amount, currency: "EUR" });
          }
          if (data.voucher) setVoucher(data.voucher);
          else if (attempt < 8) timer = window.setTimeout(() => load(attempt + 1), 2500);
        })
        .catch(() => {
          if (!cancelled && attempt < 8) timer = window.setTimeout(() => load(attempt + 1), 2500);
        });
    };
    load(0);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!shareUrl) return;
    let alive = true;
    import("qrcode")
      .then(({ toDataURL }) =>
        toDataURL(shareUrl, { margin: 1, width: 320, color: { dark: "#332f2a", light: "#ffffff" } }),
      )
      .then((url) => {
        if (alive) setQr(url);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [shareUrl]);

  async function copyLink() {
    await copyText(shareUrl);
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2000);
  }

  async function nativeShare() {
    try {
      await navigator.share({ title: t.recipientTitle, url: shareUrl });
    } catch {
      // Closing the share sheet isn't an error.
    }
  }

  async function pay() {
    if (!amount || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/gift-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, recipientName: recipient, senderName: sender, message, lang }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || t.errorGeneric);
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric);
      setBusy(false);
    }
  }

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <SiteNav t={nav} lang={lang} onLangChange={setLang} current="gift" />

      <main className={styles.main} lang={lang}>
        <p className={siteStyles.kicker}>{t.kicker}</p>
        {status === "success" ? (
          <>
            <h1 className={`${styles.title} ${styles.titleWrap}`}>{t.thanksTitle}</h1>
            <p className={styles.sub}>{voucher ? t.thanksBody : t.pendingBody}</p>
            {voucher && <GiftReveal voucher={voucher} t={t} lang={lang} shareUrl={shareUrl || undefined} />}
            {voucher && shareUrl && (
              <section className={styles.share}>
                <h2 className={styles.h2}>{t.shareTitle}</h2>
                <p className={styles.shareBody}>{t.shareBody}</p>
                <div className={styles.linkRow}>
                  <input
                    id="gift-link"
                    readOnly
                    value={shareUrl}
                    onFocus={(e) => e.currentTarget.select()}
                    aria-label={t.copyLink}
                    className={`${siteStyles.input} ${styles.linkInput}`}
                  />
                  <button type="button" className={`${siteStyles.btn} ${siteStyles.btnPrimary}`} onClick={copyLink}>
                    {linkCopied ? t.linkCopied : t.copyLink}
                  </button>
                  {canShare && (
                    <button type="button" className={`${siteStyles.btn} ${siteStyles.btnOutline}`} onClick={nativeShare}>
                      {t.shareNative}
                    </button>
                  )}
                </div>
                {qr && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qr} alt={t.qrAlt} width={160} height={160} className={styles.qr} />
                )}
              </section>
            )}
            <div className={styles.backRow}>
              <Link href="/" className={`${siteStyles.btn} ${siteStyles.btnOutline}`}>
                {t.backHome}
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.sub}>{t.sub}</p>
          </>
        )}
        {status === "cancel" && (
          <div className={`${styles.notice} ${styles.noticeMuted}`} role="status">
            <p>{t.cancelled}</p>
          </div>
        )}

        {status !== "success" && (
          <>
            <h2 className={styles.h2}>{t.amountLabel}</h2>
            <div className={styles.chips} role="group" aria-label={t.amountLabel}>
              {PRESET_AMOUNTS.map((value) => {
                const on = custom.trim() === "" && preset === value;
                return (
                  <button
                    key={value}
                    type="button"
                    className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                    aria-pressed={on}
                    onClick={() => {
                      setPreset(value);
                      setCustom("");
                    }}
                  >
                    <span className={styles.chipAmount}>{money(value)}</span>
                    <span className={styles.chipNote}>{t.presetNote[value] ?? t.towardsNote}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.field}>
              <label htmlFor="gift-custom" className={siteStyles.fieldLabel}>
                {t.customLabel}
              </label>
              <div className={styles.customRow}>
                <span className={styles.euro} aria-hidden="true">
                  €
                </span>
                <input
                  id="gift-custom"
                  type="number"
                  inputMode="numeric"
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  step={1}
                  value={custom}
                  placeholder={t.customPlaceholder}
                  onChange={(e) => setCustom(e.target.value)}
                  className={`${siteStyles.input} ${styles.customInput}`}
                />
              </div>
              <p className={`${styles.hint} ${custom.trim() !== "" && !customValid ? styles.hintError : ""}`}>
                {t.customHint}
              </p>
            </div>

            <div className={styles.field}>
              <label htmlFor="gift-recipient" className={siteStyles.fieldLabel}>
                {t.recipientLabel}
              </label>
              <input
                id="gift-recipient"
                type="text"
                maxLength={80}
                value={recipient}
                placeholder={t.recipientPlaceholder}
                onChange={(e) => setRecipient(e.target.value)}
                className={siteStyles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="gift-sender" className={siteStyles.fieldLabel}>
                {t.senderLabel}
              </label>
              <input
                id="gift-sender"
                type="text"
                maxLength={80}
                value={sender}
                placeholder={t.senderPlaceholder}
                onChange={(e) => setSender(e.target.value)}
                className={siteStyles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="gift-message" className={siteStyles.fieldLabel}>
                {t.messageLabel}
              </label>
              <textarea
                id="gift-message"
                maxLength={300}
                value={message}
                placeholder={t.messagePlaceholder}
                onChange={(e) => setMessage(e.target.value)}
                className={`${siteStyles.input} ${siteStyles.textarea}`}
              />
            </div>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              className={`${siteStyles.btn} ${siteStyles.btnPrimary} ${styles.pay}`}
              disabled={!amount || busy}
              onClick={pay}
            >
              {busy ? t.paying : amount ? `${t.pay} · ${money(amount)} →` : `${t.pay} →`}
            </button>

            <ul className={styles.bullets}>
              {t.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
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
