"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Fraunces } from "next/font/google";
import { useLang } from "./useLang";
import type { AnnouncementSettings } from "@/lib/adminData";
import styles from "./AnnouncementBar.module.css";

const baloo = Fraunces({ subsets: ["latin"], weight: ["700"], variable: "--font-baloo-announce" });

const DISMISS_KEY = "fb_announcement_dismissed";

export default function AnnouncementBarClient({ settings }: { settings: AnnouncementSettings }) {
  const pathname = usePathname();
  const [lang] = useLang();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // One-time correction after hydration: localStorage isn't available on
    // the server, so a previous dismissal can only be applied client-side.
    const dismissed = window.localStorage.getItem(DISMISS_KEY);
    if (dismissed === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setVisible(false);
  };

  if (!settings.enabled || !visible || pathname?.startsWith("/admin")) return null;

  const text = lang === "de" ? settings.textDe : settings.textEn;
  if (!text) return null;

  return (
    <div
      className={`${styles.bar} ${baloo.variable}`}
      style={{ background: settings.bgColor, color: settings.textColor }}
    >
      <p className={styles.text}>{text}</p>
      <button type="button" className={styles.close} aria-label="Dismiss announcement" onClick={dismiss}>
        ×
      </button>
    </div>
  );
}
