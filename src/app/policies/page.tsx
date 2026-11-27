import type { Metadata } from "next";
import PoliciesPage from "@/components/policies/PoliciesPage";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Datenschutz und Rückgabe bei FuzzyBerry: wie wir Ihre Fotos und Daten schützen und was bei individuell gemalten Porträts gilt. Privacy & return policy.",
  alternates: { canonical: "/policies" },
};

export default function Page() {
  return <PoliciesPage />;
}
