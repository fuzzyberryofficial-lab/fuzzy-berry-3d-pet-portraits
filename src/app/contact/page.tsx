import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about your 3D pet portrait? Write to FuzzyBerry by email or WhatsApp and we will answer personally.",
  alternates: langAlternates("/contact", "en"),
};

export default function Page() {
  return <ContactPage />;
}
