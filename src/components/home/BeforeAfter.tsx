"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./BeforeAfter.module.css";

// Each image is shown through a crop window [x, y, width] in source pixels;
// the window height is width / ratio. Windows are chosen so the pet's face sits
// at the same spot and size in the photo and the portrait, which is what makes
// the drag-to-compare line read as one continuous picture.
type Framed = { src: string; w: number; h: number; crop: [number, number, number] };

const PETS: { key: string; en: string; de: string; ratio: number; before: Framed; after: Framed }[] = [
  {
    key: "pom",
    en: "Pomeranian",
    de: "Spitz",
    ratio: 1.25,
    before: { src: "/images/before-after/pom-before.jpg", w: 604, h: 804, crop: [0, 0, 600] },
    after: { src: "/images/before-after/pom-after-straight.webp", w: 912, h: 1164, crop: [82, 400, 760] },
  },
  {
    key: "golden",
    en: "Golden Retriever",
    de: "Golden Retriever",
    ratio: 0.8,
    before: { src: "/images/before-after/golden-before.jpg", w: 1080, h: 1440, crop: [130, 90, 1000] },
    after: { src: "/images/before-after/golden-after.webp", w: 896, h: 1003, crop: [48, 0, 802] },
  },
  {
    key: "duo",
    en: "Two dogs",
    de: "Zwei Hunde",
    ratio: 1.25,
    before: { src: "/images/before-after/duo-before.jpg", w: 1320, h: 1128, crop: [0, 0, 1320] },
    after: { src: "/images/before-after/duo-after-straight.webp", w: 1043, h: 864, crop: [64, 76, 960] },
  },
];

function FramedImage({
  img,
  ratio,
  alt,
  className,
  sizes,
  fill,
}: {
  img: Framed;
  ratio: number;
  alt: string;
  className?: string;
  sizes: string;
  fill?: boolean;
}) {
  const [sx, sy, sw] = img.crop;
  const sh = sw / ratio;
  return (
    <div className={`${styles.framed} ${className ?? ""}`} style={fill ? undefined : { aspectRatio: String(ratio) }}>
      <Image
        src={img.src}
        alt={alt}
        width={img.w}
        height={img.h}
        sizes={sizes}
        className={styles.framedImg}
        style={{
          width: `${(img.w / sw) * 100}%`,
          left: `${(-sx / sw) * 100}%`,
          top: `${(-sy / sh) * 100}%`,
        }}
      />
    </div>
  );
}

export default function BeforeAfter({
  isEn,
  photoLabel,
  paintedLabel,
}: {
  isEn: boolean;
  photoLabel: string;
  paintedLabel: string;
}) {
  const [i, setI] = useState(0);
  const [pos, setPos] = useState(50);
  const pet = PETS[i];
  const petName = isEn ? pet.en : pet.de;

  return (
    <div className={styles.wrap} style={{ maxWidth: pet.ratio < 1 ? 400 : 540 }}>
      <div className={styles.slider} style={{ aspectRatio: String(pet.ratio) }}>
        <FramedImage
          fill
          img={pet.after}
          ratio={pet.ratio}
          alt={isEn ? `${petName}: hand-painted acrylic portrait` : `${petName}: handgemaltes Acrylporträt`}
          className={styles.fillImg}
          sizes="(max-width: 900px) 92vw, 540px"
        />
        <div className={styles.top} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <FramedImage
            fill
            img={pet.before}
            ratio={pet.ratio}
            alt=""
            className={styles.fillImg}
            sizes="(max-width: 900px) 92vw, 540px"
          />
        </div>
        <div className={styles.handle} style={{ left: `${pos}%` }} aria-hidden="true">
          <span>⇆</span>
        </div>
        <input
          id="before-after-slider"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className={styles.range}
          aria-label={isEn ? "Drag to compare the photo and the portrait" : "Ziehen, um Foto und Porträt zu vergleichen"}
        />
      </div>

      <div className={styles.labels}>
        <span className={`${styles.label} ${styles.labelPhoto}`}>{photoLabel}</span>
        <span className={styles.hint}>← {isEn ? "drag" : "ziehen"} →</span>
        <span className={`${styles.label} ${styles.labelPainted}`}>{paintedLabel}</span>
      </div>

      <div className={styles.thumbs} role="group" aria-label={isEn ? "Choose a pet" : "Tier wählen"}>
        {PETS.map((p, n) => (
          <button
            key={p.key}
            type="button"
            className={`${styles.thumb} ${n === i ? styles.thumbOn : ""}`}
            onClick={() => {
              setI(n);
              setPos(50);
            }}
            aria-pressed={n === i}
          >
            <FramedImage img={p.after} ratio={p.ratio} alt="" className={styles.thumbImg} sizes="90px" />
            <span className={styles.thumbName}>{isEn ? p.en : p.de}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
