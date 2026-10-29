import { after, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { findStripePromo, type StripePromo } from "@/lib/stripePromo";
import { getSupabaseAdmin, ORDER_PHOTOS_BUCKET } from "@/lib/supabase";
import { COLLECTIONS_BASE, PROMO_CODES, type CollectionKey } from "@/components/checkout/catalog";
import { COUNTRIES, getShippingRate, getShippingZone, getShippingZoneLabel } from "@/components/checkout/countries";

const FRAME_PRICE = 20;

type AllowedCountry = Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry;
// Countries Stripe Checkout can collect a shipping address for (it rejects a
// few, e.g. sanctioned ones), limited to the ones we ship to.
const STRIPE_SHIPPING_COUNTRIES = new Set<string>(
  "AC AD AE AF AG AI AL AM AO AQ AR AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CD CF CG CH CI CK CL CM CN CO CR CV CW CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HN HR HT HU ID IE IL IM IN IO IQ IS IT JE JM JO JP KE KG KH KI KM KN KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MK ML MM MN MO MQ MR MS MT MU MV MW MX MY MZ NA NC NE NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SZ TA TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VG VN VU WF WS XK YE YT ZA ZM ZW".split(" "),
);
const SHIPPING_COUNTRIES = COUNTRIES.map((c) => c.code).filter((code): code is AllowedCountry =>
  STRIPE_SHIPPING_COUNTRIES.has(code),
);
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
  // Name and address are collected on Stripe's page (Apple Pay
  // fill them in); we only need the email up front.
  const email = (body.ship?.email || "").trim();
  if (!email) {
    return NextResponse.json({ error: "Missing email." }, { status: 400 });
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

  const shippingCountry = body.ship.country || "";
  const shippingZone = getShippingZone(shippingCountry);
  const shippingRate = getShippingRate(shippingCountry);
  lineItems.push({
    price_data: {
      currency: CURRENCY,
      product_data: {
        name:
          shippingRate === 0
            ? body.lang === "de"
              ? "Kostenloser Versand"
              : "Free shipping"
            : `Shipping (${getShippingZoneLabel(shippingZone)})`,
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
    customer_email: email,
    shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
    success_url: `${origin}/checkout?stripe=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?stripe=cancel`,
    metadata: {
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
    // It runs after the response so the customer goes straight to Stripe.
    after(async () => {
      try {
        const supabase = getSupabaseAdmin();

        // The name comes later from Stripe (see the webhook), so don't
        // overwrite a returning customer's name with an empty one here.
        const { data: existing, error: findError } = await supabase
          .from("customers")
          .select("id")
          .eq("email", email)
          .maybeSingle();
        if (findError) throw findError;
        let customer = existing;
        if (!customer) {
          const { data: created, error: customerError } = await supabase
            .from("customers")
            .insert({ email, name: "" })
            .select("id")
            .single();
          if (customerError) throw customerError;
          customer = created;
        }

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
            // Filled in by the Stripe webhook once the customer has paid.
            shipping_name: "",
            shipping_address: "",
            shipping_city: "",
            shipping_postal: "",
            shipping_country: "",
            amount_total:
              session.amount_total ?? lineItems.reduce((sum, item) => sum + (item.price_data?.unit_amount ?? 0), 0),
            currency: CURRENCY,
            promo_code: appliedPromo,
            lang: body.lang === "de" ? "de" : "en",
          })
          .select("id")
          .single();
        if (orderError) throw orderError;

        await Promise.all(
          photos.map(async (photo, i) => {
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
          }),
        );
      } catch (err) {
        console.error("Failed to record order in Supabase:", err);
      }
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
