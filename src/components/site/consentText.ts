import type { Lang } from "./navTypes";

export const CONSENT_TEXT: Record<
  Lang,
  {
    title: string;
    body: string;
    privacy: string;
    necessaryOnly: string;
    acceptAll: string;
    settings: string;
    save: string;
    necessaryName: string;
    necessaryHint: string;
    externalName: string;
    externalHint: string;
    marketingName: string;
    marketingHint: string;
    footerLink: string;
    gateInstagram: string;
    gateMap: string;
    gateLoad: string;
    gateOpenInstagram: string;
    gateOpenMaps: string;
  }
> = {
  de: {
    title: "Ihre Privatsphäre",
    body: "Mit Ihrer Einwilligung zeigen wir Instagram-Beiträge und eine Karte und messen unsere Werbung. Ohne sie bleibt die Seite voll nutzbar.",
    privacy: "Datenschutz",
    necessaryOnly: "Ablehnen",
    acceptAll: "Akzeptieren",
    settings: "Einstellungen",
    save: "Auswahl speichern",
    necessaryName: "Notwendig",
    necessaryHint: "Sprache und diese Auswahl. Immer aktiv.",
    externalName: "Externe Inhalte",
    externalHint: "Instagram und Google-Karte. Ihre Daten gehen an Meta bzw. Google.",
    marketingName: "Marketing",
    marketingHint: "Meta-Pixel: misst Besuche und Käufe für unsere Werbung.",
    footerLink: "Cookie-Einstellungen",
    gateInstagram: "Instagram wird erst nach Ihrer Zustimmung geladen.",
    gateMap: "Die Karte wird erst nach Ihrer Zustimmung geladen.",
    gateLoad: "Laden",
    gateOpenInstagram: "Auf Instagram ansehen",
    gateOpenMaps: "In Google Maps öffnen",
  },
  en: {
    title: "Your privacy",
    body: "With your consent, we show Instagram posts and a map and measure our ads. The site works fully without it.",
    privacy: "Privacy policy",
    necessaryOnly: "Decline",
    acceptAll: "Accept",
    settings: "Settings",
    save: "Save choices",
    necessaryName: "Necessary",
    necessaryHint: "Language and this choice. Always on.",
    externalName: "External content",
    externalHint: "Instagram and Google map. Your data goes to Meta or Google.",
    marketingName: "Marketing",
    marketingHint: "Meta Pixel: measures visits and purchases for our ads.",
    footerLink: "Cookie settings",
    gateInstagram: "Instagram loads only with your consent.",
    gateMap: "The map loads only with your consent.",
    gateLoad: "Load",
    gateOpenInstagram: "View on Instagram",
    gateOpenMaps: "Open in Google Maps",
  },
};
