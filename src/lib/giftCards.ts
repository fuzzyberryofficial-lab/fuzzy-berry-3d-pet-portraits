import { createHmac } from "node:crypto";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { GIFT_CARD_AMOUNTS, GIFT_CARD_VALID_DAYS } from "@/lib/giftCardShared";

// Gift cards are sold through their own Stripe Checkout Session
// (metadata.kind = "gift_card"). Once it's paid, we create a single-use,
// fixed-amount Stripe coupon + promotion code for it. The recipient types
// that code on the normal checkout page, which already looks up Stripe
// promotion codes, and pays whatever is left.

export const GIFT_CARD_KIND = "gift_card";

export interface GiftCardDetails {
  code: string;
  amount: number;
  expiresAt: number; // Unix seconds
  recipientName: string;
  fromName: string;
  message: string;
  lang: "en" | "de";
}

// No 0/O/1/I/L so the code is easy to read off a printed card.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

// The same paid session always gives the same code, so the webhook and the
// success page can both call ensureGiftCard() without making two codes.
function codeForSession(sessionId: string): string {
  const secret = process.env.STRIPE_SECRET_KEY || "";
  const digest = createHmac("sha256", secret).update(`gift-card:${sessionId}`).digest();
  let chars = "";
  for (let i = 0; i < 8; i++) chars += CODE_ALPHABET[digest[i] % CODE_ALPHABET.length];
  return `FB-${chars.slice(0, 4)}-${chars.slice(4)}`;
}

export function isGiftCardSession(session: Stripe.Checkout.Session): boolean {
  return session.metadata?.kind === GIFT_CARD_KIND;
}

function detailsFromSession(session: Stripe.Checkout.Session, code: string, expiresAt: number): GiftCardDetails {
  const m = session.metadata ?? {};
  return {
    code,
    amount: Number(m.amount) || 0,
    expiresAt,
    recipientName: m.recipientName ?? "",
    fromName: m.fromName ?? "",
    message: m.message ?? "",
    lang: m.lang === "de" ? "de" : "en",
  };
}

// Creates the code for a paid gift-card session, or returns the one that
// already exists. Returns null if the session isn't a paid gift card.
export async function ensureGiftCard(session: Stripe.Checkout.Session): Promise<GiftCardDetails | null> {
  if (!isGiftCardSession(session) || session.payment_status !== "paid") return null;
  const amount = Number(session.metadata?.amount);
  if (!GIFT_CARD_AMOUNTS.includes(amount as (typeof GIFT_CARD_AMOUNTS)[number])) return null;
  // Guard against a session whose metadata doesn't match what was paid.
  if ((session.amount_total ?? 0) < amount * 100) return null;

  const stripe = getStripe();
  const code = codeForSession(session.id);

  const existing = await stripe.promotionCodes.list({ code, limit: 1 });
  if (existing.data[0]) {
    return detailsFromSession(session, code, existing.data[0].expires_at ?? 0);
  }

  const expiresAt = session.created + GIFT_CARD_VALID_DAYS * 24 * 60 * 60;
  const buyerEmail = session.customer_details?.email ?? session.customer_email ?? "";

  const coupon = await stripe.coupons.create(
    {
      name: `Geschenkkarte €${amount} (${code})`,
      amount_off: amount * 100,
      currency: "eur",
      duration: "once",
      max_redemptions: 1,
      redeem_by: expiresAt,
      metadata: { kind: GIFT_CARD_KIND, checkoutSession: session.id, buyerEmail },
    },
    { idempotencyKey: `gift-card-coupon-${session.id}` },
  );

  await stripe.promotionCodes.create(
    {
      promotion: { type: "coupon", coupon: coupon.id },
      code,
      max_redemptions: 1,
      expires_at: expiresAt,
      metadata: { kind: GIFT_CARD_KIND, checkoutSession: session.id, buyerEmail },
    },
    { idempotencyKey: `gift-card-promo-${session.id}` },
  );

  return detailsFromSession(session, code, expiresAt);
}
