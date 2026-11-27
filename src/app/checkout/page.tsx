import type { Metadata } from "next";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "Order Your Portrait",
  description:
    "Porträt bestellen: Stil wählen, Foto Ihres Haustiers hochladen, sicher bezahlen. Handgemalt in ca. 3 Wochen, kostenloser Versand. Order your pet portrait.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
