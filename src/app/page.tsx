import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Fuzzy Berry — 3D Pet Portraits",
};

export default function Page() {
  return <HomePage />;
}
