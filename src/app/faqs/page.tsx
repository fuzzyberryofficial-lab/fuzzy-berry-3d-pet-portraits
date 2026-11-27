import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import FaqsPage from "@/components/faqs/FaqsPage";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers about FuzzyBerry portraits: how the 3D layers are painted, which photo works, delivery time, free shipping, gifting and care.",
  alternates: langAlternates("/faqs", "en"),
};

export default function Page() {
  return <FaqsPage />;
}
