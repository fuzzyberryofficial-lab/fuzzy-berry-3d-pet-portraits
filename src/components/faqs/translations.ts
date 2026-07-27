import type { Lang, NavTranslation } from "../site/navTypes";

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
  a: string;
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
        a: "High-resolution photos taken in good natural light work best! Photos where your pet is at eye level and their eyes/fur details are clearly visible yield the best 3D results. If you're unsure, feel free to send us 2–3 photos, and our artist will help you choose the best one!",
      },
      {
        q: "How does the custom portrait process work?",
        a: "Once you place your order, we will reach out to you personally to confirm your pet's photo, the artwork details, and placement. We only start painting after you approve the initial confirmation, ensuring your pet's unique spirit is captured just right!",
      },
      {
        q: "What makes Fuzzy Berry's acrylic portraits unique?",
        a: "Unlike flat printed photos or traditional canvas, we hand-paint your pet layer-by-layer on crystal-clear acrylic panels. This creates a mesmerizing multi-layered 3D depth, optical shimmer, and a sleek modern look for your home.",
      },
      {
        q: "Can you create a portrait of a pet who has passed away?",
        a: "Absolutely — many of our portraits are made in loving memory. Just let us know when you order, and our artist will handle your photos with extra care to capture their spirit exactly as you remember them.",
      },
      {
        q: "Can I request changes to the confirmation before painting starts?",
        a: "Of course. When we send your confirmation, feel free to ask for changes to the pose, crop, or details — we'll adjust until you're happy, all before a single layer is painted.",
      },
    ],
  },
  {
    title: "Shipping & Packaging",
    items: [
      {
        q: "What is included in my package?",
        a: "Every order comes as a complete gift-ready package: your custom 3D acrylic pet portrait, a complimentary display easel (wooden or acrylic), a Fuzzy Berry thank-you card, and multi-layer protective gift packaging.",
      },
      {
        q: "Do you ship internationally, and how much does it cost?",
        a: "Yes, we offer worldwide shipping on all orders! Every piece is wrapped securely with multi-layer protective foam to ensure it arrives safely at your doorstep, wherever you are.",
      },
    ],
  },
  {
    title: "Orders & Modifications",
    items: [
      {
        q: "How long does it take to create and receive my portrait?",
        a: "Because each piece is meticulously hand-painted layer by layer, production usually takes 2–3 weeks, plus standard international shipping time. We appreciate your patience as we craft your bespoke artwork with love!",
      },
      {
        q: "What if I want to cancel my order after placing it?",
        a: "We personally confirm all the artwork details with you before we begin. However, once our artist has started the drafting process, we cannot offer a refund, as each piece is entirely custom-made and handcrafted with love.",
      },
      {
        q: "Is it possible to rush my order?",
        a: "We hand-paint every layer with care, so rush production isn't available — but message us and we'll always do our best for a special date.",
      },
    ],
  },
  {
    title: "Payment, Gifting & Care",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards, as well as PayPal, at checkout.",
      },
      {
        q: "Is a Fuzzy Berry portrait a good gift? Can you ship it directly to someone else?",
        a: "It's one of our most popular gifts! We can ship straight to the recipient and tuck in a handwritten note — just add the details at checkout or mention it to us.",
      },
      {
        q: "How do I clean and care for my acrylic portrait?",
        a: "A soft, dry microfiber cloth is all it needs. Avoid harsh chemicals, and keep it out of direct, prolonged sunlight to preserve the colors.",
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
        a: "Hochauflösende Fotos bei gutem, natürlichem Licht funktionieren am besten! Fotos, auf denen Ihr Haustier auf Augenhöhe ist und Augen/Fell klar erkennbar sind, liefern die besten 3D-Ergebnisse. Sind Sie unsicher, senden Sie uns gerne 2–3 Fotos — unser Künstler hilft Ihnen bei der Auswahl!",
      },
      {
        q: "Wie läuft der individuelle Porträtprozess ab?",
        a: "Nach Ihrer Bestellung melden wir uns persönlich, um Foto, Kunstwerk-Details und Platzierung zu bestätigen. Wir beginnen erst zu malen, nachdem Sie die erste Bestätigung freigegeben haben — so wird der einzigartige Charakter Ihres Haustiers genau eingefangen!",
      },
      {
        q: "Was macht die Acrylporträts von Fuzzy Berry einzigartig?",
        a: "Anders als bei flachen Fotodrucken oder klassischer Leinwand malen wir Ihr Haustier Schicht für Schicht handgemalt auf kristallklare Acrylplatten. Das erzeugt eine faszinierende, mehrschichtige 3D-Tiefe, optisches Schimmern und einen modernen, eleganten Look für Ihr Zuhause.",
      },
      {
        q: "Können Sie ein Porträt eines verstorbenen Haustiers anfertigen?",
        a: "Ja, sehr gerne — viele unserer Porträts entstehen in liebevoller Erinnerung. Sagen Sie uns bei der Bestellung Bescheid, und unser Künstler geht besonders behutsam mit Ihren Fotos um, um den Charakter genau so einzufangen, wie Sie ihn in Erinnerung haben.",
      },
      {
        q: "Kann ich vor Beginn des Malens noch Änderungen wünschen?",
        a: "Natürlich. Bei der Bestätigung können Sie jederzeit Pose, Ausschnitt oder Details anpassen lassen — wir überarbeiten, bis Sie zufrieden sind, bevor auch nur eine Schicht gemalt wird.",
      },
    ],
  },
  {
    title: "Versand & Verpackung",
    items: [
      {
        q: "Was ist in meinem Paket enthalten?",
        a: "Jede Bestellung kommt als komplettes, geschenkfertiges Paket: Ihr individuelles 3D-Acryl-Tierporträt, ein kostenloser Display-Ständer (Holz oder Acryl), eine Fuzzy-Berry-Dankeskarte und mehrschichtige Schutzverpackung.",
      },
      {
        q: "Versenden Sie international, und was kostet das?",
        a: "Ja, wir bieten weltweiten Versand für alle Bestellungen! Jedes Stück wird sicher mit mehrschichtigem Schutzschaum verpackt, damit es sicher bei Ihnen ankommt, egal wo Sie sind.",
      },
    ],
  },
  {
    title: "Bestellungen & Änderungen",
    items: [
      {
        q: "Wie lange dauert es, mein Porträt zu erstellen und zu erhalten?",
        a: "Da jedes Stück sorgfältig Schicht für Schicht handgemalt wird, dauert die Produktion meist 2–3 Wochen, plus die übliche internationale Versandzeit. Wir danken Ihnen für Ihre Geduld, während wir Ihr individuelles Kunstwerk mit Liebe anfertigen!",
      },
      {
        q: "Was, wenn ich meine Bestellung nach der Aufgabe stornieren möchte?",
        a: "Wir bestätigen alle Kunstwerk-Details persönlich mit Ihnen, bevor wir beginnen. Sobald unser Künstler jedoch mit dem Entwurf begonnen hat, können wir keine Rückerstattung mehr anbieten, da jedes Stück komplett individuell und mit Liebe handgefertigt wird.",
      },
      {
        q: "Kann ich meine Bestellung beschleunigen lassen?",
        a: "Da wir jede Schicht sorgfältig von Hand malen, ist eine Express-Produktion leider nicht möglich — aber schreiben Sie uns bei einem besonderen Termin, wir tun unser Bestes.",
      },
    ],
  },
  {
    title: "Zahlung, Geschenke & Pflege",
    items: [
      {
        q: "Welche Zahlungsmethoden akzeptieren Sie?",
        a: "Wir akzeptieren alle gängigen Kredit- und Debitkarten sowie PayPal beim Checkout.",
      },
      {
        q: "Ist ein Fuzzy-Berry-Porträt ein gutes Geschenk? Können Sie direkt an eine andere Adresse versenden?",
        a: "Es ist eines unserer beliebtesten Geschenke! Wir versenden gerne direkt an die beschenkte Person und legen eine handgeschriebene Karte bei — geben Sie es einfach beim Checkout an oder schreiben Sie uns.",
      },
      {
        q: "Wie reinige und pflege ich mein Acrylporträt?",
        a: "Ein weiches, trockenes Mikrofasertuch genügt. Vermeiden Sie scharfe Reinigungsmittel und direkte, dauerhafte Sonneneinstrahlung, damit die Farben erhalten bleiben.",
      },
    ],
  },
];
