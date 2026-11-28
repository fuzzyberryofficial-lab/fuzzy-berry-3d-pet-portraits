// Anonymous funnel steps. Each step is counted at most once per page load.
// Nothing is stored on the visitor's device and no personal data is sent:
// only the step name, the page's language, and a coarse source/device that
// the server works out from the request headers.

export const FUNNEL_STEPS = [
  "view_home",
  "view_collection",
  "view_gift",
  "view_faqs",
  "view_about",
  "view_contact",
  "view_showroom",
  "checkout_style",
  "checkout_pick",
  "checkout_upload",
  "checkout_photo",
  "checkout_payment",
  "checkout_pay_click",
  "checkout_stripe_open",
  "checkout_done",
  "gift_pay_click",
  "whatsapp_click",
] as const;

export type FunnelStep = (typeof FUNNEL_STEPS)[number];

// The order a customer moves through; the admin funnel page shows these as
// one chain with the drop between each step.
export const CHECKOUT_CHAIN: { step: FunnelStep; label: string }[] = [
  { step: "view_home", label: "Homepage viewed" },
  { step: "checkout_style", label: "Order page opened" },
  { step: "checkout_pick", label: "Picked a style / size" },
  { step: "checkout_upload", label: "Reached photo step" },
  { step: "checkout_photo", label: "Added a photo" },
  { step: "checkout_pay_click", label: "Pressed Pay" },
  { step: "checkout_stripe_open", label: "Stripe payment page opened" },
  { step: "checkout_done", label: "Paid" },
];

const sent = new Set<string>();

export function trackStep(step: FunnelStep) {
  if (typeof window === "undefined" || sent.has(step)) return;
  sent.add(step);
  const lang = document.documentElement.lang === "de" || window.location.pathname.startsWith("/de") ? "de" : "en";
  // Only the referring site's host name (e.g. "l.instagram.com"), never the full address.
  let ref = "";
  try {
    ref = document.referrer ? new URL(document.referrer).hostname : "";
  } catch {}
  const body = JSON.stringify({ step, lang, ref });
  try {
    if (navigator.sendBeacon && navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }))) return;
  } catch {}
  fetch("/api/track", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true }).catch(() => {});
}
