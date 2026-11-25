"use client";

import type { ReactNode } from "react";
import { readConsent, saveConsent, useConsent } from "@/lib/consent";
import { useLang } from "./useLang";
import { CONSENT_TEXT } from "./consentText";
import styles from "./consent.module.css";

// Shows its children only once the visitor has allowed external content;
// until then a short note with a button to load it (and a plain link out).
export default function ExternalGate({
  kind,
  href,
  children,
}: {
  kind: "instagram" | "map";
  href: string;
  children: ReactNode;
}) {
  const { external } = useConsent();
  const [lang] = useLang();
  const t = CONSENT_TEXT[lang];
  if (external) return <>{children}</>;

  return (
    <div className={styles.gate}>
      <p>{kind === "instagram" ? t.gateInstagram : t.gateMap}</p>
      <div className={styles.gateActions}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => saveConsent(true, readConsent().marketing)}
        >
          {t.gateLoad}
        </button>
        <a className={styles.btn} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          {kind === "instagram" ? t.gateOpenInstagram : t.gateOpenMaps}
        </a>
      </div>
    </div>
  );
}
