"use client";

import { useSyncExternalStore } from "react";

// Visitors choose what may load. Until they choose, nothing optional is loaded.
//   external  Instagram posts and the Google map (their servers see the visit)
//   marketing the Meta Pixel (measures visits and purchases for Facebook/Instagram ads)
// The choice is kept in this browser only.

const KEY = "fb_consent_v1";
const CHANGE_EVENT = "fb-consent-change";
export const OPEN_EVENT = "fb-open-consent";

export interface ConsentState {
  decided: boolean;
  external: boolean;
  marketing: boolean;
}

const UNDECIDED: ConsentState = { decided: false, external: false, marketing: false };

function parse(raw: string): ConsentState {
  if (!raw) return UNDECIDED;
  try {
    const v = JSON.parse(raw) as { external?: unknown; marketing?: unknown };
    return { decided: true, external: v.external === true, marketing: v.marketing === true };
  } catch {
    return UNDECIDED;
  }
}

function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function saveConsent(external: boolean, marketing: boolean) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ external, marketing, at: new Date().toISOString() }));
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function readConsent(): ConsentState {
  return parse(readRaw());
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

// On the server (and during hydration) nothing is allowed yet, so optional content never flashes in.
export function useConsent(): ConsentState {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  return parse(raw);
}
