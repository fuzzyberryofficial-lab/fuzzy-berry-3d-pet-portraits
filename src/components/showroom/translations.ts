import type { Lang, NavTranslation } from "../site/navTypes";

export interface ShowroomTranslation extends NavTranslation {
  backToSite: string;
  privacy: string;
  returns: string;
  kicker: string;
  title: string;
  intro: string;
  storeInfoTitle: string;
  addressLabel: string;
  addressLine: string;
  hoursLabel: string;
  hoursWeekday: string;
  hoursClosed: string;
  directionsBtn: string;
}

export const TR: Record<Lang, ShowroomTranslation> = {
  en: {
    navHome: "Home",
    navCollection: "Collection",
    navAbout: "About Us",
    navFaqs: "FAQs",
    navContact: "Contact us",
    navShowroom: "Visit Us",
    startPortrait: "Start Your Portrait",
    backToSite: "← Back to site",
    privacy: "Privacy Policy",
    returns: "Return Policy",
    kicker: "Showroom",
    title: "Visit Our Showroom",
    intro:
      "Want to see our hand-painted custom pet portrait samples up close before ordering? Come visit our display showcase, located inside 's Fachl Frankfurt!",
    storeInfoTitle: "Store Information",
    addressLabel: "'s Fachl Frankfurt",
    addressLine: "Berliner Str. 32, 60311 Frankfurt am Main, Germany",
    hoursLabel: "Opening Hours",
    hoursWeekday: "Monday – Saturday: 10:00 – 19:00",
    hoursClosed: "Sunday: Closed",
    directionsBtn: "Get Directions on Google Maps",
  },
  de: {
    navHome: "Startseite",
    navCollection: "Kollektion",
    navAbout: "Über uns",
    navFaqs: "FAQs",
    navContact: "Kontakt",
    navShowroom: "Showroom",
    startPortrait: "Porträt starten",
    backToSite: "← Zurück zur Seite",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
    kicker: "Showroom",
    title: "Besuchen Sie unseren Showroom",
    intro:
      "Möchten Sie unsere handgemalten Haustierporträts vor der Bestellung aus der Nähe sehen? Besuchen Sie unsere Ausstellung im 's Fachl Frankfurt!",
    storeInfoTitle: "Store-Informationen",
    addressLabel: "'s Fachl Frankfurt",
    addressLine: "Berliner Str. 32, 60311 Frankfurt am Main, Deutschland",
    hoursLabel: "Öffnungszeiten",
    hoursWeekday: "Montag – Samstag: 10:00 – 19:00",
    hoursClosed: "Sonntag: Geschlossen",
    directionsBtn: "Route auf Google Maps anzeigen",
  },
};

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Berliner+Str.+32%2C+60311+Frankfurt+am+Main";
export const SHOWROOM_ADDRESS = "Berliner Str. 32, 60311 Frankfurt am Main, Germany";
