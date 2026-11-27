import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Einzel- und Mehrtierporträts, handgemalt auf Acryl: 20×20 cm ab €179, zwei Tiere ab €279. Alle Größen und Preise. Single & multi pet portraits.",
  alternates: { canonical: "/collection" },
};

export default function Page() {
  return <CollectionPage />;
}
