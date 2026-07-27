import type { Metadata } from "next";
import PoliciesPage from "@/components/policies/PoliciesPage";

export const metadata: Metadata = {
  title: "Policies — Fuzzy Berry",
};

export default function Page() {
  return <PoliciesPage />;
}
