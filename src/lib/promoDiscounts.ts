import { PROMO_CODES } from "@/components/checkout/catalog";
import { getStripe } from "@/lib/stripe";
import type { OrderRow } from "@/lib/adminData";

const FREE_FRAME_CENTS = 2000;

// How much each paid promo order was actually discounted, in cents, keyed by
// order id. Free-frame codes (FRANKFURT) are always €20. Codes created in the
// Stripe dashboard (XMAS10, …) vary per order, so the amount is read from the
// order's Stripe Checkout Session.
export async function getPromoDiscounts(redemptions: OrderRow[]): Promise<Map<string, number>> {
  const discounts = new Map<string, number>();
  const paid = redemptions.filter((r) => r.status === "paid" && r.promo_code);

  await Promise.all(
    paid.map(async (row) => {
      if (PROMO_CODES[row.promo_code!.toUpperCase()]?.freeFrame) {
        discounts.set(row.id, FREE_FRAME_CENTS);
        return;
      }
      try {
        const session = await getStripe().checkout.sessions.retrieve(row.stripe_session_id);
        discounts.set(row.id, session.total_details?.amount_discount ?? 0);
      } catch (err) {
        console.error(`Couldn't read discount for order ${row.id}:`, err);
        discounts.set(row.id, 0);
      }
    }),
  );

  return discounts;
}
