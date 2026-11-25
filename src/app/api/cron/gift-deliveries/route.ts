import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import { ensureVoucher } from "@/lib/giftVoucher";
import { berlinToday, emailGiftToRecipient, scrubRecipientData } from "@/lib/giftDelivery";
import { alreadySent, markSent } from "@/lib/email/dispatch";
import { isEmailConfigured } from "@/lib/email/send";

// Runs every morning (see vercel.json; 06:00 UTC, so about 07:00-08:00 in Germany)
// and emails every gift whose chosen day has arrived. Vercel calls it with
// "Authorization: Bearer <CRON_SECRET>"; anyone else gets a 401.

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_ATTEMPTS = 10;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isEmailConfigured()) {
    return NextResponse.json({ sent: 0, note: "Email is not set up yet." });
  }

  const supabase = getSupabaseAdmin();
  const today = berlinToday();
  const { data: due, error } = await supabase
    .from("gift_deliveries")
    .select("id, stripe_session_id, attempts")
    .is("sent_at", null)
    .lte("send_on", today)
    .lt("attempts", MAX_ATTEMPTS)
    .order("send_on", { ascending: true })
    .limit(40);
  if (error) {
    console.error("Gift deliveries: couldn't read the list:", error.message);
    return NextResponse.json({ error: "Couldn't read scheduled gifts." }, { status: 500 });
  }

  let sent = 0;
  let failed = 0;
  for (const row of due ?? []) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(row.stripe_session_id);
      const voucher = await ensureVoucher(session);
      if (!voucher) throw new Error("Not a paid gift voucher.");

      // Already emailed (for example by an earlier run that crashed before saving): just record it.
      const already = await alreadySent(session.id, "fb_gift_recipient_email");
      const ok = already || (await emailGiftToRecipient(session, voucher));
      if (!ok) throw new Error("The email could not be sent.");

      if (!already) await markSent(session.id, "fb_gift_recipient_email");
      // Sent: keep the record that it happened, drop the recipient's personal details.
      await supabase
        .from("gift_deliveries")
        .update({ sent_at: new Date().toISOString(), last_error: null, recipient_email: "", recipient_name: "", message: "" })
        .eq("id", row.id);
      await scrubRecipientData(session);
      sent++;
    } catch (err) {
      failed++;
      const message = err instanceof Error ? err.message : String(err);
      console.error("Gift delivery failed:", row.stripe_session_id, message);
      await supabase
        .from("gift_deliveries")
        .update({ attempts: row.attempts + 1, last_error: message.slice(0, 300) })
        .eq("id", row.id);
    }
  }

  return NextResponse.json({ day: today, due: due?.length ?? 0, sent, failed });
}
