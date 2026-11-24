import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

// Gift vouchers are sold as a plain one-line Stripe Checkout payment. Nothing is
// written to our own database: the owner sees each sale in the Stripe dashboard
// (payments are tagged kind=gift_voucher) and then creates a single-use Stripe
// promotion code of the same value for the buyer. Customers redeem that code in
// the normal checkout promo field.

const MIN_EUROS = 25;
const MAX_EUROS = 500;

interface GiftBody {
  amount?: unknown;
  recipientName?: unknown;
  message?: unknown;
  lang?: unknown;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: GiftBody;
  try {
    body = (await request.json()) as GiftBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const amount = body.amount;
  if (typeof amount !== "number" || !Number.isInteger(amount) || amount < MIN_EUROS || amount > MAX_EUROS) {
    return NextResponse.json(
      { error: `Please choose a whole-euro amount between €${MIN_EUROS} and €${MAX_EUROS}.` },
      { status: 400 },
    );
  }

  const lang = body.lang === "de" ? "de" : "en";
  const recipientName = clean(body.recipientName, 80);
  const message = clean(body.message, 300);
  const origin = new URL(request.url).origin;

  const metadata = {
    kind: "gift_voucher",
    amount_eur: String(amount),
    recipient_name: recipientName,
    message,
    lang,
  };

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "paypal", "eps"],
      allow_promotion_codes: false,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: lang === "de" ? `Fuzzy Berry Geschenkgutschein €${amount}` : `Fuzzy Berry gift voucher €${amount}`,
              description:
                lang === "de"
                  ? "Wird per E-Mail zugesendet. 3 Jahre gültig."
                  : "Sent by email. Valid for 3 years.",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/gift-card?stripe=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/gift-card?stripe=cancel`,
      metadata,
      payment_intent_data: {
        description: `Gift voucher €${amount}${recipientName ? ` for ${recipientName}` : ""}`,
        metadata,
      },
    } satisfies Stripe.Checkout.SessionCreateParams);

    if (!session.url) {
      return NextResponse.json({ error: "Could not start payment." }, { status: 500 });
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Gift voucher checkout failed:", err);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 500 });
  }
}

// Used by the thank-you page: confirms a real, paid gift-voucher session before
// we show the confirmation or fire the Purchase pixel event.
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id") ?? "";
  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" && session.metadata?.kind === "gift_voucher";
    return NextResponse.json({
      paid,
      amount: paid ? Number(session.metadata?.amount_eur) || null : null,
    });
  } catch {
    return NextResponse.json({ paid: false }, { status: 404 });
  }
}
