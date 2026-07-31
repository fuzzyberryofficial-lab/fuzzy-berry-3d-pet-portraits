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
            style={{ background: "#1877F2" }}
          >
            <svg width="12" height="19" viewBox="0 0 320 512" fill="currentColor">
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
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
            <svg width="18" height="18" viewBox="0 0 448 512" fill="currentColor">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
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
