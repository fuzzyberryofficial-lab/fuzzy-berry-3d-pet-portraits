"use client";

import { useEffect } from "react";
import Script from "next/script";
import styles from "./HomePage.module.css";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const POST_PERMALINKS = [
  "https://www.instagram.com/reel/DdrY1bEtlz7/",
  "https://www.instagram.com/reel/DVWhnryjCMj/",
  "https://www.instagram.com/p/DWZJ4nAiWin/",
];

export default function InstagramEmbedGrid() {
  useEffect(() => {
    // If the embed script was already loaded and cached from a previous
    // page, it won't re-scan the DOM on its own — nudge it once we mount.
    window.instgrm?.Embeds.process();
  }, []);

  return (
    <>
      <div className={styles.igGrid}>
        {POST_PERMALINKS.map((url) => (
          <blockquote
            key={url}
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ margin: "0 auto", width: "100%" }}
          />
        ))}
      </div>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
    </>
  );
}
