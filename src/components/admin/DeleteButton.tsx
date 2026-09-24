"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminTable.module.css";

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<{ ok: boolean; error?: string }>;
  confirmText: string;
  redirectTo?: string;
}

export default function DeleteButton({ id, action, confirmText, redirectTo }: DeleteButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = () => {
    if (!window.confirm(confirmText)) return;
    setError(null);
    startTransition(async () => {
      const res = await action(id);
      if (!res.ok) {
        setError(res.error ?? "Failed to delete.");
        return;
      }
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <span className={styles.deleteWrap}>
      <button type="button" className={styles.deleteBtn} onClick={handleClick} disabled={pending}>
        {pending ? "Deleting…" : "Delete"}
      </button>
      {error && <span className={styles.deleteError}>{error}</span>}
    </span>
  );
}
