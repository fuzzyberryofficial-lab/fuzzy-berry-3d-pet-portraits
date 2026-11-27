import type { Metadata } from "next";

// German versions of the main pages. They render the same components; the
// language comes from the /de URL (see useLang), so the server HTML that Google
// reads is German.
export const metadata: Metadata = {
  openGraph: {
    type: "website",
    siteName: "FuzzyBerry",
    locale: "de_DE",
    alternateLocale: ["en_GB"],
    title: "FuzzyBerry – Handgemalte 3D-Haustierporträts",
    description:
      "Handgemalte 3D-Haustierporträts auf mehreren Acrylschichten, nach Ihrem Foto gemalt. Ab €179, kostenloser Versand.",
    images: [{ url: "/images/home-hero.jpg", alt: "Handgemaltes 3D-Haustierporträt auf Acryl von FuzzyBerry" }],
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
