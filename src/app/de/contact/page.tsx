import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Fragen zu Ihrem Haustierporträt? Schreiben Sie FuzzyBerry per E-Mail oder WhatsApp, wir antworten persönlich.",
  alternates: langAlternates("/contact", "de"),
};

export default function Page() {
  return <ContactPage />;
}
