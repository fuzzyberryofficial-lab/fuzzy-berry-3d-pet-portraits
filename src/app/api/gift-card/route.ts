import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { ensureVoucher, MAX_VOUCHER_EUROS, MIN_VOUCHER_EUROS } from "@/lib/giftVoucher";
import { deliveryFromMetadata, isEmail, isValidSendOn } from "@/lib/giftDelivery";

// Gift vouchers are sold as a plain one-line Stripe Checkout payment. Nothing is
// written to our own database. Once the payment is confirmed (by the Stripe
// webhook or by the thank-you page asking for it) a single-use promotion code of
// the same value is created and shown to the buyer straight away (see
// lib/giftVoucher.ts). Customers redeem it in the normal checkout promo field.

const MIN_EUROS = MIN_VOUCHER_EUROS;
const MAX_EUROS = MAX_VOUCHER_EUROS;

interface GiftBody {
  amount?: unknown;
  recipientName?: unknown;
  senderName?: unknown;
  message?: unknown;
  recipientEmail?: unknown;
  // "now" (or empty) or a calendar day, YYYY-MM-DD.
  sendOn?: unknown;
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
  const senderName = clean(body.senderName, 80);
  const message = clean(body.message, 300);

  // Optional: email the gift to the recipient, right away or on a chosen day.
  const recipientEmail = clean(body.recipientEmail, 254).toLowerCase();
  const sendOnRaw = clean(body.sendOn, 10);
  const wantsDate = sendOnRaw !== "" && sendOnRaw !== "now";
  if (recipientEmail && !isEmail(recipientEmail)) {
    return NextResponse.json(
      { error: lang === "de" ? "Bitte prüfen Sie die E-Mail-Adresse der beschenkten Person." : "Please check the recipient's email address." },
      { status: 400 },
    );
  }
  if (wantsDate && !recipientEmail) {
    return NextResponse.json(
      { error: lang === "de" ? "Für einen Wunschtermin brauchen wir die E-Mail-Adresse der beschenkten Person." : "To pick a day we need the recipient's email address." },
      { status: 400 },
    );
  }
  if (wantsDate && !isValidSendOn(sendOnRaw)) {
    return NextResponse.json(
      { error: lang === "de" ? "Bitte wählen Sie ein Datum ab morgen, höchstens ein Jahr im Voraus." : "Please pick a day from tomorrow, at most a year ahead." },
      { status: 400 },
    );
  }
  const origin = new URL(request.url).origin;

  const metadata = {
    kind: "gift_voucher",
    amount_eur: String(amount),
    recipient_name: recipientName,
    sender_name: senderName,
    message,
    lang,
    ...(recipientEmail ? { recipient_email: recipientEmail, send_on: wantsDate ? sendOnRaw : "now" } : {}),
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
              name: lang === "de" ? `Fuzzy Berry Geschenkgutschein ${amount} €` : `Fuzzy Berry gift voucher €${amount}`,
              description:
                lang === "de"
                  ? "Den Code sehen Sie direkt nach der Zahlung. 3 Jahre gültig."
                  : "Your code appears right after payment. Valid for 3 years.",
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
        description: `Gift voucher €${amount}${recipientName ? ` for ${recipientName}` : ""}${senderName ? ` from ${senderName}` : ""}`,
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

// Used by the thank-you page: confirms a real, paid gift-voucher session, makes
// sure its voucher code exists, and returns it so the buyer sees it immediately.
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id") ?? "";
  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" && session.metadata?.kind === "gift_voucher";
    if (!paid) return NextResponse.json({ paid: false });

    const amount = Number(session.metadata?.amount_eur) || null;
    let voucher = null;
    try {
      voucher = await ensureVoucher(session);
    } catch (err) {
      // Paid, but Stripe hiccuped while creating the code: tell the page to retry.
      console.error("Creating gift voucher code failed:", err);
    }
    return NextResponse.json({ paid: true, amount, voucher, delivery: deliveryFromMetadata(session.metadata) });
  } catch {
    return NextResponse.json({ paid: false }, { status: 404 });
  }
}
