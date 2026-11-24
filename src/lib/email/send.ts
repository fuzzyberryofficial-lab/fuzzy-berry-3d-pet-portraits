// Sends transactional email through Resend's HTTP API (no extra package needed).
// Nothing is sent until RESEND_API_KEY is set, so the site works exactly as before
// until the email service is switched on.
//
// Environment variables:
//   RESEND_API_KEY       API key from resend.com (required to send anything)
//   EMAIL_FROM           e.g. "Fuzzy Berry <orders@fuzzyberry.de>"; the domain must be verified in Resend
//   EMAIL_REPLY_TO       where customer replies go (default: the shop's contact address)
//   ORDER_NOTIFY_EMAIL   who gets the "new order" notification (default: the shop's contact address)

export const SHOP_EMAIL = "fuzzyberry.official@gmail.com";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.fuzzyberry.de").replace(/\/$/, "");

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  // Resend ignores a second request with the same key for 24 hours, so a retried
  // webhook can never send the same email twice.
  idempotencyKey: string;
}

export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

export function notifyAddress(): string {
  return process.env.ORDER_NOTIFY_EMAIL || SHOP_EMAIL;
}

export function replyToAddress(): string {
  return process.env.EMAIL_REPLY_TO || SHOP_EMAIL;
}

export async function sendEmail(msg: EmailMessage): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY is not set" };

  const from = process.env.EMAIL_FROM || "Fuzzy Berry <orders@fuzzyberry.de>";
  // A subject must be a single line, whatever a customer typed into their name.
  const subject = msg.subject.replace(/[\r\n]+/g, " ").trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": msg.idempotencyKey,
      },
      body: JSON.stringify({
        from,
        to: [msg.to],
        subject,
        html: msg.html,
        text: msg.text,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`Email "${subject}" was not sent (${res.status}):`, detail.slice(0, 300));
      return { sent: false, reason: `Resend answered ${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error(`Email "${subject}" failed:`, err);
    return { sent: false, reason: "network error" };
  }
}
