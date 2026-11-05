import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
