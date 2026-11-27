import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import FaqsPage from "@/components/faqs/FaqsPage";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description:
    "Häufige Fragen zu FuzzyBerry: Wie entsteht das 3D-Porträt, welches Foto passt, Lieferzeit, kostenloser Versand, Geschenke und Pflege.",
  alternates: langAlternates("/faqs", "de"),
};

export default function Page() {
  return <FaqsPage />;
}
