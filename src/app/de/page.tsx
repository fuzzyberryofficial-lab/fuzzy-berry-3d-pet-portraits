import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import HomePage from "@/components/home/HomePage";
import { getInstagramPosts } from "@/lib/adminData";

export const metadata: Metadata = {
  title: { absolute: "FuzzyBerry – Handgemalte 3D-Haustierporträts auf Acryl" },
  description:
    "Handgemalte 3D-Haustierporträts auf mehreren Acrylschichten, nach Ihrem Foto gemalt. Ab €179, ca. 3 Wochen Handarbeit, kostenloser Versand weltweit.",
  alternates: langAlternates("/", "de"),
};

export default async function Page() {
  const posts = await getInstagramPosts();
  return <HomePage instagramPosts={posts.map((p) => p.permalink)} />;
}
