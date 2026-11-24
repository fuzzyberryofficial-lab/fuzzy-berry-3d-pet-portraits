"use client";

import { useEffect } from "react";

/** Never go below this: a title that would need to be smaller than this wraps instead. */
const MIN_FONT_PX = 18;

function fitOne(h: HTMLElement) {
  // Start from the stylesheet's own size and wrapping.
  h.style.fontSize = "";
  h.style.whiteSpace = "";
  h.style.textWrap = "";

  const cs = getComputedStyle(h);
  const startSize = parseFloat(cs.fontSize);
  const padding = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const avail = h.clientWidth - padding;
  if (!avail || !startSize) return;

  // How wide is the whole title on a single line?
  h.style.whiteSpace = "nowrap";
  h.style.textWrap = "nowrap";
  const natural = h.scrollWidth - padding;
  if (natural <= avail + 0.5) {
    // It already fits at full size: keep it on one line.
    return;
  }

  const size = Math.floor(startSize * (avail / natural) * 100) / 100 - 0.25;
  if (size >= MIN_FONT_PX) {
    h.style.fontSize = `${size}px`;
  } else {
    // It would get too small to read comfortably: let it wrap normally instead.
    h.style.whiteSpace = "";
    h.style.textWrap = "";
  }
}

/**
 * Keeps headings on a single line by shrinking the type just enough to fit
 * (down to MIN_FONT_PX). Hero headlines opt out with data-nofit.
 */
export default function FitHeadings() {
  useEffect(() => {
    let timer: number | undefined;

    const run = () => {
      document.querySelectorAll<HTMLElement>("h1, h2").forEach((h) => {
        if (h.closest("nav") || h.closest("[data-nofit]") || h.hasAttribute("data-nofit")) return;
        fitOne(h);
      });
    };
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(run, 80);
    };

    run();
    document.fonts?.ready.then(run);
    window.addEventListener("resize", schedule);
    // Language switches and other re-renders change the heading text.
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return null;
}
