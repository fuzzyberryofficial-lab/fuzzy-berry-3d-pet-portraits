"use client";

import { openConsentSettings } from "@/lib/consent";
import { useLang } from "./useLang";
import { CONSENT_TEXT } from "./consentText";

export default function CookieSettingsButton({ className }: { className?: string }) {
  const [lang] = useLang();
  return (
    <button
      type="button"
      className={className}
      onClick={openConsentSettings}
      style={{ background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", textDecoration: "underline", cursor: "pointer" }}
    >
      {CONSENT_TEXT[lang].footerLink}
    </button>
  );
}
