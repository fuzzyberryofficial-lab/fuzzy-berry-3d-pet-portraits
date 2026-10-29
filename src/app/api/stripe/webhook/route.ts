import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getCountryLabel } from "@/components/checkout/countries";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 500 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Invalid signature." },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const supabase = getSupabaseAdmin();
      // The customer enters (or Apple Pay fillss in) name and
      // address on Stripe's page, so copy them onto the order here.
      const shipping = session.collected_information?.shipping_details;
      const name = shipping?.name || session.customer_details?.name || "";
      const address = shipping?.address;
      const { data: order, error } = await supabase
        .from("orders")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          ...(address
            ? {
                shipping_name: name,
                shipping_address: [address.line1, address.line2].filter(Boolean).join(", "),
                shipping_city: address.city ?? "",
                shipping_postal: address.postal_code ?? "",
                shipping_country: address.country ? getCountryLabel(address.country) : "",
              }
            : {}),
        })
        .eq("stripe_session_id", session.id)
        .select("customer_id")
        .maybeSingle();
      if (error) {
        console.error("Failed to mark order paid:", error.message);
      }
      if (order?.customer_id && name) {
        const { error: nameError } = await supabase.from("customers").update({ name }).eq("id", order.customer_id);
        if (nameError) console.error("Failed to save customer name:", nameError.message);
      }
    } catch (err) {
      console.error("Webhook order update failed:", err);
    }
  }

  return NextResponse.json({ received: true });
}
