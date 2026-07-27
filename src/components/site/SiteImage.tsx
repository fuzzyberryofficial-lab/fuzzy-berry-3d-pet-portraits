import Image from "next/image";
import styles from "./site.module.css";

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
}

export default function SiteImage({ src, alt, className, style, priority, sizes }: SiteImageProps) {
  return (
    <div className={`${styles.imageFrame} ${className ?? ""}`} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        style={{ objectFit: "cover" }}
        priority={priority}
      />
    </div>
  );
}
