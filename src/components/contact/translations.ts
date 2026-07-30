import type { Lang, NavTranslation } from "../site/navTypes";

export interface ContactTranslation extends NavTranslation {
  kicker: string;
  title: string;
  stores: string;
  name: string;
  email: string;
  message: string;
  submit: string;
  sending: string;
  errorMsg: string;
  thanksTitle: string;
  thanksBody: string;
  privacy: string;
  returns: string;
}

export const TR: Record<Lang, ContactTranslation> = {
  en: {
    navHome: "Home",
    navCollection: "Collection",
    navAbout: "About Us",
    navFaqs: "FAQs",
    navContact: "Contact us",
    startPortrait: "Start Your Portrait",
    kicker: "Need Anything?",
    title: "Contact Us",
    stores: "Visit our showroom in Vienna.",
    name: "Name",
    email: "Email address",
    message: "Leave a message",
    submit: "Submit",
    sending: "Sending…",
    errorMsg: "Something went wrong. Please try again or email us directly.",
    thanksTitle: "Thanks for reaching out!",
    thanksBody: "We'll get back to you at the email you left.",
    privacy: "Privacy Policy",
    returns: "Return Policy",
  },
  de: {
    navHome: "Startseite",
    navCollection: "Kollektion",
    navAbout: "Über uns",
    navFaqs: "FAQs",
    navContact: "Kontakt",
    startPortrait: "Porträt starten",
    kicker: "Fragen?",
    title: "Kontakt",
    stores: "Besuchen Sie unseren Showroom in Wien.",
    name: "Name",
    email: "E-Mail-Adresse",
    message: "Nachricht",
    submit: "Absenden",
    sending: "Wird gesendet…",
    errorMsg: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.",
    thanksTitle: "Danke für Ihre Nachricht!",
    thanksBody: "Wir melden uns bei der angegebenen E-Mail-Adresse.",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};
