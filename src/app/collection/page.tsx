import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Single and multi pet portraits hand-painted on layered acrylic: 20×20 cm from €179, two pets from €279. All sizes, prices and frame options.",
  alternates: langAlternates("/collection", "en"),
};

export default function Page() {
  return <CollectionPage />;
}
