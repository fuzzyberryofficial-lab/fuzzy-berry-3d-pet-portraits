export type Lang = "en" | "de";

export type NavPage = "home" | "collection" | "about" | "faqs" | "contact" | "showroom";

export interface NavTranslation {
  navHome: string;
  navCollection: string;
  navAbout: string;
  navFaqs: string;
  navContact: string;
  navShowroom: string;
  startPortrait: string;
}
