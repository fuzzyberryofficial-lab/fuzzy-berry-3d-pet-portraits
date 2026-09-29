"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import styles from "./HomePage.module.css";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const AUTO_ADVANCE_MS = 10000;

export default function InstagramEmbedGrid({ posts }: { posts: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const showControls = posts.length > 1;

  useEffect(() => {
    // Re-process on every slide change: Instagram's script only scans the
    // DOM once on load, so a freshly swapped-in blockquote needs a nudge.
    window.instgrm?.Embeds.process();
  }, [activeIndex]);

  useEffect(() => {
    if (!showControls) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % posts.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [posts.length, showControls]);

  if (posts.length === 0) return null;

  const goTo = (index: number) => {
    setActiveIndex((index + posts.length) % posts.length);
  };

  return (
    <>
      <div className={styles.igCarousel}>
        {showControls && (
          <button
            type="button"
            className={styles.igArrow}
            aria-label="Previous post"
            onClick={() => goTo(activeIndex - 1)}
          >
            ←
          </button>
        )}

        {/* Instagram's script replaces this blockquote with its own iframe
            markup outside of React's control. Keying the wrapper (not the
            blockquote itself) means React always tears down and recreates
            that whole subtree instead of trying to reconcile a node
            Instagram has already swapped out from under it. The min-height
            keeps the slot from collapsing to nothing if Instagram's resize
            handshake with the iframe is ever slow or drops a beat. */}
        <div key={posts[activeIndex]} className={styles.igSlide}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={posts[activeIndex]}
            data-instgrm-version="14"
            style={{ margin: "0 auto", width: "100%" }}
          />
        </div>

        {showControls && (
          <button type="button" className={styles.igArrow} aria-label="Next post" onClick={() => goTo(activeIndex + 1)}>
            →
          </button>
        )}
      </div>

      {showControls && (
        <div className={styles.igDots}>
          {posts.map((url, i) => (
            <button
              key={url}
              type="button"
              className={`${styles.igDot} ${i === activeIndex ? styles.igDotActive : ""}`}
              aria-label={`Go to post ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
    </>
  );
}
