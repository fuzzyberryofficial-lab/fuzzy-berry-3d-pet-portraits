import type { Lang } from "@/components/site/navTypes";

// Pages that also exist in German under /de (e.g. /faqs -> /de/faqs).
// Google can only read the German text on these /de URLs, because the
// normal URLs are always rendered in English on the server.
export const DE_PAGES = ["/", "/collection", "/gift-card", "/showroom", "/about", "/faqs", "/contact", "/policies"];

/** "de" for /de and /de/..., otherwise null (the URL doesn't fix a language). */
export function langFromPath(pathname: string | null | undefined): Lang | null {
  if (!pathname) return null;
  return pathname === "/de" || pathname.startsWith("/de/") ? "de" : null;
}

/** The English path for a /de path ("/de/faqs" -> "/faqs", "/de" -> "/"). */
export function stripDe(pathname: string): string {
  if (pathname === "/de") return "/";
  return pathname.startsWith("/de/") ? pathname.slice(3) : pathname;
}

function splitHref(href: string): [string, string] {
  const i = href.search(/[?#]/);
  return i === -1 ? [href, ""] : [href.slice(0, i), href.slice(i)];
}

/**
 * The same page in the given language, keeping ?query and #hash.
 * Pages without a German version (checkout, admin, ...) are returned unchanged.
 */
export function pathForLang(href: string, lang: Lang): string {
  if (!href.startsWith("/")) return href;
  const [path, rest] = splitHref(href);
  const base = stripDe(path);
  if (lang === "en") return base + rest;
  if (!DE_PAGES.includes(base)) return href;
  return (base === "/" ? "/de" : `/de${base}`) + rest;
}

/** Metadata `alternates` for an English page path, with hreflang links to both versions. */
export function langAlternates(path: string, lang: Lang) {
  const de = pathForLang(path, "de");
  return {
    canonical: lang === "de" ? de : path,
    languages: { en: path, de, "x-default": path },
  };
}
