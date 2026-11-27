import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import GiftCardPage from "@/components/gift/GiftCardPage";

export const metadata: Metadata = {
  title: "Gift Voucher",
  description:
    "Give a hand-painted 3D pet portrait. FuzzyBerry gift vouchers from €25 are ready the moment you pay, can be emailed on a date you choose and are valid for 3 years.",
  alternates: langAlternates("/gift-card", "en"),
};

export default function Page() {
  return <GiftCardPage />;
}
