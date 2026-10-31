import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PAGES = ["", "/collection", "/showroom", "/checkout", "/about", "/faqs", "/contact", "/policies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({ url: `${SITE_URL}${path}` }));
}
