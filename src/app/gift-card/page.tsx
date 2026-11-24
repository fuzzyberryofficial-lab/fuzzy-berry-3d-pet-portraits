import type { Metadata } from "next";
import GiftCardPage from "@/components/gift/GiftCardPage";

export const metadata: Metadata = {
  title: "Gift Voucher · Geschenkgutschein",
  description:
    "Give a hand-painted 3D pet portrait. Fuzzy Berry gift vouchers are ready the moment you pay and valid for 1 year. / Verschenken Sie ein handgemaltes 3D-Haustierporträt: Geschenkgutscheine sind sofort nach der Zahlung bereit und 1 Jahr gültig.",
  alternates: { canonical: "/gift-card" },
};

export default function Page() {
  return <GiftCardPage />;
}
