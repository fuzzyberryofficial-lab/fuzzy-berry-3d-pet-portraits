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
            href="https://instagram.com/fuzzyberry.official"
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
            href="https://facebook.com/fuzzyberry.official"
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
