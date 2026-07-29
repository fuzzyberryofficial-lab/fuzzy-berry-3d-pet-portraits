"use client";

import { useEffect, useState } from "react";
import { Baloo_2 } from "next/font/google";
import styles from "./AnnouncementBar.module.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["700"], variable: "--font-baloo-announce" });

const DISMISS_KEY = "fb_announcement_dismissed";

export default function AnnouncementBar() {
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

  if (!visible) return null;

  return (
    <div className={`${styles.bar} ${baloo.variable}`}>
      <p className={styles.text}>✨ Enjoy Free Worldwide Shipping on All Orders! Limited Time Only. ✨</p>
      <button type="button" className={styles.close} aria-label="Dismiss announcement" onClick={dismiss}>
        ×
      </button>
    </div>
  );
}
