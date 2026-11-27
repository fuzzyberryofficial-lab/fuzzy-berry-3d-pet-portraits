import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Die Geschichte hinter FuzzyBerry: wie aus der Liebe zu Coco handgemalte 3D-Haustierporträts auf Acryl wurden, Schicht für Schicht gemalt.",
  alternates: langAlternates("/about", "de"),
};

export default function Page() {
  return <AboutPage />;
}
