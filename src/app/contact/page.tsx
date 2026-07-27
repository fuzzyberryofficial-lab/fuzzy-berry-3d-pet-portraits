import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us — Fuzzy Berry",
};

export default function Page() {
  return <ContactPage />;
}
