// Shared look for the shop's emails. Email clients ignore most modern CSS, so
// this is plain tables with inline styles in the site's colours.

export type Lang = "en" | "de";

export const COLORS = {
  page: "#fbf4ea",
  card: "#ffffff",
  ink: "#332f2a",
  muted: "#6f675e",
  line: "#e9dfd2",
  sun: "#ffe9a3",
  pink: "#ffafc7",
  berry: "#4c6fe0",
  fuzzy: "#2436a3",
  berryRed: "#b23b2c",
  panel: "#fff8ec",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Keeps the customer's line breaks without letting them inject markup.
export function escMultiline(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br>");
}

export function money(cents: number, currency: string, lang: Lang): string {
  return new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IE", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export function formatDate(unixSeconds: number, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(unixSeconds * 1000));
}

// "2026-12-24" -> "24. Dezember 2026" / "24 December 2026" (a calendar day, no time zone shifts).
export function formatYmd(ymd: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${ymd}T12:00:00Z`));
}

export function heading(text: string): string {
  return `<h1 style="margin:0 0 12px;font-family:${SERIF};font-size:28px;line-height:1.2;color:${COLORS.ink};font-weight:700;">${text}</h1>`;
}

export function subheading(text: string): string {
  return `<h2 style="margin:28px 0 10px;font-family:${SERIF};font-size:18px;line-height:1.3;color:${COLORS.ink};font-weight:700;">${text}</h2>`;
}

export function paragraph(html: string, muted = false): string {
  return `<p style="margin:0 0 14px;font-family:${SANS};font-size:15px;line-height:1.6;color:${muted ? COLORS.muted : COLORS.ink};">${html}</p>`;
}

export function button(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 4px;"><tr><td style="background:${COLORS.pink};border-radius:999px;"><a href="${esc(href)}" style="display:inline-block;padding:13px 26px;font-family:${SERIF};font-size:16px;font-weight:700;color:${COLORS.ink};text-decoration:none;">${esc(label)}</a></td></tr></table>`;
}

// A two-column list: label on the left, value on the right.
export function rows(items: { label: string; value: string; bold?: boolean; muted?: boolean }[]): string {
  const body = items
    .map(
      (r) =>
        `<tr><td style="padding:9px 0;border-bottom:1px solid ${COLORS.line};font-family:${SANS};font-size:14px;line-height:1.5;color:${r.muted ? COLORS.muted : COLORS.ink};${r.bold ? "font-weight:700;" : ""}">${r.label}</td><td align="right" style="padding:9px 0 9px 16px;border-bottom:1px solid ${COLORS.line};font-family:${SANS};font-size:14px;line-height:1.5;white-space:nowrap;color:${r.muted ? COLORS.muted : COLORS.ink};${r.bold ? "font-weight:700;" : ""}">${r.value}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}</table>`;
}

export function panel(html: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 14px;"><tr><td style="background:${COLORS.panel};border:1px solid ${COLORS.line};border-radius:12px;padding:14px 16px;font-family:${SANS};font-size:14px;line-height:1.6;color:${COLORS.ink};">${html}</td></tr></table>`;
}

// Numbered "what happens next" steps.
export function steps(items: { title: string; body: string }[]): string {
  const body = items
    .map(
      (s, i) =>
        `<tr><td valign="top" width="34" style="padding:8px 0;"><div style="width:26px;height:26px;border-radius:13px;background:${COLORS.sun};border:1.5px solid ${COLORS.ink};text-align:center;font-family:${SERIF};font-weight:700;font-size:14px;line-height:23px;color:${COLORS.ink};">${i + 1}</div></td><td valign="top" style="padding:8px 0;font-family:${SANS};font-size:14px;line-height:1.55;color:${COLORS.ink};"><strong>${s.title}</strong><br>${s.body}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}</table>`;
}

export function shell(opts: { lang: Lang; preheader: string; title: string; body: string; footer: string }): string {
  const { lang, preheader, title, body, footer } = opts;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${COLORS.page};">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.page};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;background:${COLORS.card};border:1.5px solid ${COLORS.ink};border-radius:18px;overflow:hidden;">
<tr><td align="center" style="background:${COLORS.sun};border-bottom:1.5px solid ${COLORS.ink};padding:20px 24px;font-family:${SERIF};font-size:30px;font-weight:700;line-height:1;"><span style="color:${COLORS.fuzzy};">Fuzzy</span> <span style="color:${COLORS.berryRed};">Berry</span></td></tr>
<tr><td style="padding:28px 28px 8px;">
${body}
</td></tr>
<tr><td style="padding:8px 28px 26px;border-top:1px solid ${COLORS.line};font-family:${SANS};font-size:12px;line-height:1.6;color:${COLORS.muted};">
${footer}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
