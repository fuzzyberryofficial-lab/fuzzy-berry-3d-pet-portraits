import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import HomePage from "@/components/home/HomePage";
import { getInstagramPosts } from "@/lib/adminData";

export const metadata: Metadata = {
  title: { absolute: "FuzzyBerry – Hand-Painted 3D Pet Portraits on Acrylic" },
  description:
    "Hand-painted 3D pet portraits on layered clear acrylic, painted from your photo. From €179, about 3 weeks of hand-painting, free shipping worldwide.",
  alternates: langAlternates("/", "en"),
};

export default async function Page() {
  const posts = await getInstagramPosts();
  return <HomePage instagramPosts={posts.map((p) => p.permalink)} />;
}
