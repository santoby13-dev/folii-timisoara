"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto sm:w-16 sm:shrink-0 sm:flex-col sm:overflow-visible">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Imagine ${i + 1}`}
              className={`flex aspect-square w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white transition-colors sm:w-full ${
                i === active
                  ? "border-blue-600"
                  : "border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} — miniatură ${i + 1}`}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10">
        <Image
          src={images[active]}
          alt={`${alt} — imagine ${active + 1}`}
          width={800}
          height={800}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
