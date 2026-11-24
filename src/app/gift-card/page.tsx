import type { Metadata } from "next";
import GiftCardPage from "@/components/gift/GiftCardPage";

export const metadata: Metadata = {
  title: "Gift Voucher · Geschenkgutschein",
  description:
    "Give a hand-painted 3D pet portrait. Fuzzy Berry gift vouchers arrive by email and are valid for 3 years. / Verschenke ein handgemaltes 3D-Haustierporträt: Geschenkgutscheine kommen per E-Mail und sind 3 Jahre gültig.",
  alternates: { canonical: "/gift-card" },
};

export default function Page() {
  return <GiftCardPage />;
}
