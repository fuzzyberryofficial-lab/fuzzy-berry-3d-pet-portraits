import Image from "next/image";
import styles from "./site.module.css";

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  imageStyle?: React.CSSProperties;
}

export default function SiteImage({ src, alt, className, style, priority, sizes, objectPosition, objectFit, imageStyle }: SiteImageProps) {
  return (
    <div className={`${styles.imageFrame} ${className ?? ""}`} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        style={{ objectFit: objectFit ?? "cover", objectPosition: objectPosition ?? "50% 50%", ...imageStyle }}
        priority={priority}
      />
    </div>
  );
}
