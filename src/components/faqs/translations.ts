import type { Lang, NavTranslation } from "../site/navTypes";
import type { ProcessStepItem } from "./ProcessSteps";

export interface FaqsTranslation extends NavTranslation {
  kicker: string;
  title: string;
  privacy: string;
  returns: string;
}

export const TR: Record<Lang, FaqsTranslation> = {
  en: {
    navHome: "Home",
    navCollection: "Collection",
    navAbout: "About Us",
    navFaqs: "FAQs",
    navContact: "Contact us",
    startPortrait: "Start Your Portrait",
    kicker: "Need to know more?",
    title: "FAQs",
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
    kicker: "Noch Fragen?",
    title: "FAQs",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};

export interface FaqItem {
  q: string;
  summary: string;
  bullets: string[];
  process?: ProcessStepItem[];
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const FAQ_EN: FaqGroup[] = [
  {
    title: "About the Artwork & Process",
    items: [
      {
        q: "How do I choose the best photo for my custom portrait?",
        summary: "Bright, clear, close-up photos work best.",
        bullets: [
          "Good natural light, in focus",
          "Eyes and fur clearly visible",
          "Not sure? Send 2–3 photos — we'll help you pick",
        ],
      },
      {
        q: "How does the custom portrait process work?",
        summary: "We confirm everything with you before painting starts.",
        bullets: [],
        process: [
          {
            title: "Place your order",
            caption: "Pick your style and size, and upload your favorite photo.",
            icon: "order",
          },
          {
            title: "We confirm with you",
            caption: "We reach out to confirm the photo and your pet's placement.",
            icon: "confirm",
          },
          {
            title: "Hand-painted, layer by layer",
            caption: "Once you approve, painting begins — about 3 weeks, since each layer needs time to dry.",
            icon: "paint",
          },
          {
            title: "Finished & on its way",
            caption: "We send you a photo of the finished piece, then ship it out right away.",
            icon: "ship",
          },
          {
            title: "In your hands",
            caption: "Unbox your one-of-a-kind portrait and enjoy!",
            icon: "enjoy",
          },
        ],
      },
      {
        q: "What makes Fuzzy Berry's acrylic portraits unique?",
        summary: "Hand-painted in layers on clear acrylic for real 3D depth.",
        bullets: [
          "Not a print — every layer is hand-painted",
          "Creates a shimmering 3D effect",
          "A sleek, modern look for your home",
        ],
      },
      {
        q: "Can you create a portrait of a pet who has passed away?",
        summary: "Yes — made with love, to honor their memory.",
        bullets: [
          "Just let us know when you order",
          "We give these portraits extra gentle, loving care",
        ],
      },
    ],
  },
  {
    title: "Shipping & Packaging",
    items: [
      {
        q: "What is included in my package?",
        summary: "A complete, gift-ready package.",
        bullets: [
          "Your custom 3D acrylic pet portrait",
          "A free display easel",
          "A thank-you card and protective gift packaging",
        ],
      },
      {
        q: "Do you ship internationally, and how much does it cost?",
        summary: "Yes, we ship worldwide.",
        bullets: [
          "Cost is shown at checkout, based on destination",
          "Packed securely for safe delivery anywhere",
        ],
      },
    ],
  },
  {
    title: "Orders & Modifications",
    items: [
      {
        q: "How long does it take to create and receive my portrait?",
        summary: "About 2–3 weeks to paint, plus shipping time.",
        bullets: [
          "Each piece is hand-painted with care",
          "Add standard shipping time on top",
        ],
      },
      {
        q: "What if I want to cancel my order after placing it?",
        summary: "Only possible before painting begins.",
        bullets: [
          "We confirm all details with you first",
          "No refunds once painting has started",
        ],
      },
      {
        q: "Is it possible to rush my order?",
        summary: "Rush orders aren't available, but we'll try our best.",
        bullets: [
          "Every layer takes time to hand-paint",
          "Message us about your deadline and we'll help if we can",
        ],
      },
    ],
  },
  {
    title: "Gifting & Care",
    items: [
      {
        q: "Is a Fuzzy Berry portrait a good gift? Can you ship it directly to someone else?",
        summary: "Yes — a popular gift, shipped straight to them.",
        bullets: [
          "We ship directly to the recipient",
          "Add a handwritten note on request",
        ],
      },
      {
        q: "How do I clean and care for my acrylic portrait?",
        summary: "Just a soft, dry cloth.",
        bullets: [
          "Avoid harsh chemicals",
          "Keep out of direct sunlight",
        ],
      },
    ],
  },
];

export const FAQ_DE: FaqGroup[] = [
  {
    title: "Kunstwerk & Prozess",
    items: [
      {
        q: "Wie wähle ich das beste Foto für mein individuelles Porträt aus?",
        summary: "Helle, klare Nahaufnahmen wirken am besten.",
        bullets: [
          "Gutes natürliches Licht, scharf fokussiert",
          "Augen und Fell gut erkennbar",
          "Unsicher? Senden Sie uns 2–3 Fotos — wir helfen bei der Auswahl",
        ],
      },
      {
        q: "Wie läuft der individuelle Porträtprozess ab?",
        summary: "Wir bestätigen alles mit Ihnen, bevor wir malen.",
        bullets: [],
        process: [
          {
            title: "Bestellung aufgeben",
            caption: "Wählen Sie Stil und Größe und laden Sie Ihr Lieblingsfoto hoch.",
            icon: "order",
          },
          {
            title: "Wir bestätigen mit Ihnen",
            caption: "Wir melden uns, um Foto und Platzierung Ihres Haustiers zu bestätigen.",
            icon: "confirm",
          },
          {
            title: "Schicht für Schicht handgemalt",
            caption: "Nach Ihrer Freigabe beginnt das Malen — etwa 3 Wochen, da jede Schicht Zeit zum Trocknen braucht.",
            icon: "paint",
          },
          {
            title: "Fertig & unterwegs",
            caption: "Wir senden Ihnen ein Foto des fertigen Werks und verschicken es sofort.",
            icon: "ship",
          },
          {
            title: "In Ihren Händen",
            caption: "Packen Sie Ihr einzigartiges Porträt aus und genießen Sie es!",
            icon: "enjoy",
          },
        ],
      },
      {
        q: "Was macht die Acrylporträts von Fuzzy Berry einzigartig?",
        summary: "Schicht für Schicht handgemalt auf klarem Acryl — für echte 3D-Tiefe.",
        bullets: [
          "Kein Druck — jede Schicht ist handgemalt",
          "Erzeugt einen schimmernden 3D-Effekt",
          "Modern und elegant für Ihr Zuhause",
        ],
      },
      {
        q: "Können Sie ein Porträt eines verstorbenen Haustiers anfertigen?",
        summary: "Ja — mit Liebe gestaltet, um ihre Erinnerung zu ehren.",
        bullets: [
          "Sagen Sie es uns einfach bei der Bestellung",
          "Wir schenken diesen Porträts besondere, liebevolle Sorgfalt",
        ],
      },
    ],
  },
  {
    title: "Versand & Verpackung",
    items: [
      {
        q: "Was ist in meinem Paket enthalten?",
        summary: "Ein komplettes, geschenkfertiges Paket.",
        bullets: [
          "Ihr individuelles 3D-Acryl-Tierporträt",
          "Ein kostenloser Display-Ständer",
          "Dankeskarte und Schutzverpackung",
        ],
      },
      {
        q: "Versenden Sie international, und was kostet das?",
        summary: "Ja, wir versenden weltweit.",
        bullets: [
          "Kosten werden beim Checkout angezeigt, je nach Ziel",
          "Sicher verpackt für jeden Versandweg",
        ],
      },
    ],
  },
  {
    title: "Bestellungen & Änderungen",
    items: [
      {
        q: "Wie lange dauert es, mein Porträt zu erstellen und zu erhalten?",
        summary: "Etwa 2–3 Wochen Malzeit, plus Versand.",
        bullets: [
          "Jedes Stück wird sorgfältig handgemalt",
          "Dazu kommt die übliche Versandzeit",
        ],
      },
      {
        q: "Was, wenn ich meine Bestellung nach der Aufgabe stornieren möchte?",
        summary: "Nur vor Malbeginn möglich.",
        bullets: [
          "Wir bestätigen zuerst alle Details mit Ihnen",
          "Keine Rückerstattung nach Malbeginn",
        ],
      },
      {
        q: "Kann ich meine Bestellung beschleunigen lassen?",
        summary: "Express ist nicht möglich, aber wir tun unser Bestes.",
        bullets: [
          "Jede Schicht braucht Zeit zum Malen",
          "Schreiben Sie uns Ihren Wunschtermin",
        ],
      },
    ],
  },
  {
    title: "Geschenke & Pflege",
    items: [
      {
        q: "Ist ein Fuzzy-Berry-Porträt ein gutes Geschenk? Können Sie direkt an eine andere Adresse versenden?",
        summary: "Ja — ein beliebtes Geschenk, direkt verschickt.",
        bullets: [
          "Wir versenden direkt an die beschenkte Person",
          "Auf Wunsch mit handgeschriebener Karte",
        ],
      },
      {
        q: "Wie reinige und pflege ich mein Acrylporträt?",
        summary: "Nur ein weiches, trockenes Tuch.",
        bullets: [
          "Keine scharfen Reinigungsmittel",
          "Vor direkter Sonne schützen",
        ],
      },
    ],
  },
];
