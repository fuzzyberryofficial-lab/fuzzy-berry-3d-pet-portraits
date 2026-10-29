import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { findStripePromo, type StripePromo } from "@/lib/stripePromo";
import { getSupabaseAdmin, ORDER_PHOTOS_BUCKET } from "@/lib/supabase";
import { COLLECTIONS_BASE, PROMO_CODES, type CollectionKey } from "@/components/checkout/catalog";
import { getCountryLabel, getShippingRate, getShippingZone, getShippingZoneLabel } from "@/components/checkout/countries";

const FRAME_PRICE = 20;
const CURRENCY = "eur";

interface CheckoutRequestBody {
  collectionKey: CollectionKey;
  typeKey: string;
  sizeIndex: number;
  addFrame: boolean;
  promoCode?: string;
  lang?: string;
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
  let photos: File[] = [];
  try {
    const formData = await request.formData();
    const payload = formData.get("payload");
    if (typeof payload !== "string") throw new Error("Missing payload.");
    body = JSON.parse(payload);
    photos = [0, 1, 2]
      .map((i) => formData.get(`photo${i}`))
      .filter((f): f is File => f instanceof File && f.size > 0);
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

  // Recompute the promo discount server-side too — never trust the client's
  // own math. "Free frame" codes only have an effect when a frame was
  // actually added; they're not a general discount.
  const normalizedPromo = (body.promoCode || "").trim().toUpperCase();
  const promoValid = !!(PROMO_CODES[normalizedPromo]?.freeFrame && body.addFrame);

  // Any other code is looked up as a promotion code created in the Stripe
  // dashboard (e.g. "XMAS10" for 10% off) and applied to the session.
  let stripePromo: StripePromo | null = null;
  if (normalizedPromo && !PROMO_CODES[normalizedPromo]) {
    try {
      stripePromo = await findStripePromo(normalizedPromo);
    } catch {
      stripePromo = null;
    }
    // An unknown code is ignored, same as before: the checkout page already
    // told the customer it isn't valid and showed the full price.
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
          name: promoValid
            ? `Frame (${body.displayNames.frameColorLabel}) — free with code ${normalizedPromo}`
            : `Frame (${body.displayNames.frameColorLabel})`,
        },
        unit_amount: promoValid ? 0 : FRAME_PRICE * 100,
      },
      quantity: 1,
    });
  }

  const shippingZone = getShippingZone(body.ship.country);
  const shippingRate = getShippingRate(body.ship.country);
  lineItems.push({
    price_data: {
      currency: CURRENCY,
      product_data: {
        name: `Shipping (${getShippingZoneLabel(shippingZone)})`,
      },
      unit_amount: shippingRate * 100,
    },
    quantity: 1,
  });

  const origin = new URL(request.url).origin;

  const buildSessionParams = (promo: StripePromo | null): Stripe.Checkout.SessionCreateParams => ({
    mode: "payment",
    payment_method_types: ["card", "paypal", "klarna", "eps"],
    // Codes are entered on our own checkout page, not in Stripe's box:
    // FRANKFURT is handled above as a free frame, and codes created in the
    // Stripe dashboard are applied here via `discounts`.
    ...(promo ? { discounts: [{ promotion_code: promo.id }] } : { allow_promotion_codes: false }),
    line_items: lineItems,
    customer_email: body.ship.email,
    success_url: `${origin}/checkout?stripe=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?stripe=cancel`,
    metadata: {
      customerName: body.ship.name,
      shippingAddress: `${body.ship.address}, ${body.ship.city} ${body.ship.postal}, ${getCountryLabel(body.ship.country)}`,
      artistNotes: body.artistNotes || "",
      collection: body.collectionKey,
      type: body.typeKey,
      size: size.label,
      frame: body.addFrame ? body.displayNames.frameColorLabel : "none",
      promoCode: promoValid ? normalizedPromo : promo ? promo.code : "none",
    },
  });

  try {
    const stripe = getStripe();
    let appliedStripePromo = stripePromo;
    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.create(buildSessionParams(appliedStripePromo));
    } catch (err) {
      // Stripe can still refuse a code here (e.g. a minimum order amount or
      // "first order only" rule). Don't lose the sale over it: start checkout
      // at full price; Stripe's page shows the customer the real total.
      if (!appliedStripePromo) throw err;
      console.error("Stripe refused promotion code, continuing without it:", err);
      appliedStripePromo = null;
      session = await stripe.checkout.sessions.create(buildSessionParams(null));
    }
    const appliedPromo = promoValid ? normalizedPromo : appliedStripePromo ? appliedStripePromo.code : null;

    // Best-effort: record the order + upload photos to our own backend so the
    // owner can browse order history and uploaded pet photos later. None of
    // this can block or fail the checkout — Stripe already has the session.
    try {
      const supabase = getSupabaseAdmin();

      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .upsert({ email: body.ship.email, name: body.ship.name }, { onConflict: "email" })
        .select("id")
        .single();
      if (customerError) throw customerError;

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: customer.id,
          stripe_session_id: session.id,
          status: "pending",
          collection_key: body.collectionKey,
          type_key: body.typeKey,
          size_label: size.label,
          frame_color: body.addFrame ? body.displayNames.frameColorLabel : null,
          artist_notes: body.artistNotes || null,
          shipping_name: body.ship.name,
          shipping_address: body.ship.address,
          shipping_city: body.ship.city,
          shipping_postal: body.ship.postal,
          shipping_country: getCountryLabel(body.ship.country),
          amount_total:
            session.amount_total ?? lineItems.reduce((sum, item) => sum + (item.price_data?.unit_amount ?? 0), 0),
          currency: CURRENCY,
          promo_code: appliedPromo,
          lang: body.lang === "de" ? "de" : "en",
        })
        .select("id")
        .single();
      if (orderError) throw orderError;

      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const safeName = photo.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `orders/${order.id}/${i}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from(ORDER_PHOTOS_BUCKET)
          .upload(path, photo, { contentType: photo.type || "application/octet-stream" });
        if (uploadError) throw uploadError;

        const { error: photoRowError } = await supabase
          .from("order_photos")
          .insert({ order_id: order.id, storage_path: path });
        if (photoRowError) throw photoRowError;
      }
    } catch (err) {
      console.error("Failed to record order in Supabase:", err);
    }

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
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unable to verify payment." },
      { status: 500 },
    );
  }
}
