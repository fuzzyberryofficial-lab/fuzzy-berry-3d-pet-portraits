"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addInstagramPostAction } from "@/app/admin/(dashboard)/instagram/actions";
import tableStyles from "./AdminTable.module.css";

export default function InstagramPostForm() {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await addInstagramPostAction(value);
    setSaving(false);
    if (!res.ok) {
      setError(res.error ?? "Failed to add.");
      return;
    }
    setValue("");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className={tableStyles.filters}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste an Instagram post or reel link"
        style={{ minWidth: 320 }}
        required
      />
      <button type="submit" disabled={saving}>
        {saving ? "Adding…" : "Add post"}
      </button>
      {error && <span className={tableStyles.deleteError}>{error}</span>}
    </form>
  );
}
