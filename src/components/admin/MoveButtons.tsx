"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import tableStyles from "./AdminTable.module.css";

interface MoveButtonsProps {
  id: string;
  action: (id: string, direction: "up" | "down") => Promise<{ ok: boolean; error?: string }>;
  isFirst: boolean;
  isLast: boolean;
}

export default function MoveButtons({ id, action, isFirst, isLast }: MoveButtonsProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const move = (direction: "up" | "down") => {
    startTransition(async () => {
      await action(id, direction);
      router.refresh();
    });
  };

  return (
    <span style={{ display: "inline-flex", gap: 4 }}>
      <button
        type="button"
        className={tableStyles.deleteBtn}
        onClick={() => move("up")}
        disabled={pending || isFirst}
        aria-label="Move up"
        title="Move up"
      >
        ↑
      </button>
      <button
        type="button"
        className={tableStyles.deleteBtn}
        onClick={() => move("down")}
        disabled={pending || isLast}
        aria-label="Move down"
        title="Move down"
      >
        ↓
      </button>
    </span>
  );
}
