import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import ShowroomPage from "@/components/showroom/ShowroomPage";

export const metadata: Metadata = {
  title: "Showroom Frankfurt",
  description:
    "FuzzyBerry-Porträts live ansehen: unser Showroom-Regal bei 's Fachl in Frankfurt. Adresse und alle Infos für Ihren Besuch.",
  alternates: langAlternates("/showroom", "de"),
};

export default function Page() {
  return <ShowroomPage />;
}
