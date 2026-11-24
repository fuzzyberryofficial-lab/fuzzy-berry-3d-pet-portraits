import { createHmac } from "crypto";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

// Gift vouchers are redeemed with a normal Stripe promotion code (the checkout
// page already accepts those). As soon as a voucher payment is confirmed we
// create a single-use code worth exactly what was paid. The code is derived from
// the Checkout Session id with a server secret, so it can't be guessed, and
// asking for it twice always gives the same code instead of a second voucher.

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no I, L, O, 0, 1: easy to read out loud
export const VOUCHER_VALID_YEARS = 3;
export const MIN_VOUCHER_EUROS = 25;
export const MAX_VOUCHER_EUROS = 500;

export interface Voucher {
  code: string;
  amountEur: number;
  recipientName: string;
  message: string;
  // Unix seconds.
  expiresAt: number;
}

export function voucherCodeForSession(sessionId: string): string {
  const secret = process.env.STRIPE_SECRET_KEY ?? "";
  const digest = createHmac("sha256", secret).update(`gift-voucher:${sessionId}`).digest();
  let out = "";
  for (let i = 0; i < 10; i++) out += ALPHABET[digest[i] % ALPHABET.length];
  return `FB-${out.slice(0, 5)}-${out.slice(5)}`;
}

function isAlreadyExists(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "resource_already_exists";
}

// Returns the voucher for a paid gift-voucher session (creating the code the
// first time), or null if the session isn't a fully paid gift voucher.
export async function ensureVoucher(session: Stripe.Checkout.Session): Promise<Voucher | null> {
  if (session.payment_status !== "paid" || session.metadata?.kind !== "gift_voucher") return null;

  const amount = Number(session.metadata.amount_eur);
  if (!Number.isInteger(amount) || amount < MIN_VOUCHER_EUROS || amount > MAX_VOUCHER_EUROS) return null;
  // The code is worth what was actually charged, never just what the metadata says.
  if (session.currency !== "eur" || session.amount_total !== amount * 100) return null;

  const stripe = getStripe();
  const code = voucherCodeForSession(session.id);
  const findPromo = async () => (await stripe.promotionCodes.list({ code, limit: 1 })).data[0];

  let promo = await findPromo();
  if (!promo) {
    // Whole calendar years from now (not N x 365 days, which loses a day on a leap year).
    const until = new Date();
    until.setFullYear(until.getFullYear() + VOUCHER_VALID_YEARS);
    const expiresAt = Math.floor(until.getTime() / 1000);
    const couponId = `gv-${code}`;
    const metadata = { kind: "gift_voucher", session_id: session.id, amount_eur: String(amount) };

    try {
      await stripe.coupons.create({
        id: couponId,
        name: `Gift voucher ${amount} EUR`,
        amount_off: amount * 100,
        currency: "eur",
        duration: "once",
        max_redemptions: 1,
        redeem_by: expiresAt,
        metadata,
      });
    } catch (err) {
      // A webhook and the thank-you page can race; the loser just reuses it.
      if (!isAlreadyExists(err)) throw err;
    }

    try {
      promo = await stripe.promotionCodes.create({
        promotion: { type: "coupon", coupon: couponId },
        code,
        max_redemptions: 1,
        expires_at: expiresAt,
        metadata,
      });
    } catch (err) {
      promo = await findPromo();
      if (!promo) throw err;
    }
  }

  return {
    code: promo.code,
    amountEur: amount,
    recipientName: session.metadata.recipient_name ?? "",
    message: session.metadata.message ?? "",
    expiresAt: promo.expires_at ?? 0,
  };
}
