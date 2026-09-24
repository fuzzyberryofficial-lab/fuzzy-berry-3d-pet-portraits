"use client";

import { useState } from "react";
import type { AnnouncementSettings } from "@/lib/adminData";
import { saveAnnouncementSettings } from "@/app/admin/(dashboard)/announcement/actions";
import styles from "./AnnouncementForm.module.css";

export default function AnnouncementForm({ initial }: { initial: AnnouncementSettings }) {
  const [settings, setSettings] = useState<AnnouncementSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(null);

  const update = <K extends keyof AnnouncementSettings>(key: K, value: AnnouncementSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setResult(null);
    const res = await saveAnnouncementSettings(settings);
    setResult(res);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id="announcement-enabled"
          checked={settings.enabled}
          onChange={(e) => update("enabled", e.target.checked)}
        />
        <label htmlFor="announcement-enabled">Show announcement bar on the site</label>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="announcement-text-en">
          Text (English)
        </label>
        <textarea
          id="announcement-text-en"
          className={styles.textarea}
          value={settings.textEn}
          onChange={(e) => update("textEn", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="announcement-text-de">
          Text (German)
        </label>
        <textarea
          id="announcement-text-de"
          className={styles.textarea}
          value={settings.textDe}
          onChange={(e) => update("textDe", e.target.value)}
        />
      </div>

      <div className={styles.colorRow}>
        <div className={styles.colorField}>
          <label className={styles.label} htmlFor="announcement-bg-swatch">
            Background color
          </label>
          <input
            id="announcement-bg-swatch"
            type="color"
            className={styles.colorSwatch}
            value={settings.bgColor}
            onChange={(e) => update("bgColor", e.target.value)}
          />
          <input
            type="text"
            className={styles.colorHex}
            value={settings.bgColor}
            onChange={(e) => update("bgColor", e.target.value)}
          />
        </div>
        <div className={styles.colorField}>
          <label className={styles.label} htmlFor="announcement-text-swatch">
            Text color
          </label>
          <input
            id="announcement-text-swatch"
            type="color"
            className={styles.colorSwatch}
            value={settings.textColor}
            onChange={(e) => update("textColor", e.target.value)}
          />
          <input
            type="text"
            className={styles.colorHex}
            value={settings.textColor}
            onChange={(e) => update("textColor", e.target.value)}
          />
        </div>
      </div>

      <p className={styles.label}>Preview</p>
      <p className={styles.preview} style={{ background: settings.bgColor, color: settings.textColor }}>
        {settings.textEn || "…"}
      </p>

      <div className={styles.actions}>
        <button type="submit" className={styles.button} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
        {result?.ok && <span className={styles.success}>Saved. Live within a minute.</span>}
        {result && !result.ok && <span className={styles.error}>{result.error ?? "Failed to save."}</span>}
      </div>
    </form>
  );
}
