import styles from "./KpiCard.module.css";

export default function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
