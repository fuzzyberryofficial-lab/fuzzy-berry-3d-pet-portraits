import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { getInstagramPosts } from "@/lib/adminData";

export const metadata: Metadata = {
  title: { absolute: "FuzzyBerry – Handgemalte 3D-Haustierporträts | 3D Pet Portraits" },
  alternates: { canonical: "/" },
};

export default async function Page() {
  const posts = await getInstagramPosts();
  return <HomePage instagramPosts={posts.map((p) => p.permalink)} />;
}
