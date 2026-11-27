import type { Metadata } from "next";
import ShowroomPage from "@/components/showroom/ShowroomPage";

export const metadata: Metadata = {
  title: "Showroom Frankfurt",
  description:
    "FuzzyBerry-Porträts live ansehen: unser Showroom-Regal bei 's Fachl in Frankfurt. Adresse und alle Infos. See our portraits in person.",
  alternates: { canonical: "/showroom" },
};

export default function Page() {
  return <ShowroomPage />;
}
