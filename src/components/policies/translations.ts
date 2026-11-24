import type { Lang } from "../site/navTypes";

export interface PoliciesTranslation {
  backToSite: string;
  legal: string;
  privacyTitle: string;
  privacy1: string;
  privacy2: string;
  privacy3: string;
  contactLine: string;
  returnsTitle: string;
  returns1: string;
  returns2: string;
  returns3: string;
}

export const TR: Record<Lang, PoliciesTranslation> = {
  en: {
    backToSite: "← Back to site",
    legal: "Legal",
    privacyTitle: "Privacy Policy",
    privacy1:
      "We collect the information you give us when you order or contact us — name, email, shipping address, and the pet photos you upload.",
    privacy2: "We use it only to create and ship your artwork and to reach you about your order. We never sell your data.",
    privacy3:
      "Photos are used solely for your commissioned portrait and kept only as long as needed. Payment details are handled by our provider and never stored on our servers.",
    contactLine: "Questions? Reach us at",
    returnsTitle: "Return Policy",
    returns1:
      "Every portrait is custom hand-painted for your pet — once painting begins, we can't offer a refund or exchange.",
    returns2: "Before painting starts, we confirm your photo and details by email. You may request changes or cancel at no cost at that stage.",
    returns3: "If your piece arrives damaged, contact us within 7 days with photos — we'll arrange a repair or replacement at no extra cost.",
  },
  de: {
    backToSite: "← Zurück zur Website",
    legal: "Rechtliches",
    privacyTitle: "Datenschutz",
    privacy1: "Wir erfassen die Angaben, die Sie bei einer Bestellung oder Kontaktaufnahme machen: Name, E-Mail-Adresse, Lieferadresse und hochgeladene Fotos.",
    privacy2: "Wir verwenden sie ausschließlich, um Ihr Kunstwerk anzufertigen und zu versenden. Ihre Daten verkaufen wir nie.",
    privacy3:
      "Fotos verwenden wir ausschließlich für Ihr Porträt und bewahren sie nur so lange auf, wie es nötig ist. Zahlungsdaten verarbeitet unser Zahlungsdienstleister; sie werden nie auf unseren Servern gespeichert.",
    contactLine: "Fragen? Schreiben Sie uns an",
    returnsTitle: "Rückgaberecht",
    returns1: "Jedes Porträt wird individuell von Hand gemalt. Sobald wir mit dem Malen beginnen, ist keine Rückerstattung mehr möglich.",
    returns2: "Bevor wir beginnen, bestätigen wir Foto und Details per E-Mail. Bis dahin können Sie Ihre Bestellung kostenlos ändern oder stornieren.",
    returns3: "Sollte Ihr Kunstwerk beschädigt ankommen, melden Sie sich innerhalb von 7 Tagen mit Fotos bei uns – wir kümmern uns um Reparatur oder Ersatz.",
  },
};
