// Sends the shop's automatic emails from the official Fuzzy Berry mailbox.
//
// Nothing is sent until the mailbox password is set, so the site works exactly as
// before until the email is switched on.
//
// Environment variables (Gmail, the default):
//   GMAIL_APP_PASSWORD   16-character "app password" of the official Gmail account (required)
//   GMAIL_USER           the mailbox the emails come from (default: the shop's contact address)
//   ORDER_NOTIFY_EMAIL   who gets the "new order" notification (default: the same mailbox)
//
// Optional alternative, for sending from a own-domain address instead (e.g. orders@fuzzyberry.de):
//   RESEND_API_KEY + EMAIL_FROM   used only when GMAIL_APP_PASSWORD is not set

import nodemailer from "nodemailer";

export const SHOP_EMAIL = "fuzzyberry.official@gmail.com";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.fuzzyberry.de").replace(/\/$/, "");
const BRAND = "Fuzzy Berry";

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  // Used by the Resend route; Resend ignores a repeat request with the same key.
  idempotencyKey: string;
}

export function isEmailConfigured(): boolean {
  return !!(process.env.GMAIL_APP_PASSWORD || process.env.RESEND_API_KEY);
}

export function senderAddress(): string {
  return process.env.GMAIL_USER || SHOP_EMAIL;
}

export function notifyAddress(): string {
  return process.env.ORDER_NOTIFY_EMAIL || senderAddress();
}

export function replyToAddress(): string {
  return senderAddress();
}

async function sendViaGmail(msg: EmailMessage, subject: string): Promise<void> {
  const user = senderAddress();
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass: (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s+/g, "") },
  });
  await transport.sendMail({
    from: { name: BRAND, address: user },
    to: msg.to,
    replyTo: msg.replyTo,
    subject,
    html: msg.html,
    text: msg.text,
  });
}

async function sendViaResend(msg: EmailMessage, subject: string): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": msg.idempotencyKey,
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || `${BRAND} <orders@fuzzyberry.de>`,
      to: [msg.to],
      subject,
      html: msg.html,
      text: msg.text,
      ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend answered ${res.status}: ${detail.slice(0, 300)}`);
  }
}

export async function sendEmail(msg: EmailMessage): Promise<{ sent: boolean; reason?: string }> {
  if (!isEmailConfigured()) return { sent: false, reason: "email is not configured" };

  // A subject must be a single line, whatever a customer typed into their name.
  const subject = msg.subject.replace(/[\r\n]+/g, " ").trim();

  try {
    if (process.env.GMAIL_APP_PASSWORD) await sendViaGmail(msg, subject);
    else await sendViaResend(msg, subject);
    return { sent: true };
  } catch (err) {
    console.error(`Email "${subject}" was not sent:`, err instanceof Error ? err.message : err);
    return { sent: false, reason: "send failed" };
  }
}
