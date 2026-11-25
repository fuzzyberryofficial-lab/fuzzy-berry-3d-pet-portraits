import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { Voucher } from "@/lib/giftVoucher";
import { sendEmail, replyToAddress, isEmailConfigured, SITE_URL } from "@/lib/email/send";
import { giftRecipientEmail } from "@/lib/email/templates";
import { isEmail } from "@/lib/giftDates";

export { addDays, berlinToday, isEmail, isValidSendOn, MAX_DAYS_AHEAD } from "@/lib/giftDates";

// A buyer can enter the recipient's email and choose when the gift should arrive.
// "now": emailed straight after payment. A date: saved in the gift_deliveries table
// and sent by the daily job (/api/cron/gift-deliveries) on the morning of that day.

export interface GiftDelivery {
  to: string;
  // "now" or a calendar day, YYYY-MM-DD (Europe/Berlin).
  sendOn: string;
}

export function deliveryFromMetadata(meta: Stripe.Metadata | null | undefined): GiftDelivery | null {
  const to = meta?.recipient_email?.trim();
  const sendOn = meta?.send_on?.trim();
  if (!to || !sendOn || !isEmail(to)) return null;
  if (sendOn !== "now" && !/^\d{4}-\d{2}-\d{2}$/.test(sendOn)) return null;
  return { to, sendOn };
}

// Sends the "a gift for you" email to the recipient. The code itself is not in the
// email: they see it when they open the gift box on the website.
export async function emailGiftToRecipient(session: Stripe.Checkout.Session, voucher: Voucher): Promise<boolean> {
  const delivery = deliveryFromMetadata(session.metadata);
  if (!delivery || !isEmailConfigured()) return false;

  const mail = giftRecipientEmail({
    lang: session.metadata?.lang === "de" ? "de" : "en",
    recipientName: voucher.recipientName,
    senderName: voucher.senderName,
    message: voucher.message,
    giftUrl: `${SITE_URL}/gift-card/gift?id=${encodeURIComponent(session.id)}`,
  });
  const result = await sendEmail({
    to: delivery.to,
    replyTo: replyToAddress(),
    idempotencyKey: `gift-recipient-${session.id}`,
    ...mail,
  });
  return result.sent;
}

// Remembers a gift to be emailed on `sendOn`. Safe to call twice for the same payment.
export async function saveScheduledGift(session: Stripe.Checkout.Session, sendOn: string): Promise<void> {
  const delivery = deliveryFromMetadata(session.metadata);
  if (!delivery) return;
  const { error } = await getSupabaseAdmin()
    .from("gift_deliveries")
    .upsert(
      {
        stripe_session_id: session.id,
        recipient_email: delivery.to,
        recipient_name: session.metadata?.recipient_name ?? "",
        sender_name: session.metadata?.sender_name ?? "",
        message: session.metadata?.message ?? "",
        lang: session.metadata?.lang === "de" ? "de" : "en",
        send_on: sendOn,
      },
      { onConflict: "stripe_session_id", ignoreDuplicates: true },
    );
  if (error) throw new Error(`Couldn't save scheduled gift: ${error.message}`);
}

// Once the gift email is out, the recipient's address is no longer needed: remove it
// from the Stripe payment records (a blank value unsets a metadata key) and keep only
// the "already sent" mark, so a retried webhook or job can't send it a second time.
export async function scrubRecipientData(session: Stripe.Checkout.Session): Promise<void> {
  const blank = { recipient_email: "", recipient_name: "" };
  try {
    const stripe = getStripe();
    await stripe.checkout.sessions.update(session.id, { metadata: blank });
    const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
    if (paymentIntent) await stripe.paymentIntents.update(paymentIntent, { metadata: blank });
  } catch (err) {
    console.error("Couldn't remove the recipient's address from Stripe:", err instanceof Error ? err.message : err);
  }
}
