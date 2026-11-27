import styles from "./askFirst.module.css";

// For visitors who aren't ready to pay yet: send a photo and ask first.
// €179 is a considered purchase, so a quick human answer often decides it.
const WHATSAPP_NUMBER = "4368864706201";
const EMAIL = "fuzzyberry.official@gmail.com";

const TEXT = {
  en: {
    lead: "Not sure yet?",
    body: "Send us a photo first and we'll honestly tell you if it works for a portrait.",
    wa: "Ask on WhatsApp",
    mail: "or by email",
    waMsg: "Hi Luna! I have a question about a portrait for my pet:",
    mailSubject: "Question about a portrait",
  },
  de: {
    lead: "Noch unsicher?",
    body: "Schicken Sie uns vorab ein Foto – wir sagen Ihnen ehrlich, ob es sich gut als Porträt eignet.",
    wa: "Per WhatsApp fragen",
    mail: "oder per E-Mail",
    waMsg: "Hallo Luna! Ich habe eine Frage zu einem Porträt für mein Haustier:",
    mailSubject: "Frage zu einem Porträt",
  },
} as const;

export default function AskFirst({ lang, className }: { lang: "en" | "de"; className?: string }) {
  const t = TEXT[lang];
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waMsg)}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(t.mailSubject)}`;
  return (
    <div className={`${styles.box} ${className ?? ""}`}>
      <p className={styles.text}>
        <strong>{t.lead}</strong> {t.body}
      </p>
      <div className={styles.actions}>
        <a href={waHref} target="_blank" rel="noopener" className={styles.wa}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
          </svg>
          {t.wa}
        </a>
        <a href={mailHref} className={styles.mail}>
          {t.mail}
        </a>
      </div>
    </div>
  );
}
