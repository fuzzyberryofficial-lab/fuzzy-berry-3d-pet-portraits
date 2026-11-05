import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AnnouncementBar from "@/components/site/AnnouncementBar";
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
  "Handgemalte 3D-Haustierporträts auf mehreren Acrylschichten, nach Ihrem Foto gemalt. Kostenloser Versand. Hand-painted 3D pet portraits on layered acrylic, made from your photo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FuzzyBerry – Handgemalte 3D-Haustierporträts | 3D Pet Portraits",
    template: "%s – FuzzyBerry",
  },
  description: DESCRIPTION,
  applicationName: "FuzzyBerry",
  openGraph: {
    type: "website",
    siteName: "FuzzyBerry",
    url: SITE_URL,
    locale: "de_DE",
    alternateLocale: ["en_GB"],
    title: "FuzzyBerry – Handgemalte 3D-Haustierporträts",
    description: DESCRIPTION,
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
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        <AnnouncementBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
