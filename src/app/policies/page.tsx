import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import PoliciesPage from "@/components/policies/PoliciesPage";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "FuzzyBerry privacy and return policy: how we protect your photos and data, and what applies to custom hand-painted portraits.",
  alternates: langAlternates("/policies", "en"),
};

export default function Page() {
  return <PoliciesPage />;
}
