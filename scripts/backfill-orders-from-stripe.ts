// One-off script: import historical Stripe Checkout Sessions (placed before
// the admin backend existed) into Supabase so they show up in /admin.
// Photos can't be recovered for these orders — they were never uploaded
// anywhere before this feature existed.
//
// Run once with:
//   npx tsx --env-file=.env.local scripts/backfill-orders-from-stripe.ts
//
// Safe to re-run: orders are skipped if their stripe_session_id already exists.

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!stripeKey || !supabaseUrl || !supabaseKey) {
  console.error("Missing STRIPE_SECRET_KEY, SUPABASE_URL, or SUPABASE_SERVICE_ROLE_KEY in the environment.");
  process.exit(1);
}

const stripe = new Stripe(stripeKey);
const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

async function main() {
  let imported = 0;
  let skipped = 0;
  let failed = 0;
  let startingAfter: string | undefined;

  for (;;) {
    const page = await stripe.checkout.sessions.list({ limit: 100, starting_after: startingAfter });

    for (const session of page.data) {
      if (session.payment_status !== "paid") continue;

      const { data: existing } = await supabase
        .from("orders")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();
      if (existing) {
        skipped++;
        continue;
      }

      const email = session.customer_details?.email ?? session.customer_email;
      const meta = session.metadata ?? {};
      if (!email || !meta.customerName) {
        skipped++;
        continue;
      }

      try {
        const { data: customer, error: customerError } = await supabase
          .from("customers")
          .upsert({ email, name: meta.customerName }, { onConflict: "email" })
          .select("id")
          .single();
        if (customerError) throw customerError;

        const [addressLine, cityPostalCountry] = (meta.shippingAddress ?? "").split(",").map((s) => s.trim());

        const { error: orderError } = await supabase.from("orders").insert({
          customer_id: customer.id,
          stripe_session_id: session.id,
          status: "paid",
          collection_key: meta.collection ?? "unknown",
          type_key: meta.type ?? "unknown",
          size_label: meta.size ?? "unknown",
          frame_color: meta.frame && meta.frame !== "none" ? meta.frame : null,
          artist_notes: meta.artistNotes || null,
          shipping_name: meta.customerName,
          shipping_address: addressLine ?? "",
          shipping_city: cityPostalCountry ?? "",
          shipping_postal: "",
          shipping_country: "",
          amount_total: session.amount_total ?? 0,
          currency: session.currency ?? "eur",
          created_at: new Date(session.created * 1000).toISOString(),
          paid_at: new Date(session.created * 1000).toISOString(),
        });
        if (orderError) throw orderError;

        imported++;
      } catch (err) {
        console.error(`Failed to import session ${session.id}:`, err);
        failed++;
      }
    }

    if (!page.has_more) break;
    startingAfter = page.data[page.data.length - 1].id;
  }

  console.log(`Backfilled ${imported} orders, 0 photos — photos were never captured for orders placed before this feature existed.`);
  console.log(`Skipped: ${skipped} (already imported or missing data). Failed: ${failed}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
