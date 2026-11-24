"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import siteStyles from "../site/site.module.css";
import styles from "./GiftReveal.module.css";
import type { GiftTranslation } from "./translations";
import type { Lang } from "../site/navTypes";

export interface RevealVoucher {
  code: string;
  amountEur: number;
  recipientName: string;
  senderName: string;
  message: string;
  // Unix seconds.
  expiresAt: number;
}

const COLORS = ["#d62f3f", "#ffd75e", "#2f9e6b", "#ffafc7", "#4c6fe0", "#ffe9a3"];

// A burst of confetti: each piece flies up and out, then falls and fades.
function makeConfetti(count = 36) {
  return Array.from({ length: count }, (_, id) => {
    const angle = Math.PI * (0.12 + 0.76 * Math.random());
    const speed = 90 + Math.random() * 150;
    const side = Math.random() < 0.5 ? -1 : 1;
    return {
      id,
      dx: Math.round(Math.cos(angle) * speed * side),
      dy: -Math.round(Math.sin(angle) * speed + 50),
      rot: Math.round(Math.random() * 540 - 270),
      color: COLORS[id % COLORS.length],
      delay: Math.round(Math.random() * 160),
      w: 6 + Math.round(Math.random() * 6),
      h: 9 + Math.round(Math.random() * 8),
    };
  });
}

export default function GiftReveal({
  voucher,
  t,
  lang,
  mode = "buyer",
  shareUrl,
}: {
  voucher: RevealVoucher;
  t: GiftTranslation;
  lang: Lang;
  // "buyer": just paid, can save the picture. "recipient": opened a gift link.
  mode?: "buyer" | "recipient";
  // The gift link; when set, the saved picture carries its QR code.
  shareUrl?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  // Visitors who ask for less motion get the opened card straight away.
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );
  const [open, setOpen] = useState(reduceMotion);
  const [pieces] = useState(() => (reduceMotion ? [] : makeConfetti()));
  const [copied, setCopied] = useState(false);

  const money = lang === "de" ? `${voucher.amountEur} €` : `€${voucher.amountEur}`;
  const validDate = voucher.expiresAt
    ? new Date(voucher.expiresAt * 1000).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
  const forLine = voucher.recipientName ? t.forLabel.replace("{name}", voucher.recipientName) : "";
  const fromLine = voucher.senderName ? t.fromLabel.replace("{name}", voucher.senderName) : "";
  const validLine = validDate ? t.validUntil.replace("{date}", validDate) : "";

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(voucher.code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = voucher.code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  // Draws the voucher onto a canvas so it can be saved and forwarded as a picture.
  async function savePicture() {
    try {
      await document.fonts.ready;
    } catch {}
    const host = stageRef.current;
    const style = host ? getComputedStyle(host) : null;
    const display = style?.getPropertyValue("--font-baloo").trim() || "Georgia, serif";
    const body = style?.getPropertyValue("--font-poppins").trim() || "Arial, sans-serif";

    const W = 1200;
    const H = 700;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fffcf7";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#ffafc7";
    ctx.lineWidth = 16;
    ctx.strokeRect(28, 28, W - 56, H - 56);
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    ctx.fillStyle = "#332f2a";
    ctx.font = `800 56px ${display}`;
    ctx.fillText("Fuzzy Berry", W / 2, 130);

    ctx.fillStyle = "#cc3a64";
    ctx.font = `700 26px ${body}`;
    ctx.fillText(t.cardTitle.toUpperCase(), W / 2, 184);

    ctx.fillStyle = "#332f2a";
    ctx.font = `800 160px ${display}`;
    ctx.fillText(money, W / 2, 350);

    const toFrom = [forLine, fromLine].filter(Boolean).join("   ·   ");
    if (toFrom) {
      ctx.font = `600 36px ${body}`;
      ctx.fillText(toFrom, W / 2, 415);
    }

    const boxX = W / 2 - 330;
    const boxY = 452;
    const boxW = 660;
    const boxH = 104;
    ctx.setLineDash([16, 10]);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#332f2a";
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") ctx.roundRect(boxX, boxY, boxW, boxH, 22);
    else ctx.rect(boxX, boxY, boxW, boxH);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = `700 60px ${body}`;
    ctx.fillText(voucher.code, W / 2, boxY + 70);

    ctx.font = `500 26px ${body}`;
    if (validLine) ctx.fillText(validLine, W / 2, 604);
    ctx.fillText("www.fuzzyberry.de", W / 2, 642);

    // The gift link as a QR code, so a printed card opens the gift-box surprise.
    if (shareUrl) {
      try {
        const { toDataURL } = await import("qrcode");
        const dataUrl = await toDataURL(shareUrl, { margin: 1, width: 340, color: { dark: "#332f2a", light: "#ffffff" } });
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("QR image failed"));
          img.src = dataUrl;
        });
        const size = 170;
        const qx = W - 70 - size;
        const qy = H - 70 - size - 24;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(qx - 10, qy - 10, size + 20, size + 20);
        ctx.drawImage(img, qx, qy, size, size);
        ctx.fillStyle = "#332f2a";
        ctx.font = `600 20px ${body}`;
        ctx.fillText(t.scanToOpen, qx + size / 2, qy + size + 34);
      } catch {
        // A picture without the QR code is still a valid voucher.
      }
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fuzzy-berry-gift-voucher-${voucher.code}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  return (
    <div className={`${styles.stage} ${open ? styles.open : ""}`} ref={stageRef}>
      <p className={styles.srOnly} role="status">
        {open ? `${t.thanksTitle}. ${voucher.code}` : ""}
      </p>

      {open && !reduceMotion && (
        <div className={styles.confetti} aria-hidden="true">
          {pieces.map((p) => (
            <span
              key={p.id}
              className={styles.piece}
              style={
                {
                  "--dx": `${p.dx}px`,
                  "--dy": `${p.dy}px`,
                  "--rot": `${p.rot}deg`,
                  "--delay": `${p.delay}ms`,
                  width: p.w,
                  height: p.h,
                  background: p.color,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      <div className={styles.scene}>
        <div className={styles.shaker}>
          <div className={styles.card} aria-hidden={!open}>
            <div className={styles.cardBand}>Fuzzy Berry</div>
            <div className={styles.cardBody}>
              <span className={styles.cardKicker}>{t.cardTitle}</span>
              <span className={styles.cardAmount}>{money}</span>
              <span className={styles.cardCode}>{voucher.code}</span>
            </div>
          </div>

          <button
            type="button"
            className={styles.box}
            onClick={() => setOpen(true)}
            disabled={open}
            aria-label={t.openAria}
          >
            <span className={styles.boxBody} />
            <span className={styles.lid}>
              {/* A big, symmetrical bow: two loops, a knot and two ribbon tails. */}
              <svg className={styles.bow} viewBox="0 0 160 104" aria-hidden="true" focusable="false">
                <g stroke="#332f2a" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
                  {/* tails */}
                  <path d="M77 64 L56 98 L68 95 L73 103 L88 70 Z" fill="#ffd75e" />
                  <path d="M83 64 L104 98 L92 95 L87 103 L72 70 Z" fill="#ffd75e" />
                  {/* loops */}
                  <path
                    d="M76 62 C60 26 34 6 14 14 C-2 21 4 52 38 62 C52 66 66 65 76 62 Z"
                    fill="#ffd75e"
                  />
                  <path
                    d="M84 62 C100 26 126 6 146 14 C162 21 156 52 122 62 C108 66 94 65 84 62 Z"
                    fill="#ffd75e"
                  />
                  {/* inner fold of each loop */}
                  <path d="M68 59 C58 38 42 25 28 28 C18 31 22 47 42 56 C52 60 60 60 68 59 Z" fill="#f2b93b" strokeWidth="2" />
                  <path d="M92 59 C102 38 118 25 132 28 C142 31 138 47 118 56 C108 60 100 60 92 59 Z" fill="#f2b93b" strokeWidth="2" />
                  {/* knot */}
                  <ellipse cx="80" cy="62" rx="14" ry="13" fill="#ffd75e" />
                  <path d="M74 58 C77 55 82 55 85 57" fill="none" stroke="#fff3b8" strokeWidth="3" />
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {!open && <p className={styles.hint}>{t.openHint}</p>}

      <div className={styles.after} aria-hidden={!open}>
        {forLine && <p className={styles.forLine}>{forLine}</p>}
        {fromLine && <p className={styles.fromLine}>{fromLine}</p>}
        {voucher.message && <p className={styles.message}>“{voucher.message}”</p>}
        {validLine && <p className={styles.valid}>{validLine}</p>}

        <div className={styles.actions}>
          <button type="button" className={`${siteStyles.btn} ${siteStyles.btnPrimary}`} onClick={copyCode} tabIndex={open ? 0 : -1}>
            {copied ? t.copied : t.copy}
          </button>
          {mode === "buyer" && (
            <button type="button" className={`${siteStyles.btn} ${siteStyles.btnOutline}`} onClick={savePicture} tabIndex={open ? 0 : -1}>
              {t.savePicture}
            </button>
          )}
          <Link
            href={`/checkout?promo=${encodeURIComponent(voucher.code)}`}
            className={`${siteStyles.btn} ${siteStyles.btnOutline}`}
            tabIndex={open ? 0 : -1}
          >
            {mode === "buyer" ? t.redeemNow : t.orderNow} →
          </Link>
        </div>
        <p className={styles.keepSafe}>{mode === "buyer" ? t.keepSafe : t.recipientNote}</p>
      </div>
    </div>
  );
}
