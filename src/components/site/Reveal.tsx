"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./site.module.css";

interface RevealProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export default function Reveal({ children, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.reveal} ${inView ? styles.revealIn : ""}`} style={style}>
      {children}
    </div>
  );
}
