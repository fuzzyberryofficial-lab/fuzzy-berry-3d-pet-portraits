"use client";

import { useEffect, useState } from "react";
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

const AUTO_ADVANCE_MS = 10000;

export default function InstagramEmbedGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Re-process on every slide change: Instagram's script only scans the
    // DOM once on load, so a freshly swapped-in blockquote needs a nudge.
    window.instgrm?.Embeds.process();
  }, [activeIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % POST_PERMALINKS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setActiveIndex((index + POST_PERMALINKS.length) % POST_PERMALINKS.length);
  };

  return (
    <>
      <div className={styles.igCarousel}>
        <button
          type="button"
          className={styles.igArrow}
          aria-label="Previous post"
          onClick={() => goTo(activeIndex - 1)}
        >
          ←
        </button>

        {/* Instagram's script replaces this blockquote with its own iframe
            markup outside of React's control. Keying the wrapper (not the
            blockquote itself) means React always tears down and recreates
            that whole subtree instead of trying to reconcile a node
            Instagram has already swapped out from under it. The min-height
            keeps the slot from collapsing to nothing if Instagram's resize
            handshake with the iframe is ever slow or drops a beat. */}
        <div key={POST_PERMALINKS[activeIndex]} className={styles.igSlide}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={POST_PERMALINKS[activeIndex]}
            data-instgrm-version="14"
            style={{ margin: "0 auto", width: "100%" }}
          />
        </div>

        <button type="button" className={styles.igArrow} aria-label="Next post" onClick={() => goTo(activeIndex + 1)}>
          →
        </button>
      </div>

      <div className={styles.igDots}>
        {POST_PERMALINKS.map((url, i) => (
          <button
            key={url}
            type="button"
            className={`${styles.igDot} ${i === activeIndex ? styles.igDotActive : ""}`}
            aria-label={`Go to post ${i + 1}`}
            onClick={() => goTo(i)}
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
