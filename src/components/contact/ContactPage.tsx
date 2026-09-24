"use client";

import { useState } from "react";
import Link from "next/link";
import { Fraunces, Poppins } from "next/font/google";
import siteStyles from "../site/site.module.css";
import styles from "./ContactPage.module.css";
import SiteNav from "../site/SiteNav";
import SiteFooter from "../site/SiteFooter";
import SocialIcons from "../site/SocialIcons";
import { useLang } from "../site/useLang";
import { TR } from "./translations";

const baloo = Fraunces({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
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
          <SocialIcons className={styles.socialRow} />
          <Link href="/showroom" className={styles.storesLine} style={{ color: "var(--berry)" }}>
            {t.stores}
          </Link>
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
