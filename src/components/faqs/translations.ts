import type { Lang, NavTranslation } from "../site/navTypes";
import type { ProcessStepItem } from "../site/ProcessSteps";

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
    navShowroom: "Visit Us",
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
    navShowroom: "Showroom",
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
        q: "How does the custom portrait process work?",
        summary: "We confirm everything with you before painting starts.",
        bullets: [],
        process: [
          {
            title: "Place your order",
            caption: "Pick your style and size, and upload your favorite photos.",
            icon: "order",
          },
          {
            title: "We confirm with you",
            caption: "We reach out to confirm the photo and your pet's position.",
            icon: "confirm",
          },
          {
            title: "Hand-painted, layer by layer",
            caption: "Once approved, painting begins! Each custom portrait takes about 3 weeks, allowing each layer of acrylic time to dry and cure for fine 3D detail.",
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
        q: "How do I choose the best photo for my custom portrait?",
        summary: "Bright, clear, close-up photos work best!",
        bullets: [
          "Natural light & sharp focus: Crisp details in their eyes and fur.",
          "Eye-level angle: Captures their true expression and 3D depth.",
          "Unsure? Send 2–3 favorites — we'll help you pick!",
        ],
      },
      {
        q: "What makes Fuzzy Berry's acrylic portraits unique?",
        summary: "100% hand-painted in multi-layered acrylic for real 3D depth.",
        bullets: [
          "True hand-painted fine art: No prints — every single layer is painted by hand onto clear acrylic",
          "Luminous 3D effect: Light passes through the layers to bring your pet's eyes and fur to life",
          "Modern keepsake: A sleek, timeless art piece designed to elevate any room",
        ],
      },
      {
        q: "Can you create a portrait of a pet who has passed away?",
        summary: "Yes, absolutely — made with extra care to honor their memory.",
        bullets: [
          "Simply let us know when ordering or sending your photos",
          "We take special heart in capturing their spirit and creating a meaningful tribute for you",
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
        q: "What if I want to cancel my order after placing it?",
        summary: "Cancellations are accepted before painting begins.",
        bullets: [
          "Before painting: You can cancel for a full refund before you confirm final details with us",
          "Once painting starts: Because each portrait is custom-made, refunds are no longer possible once hand-painting has begun",
        ],
      },
      {
        q: "Is it possible to rush my order?",
        summary: "While we don't offer standard rush shipping, we'll always try our best to help!",
        bullets: [
          "Hand-painted precision: Every layer requires specific drying and curing time",
          "Need it by a specific date? Drop us a message before ordering — if our studio schedule allows, we'll do our absolute best to accommodate you",
        ],
      },
    ],
  },
  {
    title: "Gifting & Care",
    items: [
      {
        q: "Is a Fuzzy Berry portrait a good gift? Can you ship it directly to someone else?",
        summary: "Yes — it's one of our most popular gifts, and we can ship directly to them!",
        bullets: [
          "Direct shipping: Simply enter the recipient's address at checkout",
          "Special requests? Let us know in the order notes or send us a message — we'll gladly see what we can do for you!",
        ],
      },
      {
        q: "How do I clean and care for my acrylic portrait?",
        summary: "Care is simple! Just a few gentle steps to keep it glowing:",
        bullets: [
          "Dust gently: Wipe softly with a dry, lint-free microfiber cloth",
          "Avoid chemicals: Skip harsh cleaners, alcohol, or glass sprays on the clear acrylic",
          "Display with care: Keep out of direct, intense sunlight to protect the artwork over time",
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
        q: "Wie läuft der individuelle Porträtprozess ab?",
        summary: "Wir bestätigen alles mit Ihnen, bevor wir malen.",
        bullets: [],
        process: [
          {
            title: "Bestellung aufgeben",
            caption: "Wählen Sie Stil und Größe und laden Sie Ihre Lieblingsfotos hoch.",
            icon: "order",
          },
          {
            title: "Wir bestätigen mit Ihnen",
            caption: "Wir melden uns, um Foto und Position Ihres Haustiers zu bestätigen.",
            icon: "confirm",
          },
          {
            title: "Schicht für Schicht handgemalt",
            caption: "Nach der Freigabe beginnt das Malen! Jedes individuelle Porträt braucht etwa 3 Wochen, damit jede Acrylschicht Zeit zum Trocknen und Aushärten hat — für feine 3D-Details.",
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
        q: "Wie wähle ich das beste Foto für mein individuelles Porträt aus?",
        summary: "Helle, klare Nahaufnahmen wirken am besten!",
        bullets: [
          "Natürliches Licht & scharfer Fokus: Klare Details bei Augen und Fell.",
          "Augenhöhe: Fängt den echten Ausdruck und die 3D-Tiefe ein.",
          "Unsicher? Senden Sie uns 2–3 Favoriten — wir helfen bei der Auswahl!",
        ],
      },
      {
        q: "Was macht die Acrylporträts von Fuzzy Berry einzigartig?",
        summary: "100 % handgemalt in mehrschichtigem Acryl — für echte 3D-Tiefe.",
        bullets: [
          "Echte handgemalte Kunst: Kein Druck — jede einzelne Schicht wird von Hand auf klares Acryl gemalt",
          "Leuchtender 3D-Effekt: Licht durchdringt die Schichten und lässt Augen und Fell lebendig wirken",
          "Modernes Andenken: Ein elegantes, zeitloses Kunstwerk für jeden Raum",
        ],
      },
      {
        q: "Können Sie ein Porträt eines verstorbenen Haustiers anfertigen?",
        summary: "Ja, selbstverständlich — mit besonderer Sorgfalt, um ihre Erinnerung zu ehren.",
        bullets: [
          "Sagen Sie es uns einfach bei der Bestellung oder beim Einsenden Ihrer Fotos",
          "Es liegt uns besonders am Herzen, ihren Charakter einzufangen und ein bedeutungsvolles Andenken für Sie zu schaffen",
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
        q: "Was, wenn ich meine Bestellung nach der Aufgabe stornieren möchte?",
        summary: "Stornierungen sind vor Malbeginn möglich.",
        bullets: [
          "Vor dem Malen: Sie können stornieren und erhalten eine volle Rückerstattung, bevor die finalen Details bestätigt werden",
          "Nach Malbeginn: Da jedes Porträt individuell angefertigt wird, ist eine Rückerstattung nach Beginn des Handmalens nicht mehr möglich",
        ],
      },
      {
        q: "Kann ich meine Bestellung beschleunigen lassen?",
        summary: "Express-Versand bieten wir standardmäßig nicht an, aber wir tun immer unser Bestes!",
        bullets: [
          "Handgemalte Präzision: Jede Schicht braucht ihre eigene Trocken- und Aushärtezeit",
          "Brauchen Sie es bis zu einem bestimmten Datum? Schreiben Sie uns vor der Bestellung — wenn es unser Zeitplan zulässt, tun wir unser Möglichstes",
        ],
      },
    ],
  },
  {
    title: "Geschenke & Pflege",
    items: [
      {
        q: "Ist ein Fuzzy-Berry-Porträt ein gutes Geschenk? Können Sie direkt an eine andere Adresse versenden?",
        summary: "Ja — es ist eines unserer beliebtesten Geschenke, und wir versenden gerne direkt an sie!",
        bullets: [
          "Direktversand: Geben Sie einfach die Adresse der beschenkten Person beim Checkout an",
          "Besondere Wünsche? Teilen Sie es uns in den Bestellhinweisen mit oder schreiben Sie uns — wir schauen gerne, was wir für Sie tun können!",
        ],
      },
      {
        q: "Wie reinige und pflege ich mein Acrylporträt?",
        summary: "Die Pflege ist einfach! Nur ein paar sanfte Schritte, damit es weiter strahlt:",
        bullets: [
          "Sanft abstauben: Vorsichtig mit einem trockenen, fusselfreien Mikrofasertuch abwischen",
          "Chemikalien vermeiden: Keine scharfen Reiniger, Alkohol oder Glasreiniger auf dem klaren Acryl",
          "Achtsam aufstellen: Vor direkter, intensiver Sonneneinstrahlung schützen, um das Kunstwerk dauerhaft zu bewahren",
        ],
      },
    ],
  },
];
