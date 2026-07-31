import type { Lang, NavTranslation } from "../site/navTypes";

export interface HomeTranslation extends NavTranslation {
  heroKicker: string;
  heroTitleA: string;
  heroTitleB: string;
  heroBody: string;
  heroSticker: string;
  tagSingle: string;
  tagMulti: string;
  styleKicker: string;
  styleTitle: string;
  styleSub: string;
  craftKicker: string;
  craftTitle: string;
  craftBody: string;
  boxKicker: string;
  boxTitle: string;
  boxSub: string;
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
    heroBody: "Hand-painted, layer by layer, on crystal-clear acrylic.",
    heroSticker: "100% Hand-Painted",
    tagSingle: "Single Pet — from €179",
    tagMulti: "Multi Pet — from €279",
    styleKicker: "If you love them, we can craft them",
    styleTitle: "Choose Your Style",
    styleSub: "Cats, dogs, and every beloved pet.",
    craftKicker: "Crafting the Magic",
    craftTitle: "Art You Can Feel",
    craftBody: "Hand-painted layer by layer — every fur stroke, every sparkle, brought to life.",
    boxKicker: "Unboxing",
    boxTitle: "What's Inside Your Box",
    boxSub: "Everything you need to display or gift your artwork right out of the box.",
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
    heroKicker: "Moderne Kunst für Tierliebhaber",
    heroTitleA: "Verwandeln Sie Ihren besten Freund in",
    heroTitleB: "Kunst",
    heroBody: "Handgemalt, Schicht für Schicht, auf klarem Acrylglas.",
    heroSticker: "100% handgemalt",
    tagSingle: "Einzeltier — ab €179",
    tagMulti: "Mehrere Tiere — ab €279",
    styleKicker: "Wenn Sie sie lieben, gestalten wir sie",
    styleTitle: "Wählen Sie Ihren Stil",
    styleSub: "Katzen, Hunde und jedes geliebte Haustier.",
    craftKicker: "Die Magie entsteht",
    craftTitle: "Kunst, die man fühlt",
    craftBody: "Schicht für Schicht handgemalt — jede Fellsträhne, jedes Glitzern lebendig gemacht.",
    boxKicker: "Auspacken",
    boxTitle: "Das ist in Ihrer Box",
    boxSub: "Alles, was Sie brauchen, um Ihr Kunstwerk direkt aus der Box zu präsentieren oder zu verschenken.",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};
