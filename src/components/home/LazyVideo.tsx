"use client";

import { useEffect, useRef } from "react";

// A looping silent video that downloads and plays only when it is about to scroll
// into view. Until then only the small poster picture is loaded, so a long page
// doesn't pull a big video over the visitor's phone connection at the start.
export default function LazyVideo({
  src,
  poster,
  className,
  controls,
}: {
  src: string;
  poster: string;
  className?: string;
  controls?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!video.getAttribute("src")) {
              video.src = src;
              video.load();
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      className={className}
      controls={controls}
      loop
      muted
      playsInline
      preload="none"
    />
  );
}
