import type { Metadata } from "next";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout — Fuzzy Berry 3D Pet Portraits",
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
