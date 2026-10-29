import { NextResponse } from "next/server";
import { PROMO_CODES } from "@/components/checkout/catalog";
import { findStripePromo } from "@/lib/stripePromo";

// Lets the checkout page check a discount code created in Stripe before the
// customer pays, so it can show the discount in the order summary.
export async function GET(request: Request) {
  const code = (new URL(request.url).searchParams.get("code") || "").trim().toUpperCase();
  if (!code || code.length > 64 || PROMO_CODES[code]) {
    return NextResponse.json({ valid: false });
  }
  try {
    const promo = await findStripePromo(code);
    if (!promo) return NextResponse.json({ valid: false });
    return NextResponse.json({ valid: true, percentOff: promo.percentOff, amountOff: promo.amountOff });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
