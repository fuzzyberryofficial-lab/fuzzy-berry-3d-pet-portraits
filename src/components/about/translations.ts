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
    p2: "Fuzzy Berry began with Coco, my 16-year-old companion. Wanting to freeze time and preserve his gentle gaze, I began experimenting with multi-layered hand-painting on clear acrylic.",
    p3: "What started as a personal homage soon became our studio's core passion: transforming cherished pet memories into 3D fine art.",
    p4: "Every portrait still begins the exact same way: a quiet look at a photograph, and the question of how to hold onto that one expression forever. Before a single layer is painted, we spend hours studying the depth in their eyes, the direction of their fur, and the gentle tilt of their head.",
    p5: "Six acrylic layers later, what comes off the easel isn't a print — it's a small, living memory built by hand, crafted to last a lifetime. That's the promise we make with every portrait we package.",
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
    p2: "Fuzzy Berry begann mit Coco, meinem 16-jährigen Begleiter. Um die Zeit einzufangen und seinen sanften Blick zu bewahren, begann ich mit mehrschichtigem Handmalen auf klarem Acryl zu experimentieren.",
    p3: "Was als persönliche Hommage begann, wurde bald zur Kernleidenschaft unseres Studios: geliebte Tiererinnerungen in 3D-Kunstwerke zu verwandeln.",
    p4: "Jedes Porträt beginnt noch immer genauso: ein ruhiger Blick auf ein Foto und die Frage, wie man diesen einen Ausdruck für immer festhält. Bevor auch nur eine Schicht gemalt wird, verbringen wir Stunden damit, die Tiefe ihrer Augen, die Richtung ihres Fells und die sanfte Neigung ihres Kopfes zu studieren.",
    p5: "Sechs Acrylschichten später ist das, was von der Staffelei kommt, kein Druck — es ist eine kleine, lebendige Erinnerung, von Hand gefertigt, um ein Leben lang zu halten. Dieses Versprechen geben wir mit jedem Porträt, das wir verpacken.",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};
