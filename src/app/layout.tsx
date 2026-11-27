import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import MetaPixel from "@/components/site/MetaPixel";
import ConsentBanner from "@/components/site/ConsentBanner";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Hand-painted 3D pet portraits on layered clear acrylic, painted from your photo. From €179, free shipping worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FuzzyBerry – Hand-Painted 3D Pet Portraits on Acrylic",
    template: "%s – FuzzyBerry",
  },
  description: DESCRIPTION,
  applicationName: "FuzzyBerry",
  openGraph: {
    type: "website",
    siteName: "FuzzyBerry",
    locale: "en_GB",
    alternateLocale: ["de_DE"],
    title: "FuzzyBerry – Hand-Painted 3D Pet Portraits",
    description: DESCRIPTION,
    // Preview picture when the site is shared (WhatsApp, Facebook, IG DMs).
    images: [{ url: "/images/home-hero.jpg", alt: "Hand-painted 3D pet portrait on layered acrylic by FuzzyBerry" }],
  },
};

// Tells Google the brand name ("FuzzyBerry", also written "Fuzzy Berry"),
// the website and the official social accounts.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FuzzyBerry",
  alternateName: ["Fuzzy Berry", "fuzzyberry.de"],
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  sameAs: [
    "https://www.instagram.com/fuzzyberry.official/",
    "https://www.facebook.com/profile.php?id=61584210684045",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <MetaPixel />
        <AnnouncementBar />
        {children}
        <Analytics />
        <ConsentBanner />
      </body>
    </html>
  );
}
