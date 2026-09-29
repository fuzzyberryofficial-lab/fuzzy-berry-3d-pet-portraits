import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { getInstagramPosts } from "@/lib/adminData";

export const metadata: Metadata = {
  title: "Fuzzy Berry — 3D Pet Portraits",
};

export default async function Page() {
  const posts = await getInstagramPosts();
  return <HomePage instagramPosts={posts.map((p) => p.permalink)} />;
}
