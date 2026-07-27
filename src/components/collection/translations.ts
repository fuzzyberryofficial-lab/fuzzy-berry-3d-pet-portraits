import type { Lang, NavTranslation } from "../site/navTypes";

export interface CollectionTranslation extends NavTranslation {
  pageKicker: string;
  pageTitle: string;
  pageSub: string;
  singleTitle: string;
  singleSub: string;
  multiTitle: string;
  multiSub: string;
  thType: string;
  thSize: string;
  thPrice: string;
  frameAddon: string;
  ctaTitle: string;
  ctaSub: string;
  privacy: string;
  returns: string;
}

export const TR: Record<Lang, CollectionTranslation> = {
  en: {
    navHome: "Home",
    navCollection: "Collection",
    navAbout: "About Us",
    navFaqs: "FAQs",
    navContact: "Contact us",
    startPortrait: "Start Your Portrait",
    pageKicker: "Our Collection",
    pageTitle: "Single & Multi Pet Portraits",
    pageSub: "Pick the size and pricing for your piece — add a frame at checkout.",
    singleTitle: "Single Pet Collection",
    singleSub: "For one best friend, in fine detail.",
    multiTitle: "Multi Pet Collection",
    multiSub: "For households with more than one heart to honor.",
    thType: "Type",
    thSize: "Size",
    thPrice: "Price €",
    frameAddon: "Add a frame (optional)",
    ctaTitle: "Ready to begin?",
    ctaSub: "Upload a photo and we'll take it from there.",
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
    pageKicker: "Unsere Kollektion",
    pageTitle: "Einzel- & Mehrtier-Porträts",
    pageSub: "Wählen Sie Größe und Preis — einen Rahmen fügen Sie im Checkout hinzu.",
    singleTitle: "Einzeltier-Kollektion",
    singleSub: "Für einen besten Freund, in feinem Detail.",
    multiTitle: "Mehrtier-Kollektion",
    multiSub: "Für Haushalte mit mehr als einem Herzen zu ehren.",
    thType: "Typ",
    thSize: "Größe",
    thPrice: "Preis €",
    frameAddon: "Rahmen hinzufügen (optional)",
    ctaTitle: "Bereit anzufangen?",
    ctaSub: "Laden Sie ein Foto hoch — wir übernehmen den Rest.",
    privacy: "Datenschutz",
    returns: "Rückgaberecht",
  },
};

export const SINGLE_PET_ROWS: Record<Lang, { type: string; size: string; price: number }[]> = {
  en: [
    { type: "Head Portrait", size: "20×20 cm", price: 179 },
    { type: "Head Portrait", size: "25×25 cm", price: 199 },
    { type: "Head Portrait", size: "30×30 cm", price: 209 },
    { type: "Half / Full Body", size: "25×25 cm", price: 209 },
    { type: "Half / Full Body", size: "20×30 cm", price: 229 },
    { type: "Half / Full Body", size: "30×30 cm", price: 229 },
  ],
  de: [
    { type: "Kopfporträt", size: "20×20 cm", price: 179 },
    { type: "Kopfporträt", size: "25×25 cm", price: 199 },
    { type: "Kopfporträt", size: "30×30 cm", price: 209 },
    { type: "Halb- / Ganzkörper", size: "25×25 cm", price: 209 },
    { type: "Halb- / Ganzkörper", size: "20×30 cm", price: 229 },
    { type: "Halb- / Ganzkörper", size: "30×30 cm", price: 229 },
  ],
};

export const MULTI_PET_ROWS: Record<Lang, { type: string; size: string; price: number }[]> = {
  en: [
    { type: "Double Pets", size: "20×30 cm", price: 279 },
    { type: "Double Pets", size: "20×40 cm", price: 279 },
    { type: "Triple Pets", size: "20×40 cm", price: 329 },
  ],
  de: [
    { type: "Zwei Tiere", size: "20×30 cm", price: 279 },
    { type: "Zwei Tiere", size: "20×40 cm", price: 279 },
    { type: "Drei Tiere", size: "20×40 cm", price: 329 },
  ],
};

export interface GalleryItem {
  name: string;
  src: string;
  objectPosition?: string;
  scale?: number;
  transform?: string;
}

export const SINGLE_GALLERY_ITEMS: GalleryItem[] = [
  { name: "20×20 cm", src: "/images/Single Pet Collection-20x20cm.jpg" },
  { name: "20×30 cm", src: "/images/Single Pet Collection-20x30cm.jpg", scale: 1.25 },
  { name: "25×25 cm", src: "/images/Single Pet Collection-25x25cm.png" },
  { name: "30×30 cm", src: "/images/Single Pet Collection-30x30cm.png" },
];

export const MULTI_GALLERY_ITEMS: GalleryItem[] = [
  { name: "20×30 cm", src: "/images/Multi Pet Collection-20x30cm-1.jpg" },
  { name: "20×30 cm", src: "/images/Multi Pet Collection-20x30cm-2.jpg" },
  { name: "20×40 cm", src: "/images/Multi Pet Collection-20x40cm-1.png", transform: "scale(1.25) translateX(-8%)" },
  { name: "20×40 cm", src: "/images/Multi Pet Collection-20x40cm-2.jpg", scale: 1.25 },
];

export const GALLERY_ROTATIONS = [-2, 1, -1, 2];
