import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { COLLECTIONS_BASE, type CollectionKey } from "@/components/checkout/catalog";

const FRAME_PRICE = 20;
const CURRENCY = "eur";

interface CheckoutRequestBody {
  collectionKey: CollectionKey;
  typeKey: string;
  sizeIndex: number;
  addFrame: boolean;
  displayNames: {
    collectionTitle: string;
    typeLabel: string;
    frameColorLabel: string;
  };
  ship: {
    name: string;
    email: string;
    address: string;
    city: string;
    postal: string;
    country: string;
  };
  artistNotes: string;
}

export async function POST(request: Request) {
  let body: CheckoutRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Recompute pricing from the canonical catalog server-side — never trust a
  // price sent by the client.
  const collectionBase = COLLECTIONS_BASE[body.collectionKey];
  const typeBase = collectionBase?.types[body.typeKey];
  const size = typeBase?.sizes[body.sizeIndex];

  if (!collectionBase || !typeBase || !size) {
    return NextResponse.json({ error: "Invalid portrait selection." }, { status: 400 });
  }
  if (!body.ship?.name || !body.ship?.email) {
    return NextResponse.json({ error: "Missing shipping details." }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: CURRENCY,
        product_data: {
          name: `${body.displayNames.collectionTitle} — ${body.displayNames.typeLabel} (${size.label})`,
        },
        unit_amount: size.price * 100,
      },
      quantity: 1,
    },
  ];

  if (body.addFrame) {
    lineItems.push({
      price_data: {
        currency: CURRENCY,
        product_data: {
          name: `Frame (${body.displayNames.frameColorLabel})`,
        },
        unit_amount: FRAME_PRICE * 100,
      },
      quantity: 1,
    });
  }

  const origin = new URL(request.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "paypal", "klarna", "eps"],
      line_items: lineItems,
      customer_email: body.ship.email,
      success_url: `${origin}/checkout?stripe=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?stripe=cancel`,
      metadata: {
        customerName: body.ship.name,
        shippingAddress: `${body.ship.address}, ${body.ship.city} ${body.ship.postal}, ${body.ship.country}`,
        artistNotes: body.artistNotes || "",
        collection: body.collectionKey,
        type: body.typeKey,
        size: size.label,
        frame: body.addFrame ? body.displayNames.frameColorLabel : "none",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unable to start checkout." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      paid: session.payment_status === "paid",
      customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
      customerName: session.customer_details?.name ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unable to verify payment." },
      { status: 500 },
    );
  }
}
