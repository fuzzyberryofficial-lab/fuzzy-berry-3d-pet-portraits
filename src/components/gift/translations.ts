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
  senderLabel: string;
  senderPlaceholder: string;
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
  shareTitle: string;
  shareBody: string;
  copyLink: string;
  linkCopied: string;
  shareNative: string;
  qrAlt: string;
  scanToOpen: string;
  fromLabel: string;
  recipientTitle: string;
  recipientBody: string;
  recipientNote: string;
  orderNow: string;
  linkInvalid: string;
  loading: string;
  demoBanner: string;
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
    senderLabel: "From (optional)",
    senderPlaceholder: "Your name, so they know who it's from",
    pay: "Buy voucher",
    paying: "Taking you to payment…",
    errorGeneric: "Something went wrong. Please try again.",
    bullets: [
      "Your code appears right after payment.",
      "Valid for 3 years from the date of purchase.",
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
    shareTitle: "Give it as a gift",
    shareBody: "Send this link, or print the picture with its QR code. Whoever opens it gets the gift-box surprise.",
    copyLink: "Copy gift link",
    linkCopied: "Link copied!",
    shareNative: "Share…",
    qrAlt: "QR code for the gift link",
    scanToOpen: "Scan to open",
    fromLabel: "From {name}",
    recipientTitle: "A gift for you!",
    recipientBody: "Open the box to see what's inside.",
    recipientNote:
      "Redeem the code at checkout in the “Promo code” field, in one order. Keep this page or save the code.",
    orderNow: "Order your portrait",
    linkInvalid: "This gift link isn't valid. Please check that you copied the whole link.",
    loading: "Loading your gift…",
    demoBanner: "Demo: this is a sample so you can see how the gift opens. The code is not real.",
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
    senderLabel: "Von (optional)",
    senderPlaceholder: "Ihr Name, damit man weiß, von wem es ist",
    pay: "Gutschein kaufen",
    paying: "Weiter zur Zahlung…",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    bullets: [
      "Ihr Code erscheint sofort nach der Zahlung.",
      "3 Jahre gültig ab Kaufdatum.",
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
    shareTitle: "Verschenken",
    shareBody:
      "Schicken Sie diesen Link oder drucken Sie das Bild mit dem QR-Code aus. Wer ihn öffnet, erlebt die Überraschung mit der Geschenkbox.",
    copyLink: "Geschenk-Link kopieren",
    linkCopied: "Link kopiert!",
    shareNative: "Teilen …",
    qrAlt: "QR-Code zum Geschenk-Link",
    scanToOpen: "Zum Öffnen scannen",
    fromLabel: "Von {name}",
    recipientTitle: "Ein Geschenk für Sie!",
    recipientBody: "Öffnen Sie die Box und sehen Sie, was darin steckt.",
    recipientNote:
      "Lösen Sie den Code im Checkout im Feld „Rabattcode“ ein – in einer Bestellung. Speichern Sie diese Seite oder notieren Sie sich den Code.",
    orderNow: "Porträt bestellen",
    linkInvalid: "Dieser Geschenk-Link ist ungültig. Bitte prüfen Sie, ob Sie den ganzen Link kopiert haben.",
    loading: "Ihr Geschenk wird geladen …",
    demoBanner: "Demo: Dies ist ein Beispiel, damit Sie sehen, wie sich das Geschenk öffnet. Der Code ist nicht echt.",
    cancelled: "Die Zahlung wurde abgebrochen. Es wurde nichts abgebucht.",
    backHome: "Zurück zum Shop",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};
