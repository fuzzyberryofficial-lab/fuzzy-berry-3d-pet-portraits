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
              style={{ background: "#1877F2" }}
            >
              <svg width="13" height="20" viewBox="0 0 320 512" fill="currentColor">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
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
              <svg width="19" height="19" viewBox="0 0 448 512" fill="currentColor">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
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
