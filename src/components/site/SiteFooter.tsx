import Link from "next/link";
import styles from "./site.module.css";
import SocialIcons from "./SocialIcons";

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
      {social && <SocialIcons className={styles.footerSocial} />}
    </footer>
  );
}
