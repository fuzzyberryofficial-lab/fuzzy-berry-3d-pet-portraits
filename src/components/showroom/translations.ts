import type { Lang } from "../site/navTypes";

export interface ShowroomTranslation {
  backToSite: string;
  kicker: string;
  title: string;
  intro: string;
  storeInfoTitle: string;
  addressLabel: string;
  addressLine: string;
  hoursLabel: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursClosed: string;
  featuresLabel: string;
  featuresText: string;
  directionsBtn: string;
  guideTitle: string;
  step1Title: string;
  step1Text: string;
  step2Title: string;
  step2Text: string;
  step3Title: string;
  step3Text: string;
}

export const TR: Record<Lang, ShowroomTranslation> = {
  en: {
    backToSite: "← Back to site",
    kicker: "Vienna Showroom",
    title: "Visit Our Vienna Showroom & Pickup Point",
    intro:
      "Want to see our hand-painted custom pet portrait samples up close before ordering? Come visit our display showcase, located inside 's Fachl Wien!",
    storeInfoTitle: "Store Information",
    addressLabel: "'s Fachl Wien",
    addressLine: "Alser Straße 43, 1080 Wien, Austria",
    hoursLabel: "Opening Hours",
    hoursWeekday: "Monday – Friday: 10:00 – 18:30",
    hoursSaturday: "Saturday: 10:00 – 17:00",
    hoursClosed: "Sunday & Public Holidays: Closed",
    featuresLabel: "Showroom Features",
    featuresText: "Physical portrait samples, canvas sizes, and material details on display.",
    directionsBtn: "Get Directions on Google Maps",
    guideTitle: "How In-Store Pickup Works",
    step1Title: "Order online",
    step1Text: "Customize your portrait online, then message us to let us know you'd like to collect it in-store.",
    step2Title: "Hand-painted with love",
    step2Text: "We carefully hand-paint your pet's portrait, layer by layer, with love and precision.",
    step3Title: "Pick up in-store",
    step3Text: "We'll email you when it's ready — just stop by 's Fachl Wien during opening hours to collect your artwork!",
  },
  de: {
    backToSite: "← Zurück zur Seite",
    kicker: "Showroom Wien",
    title: "Besuchen Sie unseren Showroom & Abholpunkt in Wien",
    intro:
      "Möchten Sie unsere handgemalten Haustierporträts vor der Bestellung aus der Nähe sehen? Besuchen Sie unsere Ausstellung im 's Fachl Wien!",
    storeInfoTitle: "Store-Informationen",
    addressLabel: "'s Fachl Wien",
    addressLine: "Alser Straße 43, 1080 Wien, Österreich",
    hoursLabel: "Öffnungszeiten",
    hoursWeekday: "Montag – Freitag: 10:00 – 18:30",
    hoursSaturday: "Samstag: 10:00 – 17:00",
    hoursClosed: "Sonn- & Feiertag: Geschlossen",
    featuresLabel: "Im Showroom",
    featuresText: "Physische Porträt-Muster, Leinwandgrößen und Materialdetails zum Anschauen.",
    directionsBtn: "Route auf Google Maps anzeigen",
    guideTitle: "So funktioniert die Abholung vor Ort",
    step1Title: "Online bestellen",
    step1Text: "Gestalten Sie Ihr Porträt online und schreiben Sie uns, dass Sie es im Store abholen möchten.",
    step2Title: "Mit Liebe handgemalt",
    step2Text: "Wir malen das Porträt Ihres Haustiers sorgfältig Schicht für Schicht, mit Liebe und Präzision.",
    step3Title: "Vor Ort abholen",
    step3Text: "Wir informieren Sie per E-Mail, sobald es fertig ist — kommen Sie einfach während der Öffnungszeiten bei 's Fachl Wien vorbei!",
  },
};

export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/eGZcTN7xj2GXKyXX6";
export const SHOWROOM_ADDRESS = "Alser Straße 43, 1080 Wien, Austria";
