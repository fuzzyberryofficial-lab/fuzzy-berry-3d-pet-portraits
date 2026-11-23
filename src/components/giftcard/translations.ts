import type { Lang, NavTranslation } from "../site/navTypes";

export interface GiftCardTranslation extends NavTranslation {
  kicker: string;
  title: string;
  sub: string;
  chooseAmount: string;
  amountNote: Record<number, string>;
  email: string;
  emailHint: string;
  recipientName: string;
  fromName: string;
  message: string;
  optional: string;
  pay: (amount: number) => string;
  starting: string;
  finePrint: string;
  errorMsg: string;
  cancelled: string;
  verifying: string;
  verifyError: string;
  notPaid: string;
  doneKicker: string;
  doneTitle: string;
  doneBody: string;
  print: string;
  copy: string;
  copied: string;
  howTitle: string;
  howSteps: string[];
  another: string;
  // Card
  cardLabel: string;
  cardFor: string;
  cardTo: string;
  cardFrom: string;
  cardCode: string;
  cardRedeem: string;
  cardValid: (date: string) => string;
  cardFullPortrait: string;
  quote: (text: string) => string;
  previewNote: string;
  privacy: string;
  returns: string;
}

export const TR: Record<Lang, GiftCardTranslation> = {
  en: {
    navHome: "Home",
    navCollection: "Collection",
    navAbout: "About Us",
    navFaqs: "FAQs",
    navContact: "Contact us",
    navShowroom: "Visit Us",
    startPortrait: "Start Your Portrait",
    kicker: "Gift card",
    title: "Give a portrait of their pet",
    sub: "They pick the photo, we paint it. The card is taken off their order and they simply pay the rest.",
    chooseAmount: "Choose an amount",
    amountNote: {
      50: "A lovely start",
      100: "Half the way there",
      179: "A whole portrait",
    },
    email: "Your email",
    emailHint: "Your gift card appears right after payment.",
    recipientName: "Who is it for?",
    fromName: "From",
    message: "A few words for the card",
    optional: "optional",
    pay: (amount) => `Buy gift card · €${amount}`,
    starting: "One moment…",
    finePrint: "Valid for 12 months · one-time use · can't be exchanged for cash",
    errorMsg: "Something went wrong. Please try again or write to us.",
    cancelled: "Payment was cancelled. Nothing was charged.",
    verifying: "Getting your gift card ready…",
    verifyError: "We couldn't load your gift card. Please refresh this page, or write to us and we'll send it to you.",
    notPaid: "The payment didn't go through, so no gift card was created.",
    doneKicker: "Thank you!",
    doneTitle: "Here's your gift card",
    doneBody: "Print it, save it as a PDF, or just send the code. Please keep a copy, this page is your gift card.",
    print: "Print / save as PDF",
    copy: "Copy code",
    copied: "Copied!",
    howTitle: "How to redeem",
    howSteps: [
      "Go to www.fuzzyberry.de and start a portrait",
      "Upload a favourite photo of the pet",
      "Enter the code at checkout and pay any difference",
    ],
    another: "Buy another gift card",
    cardLabel: "Gift Card",
    cardFor: "for a hand-painted 3D pet portrait",
    cardTo: "For",
    cardFrom: "From",
    cardCode: "Code",
    cardRedeem: "Redeem at www.fuzzyberry.de",
    cardValid: (date) => `Valid until ${date}`,
    cardFullPortrait: "One full portrait",
    quote: (text) => `“${text}”`,
    previewNote: "Preview",
    privacy: "Privacy Policy",
    returns: "Return Policy",
  },
  de: {
    navHome: "Startseite",
    navCollection: "Kollektion",
    navAbout: "Über uns",
    navFaqs: "FAQs",
    navContact: "Kontakt",
    navShowroom: "Showroom",
    startPortrait: "Porträt starten",
    kicker: "Geschenkkarte",
    title: "Ein Porträt vom eigenen Haustier verschenken",
    sub: "Das Foto suchen die Beschenkten selbst aus, wir malen es. Der Betrag wird beim Bestellen abgezogen, nur der Rest wird bezahlt.",
    chooseAmount: "Betrag wählen",
    amountNote: {
      50: "Ein schöner Anfang",
      100: "Schon die halbe Miete",
      179: "Ein ganzes Porträt",
    },
    email: "Ihre E-Mail-Adresse",
    emailHint: "Die Geschenkkarte erscheint direkt nach der Zahlung.",
    recipientName: "Für wen ist sie?",
    fromName: "Von",
    message: "Ein paar Worte für die Karte",
    optional: "optional",
    pay: (amount) => `Geschenkkarte kaufen · €${amount}`,
    starting: "Einen Moment…",
    finePrint: "12 Monate gültig · einmal einlösbar · keine Barauszahlung",
    errorMsg: "Da ist etwas schiefgelaufen. Bitte versuchen Sie es noch einmal oder schreiben Sie uns.",
    cancelled: "Die Zahlung wurde abgebrochen. Es wurde nichts abgebucht.",
    verifying: "Ihre Geschenkkarte wird vorbereitet…",
    verifyError:
      "Wir konnten Ihre Geschenkkarte gerade nicht laden. Bitte laden Sie die Seite neu oder schreiben Sie uns, dann schicken wir sie Ihnen.",
    notPaid: "Die Zahlung ist nicht durchgegangen, daher wurde keine Geschenkkarte erstellt.",
    doneKicker: "Vielen Dank!",
    doneTitle: "Hier ist Ihre Geschenkkarte",
    doneBody:
      "Drucken Sie sie aus, speichern Sie sie als PDF oder schicken Sie einfach den Code weiter. Bitte heben Sie eine Kopie auf, diese Seite ist Ihre Geschenkkarte.",
    print: "Drucken / als PDF speichern",
    copy: "Code kopieren",
    copied: "Kopiert!",
    howTitle: "So wird sie eingelöst",
    howSteps: [
      "Auf www.fuzzyberry.de ein Porträt starten",
      "Ein Lieblingsfoto vom Haustier hochladen",
      "Den Code an der Kasse eingeben und nur den Rest bezahlen",
    ],
    another: "Noch eine Geschenkkarte kaufen",
    cardLabel: "Geschenkkarte",
    cardFor: "für ein handgemaltes 3D-Haustierporträt",
    cardTo: "Für",
    cardFrom: "Von",
    cardCode: "Code",
    cardRedeem: "Einlösen auf www.fuzzyberry.de",
    cardValid: (date) => `Gültig bis ${date}`,
    cardFullPortrait: "Ein ganzes Porträt",
    quote: (text) => `„${text}“`,
    previewNote: "Vorschau",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};
