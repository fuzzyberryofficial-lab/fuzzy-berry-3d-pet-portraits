import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { ensureGiftCard, GIFT_CARD_KIND, isGiftCardSession } from "@/lib/giftCards";
import { GIFT_CARD_AMOUNTS, GIFT_CARD_LIMITS } from "@/lib/giftCardShared";

interface GiftCardRequestBody {
  amount: number;
  email: string;
  recipientName?: string;
  fromName?: string;
  message?: string;
  lang?: string;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

// Starts a Stripe Checkout for a gift card.
export async function POST(request: Request) {
  let body: GiftCardRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!GIFT_CARD_AMOUNTS.includes(amount as (typeof GIFT_CARD_AMOUNTS)[number])) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }
  const email = clean(body.email, 200);
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Missing email." }, { status: 400 });
  }
  const lang = body.lang === "de" ? "de" : "en";
  const origin = new URL(request.url).origin;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "paypal", "klarna", "eps"],
      allow_promotion_codes: false,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: lang === "de" ? `FuzzyBerry Geschenkkarte €${amount}` : `FuzzyBerry Gift Card €${amount}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      locale: lang === "de" ? "de" : "auto",
      success_url: `${origin}/gift-card?stripe=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/gift-card?stripe=cancel`,
      metadata: {
        kind: GIFT_CARD_KIND,
        amount: String(amount),
        recipientName: clean(body.recipientName, GIFT_CARD_LIMITS.name),
        fromName: clean(body.fromName, GIFT_CARD_LIMITS.name),
        message: clean(body.message, GIFT_CARD_LIMITS.message),
        lang,
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Gift card checkout failed:", err);
    return NextResponse.json({ error: "Unable to start checkout." }, { status: 500 });
  }
}

// After payment: returns the gift card (and creates its code on first call).
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (!isGiftCardSession(session)) {
      return NextResponse.json({ error: "Not a gift card." }, { status: 404 });
    }
    if (session.payment_status !== "paid") {
      return NextResponse.json({ paid: false });
    }
    const card = await ensureGiftCard(session);
    if (!card) return NextResponse.json({ error: "Unable to create gift card." }, { status: 500 });
    return NextResponse.json({ paid: true, card });
  } catch (err) {
    console.error("Gift card lookup failed:", err);
    return NextResponse.json({ error: "Unable to load gift card." }, { status: 500 });
  }
}
