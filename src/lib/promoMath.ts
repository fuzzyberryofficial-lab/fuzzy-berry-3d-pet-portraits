// Same math Stripe uses for a whole-order discount: a percent of the total,
// or a fixed amount capped at the total. Works in cents. Shared by the
// checkout page (to preview the price) and the server.
export function promoDiscountCents(
  promo: { percentOff: number | null; amountOff: number | null },
  totalCents: number,
): number {
  if (promo.percentOff) return Math.round((totalCents * promo.percentOff) / 100);
  if (promo.amountOff) return Math.min(promo.amountOff, totalCents);
  return 0;
}
