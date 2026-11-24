import type { Lang, NavTranslation } from "../site/navTypes";

export interface HomeTranslation extends NavTranslation {
  heroKicker: string;
  heroTitleA: string;
  heroTitleB: string;
  heroBody: string;
  heroSticker: string;
  heroPriceLine: string;
  baKicker: string;
  baTitle: string;
  baSub: string;
  baPhoto: string;
  baPainted: string;
  styleKicker: string;
  styleTitle: string;
  styleSub: string;
  craftKicker: string;
  craftTitle: string;
  craftBody: string;
  boxKicker: string;
  boxTitle: string;
  boxSub: string;
  giftKicker: string;
  giftTitle: string;
  giftSub: string;
  giftCta: string;
  giftFooter: string;
  igKicker: string;
  igTitle: string;
  igSub: string;
  igFollowCta: string;
  privacy: string;
  returns: string;
  navAbout: string;
  navFaqs: string;
  navContact: string;
}

export const TR: Record<Lang, HomeTranslation> = {
  en: {
    navHome: "Home",
    navCollection: "Collection",
    navAbout: "About Us",
    navFaqs: "FAQs",
    navContact: "Contact us",
    navShowroom: "Visit Us",
    startPortrait: "Start Your Portrait",
    heroKicker: "Modern Art for Pet Lovers",
    heroTitleA: "Turn Your Best Friend into",
    heroTitleB: "Fine Art",
    heroBody: "Send us one photo — we hand-paint it, layer by layer, onto crystal-clear acrylic and ship it worldwide.",
    heroSticker: "6 Hand-Painted Layers",
    heroPriceLine: "from €179 · about 3 weeks of hand-painting",
    baKicker: "Real Portraits",
    baTitle: "From Photo to Hand-Painted Art",
    baSub: "A photo in, a hand-painted piece out — layer by layer on acrylic.",
    baPhoto: "The photo",
    baPainted: "The portrait",
    styleKicker: "If you love them, we can craft them",
    styleTitle: "Choose Your Style",
    styleSub: "Cats, dogs, and every beloved pet.",
    craftKicker: "Crafting the Magic",
    craftTitle: "Art You Can Feel",
    craftBody: "Hand-painted layer by layer — every fur stroke, every sparkle, brought to life.",
    boxKicker: "Unboxing",
    boxTitle: "What's Inside Your Box",
    boxSub: "Everything you need to display or gift your artwork right out of the box.",
    giftKicker: "Christmas gift",
    giftTitle: "Give a portrait with a gift voucher",
    giftSub: "Ready the moment you pay, valid for 1 year — it's never too late to give one.",
    giftCta: "Buy a gift voucher",
    giftFooter: "Gift vouchers",
    igKicker: "Join the Pack",
    igTitle: "Follow @fuzzyberry.official",
    igSub: "Fresh portraits, behind-the-scenes painting, and happy customers on Instagram.",
    igFollowCta: "Follow us on Instagram",
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
    startPortrait: "Porträt bestellen",
    heroKicker: "Moderne Kunst für Tierliebhaber",
    heroTitleA: "Machen Sie Ihren besten Freund zum",
    heroTitleB: "Kunstwerk",
    heroBody: "Schicken Sie uns ein Foto – wir malen es in Handarbeit Schicht für Schicht auf klares Acrylglas und verschicken es weltweit.",
    heroSticker: "6 Schichten · handgemalt",
    heroPriceLine: "ab 179 € · ca. 3 Wochen Handmalerei",
    baKicker: "Echte Porträts",
    baTitle: "Vom Foto zum handgemalten Kunstwerk",
    baSub: "Foto rein, Handarbeit raus – Schicht für Schicht auf Acryl gemalt.",
    baPhoto: "Das Foto",
    baPainted: "Das Porträt",
    styleKicker: "Sie lieben Ihr Tier – wir malen es",
    styleTitle: "Wählen Sie Ihren Stil",
    styleSub: "Katzen, Hunde und alle anderen Lieblinge.",
    craftKicker: "So entsteht die Magie",
    craftTitle: "Kunst, die man fühlt",
    craftBody: "Schicht für Schicht von Hand gemalt – jede Fellsträhne, jedes Funkeln im Auge wird lebendig.",
    boxKicker: "Auspacken",
    boxTitle: "Das steckt in Ihrer Box",
    boxSub: "Alles dabei, um Ihr Kunstwerk sofort aufzustellen oder zu verschenken.",
    giftKicker: "Weihnachtsgeschenk",
    giftTitle: "Verschenken Sie ein Porträt – mit unserem Geschenkgutschein",
    giftSub: "Sofort nach der Zahlung bereit, 1 Jahr gültig – zum Verschenken ist es nie zu spät.",
    giftCta: "Geschenkgutschein kaufen",
    giftFooter: "Geschenkgutscheine",
    igKicker: "Werden Sie Teil des Rudels",
    igTitle: "Folgen Sie @fuzzyberry.official",
    igSub: "Neue Porträts, Einblicke ins Malen und glückliche Kunden auf Instagram.",
    igFollowCta: "Folgen Sie uns auf Instagram",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};
