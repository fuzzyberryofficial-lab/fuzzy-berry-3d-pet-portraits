import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import GiftCardPage from "@/components/gift/GiftCardPage";

export const metadata: Metadata = {
  title: "Geschenkgutschein",
  description:
    "Verschenken Sie ein handgemaltes 3D-Haustierporträt: Gutscheine ab €25, sofort nach der Zahlung bereit, per E-Mail zum Wunschtermin, 3 Jahre gültig.",
  alternates: langAlternates("/gift-card", "de"),
};

export default function Page() {
  return <GiftCardPage />;
}
