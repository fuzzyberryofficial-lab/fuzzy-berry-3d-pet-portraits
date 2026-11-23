import type { Metadata } from "next";
import GiftCardPage from "@/components/giftcard/GiftCardPage";

export const metadata: Metadata = {
  title: "Geschenkkarte | Gift Card",
  description:
    "Eine FuzzyBerry Geschenkkarte für ein handgemaltes 3D-Haustierporträt verschenken: €50, €100 oder ein ganzes Porträt. A gift card for a hand-painted 3D pet portrait.",
  alternates: { canonical: "/gift-card" },
};

export default function Page() {
  return <GiftCardPage />;
}
