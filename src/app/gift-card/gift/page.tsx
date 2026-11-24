import type { Metadata } from "next";
import GiftOpenPage from "@/components/gift/GiftOpenPage";

// What the recipient sees when they open a gift link or scan its QR code.
// Private by design: not indexed, not in the sitemap.
export const metadata: Metadata = {
  title: "A gift for you · Ein Geschenk für Sie",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <GiftOpenPage />;
}
