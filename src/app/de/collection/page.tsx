import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Kollektion & Preise",
  description:
    "Einzel- und Mehrtierporträts, handgemalt auf Acryl: 20×20 cm ab €179, zwei Tiere ab €279. Alle Größen, Preise und Rahmen im Überblick.",
  alternates: langAlternates("/collection", "de"),
};

export default function Page() {
  return <CollectionPage />;
}
