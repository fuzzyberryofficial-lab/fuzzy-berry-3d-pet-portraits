import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Collection",
  alternates: { canonical: "/collection" },
};

export default function Page() {
  return <CollectionPage />;
}
