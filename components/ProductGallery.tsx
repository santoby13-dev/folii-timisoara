"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollToIndex(index: number) {
    setActive(index);
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const track = e.currentTarget;
          const slideWidth = track.clientWidth;
          const index = Math.round(track.scrollLeft / slideWidth);
          if (index !== active) setActive(index);
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="flex aspect-square w-full shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10"
          >
            <Image
              src={src}
              alt={`${alt} — imagine ${i + 1}`}
              width={600}
              height={600}
              className="h-full w-full object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Imagine ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active
                  ? "w-6 bg-blue-600"
                  : "w-2 bg-black/15 dark:bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
