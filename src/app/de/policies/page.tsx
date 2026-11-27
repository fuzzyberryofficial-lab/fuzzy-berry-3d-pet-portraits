import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import PoliciesPage from "@/components/policies/PoliciesPage";

export const metadata: Metadata = {
  title: "Datenschutz & Rückgabe",
  description:
    "Datenschutz und Rückgabe bei FuzzyBerry: wie wir Ihre Fotos und Daten schützen und was bei individuell gemalten Porträts gilt.",
  alternates: langAlternates("/policies", "de"),
};

export default function Page() {
  return <PoliciesPage />;
}
