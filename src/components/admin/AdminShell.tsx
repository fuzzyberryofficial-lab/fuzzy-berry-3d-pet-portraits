"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./AdminShell.module.css";

const VERCEL_ANALYTICS_URL = "https://vercel.com/fuzzyberry/app/analytics";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/announcement", label: "Announcement" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className={styles.shell}>
      <nav className={styles.nav}>
        <span className={styles.brand}>Fuzzy Berry Admin</span>
        {NAV_LINKS.map((link) => {
          const isActive = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={`${styles.link} ${isActive ? styles.linkActive : ""}`}>
              {link.label}
            </Link>
          );
        })}
        <span className={styles.spacer} />
        <a href={VERCEL_ANALYTICS_URL} target="_blank" rel="noreferrer" className={styles.externalLink}>
          View traffic analytics ↗
        </a>
        <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
          Log out
        </button>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
