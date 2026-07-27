export type Lang = "en" | "de";

export type NavPage = "home" | "collection" | "about" | "faqs" | "contact";

export interface NavTranslation {
  navHome: string;
  navCollection: string;
  navAbout: string;
  navFaqs: string;
  navContact: string;
  startPortrait: string;
}
