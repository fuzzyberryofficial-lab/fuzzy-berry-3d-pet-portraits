"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackStep, type FunnelStep } from "@/lib/funnel";

const PAGES: Record<string, FunnelStep> = {
  "/": "view_home",
  "/collection": "view_collection",
  "/gift-card": "view_gift",
  "/faqs": "view_faqs",
  "/about": "view_about",
  "/contact": "view_contact",
  "/showroom": "view_showroom",
};

// Counts anonymous page views for the admin funnel (no cookies, no IDs).
export default function FunnelPageView() {
  const pathname = usePathname();
  useEffect(() => {
    const path = (pathname || "/").replace(/^\/de(?=\/|$)/, "") || "/";
    const step = PAGES[path.replace(/\/$/, "") || "/"];
    if (step) trackStep(step);
  }, [pathname]);
  return null;
}
