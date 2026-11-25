"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OPEN_EVENT, saveConsent, useConsent } from "@/lib/consent";
import { useLang } from "./useLang";
import { CONSENT_TEXT } from "./consentText";
import styles from "./consent.module.css";

export default function ConsentBanner() {
  const pathname = usePathname();
  const [lang] = useLang();
  const t = CONSENT_TEXT[lang];
  const consent = useConsent();

  // Shown until the visitor chooses; reopened from the "Cookie settings" link in the footer.
  const [reopened, setReopened] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [external, setExternal] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const open = () => {
      const current = (() => {
        try {
          return JSON.parse(window.localStorage.getItem("fb_consent_v1") ?? "{}") as { external?: boolean; marketing?: boolean };
        } catch {
          return {};
        }
      })();
      setExternal(current.external === true);
      setMarketing(current.marketing === true);
      setShowSettings(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  if (pathname?.startsWith("/admin")) return null;
  if (consent.decided && !reopened) return null;

  const choose = (nextExternal: boolean, nextMarketing: boolean) => {
    // Taking back marketing consent: reload so the pixel that is already running stops.
    const hadMarketing = consent.marketing;
    saveConsent(nextExternal, nextMarketing);
    setReopened(false);
    setShowSettings(false);
    if (hadMarketing && !nextMarketing) window.location.reload();
  };

  return (
    <div className={styles.bar} role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <p id="consent-title" className={styles.title}>
        {t.title}
      </p>
      <p className={styles.text}>
        {t.body}{" "}
        <Link href="/policies#privacy">{t.privacy}</Link>
      </p>

      {showSettings && (
        <div className={styles.panel}>
          <label className={styles.toggle}>
            <input type="checkbox" checked disabled aria-label={t.necessaryName} />
            <span>
              <span className={styles.toggleName}>{t.necessaryName}</span>
              <span className={styles.toggleHint}>{t.necessaryHint}</span>
            </span>
          </label>
          <label className={styles.toggle}>
            <input type="checkbox" checked={external} onChange={(e) => setExternal(e.target.checked)} />
            <span>
              <span className={styles.toggleName}>{t.externalName}</span>
              <span className={styles.toggleHint}>{t.externalHint}</span>
            </span>
          </label>
          <label className={styles.toggle}>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <span>
              <span className={styles.toggleName}>{t.marketingName}</span>
              <span className={styles.toggleHint}>{t.marketingHint}</span>
            </span>
          </label>
        </div>
      )}

      <div className={styles.actions}>
        {showSettings ? (
          <button type="button" className={`${styles.btn} ${styles.btnAccept}`} onClick={() => choose(external, marketing)}>
            {t.save}
          </button>
        ) : (
          <>
            <button type="button" className={styles.btn} onClick={() => choose(false, false)}>
              {t.necessaryOnly}
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnAccept}`} onClick={() => choose(true, true)}>
              {t.acceptAll}
            </button>
            <button type="button" className={styles.link} onClick={() => setShowSettings(true)}>
              {t.settings}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
