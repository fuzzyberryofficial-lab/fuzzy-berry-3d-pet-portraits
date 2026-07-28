import Link from "next/link";
import styles from "./site.module.css";

interface FooterLink {
  href: string;
  label: string;
}

interface SiteFooterProps {
  links: FooterLink[];
  social?: boolean;
}

export default function SiteFooter({ links, social }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerBrand}>© 2026 Fuzzy Berry</span>
      <div className={styles.footerLinks}>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      {social && (
        <div className={styles.footerSocial}>
          <a
            href="https://www.instagram.com/fuzzyberry.official?igsh=MTVtaHc0N2k0N2M1Yg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            className={styles.socialIcon}
            style={{ background: "var(--berry)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            className={styles.socialIcon}
            style={{ background: "var(--plum)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
            </svg>
          </a>
          <a
            href="https://wa.me/4368864706201"
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp"
            className={styles.socialIcon}
            style={{ background: "#25D366" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.5 3.5a10.5 10.5 0 0 0-17.2 12L2 21l5.7-1.3A10.5 10.5 0 0 0 20.5 3.5Z" />
              <path d="M8.5 8.3c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4-.5.9-1 .9-.7 1.4.9 1.5 1.8 2 3.1 2.6.2.1.4.1.5-.1.2-.2.7-.8.9-1.1.2-.2.3-.2.6-.1.2.1 1.5.7 1.8.8.3.1.4.2.5.3.1.2.1.9-.2 1.7-.3.8-1.6 1.5-2.3 1.6-.6.1-1.3.1-4.5-1.3-3.8-1.7-6.2-6.3-6.4-6.6-.2-.3-1.5-2-1.5-3.9 0-1.9 1-2.8 1.3-3.2Z" />
            </svg>
          </a>
          <a
            href="mailto:fuzzyberry.official@gmail.com"
            aria-label="Email"
            className={styles.socialIcon}
            style={{ background: "var(--sun)", color: "var(--ink)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </a>
        </div>
      )}
    </footer>
  );
}
