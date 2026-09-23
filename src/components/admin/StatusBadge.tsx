import styles from "./AdminTable.module.css";

const BADGE_CLASS: Record<string, string> = {
  paid: styles.badgePaid,
  pending: styles.badgePending,
  cancelled: styles.badgeCancelled,
};

export default function StatusBadge({ status }: { status: string }) {
  return <span className={`${styles.badge} ${BADGE_CLASS[status] ?? ""}`}>{status}</span>;
}
