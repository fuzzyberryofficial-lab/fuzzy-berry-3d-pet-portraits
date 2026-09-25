import { isAbandonedOrder } from "@/lib/adminData";
import styles from "./AdminTable.module.css";

const BADGE_CLASS: Record<string, string> = {
  paid: styles.badgePaid,
  pending: styles.badgePending,
  cancelled: styles.badgeCancelled,
};

export default function StatusBadge({ status, createdAt }: { status: string; createdAt?: string }) {
  if (createdAt && isAbandonedOrder(status, createdAt)) {
    return <span className={`${styles.badge} ${styles.badgeAbandoned}`}>abandoned</span>;
  }
  return <span className={`${styles.badge} ${BADGE_CLASS[status] ?? ""}`}>{status}</span>;
}
