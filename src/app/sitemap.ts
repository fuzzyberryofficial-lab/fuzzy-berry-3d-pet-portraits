import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { DE_PAGES, pathForLang } from "@/lib/langRoutes";

const EN_ONLY = ["/checkout"];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
  const pairs = DE_PAGES.flatMap((path) => {
    const de = pathForLang(path, "de");
    const alternates = { languages: { en: url(path), de: url(de), "x-default": url(path) } };
    return [
      { url: url(path), changeFrequency: "weekly" as const, priority: path === "/" ? 1 : 0.7, alternates },
      { url: url(de), changeFrequency: "weekly" as const, priority: path === "/" ? 1 : 0.7, alternates },
    ];
  });
  return [...pairs, ...EN_ONLY.map((path) => ({ url: url(path), changeFrequency: "weekly" as const, priority: 0.7 }))];
}
