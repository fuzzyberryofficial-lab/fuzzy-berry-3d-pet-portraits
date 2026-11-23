import styles from "./GiftCardPage.module.css";
import type { GiftCardTranslation } from "./translations";

interface GiftCardVisualProps {
  t: GiftCardTranslation;
  amount: number;
  code: string;
  recipientName: string;
  fromName: string;
  message: string;
  validUntil: string;
  preview?: boolean;
}

// The gift card itself. Same component for the live preview while buying
// and the real card (with code) after payment, which is also what prints.
export default function GiftCardVisual({
  t,
  amount,
  code,
  recipientName,
  fromName,
  message,
  validUntil,
  preview,
}: GiftCardVisualProps) {
  return (
    <div className={styles.cardStack}>
      {/* Offset layers behind the card, a nod to the stacked acrylic. */}
      <div className={`${styles.cardLayer} ${styles.cardLayer2}`} aria-hidden />
      <div className={`${styles.cardLayer} ${styles.cardLayer1}`} aria-hidden />
      <div className={styles.card}>
        <div className={styles.cardBlobPink} aria-hidden />
        <div className={styles.cardBlobSun} aria-hidden />
        <svg className={styles.cardPaw} viewBox="0 0 64 64" aria-hidden>
          <ellipse cx="32" cy="42" rx="14" ry="12" />
          <ellipse cx="14" cy="26" rx="6" ry="8" />
          <ellipse cx="25" cy="15" rx="6" ry="8" />
          <ellipse cx="39" cy="15" rx="6" ry="8" />
          <ellipse cx="50" cy="26" rx="6" ry="8" />
        </svg>

        <div className={styles.cardTop}>
          <span className={styles.cardBrand}>
            <span className={styles.cardBrandFuzzy}>Fuzzy</span> <span className={styles.cardBrandBerry}>Berry</span>
          </span>
          <span className={styles.cardPill}>{t.cardLabel}</span>
        </div>

        <div className={styles.cardMiddle}>
          <div className={styles.cardAmount}>€{amount}</div>
          {amount === 179 && <div className={styles.cardFull}>{t.cardFullPortrait}</div>}
          <div className={styles.cardFor}>{t.cardFor}</div>
        </div>

        {(recipientName || fromName || message) && (
          <div className={styles.cardPersonal}>
            {(recipientName || fromName) && (
              <div className={styles.cardNames}>
                {recipientName && (
                  <span>
                    <b>{t.cardTo}</b> {recipientName}
                  </span>
                )}
                {fromName && (
                  <span>
                    <b>{t.cardFrom}</b> {fromName}
                  </span>
                )}
              </div>
            )}
            {message && <p className={styles.cardMessage}>{t.quote(message)}</p>}
          </div>
        )}

        <div className={styles.cardBottom}>
          <div className={`${styles.cardCode} ${preview ? styles.cardCodePreview : ""}`}>
            <span className={styles.cardCodeLabel}>{t.cardCode}</span>
            <span className={styles.cardCodeValue}>{code}</span>
          </div>
          <div className={styles.cardMeta}>
            <span>{t.cardRedeem}</span>
            <span>{t.cardValid(validUntil)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
