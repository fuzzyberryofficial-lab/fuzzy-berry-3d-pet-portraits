import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Die Geschichte hinter FuzzyBerry: wie aus der Liebe zu Coco handgemalte 3D-Haustierporträts auf Acryl wurden. The story behind FuzzyBerry.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
