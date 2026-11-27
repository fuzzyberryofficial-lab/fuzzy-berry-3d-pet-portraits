import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind FuzzyBerry: how love for Coco turned into hand-painted 3D pet portraits on layered acrylic, made one layer at a time.",
  alternates: langAlternates("/about", "en"),
};

export default function Page() {
  return <AboutPage />;
}
