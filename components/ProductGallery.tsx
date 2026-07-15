"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight")
        setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + images.length) % images.length);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, images.length]);

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

      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label="Mărește imaginea"
        className="flex aspect-square flex-1 cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10"
      >
        <Image
          src={images[active]}
          alt={`${alt} — imagine ${active + 1}`}
          width={800}
          height={800}
          className="h-full w-full object-cover"
          priority
        />
      </button>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Închide"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i - 1 + images.length) % images.length);
                }}
                aria-label="Imaginea anterioară"
                className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i + 1) % images.length);
                }}
                aria-label="Imaginea următoare"
                className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative h-full max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${alt} — imagine ${active + 1}`}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 800px, 100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
