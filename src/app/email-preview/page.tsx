import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  customerOrderEmail,
  giftRecipientEmail,
  ownerOrderEmail,
  voucherEmail,
  type OrderEmailData,
} from "@/lib/email/templates";

// Shows the shop's automatic emails with made-up data, so they can be reviewed
// without placing an order. Only exists on preview/local builds, never on the live site.
export const metadata: Metadata = {
  title: "Email preview",
  robots: { index: false, follow: false },
};

const SAMPLE_DE: OrderEmailData = {
  orderId: "7f3a91c2-0b5e-4d1a-9e44-2a6c8f10b3d5",
  lang: "de",
  customerName: "Anna Muster",
  customerEmail: "anna@beispiel.de",
  items: [
    { name: "Einzeltier-Porträt — Kopfporträt (20×20 cm)", cents: 17900 },
    { name: "Rahmen (Hellgold)", cents: 2000 },
    { name: "Kostenloser Versand", cents: 0 },
  ],
  discountCents: 1990,
  promoCode: "hundskerle10",
  totalCents: 17910,
  currency: "eur",
  shipping: {
    name: "Anna Muster",
    address: "Leopoldstraße 12, 3. Stock",
    city: "München",
    postal: "80802",
    country: "Deutschland",
  },
  artistNotes: "Coco hat ein kleines weißes Fleckchen am linken Ohr – bitte unbedingt mitmalen!",
  photoCount: 2,
};

const SAMPLE_EN: OrderEmailData = {
  ...SAMPLE_DE,
  lang: "en",
  customerName: "Anna Muster",
  items: [
    { name: "Single Pet Portrait — Head Portrait (20×20 cm)", cents: 17900 },
    { name: "Frame (Light Gold)", cents: 2000 },
    { name: "Free shipping", cents: 0 },
  ],
  artistNotes: "Coco has a tiny white spot on her left ear. Please paint it in!",
};

export default function Page() {
  if (process.env.VERCEL_ENV === "production") notFound();

  const expires = Math.floor(new Date("2029-11-24T12:00:00Z").getTime() / 1000);
  const emails = [
    { id: "customer-de", label: "1 · Customer: order confirmation (German)", to: "To: anna@beispiel.de", mail: customerOrderEmail(SAMPLE_DE) },
    { id: "customer-en", label: "2 · Customer: order confirmation (English)", to: "To: anna@beispiel.de", mail: customerOrderEmail(SAMPLE_EN) },
    { id: "owner", label: "3 · Shop: new order notification", to: "To: you (ORDER_NOTIFY_EMAIL)", mail: ownerOrderEmail(SAMPLE_DE) },
    {
      id: "voucher-de",
      label: "4 · Voucher buyer: code by email, gift goes out on a chosen day (German)",
      to: "To: the buyer",
      mail: voucherEmail({
        lang: "de",
        buyerName: "Anna Muster",
        code: "FB-DEMO-00000",
        amountEur: 100,
        recipientName: "Lena",
        senderName: "Anna",
        message: "Frohe Weihnachten! 🎄",
        expiresAt: expires,
        giftUrl: "https://www.fuzzyberry.de/gift-card/gift?id=cs_demo",
        delivery: { to: "lena@beispiel.de", sendOn: "2026-12-24" },
      }),
    },
    {
      id: "recipient-de",
      label: "5 · Recipient: \"a gift for you\" (German, code stays hidden)",
      to: "To: lena@beispiel.de",
      mail: giftRecipientEmail({
        lang: "de",
        recipientName: "Lena",
        senderName: "Anna",
        message: "Frohe Weihnachten! 🎄",
        giftUrl: "https://www.fuzzyberry.de/gift-card/gift?id=cs_demo",
      }),
    },
    {
      id: "recipient-en",
      label: "6 · Recipient: \"a gift for you\" (English)",
      to: "To: coco-owner@example.com",
      mail: giftRecipientEmail({
        lang: "en",
        recipientName: "Sam",
        senderName: "Anna",
        message: "Merry Christmas! 🎄",
        giftUrl: "https://www.fuzzyberry.de/gift-card/gift?id=cs_demo",
      }),
    },
  ];

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", background: "#eee9e1", minHeight: "100vh", padding: "24px 16px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 22 }}>Email preview (sample data, nothing is sent)</h1>
      <p style={{ margin: "0 0 24px", color: "#665f55" }}>
        These are the automatic emails. Names, address and amounts below are made up.
      </p>
      <div style={{ display: "grid", gap: 32, maxWidth: 680, margin: "0 auto" }}>
        {emails.map((e) => (
          <section key={e.id} id={e.id}>
            <h2 style={{ margin: "0 0 4px", fontSize: 16 }}>{e.label}</h2>
            <p style={{ margin: "0 0 2px", fontSize: 13, color: "#665f55" }}>
              From: Fuzzy Berry &lt;fuzzyberry.official@gmail.com&gt;
            </p>
            <p style={{ margin: "0 0 2px", fontSize: 13, color: "#665f55" }}>{e.to}</p>
            <p style={{ margin: "0 0 8px", fontSize: 13 }}>
              <strong>Subject:</strong> {e.mail.subject}
            </p>
            <iframe
              title={e.label}
              srcDoc={e.mail.html}
              style={{ width: "100%", height: e.id.startsWith("customer") ? 1500 : 1300, border: "1px solid #d8d0c4", borderRadius: 8, background: "#fff" }}
            />
          </section>
        ))}
      </div>
    </main>
  );
}
