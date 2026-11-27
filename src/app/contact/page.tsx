import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Fragen zu Ihrem Haustierporträt? Schreiben Sie FuzzyBerry, wir antworten persönlich. Questions about your 3D pet portrait? Get in touch.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}
