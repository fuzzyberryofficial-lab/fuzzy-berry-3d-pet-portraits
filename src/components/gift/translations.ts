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
  thanksAmount: string;
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
    sub: "A gift voucher for a hand-painted 3D pet portrait. It arrives by email, so it's never too late to give one.",
    amountLabel: "Choose an amount",
    presetNote: {
      50: "A little something",
      100: "Over half a portrait",
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
      "We email you the voucher code within 24 hours of payment.",
      "Valid for 3 years from the date of purchase.",
      "Redeemed at checkout in the promo code field, in one order.",
      "Use it for any portrait: one pet or several, any size.",
    ],
    thanksTitle: "Thank you — your voucher is on its way",
    thanksBody:
      "We've received your payment. Your voucher code will arrive by email within 24 hours. Questions? Write to us on the contact page.",
    thanksAmount: "Voucher value",
    cancelled: "Payment was cancelled. Nothing was charged.",
    backHome: "Back to the shop",
    privacy: "Privacy Policy",
    returns: "Return Policy",
  },
  de: {
    kicker: "Weihnachtsgeschenk",
    title: "Verschenken Sie ein Fuzzy-Berry-Porträt",
    sub: "Ein Geschenkgutschein für ein handgemaltes 3D-Haustierporträt. Er kommt per E-Mail, es ist also nie zu spät zum Verschenken.",
    amountLabel: "Betrag wählen",
    presetNote: {
      50: "Eine kleine Freude",
      100: "Über ein halbes Porträt",
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
      "Den Gutschein-Code senden wir Ihnen innerhalb von 24 Stunden nach der Zahlung per E-Mail.",
      "3 Jahre gültig ab Kaufdatum.",
      "Wird im Checkout im Feld „Rabattcode“ eingelöst – in einer Bestellung.",
      "Gilt für jedes Porträt: ein Tier oder mehrere, jede Größe.",
    ],
    thanksTitle: "Vielen Dank – Ihr Gutschein ist unterwegs",
    thanksBody:
      "Ihre Zahlung ist bei uns eingegangen. Den Gutschein-Code erhalten Sie innerhalb von 24 Stunden per E-Mail. Fragen? Schreiben Sie uns über die Kontaktseite.",
    thanksAmount: "Gutscheinwert",
    cancelled: "Die Zahlung wurde abgebrochen. Es wurde nichts abgebucht.",
    backHome: "Zurück zum Shop",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};
