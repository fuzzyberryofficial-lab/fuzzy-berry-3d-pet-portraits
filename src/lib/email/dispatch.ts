import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import { COUNTRIES } from "@/components/checkout/countries";
import type { Voucher } from "@/lib/giftVoucher";
import { isEmailConfigured, notifyAddress, replyToAddress, sendEmail, SITE_URL } from "./send";
import { customerOrderEmail, ownerOrderEmail, voucherEmail, type OrderEmailData } from "./templates";

// Stripe re-delivers a webhook when it doesn't get a quick answer, and Gmail has no
// built-in "send once" guard, so each session is stamped once its emails went out.
async function alreadySent(sessionId: string, key: string): Promise<boolean> {
  try {
    const fresh = await getStripe().checkout.sessions.retrieve(sessionId);
    return fresh.metadata?.[key] === "1";
  } catch {
    return false;
  }
}

async function markSent(sessionId: string, key: string): Promise<void> {
  try {
    await getStripe().checkout.sessions.update(sessionId, { metadata: { [key]: "1" } });
  } catch (err) {
    console.error("Couldn't stamp session as emailed:", err instanceof Error ? err.message : err);
  }
}

// Called from the Stripe webhook once a payment is confirmed. Email problems are
// logged and never thrown: a failed email must not make Stripe retry the webhook
// or hold up marking the order paid.

// The order stores the country as an English label; a German email should say "Deutschland".
function countryName(label: string, lang: "en" | "de"): string {
  if (lang !== "de" || !label) return label;
  const code = COUNTRIES.find((c) => c.label === label)?.code;
  if (!code) return label;
  try {
    return new Intl.DisplayNames(["de"], { type: "region" }).of(code) ?? label;
  } catch {
    return label;
  }
}

export async function sendOrderEmails(session: Stripe.Checkout.Session): Promise<void> {
  if (!isEmailConfigured()) {
    console.log("Order emails skipped: no email account is set up.");
    return;
  }

  try {
    if (await alreadySent(session.id, "fb_order_emails")) return;

    const supabase = getSupabaseAdmin();
    const { data: order, error } = await supabase
      .from("orders")
      .select(
        "id, lang, artist_notes, promo_code, shipping_name, shipping_address, shipping_city, shipping_postal, shipping_country, currency, customers(email, name)",
      )
      .eq("stripe_session_id", session.id)
      .maybeSingle();
    if (error || !order) {
      console.error("Order emails: order not found for session", session.id, error?.message);
      return;
    }

    const { count: photoCount } = await supabase
      .from("order_photos")
      .select("id", { count: "exact", head: true })
      .eq("order_id", order.id);

    // The same lines the customer sees on Stripe's page and receipt.
    const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, { limit: 20 });

    const customer = Array.isArray(order.customers) ? order.customers[0] : order.customers;
    const customerEmail = session.customer_details?.email ?? session.customer_email ?? customer?.email ?? "";
    const customerName = order.shipping_name || session.customer_details?.name || customer?.name || "";

    const data: OrderEmailData = {
      orderId: order.id,
      lang: order.lang === "de" ? "de" : "en",
      customerName,
      customerEmail,
      items: lineItems.data.map((li) => ({ name: li.description ?? "", cents: li.amount_subtotal })),
      discountCents: session.total_details?.amount_discount ?? 0,
      promoCode: order.promo_code,
      totalCents: session.amount_total ?? 0,
      currency: order.currency || session.currency || "eur",
      shipping: {
        name: order.shipping_name,
        address: order.shipping_address,
        city: order.shipping_city,
        postal: order.shipping_postal,
        country: countryName(order.shipping_country, order.lang === "de" ? "de" : "en"),
      },
      artistNotes: order.artist_notes ?? "",
      photoCount: photoCount ?? 0,
    };

    const jobs: Promise<{ sent: boolean }>[] = [];

    if (customerEmail) {
      const mail = customerOrderEmail(data);
      jobs.push(
        sendEmail({
          to: customerEmail,
          replyTo: replyToAddress(),
          idempotencyKey: `order-confirmation-${session.id}`,
          ...mail,
        }),
      );
    }

    const owner = ownerOrderEmail(data);
    jobs.push(
      sendEmail({
        to: notifyAddress(),
        // Replying to the notification writes straight to the customer.
        replyTo: customerEmail || undefined,
        idempotencyKey: `order-notification-${session.id}`,
        ...owner,
      }),
    );

    const results = await Promise.all(jobs);
    if (results.some((r) => (r as { sent: boolean }).sent)) await markSent(session.id, "fb_order_emails");
  } catch (err) {
    console.error("Order emails failed:", err);
  }
}

export async function sendVoucherEmail(session: Stripe.Checkout.Session, voucher: Voucher): Promise<void> {
  if (!isEmailConfigured()) {
    console.log("Voucher email skipped: no email account is set up.");
    return;
  }
  const to = session.customer_details?.email ?? session.customer_email ?? "";
  if (!to) return;

  try {
    if (await alreadySent(session.id, "fb_voucher_email")) return;
    const mail = voucherEmail({
      lang: session.metadata?.lang === "de" ? "de" : "en",
      buyerName: session.customer_details?.name ?? "",
      code: voucher.code,
      amountEur: voucher.amountEur,
      recipientName: voucher.recipientName,
      senderName: voucher.senderName,
      message: voucher.message,
      expiresAt: voucher.expiresAt,
      giftUrl: `${SITE_URL}/gift-card/gift?id=${encodeURIComponent(session.id)}`,
    });
    const result = await sendEmail({
      to,
      replyTo: replyToAddress(),
      idempotencyKey: `voucher-${session.id}`,
      ...mail,
    });
    if (result.sent) await markSent(session.id, "fb_voucher_email");
  } catch (err) {
    console.error("Voucher email failed:", err);
  }
}
