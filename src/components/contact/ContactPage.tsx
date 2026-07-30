"use client";

import { useState } from "react";
import { Baloo_2, Poppins } from "next/font/google";
import siteStyles from "../site/site.module.css";
import styles from "./ContactPage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import { useLang } from "../site/useLang";
import { TR } from "./translations";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

const WEB3FORMS_ACCESS_KEY = "fa49818e-4ccc-4fff-b623-0c76d8bf6024";

export default function ContactPage() {
  const [lang, setLang] = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const t = TR[lang];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New message from the Fuzzy Berry contact form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={`${siteStyles.page} ${baloo.variable} ${poppins.variable}`}>
      <SiteNav t={t} lang={lang} onLangChange={setLang} current="contact" />

      <section className={styles.grid}>
        <div>
          <p className={siteStyles.kicker}>{t.kicker}</p>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.emailLine}>
            <a href="mailto:fuzzyberry.official@gmail.com" className={styles.emailLink}>
              fuzzyberry.official@gmail.com
            </a>
          </p>
          <div className={styles.socialRow}>
            <a
              href="https://www.instagram.com/fuzzyberry.official?igsh=MTVtaHc0N2k0N2M1Yg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className={siteStyles.socialIcon}
              style={{ background: "var(--berry)" }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61584210684045"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className={siteStyles.socialIcon}
              style={{ background: "var(--plum)" }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
              </svg>
            </a>
            <a
              href="https://wa.me/4368864706201"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className={siteStyles.socialIcon}
              style={{ background: "#25D366" }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.5 3.5a10.5 10.5 0 0 0-17.2 12L2 21l5.7-1.3A10.5 10.5 0 0 0 20.5 3.5Z" />
                <path d="M8.5 8.3c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4-.5.9-1 .9-.7 1.4.9 1.5 1.8 2 3.1 2.6.2.1.4.1.5-.1.2-.2.7-.8.9-1.1.2-.2.3-.2.6-.1.2.1 1.5.7 1.8.8.3.1.4.2.5.3.1.2.1.9-.2 1.7-.3.8-1.6 1.5-2.3 1.6-.6.1-1.3.1-4.5-1.3-3.8-1.7-6.2-6.3-6.4-6.6-.2-.3-1.5-2-1.5-3.9 0-1.9 1-2.8 1.3-3.2Z" />
              </svg>
            </a>
          </div>
          <p className={styles.storesLine}>{t.stores}</p>
        </div>

        {submitted ? (
          <div className={styles.thanksBox}>
            <div className={styles.thanksTitle}>{t.thanksTitle}</div>
            <p className={styles.thanksBody}>{t.thanksBody}</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <label className={siteStyles.fieldLabel}>{t.name}</label>
              <input className={siteStyles.input} type="text" name="name" required />
            </div>
            <div>
              <label className={siteStyles.fieldLabel}>{t.email}</label>
              <input className={siteStyles.input} type="email" name="email" required />
            </div>
            <div>
              <label className={siteStyles.fieldLabel}>{t.message}</label>
              <textarea className={`${siteStyles.input} ${siteStyles.textarea}`} rows={4} name="message" required />
            </div>
            {status === "error" && <p className={styles.errorMsg}>{t.errorMsg}</p>}
            <button
              type="submit"
              className={`${siteStyles.btn} ${siteStyles.btnPrimary} ${styles.submitBtn}`}
              disabled={status === "sending"}
            >
              {status === "sending" ? t.sending : t.submit}
            </button>
          </form>
        )}
      </section>

      <SiteFooter
        links={[
          { href: "/policies#privacy", label: t.privacy },
          { href: "/policies#returns", label: t.returns },
        ]}
      />
    </div>
  );
}
