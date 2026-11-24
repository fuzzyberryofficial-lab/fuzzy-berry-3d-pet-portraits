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
    navGift: "Gift Voucher",
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
    navGift: "Gutschein",
    startPortrait: "Porträt bestellen",
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
        q: "Wie läuft die Anfertigung eines individuellen Porträts ab?",
        summary: "Wir stimmen alles mit Ihnen ab, bevor das Malen beginnt.",
        bullets: [],
        process: [
          {
            title: "Bestellung aufgeben",
            caption: "Wählen Sie Stil und Größe und laden Sie Ihre Lieblingsfotos hoch.",
            icon: "order",
          },
          {
            title: "Wir stimmen uns mit Ihnen ab",
            caption: "Wir melden uns, um Foto und Pose Ihres Tieres mit Ihnen abzustimmen.",
            icon: "confirm",
          },
          {
            title: "Schicht für Schicht handgemalt",
            caption: "Nach Ihrer Freigabe geht es los! Jedes Porträt braucht etwa 3 Wochen, denn jede Acrylschicht muss in Ruhe trocknen und aushärten – das sorgt für feine 3D-Details.",
            icon: "paint",
          },
          {
            title: "Fertig & unterwegs",
            caption: "Sie erhalten ein Foto des fertigen Kunstwerks, danach verschicken wir es sofort.",
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
        q: "Welches Foto eignet sich am besten für mein Porträt?",
        summary: "Helle, scharfe Nahaufnahmen funktionieren am besten!",
        bullets: [
          "Natürliches Licht und scharfer Fokus: Augen und Fell sind klar erkennbar.",
          "Auf Augenhöhe fotografiert: So werden der echte Ausdruck und die 3D-Tiefe am besten eingefangen.",
          "Unsicher? Schicken Sie uns 2–3 Favoriten – wir helfen Ihnen bei der Auswahl!",
        ],
      },
      {
        q: "Was macht die Acrylporträts von Fuzzy Berry einzigartig?",
        summary: "100 % handgemalt in mehreren Acrylschichten – für echte 3D-Tiefe.",
        bullets: [
          "Echte Handarbeit: Kein Druck – jede einzelne Schicht wird von Hand auf klares Acryl gemalt",
          "Leuchtender 3D-Effekt: Licht durchdringt die Schichten und lässt Augen und Fell lebendig wirken",
          "Modernes Erinnerungsstück: Ein elegantes, zeitloses Kunstwerk, das jeden Raum aufwertet",
        ],
      },
      {
        q: "Können Sie ein Porträt eines verstorbenen Haustiers anfertigen?",
        summary: "Ja, sehr gerne – mit besonderer Sorgfalt, um die Erinnerung an Ihr Tier zu ehren.",
        bullets: [
          "Geben Sie uns einfach bei der Bestellung oder beim Senden Ihrer Fotos Bescheid",
          "Es liegt uns besonders am Herzen, das Wesen Ihres Tieres einzufangen und ein bedeutungsvolles Andenken für Sie zu schaffen",
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
          "Ein kostenloser Aufsteller",
          "Eine Dankeskarte und eine geschenkfertige Schutzverpackung",
        ],
      },
      {
        q: "Versenden Sie auch ins Ausland, und was kostet das?",
        summary: "Ja, wir versenden weltweit.",
        bullets: [
          "Die Versandkosten werden im Checkout je nach Zielland angezeigt",
          "Sicher verpackt, damit es überall heil ankommt",
        ],
      },
    ],
  },
  {
    title: "Bestellungen & Änderungen",
    items: [
      {
        q: "Kann ich meine Bestellung nachträglich stornieren?",
        summary: "Stornierungen sind vor Malbeginn möglich.",
        bullets: [
          "Vor dem Malen: Sie erhalten eine volle Rückerstattung, solange wir die finalen Details noch nicht gemeinsam bestätigt haben",
          "Sobald das Malen begonnen hat: Da jedes Porträt eine Einzelanfertigung ist, ist danach keine Rückerstattung mehr möglich",
        ],
      },
      {
        q: "Kann ich meine Bestellung beschleunigen lassen?",
        summary: "Eine Expressanfertigung bieten wir nicht standardmäßig an, aber wir versuchen immer zu helfen!",
        bullets: [
          "Präzise Handarbeit braucht Zeit: Jede Schicht muss einzeln trocknen und aushärten",
          "Brauchen Sie es bis zu einem bestimmten Termin? Schreiben Sie uns vor der Bestellung – wenn es unser Zeitplan erlaubt, tun wir unser Möglichstes",
        ],
      },
    ],
  },
  {
    title: "Geschenke & Pflege",
    items: [
      {
        q: "Eignet sich ein Fuzzy-Berry-Porträt als Geschenk? Können Sie direkt an die beschenkte Person liefern?",
        summary: "Ja – es ist eines unserer beliebtesten Geschenke, und wir liefern gerne direkt an die beschenkte Person!",
        bullets: [
          "Direktversand: Geben Sie im Checkout einfach die Adresse der beschenkten Person an",
          "Besondere Wünsche? Schreiben Sie sie in die Bestellhinweise oder senden Sie uns eine Nachricht – wir schauen gern, was möglich ist!",
        ],
      },
      {
        q: "Wie reinige und pflege ich mein Acrylporträt?",
        summary: "Die Pflege ist ganz einfach – mit ein paar sanften Handgriffen strahlt es lange:",
        bullets: [
          "Sanft abstauben: Vorsichtig mit einem trockenen, fusselfreien Mikrofasertuch abwischen",
          "Keine Chemie: Verwenden Sie keine scharfen Reiniger, keinen Alkohol und keinen Glasreiniger auf dem klaren Acryl",
          "Richtig aufstellen: Vor direkter, intensiver Sonne schützen, damit das Kunstwerk lange schön bleibt",
        ],
      },
    ],
  },
];
