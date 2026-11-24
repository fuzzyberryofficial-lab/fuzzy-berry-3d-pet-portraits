import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GiftOpenPage from "@/components/gift/GiftOpenPage";

// A sample of the gift-box surprise with a made-up voucher, for previewing the
// look without paying. It only exists on preview/local builds, never on the live site.
export const metadata: Metadata = {
  title: "Gift demo",
  robots: { index: false, follow: false },
};

export default function Page() {
  if (process.env.VERCEL_ENV === "production") notFound();
  return <GiftOpenPage demo />;
}
