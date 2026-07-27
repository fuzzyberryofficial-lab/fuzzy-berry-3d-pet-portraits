import type { Lang, NavTranslation } from "../site/navTypes";

export interface AboutTranslation extends NavTranslation {
  kicker: string;
  title: string;
  cocoAlt: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  privacy: string;
  returns: string;
}

export const TR: Record<Lang, AboutTranslation> = {
  en: {
    navHome: "Home",
    navCollection: "Collection",
    navAbout: "About Us",
    navFaqs: "FAQs",
    navContact: "Contact us",
    startPortrait: "Start Your Portrait",
    kicker: "Our Story",
    title: "The Story Behind Fuzzy Berry",
    cocoAlt: "Coco, the pet who started it all",
    p1: "Every pet leaves an indelible mark on our hearts.",
    p2: "Fuzzy Berry began with Coco, my 16 years old companion. Wanting to freeze time and preserve his loving expression, I began experimenting with multi-layered hand-painting on clear acrylic.",
    p3: "What started as a personal homage turned into our studio's passion: transforming your favorite pet memories into 3D dimensional fine art.",
    p4: "Every portrait still begins the same way it did with Coco: a quiet look at a photograph, and the question of how to hold onto that one expression forever. Our artists study the fur, the light in the eyes, the tilt of a head, before a single layer is ever painted.",
    p5: "Six layers later, what comes off the easel isn't a print — it's a small, dimensional piece of someone's life, built by hand, meant to be looked at for years. That's the promise we still make with every box we pack.",
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
    kicker: "Unsere Geschichte",
    title: "Die Geschichte von Fuzzy Berry",
    cocoAlt: "Coco, das Haustier, mit dem alles begann",
    p1: "Jedes Haustier hinterlässt eine unauslöschliche Spur in unseren Herzen.",
    p2: "Fuzzy Berry begann mit Coco, meinem 16 Jahre alten Begleiter. Um die Zeit einzufrieren und seinen liebevollen Ausdruck zu bewahren, begann ich mit mehrschichtigem Handmalen auf klarem Acryl zu experimentieren.",
    p3: "Was als persönliche Hommage begann, wurde zur Leidenschaft unseres Studios: Ihre liebsten Tiererinnerungen in dreidimensionale Kunstwerke zu verwandeln.",
    p4: "Jedes Porträt beginnt noch immer so, wie es bei Coco begann: ein ruhiger Blick auf ein Foto und die Frage, wie man diesen einen Ausdruck für immer festhält. Unsere Künstler studieren das Fell, das Licht in den Augen, die Neigung des Kopfes, bevor auch nur eine Schicht gemalt wird.",
    p5: "Sechs Schichten später ist das, was von der Staffelei kommt, kein Druck — es ist ein kleines, dreidimensionales Stück eines Lebens, von Hand gefertigt, gemacht, um über Jahre betrachtet zu werden. Dieses Versprechen geben wir noch immer mit jeder Box, die wir packen.",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};
