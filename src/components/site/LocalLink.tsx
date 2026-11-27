"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { langFromPath, pathForLang } from "@/lib/langRoutes";

// Drop-in replacement for next/link: on the German /de pages, internal links
// stay inside /de (e.g. "/faqs" becomes "/de/faqs"), so visitors and Google
// keep moving through the German version.
export default function LocalLink({ href, ...props }: ComponentProps<typeof Link>) {
  const lang = langFromPath(usePathname());
  const target = lang === "de" && typeof href === "string" ? pathForLang(href, "de") : href;
  return <Link href={target} {...props} />;
}
