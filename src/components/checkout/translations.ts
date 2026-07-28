import type { CollectionKey, FrameColorKey, TypeKey } from "./catalog";

export type Lang = "en" | "de";
export type Step = "style" | "upload" | "shipping" | "payment" | "done";

export interface Translation {
  backToSite: string;
  chooseCollection: string;
  chooseCollectionSub: string;
  fromLabel: string;
  typeLabel: string;
  sizeLabel: string;
  frameLabel: string;
  frameColorLabel: string;
  yes: string;
  no: string;
  continueUpload: string;
  uploadTitle: string;
  uploadSub: string;
  uploadPh1: string;
  uploadPh2: string;
  uploadPh3: string;
  notesLabel: string;
  back: string;
  continueShipping: string;
  shippingTitle: string;
  shippingSub: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  selectCountry: string;
  continuePayment: string;
  paymentTitle: string;
  stripeNote: string;
  payWithStripe: string;
  verifyingPayment: string;
  paymentCancelledMsg: string;
  paymentFailedMsg: string;
  paymentVerifyErrorMsg: string;
  orderSummary: string;
  portrait: string;
  frameLine: string;
  shippingLine: string;
  total: string;
  orderConfirmed: string;
  thankYou: string;
  backToFuzzy: string;
  doneBody: string;
  confirmationSent: string;
  single: { kicker: string; title: string; body: string };
  multi: { kicker: string; title: string; body: string };
  types: Record<TypeKey, string>;
  frameColors: Record<FrameColorKey, string>;
  steps: Record<Step, string>;
}

export const TR: Record<Lang, Translation> = {
  en: {
    backToSite: "← Back to site",
    chooseCollection: "Choose Your Collection",
    chooseCollectionSub: "Pick a collection, then the portrait type and size.",
    fromLabel: "from",
    typeLabel: "Type",
    sizeLabel: "Size",
    frameLabel: "Add a frame — €20",
    frameColorLabel: "Frame color",
    yes: "Yes",
    no: "No",
    continueUpload: "Continue to Photo Upload",
    uploadTitle: "Upload Your Pet's Photo",
    uploadSub: "High-resolution, natural light, eyes and fur clearly visible.",
    uploadPh1: "Drop your pet's photo",
    uploadPh2: "Optional second photo",
    uploadPh3: "Optional third photo",
    notesLabel: "Notes for our artist",
    back: "Back",
    continueShipping: "Continue to Shipping",
    shippingTitle: "Shipping Details",
    shippingSub: "We ship worldwide with protective packaging.",
    fullName: "Full name",
    email: "Email",
    address: "Address",
    city: "City",
    postal: "Postal code",
    country: "Country",
    selectCountry: "Select country",
    continuePayment: "Continue to Payment",
    paymentTitle: "Payment",
    stripeNote: "You'll be redirected to Stripe to complete payment securely. Test mode — no real charge.",
    payWithStripe: "Pay with Stripe",
    verifyingPayment: "Verifying your payment…",
    paymentCancelledMsg: "Checkout was cancelled. You can try again whenever you're ready.",
    paymentFailedMsg: "Payment wasn't completed. Please try again.",
    paymentVerifyErrorMsg: "Couldn't verify your payment. Please try again.",
    orderSummary: "Order Summary",
    portrait: "Portrait",
    frameLine: "Frame",
    shippingLine: "Shipping",
    total: "Total",
    orderConfirmed: "Order Confirmed",
    thankYou: "Thank you,",
    backToFuzzy: "Back to Fuzzy Berry",
    doneBody:
      "We'll personally reach out to confirm your pet's photo before our artist begins. Your piece takes 2–3 weeks to hand-paint, plus shipping.",
    confirmationSent: "Confirmation sent to",
    single: { kicker: "Single Pet", title: "Single Pet Portrait", body: "One companion, front and center." },
    multi: { kicker: "Multi Pet", title: "Multi Pet Portrait", body: "The whole crew together." },
    types: { head: "Head Portrait", body: "Half / Full Body", double: "Double Pets", triple: "Triple Pets" },
    frameColors: {
      purpleGold: "Purple Gold",
      lightGold: "Light Gold",
      titaniumGold: "Titanium Gold",
      matteBlack: "Matte Black",
      matteSilver: "Matte Silver",
      blackWalnut: "Black Walnut",
      naturalWood: "Natural Wood",
    },
    steps: { style: "1. Collection", upload: "2. Photos", shipping: "3. Shipping", payment: "4. Payment", done: "Confirmed" },
  },
  de: {
    backToSite: "← Zurück zur Seite",
    chooseCollection: "Wählen Sie Ihre Kollektion",
    chooseCollectionSub: "Kollektion, dann Porträttyp und Größe wählen.",
    fromLabel: "ab",
    typeLabel: "Typ",
    sizeLabel: "Größe",
    frameLabel: "Rahmen hinzufügen — €20",
    frameColorLabel: "Rahmenfarbe",
    yes: "Ja",
    no: "Nein",
    continueUpload: "Weiter zum Foto-Upload",
    uploadTitle: "Laden Sie das Foto Ihres Haustiers hoch",
    uploadSub: "Hochauflösend, natürliches Licht, Augen und Fell gut erkennbar.",
    uploadPh1: "Foto Ihres Haustiers hierher ziehen",
    uploadPh2: "Optionales zweites Foto",
    uploadPh3: "Optionales drittes Foto",
    notesLabel: "Notizen für unseren Künstler",
    back: "Zurück",
    continueShipping: "Weiter zum Versand",
    shippingTitle: "Versanddetails",
    shippingSub: "Wir versenden weltweit mit Schutzverpackung.",
    fullName: "Vollständiger Name",
    email: "E-Mail",
    address: "Adresse",
    city: "Stadt",
    postal: "Postleitzahl",
    country: "Land",
    selectCountry: "Land auswählen",
    continuePayment: "Weiter zur Zahlung",
    paymentTitle: "Zahlung",
    stripeNote: "Sie werden zu Stripe weitergeleitet, um sicher zu bezahlen. Testmodus — es wird nichts belastet.",
    payWithStripe: "Mit Stripe bezahlen",
    verifyingPayment: "Zahlung wird überprüft …",
    paymentCancelledMsg: "Der Bezahlvorgang wurde abgebrochen. Sie können es jederzeit erneut versuchen.",
    paymentFailedMsg: "Die Zahlung wurde nicht abgeschlossen. Bitte versuchen Sie es erneut.",
    paymentVerifyErrorMsg: "Zahlung konnte nicht überprüft werden. Bitte versuchen Sie es erneut.",
    orderSummary: "Bestellübersicht",
    portrait: "Porträt",
    frameLine: "Rahmen",
    shippingLine: "Versand",
    total: "Gesamt",
    orderConfirmed: "Bestellung bestätigt",
    thankYou: "Danke,",
    backToFuzzy: "Zurück zu Fuzzy Berry",
    doneBody:
      "Wir melden uns persönlich, um das Foto zu bestätigen, bevor unser Künstler beginnt. Ihr Werk benötigt 2–3 Wochen Handmalerei, plus Versand.",
    confirmationSent: "Bestätigung gesendet an",
    single: { kicker: "Einzeltier", title: "Einzeltier-Porträt", body: "Ein Begleiter, im Mittelpunkt." },
    multi: { kicker: "Mehrere Tiere", title: "Mehrtier-Porträt", body: "Ihre ganze Truppe zusammen." },
    types: { head: "Kopfporträt", body: "Halb- / Ganzkörper", double: "Zwei Tiere", triple: "Drei Tiere" },
    frameColors: {
      purpleGold: "Violettgold",
      lightGold: "Hellgold",
      titaniumGold: "Titangold",
      matteBlack: "Mattschwarz",
      matteSilver: "Mattsilber",
      blackWalnut: "Schwarznuss",
      naturalWood: "Naturholz",
    },
    steps: { style: "1. Kollektion", upload: "2. Fotos", shipping: "3. Versand", payment: "4. Zahlung", done: "Bestätigt" },
  },
};

export const COLLECTION_KEYS: CollectionKey[] = ["single", "multi"];
