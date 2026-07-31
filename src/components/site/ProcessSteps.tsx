import styles from "./ProcessSteps.module.css";

export interface ProcessStepItem {
  title: string;
  caption: string;
  icon: "order" | "confirm" | "paint" | "ship" | "enjoy";
}

const ICONS: Record<ProcessStepItem["icon"], React.ReactNode> = {
  order: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </svg>
  ),
  confirm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v10H8l-4 4V5Z" />
      <path d="M8 10l2 2 4-4" />
    </svg>
  ),
  paint: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l9 5-9 5-9-5 9-5Z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 8l9 5 9-5" />
    </svg>
  ),
  ship: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10.5" r="1.5" />
      <path d="M21 16l-5-4-4 3-3-2-6 5" />
    </svg>
  ),
  enjoy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l9-4 9 4-9 4-9-4Z" />
      <path d="M3 8v9l9 4 9-4V8" />
      <path d="M12 12v9" />
    </svg>
  ),
};

const BADGE_COLORS = ["var(--sun)", "var(--mint)", "var(--berry)", "var(--plum)", "var(--sun)"];

export default function ProcessSteps({ steps }: { steps: ProcessStepItem[] }) {
  return (
    <ol className={styles.timeline}>
      {steps.map((step, i) => (
        <li key={step.title} className={styles.step}>
          <span className={styles.badge} style={{ background: BADGE_COLORS[i % BADGE_COLORS.length] }}>
            <span className={styles.icon}>{ICONS[step.icon]}</span>
          </span>
          <span className={styles.content}>
            <span className={styles.stepTitle}>
              {i + 1}. {step.title}
            </span>
            <span className={styles.stepCaption}>{step.caption}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
