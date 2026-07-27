import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Collection — Fuzzy Berry",
};

export default function Page() {
  return <CollectionPage />;
}
