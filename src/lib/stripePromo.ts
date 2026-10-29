import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

// Discount codes the owner creates in the Stripe dashboard (Products →
// Coupons → a coupon → "Promotion codes"). Customers type the promotion
// code (e.g. "XMAS10") on our checkout page; we look it up here and pass it
// to the Stripe Checkout Session, so Stripe enforces expiry, usage limits
// and minimum amounts itself.

export interface StripePromo {
  id: string;
  code: string;
  percentOff: number | null;
  // In cents.
  amountOff: number | null;
}

export async function findStripePromo(rawCode: string): Promise<StripePromo | null> {
  const code = rawCode.trim();
  if (!code) return null;

  const stripe = getStripe();
  const list = await stripe.promotionCodes.list({
    code,
    active: true,
    limit: 1,
    expand: ["data.promotion.coupon"],
  });
  const promo = list.data[0];
  if (!promo) return null;

  const coupon = promo.promotion?.coupon as Stripe.Coupon | string | null;
  if (!coupon || typeof coupon === "string" || !coupon.valid) return null;
  if (coupon.amount_off && coupon.currency && coupon.currency !== "eur") return null;

  // Safety net: never let a public code make a hand-painted portrait free.
  // 100%-off coupons (like the in-store FRANKFURT one) stay internal.
  if ((coupon.percent_off ?? 0) >= 100) return null;

  return {
    id: promo.id,
    code: promo.code,
    percentOff: coupon.percent_off ?? null,
    amountOff: coupon.amount_off ?? null,
  };
}
