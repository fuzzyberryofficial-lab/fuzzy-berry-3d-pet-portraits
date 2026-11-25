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
    body: "Wir zeigen gern Instagram-Beiträge und eine Karte und messen mit dem Meta-Pixel, welche Werbung wirkt. Das geht nur mit Ihrer Einwilligung. Ohne sie bleibt die Seite voll nutzbar.",
    privacy: "Datenschutz",
    necessaryOnly: "Nur notwendige",
    acceptAll: "Alle akzeptieren",
    settings: "Einstellungen",
    save: "Auswahl speichern",
    necessaryName: "Notwendig",
    necessaryHint: "Speichert Ihre Sprache und diese Auswahl. Immer aktiv.",
    externalName: "Externe Inhalte",
    externalHint: "Instagram-Beiträge und Google-Karte. Dabei werden Daten an Instagram (Meta) bzw. Google übertragen.",
    marketingName: "Marketing",
    marketingHint: "Meta-Pixel für Facebook und Instagram: misst Besuche und Käufe, um Werbung zu verbessern.",
    footerLink: "Cookie-Einstellungen",
    gateInstagram: "Instagram-Beiträge werden erst nach Ihrer Zustimmung geladen, weil dabei Daten an Instagram übertragen werden.",
    gateMap: "Die Karte wird erst nach Ihrer Zustimmung geladen, weil dabei Daten an Google übertragen werden.",
    gateLoad: "Inhalt laden",
    gateOpenInstagram: "Auf Instagram ansehen",
    gateOpenMaps: "In Google Maps öffnen",
  },
  en: {
    title: "Your privacy",
    body: "We'd like to show Instagram posts and a map, and use the Meta Pixel to see which ads work. We only do that with your consent. The site works fully without it.",
    privacy: "Privacy policy",
    necessaryOnly: "Necessary only",
    acceptAll: "Accept all",
    settings: "Settings",
    save: "Save choices",
    necessaryName: "Necessary",
    necessaryHint: "Remembers your language and this choice. Always on.",
    externalName: "External content",
    externalHint: "Instagram posts and the Google map. Your visit is shared with Instagram (Meta) or Google.",
    marketingName: "Marketing",
    marketingHint: "Meta Pixel for Facebook and Instagram: measures visits and purchases to improve ads.",
    footerLink: "Cookie settings",
    gateInstagram: "Instagram posts load only with your consent, because your visit is shared with Instagram.",
    gateMap: "The map loads only with your consent, because your visit is shared with Google.",
    gateLoad: "Load content",
    gateOpenInstagram: "View on Instagram",
    gateOpenMaps: "Open in Google Maps",
  },
};
