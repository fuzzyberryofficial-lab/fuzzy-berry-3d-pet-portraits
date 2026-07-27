"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./site.module.css";

interface ImageUploadSlotProps {
  placeholder: string;
  file: File | null;
  onChange: (file: File | null) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImageUploadSlot({ placeholder, file, onChange, className, style }: ImageUploadSlotProps) {
  const [isOver, setIsOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const acceptFile = (f: File | undefined | null) => {
    if (f && f.type.startsWith("image/")) onChange(f);
  };

  return (
    <div
      className={`${styles.uploadSlot} ${className ?? ""}`}
      style={style}
      data-over={isOver || undefined}
      onClick={() => !previewUrl && inputRef.current?.click()}
      onDragEnter={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        acceptFile(e.dataTransfer.files?.[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          acceptFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {previewUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="" className={styles.uploadPreview} />
          <button
            type="button"
            className={styles.uploadClear}
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            aria-label="Remove photo"
          >
            ×
          </button>
        </>
      ) : (
        <div className={styles.uploadEmpty}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <div className={styles.uploadCap}>{placeholder}</div>
        </div>
      )}
    </div>
  );
}
