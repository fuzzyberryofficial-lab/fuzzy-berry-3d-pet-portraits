import type { Metadata } from "next";
import FaqsPage from "@/components/faqs/FaqsPage";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Häufige Fragen zu FuzzyBerry: Wie entsteht das 3D-Porträt, welches Foto passt, Lieferzeit, Versand, Geschenke und Pflege. Answers about portraits & shipping.",
  alternates: { canonical: "/faqs" },
};

export default function Page() {
  return <FaqsPage />;
}
