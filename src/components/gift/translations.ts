import type { Lang } from "../site/navTypes";

export interface GiftTranslation {
  kicker: string;
  title: string;
  sub: string;
  amountLabel: string;
  presetNote: Record<number, string>;
  towardsNote: string;
  customLabel: string;
  customPlaceholder: string;
  customHint: string;
  recipientLabel: string;
  recipientPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  pay: string;
  paying: string;
  errorGeneric: string;
  bullets: string[];
  thanksTitle: string;
  thanksBody: string;
  openHint: string;
  openAria: string;
  cardTitle: string;
  forLabel: string;
  validUntil: string;
  copy: string;
  copied: string;
  savePicture: string;
  redeemNow: string;
  keepSafe: string;
  pendingBody: string;
  cancelled: string;
  backHome: string;
  privacy: string;
  returns: string;
}

export const PRESET_AMOUNTS = [50, 100, 179, 199, 209, 229, 279, 329];
export const MIN_AMOUNT = 25;
export const MAX_AMOUNT = 500;

export const TR: Record<Lang, GiftTranslation> = {
  en: {
    kicker: "Christmas gift",
    title: "Give a Fuzzy Berry portrait",
    sub: "A gift voucher for a hand-painted 3D pet portrait. It is ready the moment you pay, so it's never too late to give one.",
    amountLabel: "Choose an amount",
    presetNote: {
      50: "A little something",
      100: "A lovely gift",
      179: "Single · 20×20 cm",
      199: "Single · 25×25 cm",
      209: "Single · 30×30 cm",
      229: "With body · 30×30 cm",
      279: "Duo · 20×40 cm",
      329: "Trio · 20×40 cm",
    },
    towardsNote: "Gift voucher",
    customLabel: "Or your own amount",
    customPlaceholder: "e.g. 150",
    customHint: "Whole euros, €25 – €500.",
    recipientLabel: "Who is it for? (optional)",
    recipientPlaceholder: "Name of the person you're giving it to",
    messageLabel: "A personal message (optional)",
    messagePlaceholder: "Merry Christmas! …",
    pay: "Buy voucher",
    paying: "Taking you to payment…",
    errorGeneric: "Something went wrong. Please try again.",
    bullets: [
      "Your voucher code appears on screen right after payment, with no waiting.",
      "Valid for 3 years from the date of purchase.",
      "Redeemed at checkout in the promo code field, in one order.",
      "Use it for any portrait: one pet or several, any size.",
    ],
    thanksTitle: "Thank you! Your gift voucher is ready",
    thanksBody:
      "Open the box to see your voucher code. You can save it as a picture to send to the person you're giving it to.",
    openHint: "Tap the gift to open it",
    openAria: "Open your gift voucher",
    cardTitle: "Gift voucher",
    forLabel: "For {name}",
    validUntil: "Valid until {date}",
    copy: "Copy code",
    copied: "Copied!",
    savePicture: "Save as picture",
    redeemNow: "Redeem now",
    keepSafe:
      "Redeem it at checkout in the “Promo code” field, in one order. Bookmark this page or save the picture so you can always find your code again.",
    pendingBody:
      "Your payment went through and we're creating your code. It will appear here in a moment. If it doesn't, please write to us on the contact page.",
    cancelled: "Payment was cancelled. Nothing was charged.",
    backHome: "Back to the shop",
    privacy: "Privacy Policy",
    returns: "Return Policy",
  },
  de: {
    kicker: "Weihnachtsgeschenk",
    title: "Verschenken Sie ein Porträt",
    sub: "Ein Geschenkgutschein für ein handgemaltes 3D-Haustierporträt. Er ist sofort nach der Zahlung bereit, es ist also nie zu spät zum Verschenken.",
    amountLabel: "Betrag wählen",
    presetNote: {
      50: "Eine kleine Freude",
      100: "Ein schönes Geschenk",
      179: "Einzeltier · 20×20 cm",
      199: "Einzeltier · 25×25 cm",
      209: "Einzeltier · 30×30 cm",
      229: "Mit Körper · 30×30 cm",
      279: "Zwei Tiere · 20×40 cm",
      329: "Drei Tiere · 20×40 cm",
    },
    towardsNote: "Geschenkgutschein",
    customLabel: "Oder ein eigener Betrag",
    customPlaceholder: "z. B. 150",
    customHint: "Ganze Euro, 25 – 500 €.",
    recipientLabel: "Für wen? (optional)",
    recipientPlaceholder: "Name der beschenkten Person",
    messageLabel: "Persönliche Nachricht (optional)",
    messagePlaceholder: "Frohe Weihnachten! …",
    pay: "Gutschein kaufen",
    paying: "Weiter zur Zahlung…",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    bullets: [
      "Den Gutschein-Code sehen Sie direkt nach der Zahlung auf dem Bildschirm, ganz ohne Wartezeit.",
      "3 Jahre gültig ab Kaufdatum.",
      "Wird im Checkout im Feld „Rabattcode“ eingelöst – in einer Bestellung.",
      "Gilt für jedes Porträt: ein Tier oder mehrere, jede Größe.",
    ],
    thanksTitle: "Vielen Dank! Ihr Geschenkgutschein ist bereit",
    thanksBody:
      "Öffnen Sie die Box, um Ihren Gutschein-Code zu sehen. Sie können ihn als Bild speichern und der beschenkten Person schicken.",
    openHint: "Zum Öffnen auf das Geschenk tippen",
    openAria: "Geschenkgutschein öffnen",
    cardTitle: "Geschenkgutschein",
    forLabel: "Für {name}",
    validUntil: "Gültig bis {date}",
    copy: "Code kopieren",
    copied: "Kopiert!",
    savePicture: "Als Bild speichern",
    redeemNow: "Jetzt einlösen",
    keepSafe:
      "Einlösbar im Checkout im Feld „Rabattcode“ – in einer Bestellung. Speichern Sie diese Seite als Lesezeichen oder sichern Sie das Bild, damit Sie den Code jederzeit wiederfinden.",
    pendingBody:
      "Ihre Zahlung ist eingegangen und wir erstellen gerade Ihren Code. Er erscheint gleich hier. Falls nicht, schreiben Sie uns bitte über die Kontaktseite.",
    cancelled: "Die Zahlung wurde abgebrochen. Es wurde nichts abgebucht.",
    backHome: "Zurück zum Shop",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};
