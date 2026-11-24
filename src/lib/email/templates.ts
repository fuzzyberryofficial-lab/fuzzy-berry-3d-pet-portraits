import {
  button,
  esc,
  escMultiline,
  formatDate,
  formatYmd,
  heading,
  money,
  panel,
  paragraph,
  rows,
  shell,
  steps,
  subheading,
  type Lang,
} from "./layout";
import { SHOP_EMAIL, SITE_URL } from "./send";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export interface OrderEmailData {
  orderId: string;
  lang: Lang;
  customerName: string;
  customerEmail: string;
  // Line items as shown on the Stripe receipt (portrait, frame, shipping), in cents.
  items: { name: string; cents: number }[];
  discountCents: number;
  promoCode: string | null;
  totalCents: number;
  currency: string;
  shipping: { name: string; address: string; city: string; postal: string; country: string };
  artistNotes: string;
  photoCount: number;
}

export interface VoucherEmailData {
  lang: Lang;
  buyerName: string;
  code: string;
  amountEur: number;
  recipientName: string;
  senderName: string;
  message: string;
  // Unix seconds.
  expiresAt: number;
  giftUrl: string;
  // Set when the buyer asked us to email the gift to the recipient.
  delivery?: { to: string; sendOn: string };
}

export interface GiftRecipientEmailData {
  lang: Lang;
  recipientName: string;
  senderName: string;
  message: string;
  giftUrl: string;
}

// Turns text that was escaped for HTML back into plain text for the text-only version.
function plain(s: string): string {
  return s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] || "";
}

function addressLines(s: OrderEmailData["shipping"]): string[] {
  return [s.name, s.address, [s.postal, s.city].filter(Boolean).join(" "), s.country].filter((l) => l && l.trim());
}

function itemRows(d: OrderEmailData, lang: Lang) {
  const list: { label: string; value: string; bold?: boolean; muted?: boolean }[] = d.items.map((i) => ({
    label: esc(i.name),
    value: money(i.cents, d.currency, lang),
  }));
  if (d.discountCents > 0) {
    const label =
      lang === "de"
        ? `Rabatt${d.promoCode ? ` (${esc(d.promoCode)})` : ""}`
        : `Discount${d.promoCode ? ` (${esc(d.promoCode)})` : ""}`;
    list.push({ label, value: `−${money(d.discountCents, d.currency, lang)}` });
  }
  list.push({ label: lang === "de" ? "Gesamt bezahlt" : "Total paid", value: money(d.totalCents, d.currency, lang), bold: true });
  return rows(list);
}

function itemText(d: OrderEmailData, lang: Lang): string {
  const lines = d.items.map((i) => `  ${i.name}: ${money(i.cents, d.currency, lang)}`);
  if (d.discountCents > 0) {
    lines.push(
      `  ${lang === "de" ? "Rabatt" : "Discount"}${d.promoCode ? ` (${d.promoCode})` : ""}: -${money(d.discountCents, d.currency, lang)}`,
    );
  }
  lines.push(`  ${lang === "de" ? "Gesamt bezahlt" : "Total paid"}: ${money(d.totalCents, d.currency, lang)}`);
  return lines.join("\n");
}

// ─── To the customer: order confirmation ───────────────────────────────────

export function customerOrderEmail(d: OrderEmailData): RenderedEmail {
  const de = d.lang === "de";
  const first = firstName(d.customerName);
  const addr = addressLines(d.shipping);

  const t = de
    ? {
        subject: "Ihre Bestellung bei Fuzzy Berry ist bestätigt",
        preheader: "Vielen Dank! Hier sind Ihre Bestellung und die nächsten Schritte.",
        hello: first ? `Vielen Dank, ${esc(first)}!` : "Vielen Dank!",
        intro:
          "Ihre Bestellung ist bei uns eingegangen und bezahlt. Wir freuen uns sehr darauf, Ihr Tier als handgemaltes 3D-Porträt zu verewigen.",
        order: "Ihre Bestellung",
        next: "So geht es weiter",
        step1: ["Foto abstimmen", "Wir melden uns persönlich bei Ihnen, um das Foto zu besprechen, bevor unser Künstler beginnt."],
        step2: ["Handmalerei", "Ihr Porträt wird Schicht für Schicht von Hand gemalt. Das dauert 2–3 Wochen."],
        step3: ["Versand", "Danach verpacken wir es sorgfältig und senden es an Ihre Lieferadresse."],
        deliverTo: "Lieferadresse",
        notes: "Ihre Hinweise an den Künstler",
        noPhoto:
          "Wir haben bisher kein Foto von Ihnen erhalten. Bitte antworten Sie einfach auf diese E-Mail und senden Sie uns ein oder mehrere Fotos.",
        questions: "Haben Sie Fragen oder möchten Sie etwas ändern? Antworten Sie einfach auf diese E-Mail.",
        receipt: "Die Zahlungsquittung von Stripe erhalten Sie separat.",
        ref: "Bestellnummer",
      }
    : {
        subject: "Your Fuzzy Berry order is confirmed",
        preheader: "Thank you! Here is your order and what happens next.",
        hello: first ? `Thank you, ${esc(first)}!` : "Thank you!",
        intro:
          "Your order has been received and paid. We can't wait to turn your pet into a hand-painted 3D portrait.",
        order: "Your order",
        next: "What happens next",
        step1: ["Photo check", "We'll reach out to you personally to confirm your photo before our artist begins."],
        step2: ["Hand-painting", "Your portrait is painted by hand, layer by layer. This takes 2–3 weeks."],
        step3: ["Shipping", "Then we pack it carefully and send it to your delivery address."],
        deliverTo: "Delivery address",
        notes: "Your notes for the artist",
        noPhoto:
          "We haven't received a photo from you yet. Please just reply to this email and send us one or more photos.",
        questions: "Questions, or something to change? Just reply to this email.",
        receipt: "Your payment receipt from Stripe arrives separately.",
        ref: "Order number",
      };

  const body = [
    heading(t.hello),
    paragraph(t.intro),
    subheading(t.order),
    itemRows(d, d.lang),
    subheading(t.next),
    steps([
      { title: esc(t.step1[0]), body: esc(t.step1[1]) },
      { title: esc(t.step2[0]), body: esc(t.step2[1]) },
      { title: esc(t.step3[0]), body: esc(t.step3[1]) },
    ]),
    d.photoCount === 0 ? panel(esc(t.noPhoto)) : "",
    addr.length ? subheading(t.deliverTo) + paragraph(addr.map(esc).join("<br>")) : "",
    d.artistNotes.trim() ? subheading(t.notes) + panel(escMultiline(d.artistNotes.trim())) : "",
    paragraph(esc(t.questions)),
  ].join("\n");

  const footer = `${esc(t.receipt)}<br>${esc(t.ref)}: ${esc(d.orderId.slice(0, 8).toUpperCase())}<br><a href="${SITE_URL}" style="color:#6f675e;">www.fuzzyberry.de</a> · <a href="mailto:${SHOP_EMAIL}" style="color:#6f675e;">${SHOP_EMAIL}</a>`;

  const text = [
    plain(t.hello),
    "",
    t.intro,
    "",
    t.order.toUpperCase(),
    itemText(d, d.lang),
    "",
    t.next.toUpperCase(),
    `1. ${t.step1[0]}: ${t.step1[1]}`,
    `2. ${t.step2[0]}: ${t.step2[1]}`,
    `3. ${t.step3[0]}: ${t.step3[1]}`,
    ...(d.photoCount === 0 ? ["", t.noPhoto] : []),
    ...(addr.length ? ["", t.deliverTo.toUpperCase(), ...addr] : []),
    ...(d.artistNotes.trim() ? ["", t.notes.toUpperCase(), d.artistNotes.trim()] : []),
    "",
    t.questions,
    "",
    `${t.receipt} (${t.ref}: ${d.orderId.slice(0, 8).toUpperCase()})`,
    `www.fuzzyberry.de · ${SHOP_EMAIL}`,
  ].join("\n");

  return {
    subject: t.subject,
    html: shell({ lang: d.lang, preheader: t.preheader, title: t.subject, body, footer }),
    text,
  };
}

// ─── To the shop: new order notification ───────────────────────────────────

export function ownerOrderEmail(d: OrderEmailData): RenderedEmail {
  const addr = addressLines(d.shipping);
  const total = money(d.totalCents, d.currency, "en");
  const subject = `New order · ${d.customerName || d.customerEmail} · ${total}${d.promoCode ? ` · ${d.promoCode}` : ""}`;
  const adminUrl = `${SITE_URL}/admin/orders/${d.orderId}`;

  const body = [
    heading("New order 🐾"),
    paragraph(
      `<strong>${esc(d.customerName || "(no name yet)")}</strong> just paid <strong>${esc(total)}</strong>. Reply to this email to write to the customer and confirm the photo.`,
    ),
    rows([
      { label: "Customer", value: esc(d.customerName || "—") },
      { label: "Email", value: `<a href="mailto:${esc(d.customerEmail)}" style="color:#3854b8;">${esc(d.customerEmail)}</a>` },
      { label: "Language", value: d.lang === "de" ? "German" : "English" },
      { label: "Promo code", value: d.promoCode ? esc(d.promoCode) : "none" },
      { label: "Photos uploaded", value: d.photoCount > 0 ? String(d.photoCount) : "<strong>none yet</strong>" },
    ]),
    subheading("Order"),
    itemRows({ ...d, currency: d.currency }, "en"),
    addr.length ? subheading("Ship to") + paragraph(addr.map(esc).join("<br>")) : "",
    d.artistNotes.trim() ? subheading("Notes for the artist") + panel(escMultiline(d.artistNotes.trim())) : "",
    `<div style="margin-top:18px;">${button("Open order & photos in admin", adminUrl)}</div>`,
  ].join("\n");

  const text = [
    `New order: ${d.customerName || "(no name yet)"} paid ${total}`,
    "",
    `Email: ${d.customerEmail}`,
    `Language: ${d.lang === "de" ? "German" : "English"}`,
    `Promo code: ${d.promoCode ?? "none"}`,
    `Photos uploaded: ${d.photoCount}`,
    "",
    itemText(d, "en"),
    ...(addr.length ? ["", "Ship to:", ...addr] : []),
    ...(d.artistNotes.trim() ? ["", "Notes for the artist:", d.artistNotes.trim()] : []),
    "",
    `Open in admin: ${adminUrl}`,
  ].join("\n");

  return {
    subject,
    html: shell({
      lang: "en",
      preheader: `${d.customerName || d.customerEmail} paid ${total}`,
      title: subject,
      body,
      footer: `Order ${esc(d.orderId.slice(0, 8).toUpperCase())} · sent automatically by the shop website`,
    }),
    text,
  };
}

// ─── To the voucher buyer: the code, kept safe in their inbox ──────────────

export function voucherEmail(d: VoucherEmailData): RenderedEmail {
  const de = d.lang === "de";
  const amount = money(d.amountEur * 100, "eur", d.lang);
  const until = formatDate(d.expiresAt, d.lang);

  const t = de
    ? {
        subject: "Ihr Fuzzy Berry Geschenkgutschein",
        preheader: `Ihr Gutschein-Code über ${amount} – sicher aufbewahrt.`,
        hello: d.buyerName ? `Vielen Dank, ${esc(firstName(d.buyerName))}!` : "Vielen Dank!",
        intro: "Ihr Geschenkgutschein ist bereit. Bewahren Sie diese E-Mail gut auf: Hier finden Sie Ihren Code jederzeit wieder.",
        codeLabel: "Gutschein-Code",
        valid: `Gültig bis ${until}`,
        forLine: d.recipientName ? `Für ${esc(d.recipientName)}` : "",
        fromLine: d.senderName ? `Von ${esc(d.senderName)}` : "",
        share: "Verschenken",
        shareBody:
          "Schicken Sie der beschenkten Person diesen Link. Beim Öffnen erlebt sie die Überraschung mit der Geschenkbox und sieht den Code.",
        open: "Geschenk öffnen",
        redeem: "So wird er eingelöst",
        redeemBody: "Im Checkout im Feld „Rabattcode“ eingeben – in einer Bestellung, für jedes Porträt und jede Größe.",
        questions: "Fragen? Antworten Sie einfach auf diese E-Mail.",
        deliveryNow: (to: string) => `Wir haben das Geschenk soeben an ${esc(to)} geschickt. Sie müssen nichts weiter tun.`,
        deliveryLater: (to: string, day: string) =>
          `Wir schicken das Geschenk am ${esc(day)} an ${esc(to)}. Sie müssen nichts weiter tun. Falls die Adresse nicht stimmt, antworten Sie einfach auf diese E-Mail.`,
      }
    : {
        subject: "Your Fuzzy Berry gift voucher",
        preheader: `Your ${amount} voucher code, kept safe.`,
        hello: d.buyerName ? `Thank you, ${esc(firstName(d.buyerName))}!` : "Thank you!",
        intro: "Your gift voucher is ready. Keep this email safe: it's where you can always find your code again.",
        codeLabel: "Voucher code",
        valid: `Valid until ${until}`,
        forLine: d.recipientName ? `For ${esc(d.recipientName)}` : "",
        fromLine: d.senderName ? `From ${esc(d.senderName)}` : "",
        share: "Give it as a gift",
        shareBody:
          "Send this link to the person you're giving it to. When they open it they get the gift-box surprise and see the code.",
        open: "Open the gift",
        redeem: "How to redeem it",
        redeemBody: "Enter it at checkout in the “Promo code” field, in one order, for any portrait and any size.",
        questions: "Questions? Just reply to this email.",
        deliveryNow: (to: string) => `We've just sent the gift to ${esc(to)}. There's nothing else you need to do.`,
        deliveryLater: (to: string, day: string) =>
          `We'll send the gift to ${esc(to)} on ${esc(day)}. There's nothing else you need to do. If the address is wrong, just reply to this email.`,
      };

  const deliveryNote = d.delivery
    ? d.delivery.sendOn === "now"
      ? t.deliveryNow(d.delivery.to)
      : t.deliveryLater(d.delivery.to, formatYmd(d.delivery.sendOn, d.lang))
    : "";

  const codeBox = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 10px;"><tr><td align="center" style="background:#fff8ec;border:2px dashed #332f2a;border-radius:14px;padding:20px 12px;"><div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6f675e;">${esc(t.codeLabel)}</div><div style="font-family:Georgia,serif;font-size:34px;font-weight:700;color:#332f2a;margin:6px 0 2px;">${esc(amount)}</div><div style="font-family:'SF Mono',Menlo,Consolas,monospace;font-size:22px;font-weight:700;letter-spacing:0.06em;color:#b23b2c;">${esc(d.code)}</div><div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:#6f675e;margin-top:8px;">${esc(t.valid)}</div></td></tr></table>`;

  const personal = [t.forLine, t.fromLine].filter(Boolean).join(" · ");
  const body = [
    heading(t.hello),
    paragraph(esc(t.intro)),
    codeBox,
    personal ? paragraph(personal, true) : "",
    deliveryNote ? panel(deliveryNote) : "",
    d.message.trim() ? panel(`${de ? "„" : "“"}${escMultiline(d.message.trim())}${de ? "“" : "”"}`) : "",
    subheading(t.share),
    paragraph(esc(t.shareBody)),
    button(t.open, d.giftUrl),
    subheading(t.redeem),
    paragraph(esc(t.redeemBody)),
    paragraph(esc(t.questions), true),
  ].join("\n");

  const footer = `<a href="${SITE_URL}" style="color:#6f675e;">www.fuzzyberry.de</a> · <a href="mailto:${SHOP_EMAIL}" style="color:#6f675e;">${SHOP_EMAIL}</a>`;

  const text = [
    plain(t.hello),
    "",
    t.intro,
    "",
    `${t.codeLabel}: ${d.code}`,
    `${amount} · ${t.valid}`,
    ...(personal ? [plain(personal)] : []),
    ...(deliveryNote ? ["", plain(deliveryNote)] : []),
    ...(d.message.trim() ? ["", `${de ? "„" : "“"}${d.message.trim()}${de ? "“" : "”"}`] : []),
    "",
    `${t.share}: ${d.giftUrl}`,
    t.shareBody,
    "",
    `${t.redeem}: ${t.redeemBody}`,
    "",
    `www.fuzzyberry.de · ${SHOP_EMAIL}`,
  ].join("\n");

  return {
    subject: t.subject,
    html: shell({ lang: d.lang, preheader: t.preheader, title: t.subject, body, footer }),
    text,
  };
}

// ─── To the recipient: "someone sent you a gift" (the code stays hidden) ───

export function giftRecipientEmail(d: GiftRecipientEmailData): RenderedEmail {
  const de = d.lang === "de";
  const sender = d.senderName.trim();
  const name = d.recipientName.trim();

  const t = de
    ? {
        subject: sender ? `Ein Geschenk für Sie – von ${sender}` : "Ein Geschenk für Sie",
        preheader: "Öffnen Sie die Box und sehen Sie, was darin steckt.",
        hello: name ? `Hallo ${esc(firstName(name))},` : "Hallo,",
        headline: sender ? `${esc(sender)} hat Ihnen etwas geschenkt` : "Jemand hat Ihnen etwas geschenkt",
        body: "Ein Gutschein für ein handgemaltes 3D-Porträt Ihres Tieres, gemalt von Hand, Schicht für Schicht.",
        open: "Geschenk öffnen",
        hint: "Den Code sehen Sie erst, wenn Sie die Box öffnen.",
        why: `Sie erhalten diese einmalige E-Mail, weil ${sender ? esc(sender) : "jemand"} Ihnen einen Geschenkgutschein von Fuzzy Berry schicken wollte. Ihre Adresse wird nur dafür verwendet.`,
        questions: "Fragen? Antworten Sie einfach auf diese E-Mail.",
      }
    : {
        subject: sender ? `A gift for you, from ${sender}` : "A gift for you",
        preheader: "Open the box and see what's inside.",
        hello: name ? `Hi ${esc(firstName(name))},` : "Hi,",
        headline: sender ? `${esc(sender)} has given you something` : "Someone has given you something",
        body: "A voucher for a hand-painted 3D portrait of your pet, painted by hand, layer by layer.",
        open: "Open the gift",
        hint: "You'll see the code when you open the box.",
        why: `You're getting this one-time email because ${sender ? esc(sender) : "someone"} wanted to send you a Fuzzy Berry gift voucher. Your address is only used for this.`,
        questions: "Questions? Just reply to this email.",
      };

  const quote = de ? ["„", "“"] : ["“", "”"];
  const body = [
    `<div style="text-align:center;font-size:56px;line-height:1;margin:4px 0 10px;">🎁</div>`,
    paragraph(t.hello),
    heading(t.headline),
    paragraph(esc(t.body)),
    d.message.trim() ? panel(`${quote[0]}${escMultiline(d.message.trim())}${quote[1]}`) : "",
    `<div style="margin:18px 0 4px;">${button(t.open, d.giftUrl)}</div>`,
    paragraph(esc(t.hint), true),
    paragraph(esc(t.questions), true),
  ].join("\n");

  const footer = `${t.why}<br><a href="${SITE_URL}" style="color:#6f675e;">www.fuzzyberry.de</a> · <a href="mailto:${SHOP_EMAIL}" style="color:#6f675e;">${SHOP_EMAIL}</a>`;

  const text = [
    plain(t.hello),
    "",
    plain(t.headline),
    t.body,
    ...(d.message.trim() ? ["", `${quote[0]}${d.message.trim()}${quote[1]}`] : []),
    "",
    `${t.open}: ${d.giftUrl}`,
    t.hint,
    "",
    plain(t.why),
    `www.fuzzyberry.de · ${SHOP_EMAIL}`,
  ].join("\n");

  return {
    subject: t.subject,
    html: shell({ lang: d.lang, preheader: t.preheader, title: t.subject, body, footer }),
    text,
  };
}
