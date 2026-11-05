import type { Metadata } from "next";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "Order Your Portrait",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
