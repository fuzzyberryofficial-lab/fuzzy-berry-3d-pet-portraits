import type { Metadata } from "next";
import FaqsPage from "@/components/faqs/FaqsPage";

export const metadata: Metadata = {
  title: "FAQs",
  alternates: { canonical: "/faqs" },
};

export default function Page() {
  return <FaqsPage />;
}
