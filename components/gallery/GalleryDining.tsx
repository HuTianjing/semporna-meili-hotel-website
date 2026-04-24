'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
}

interface Props {
  title: string;
  subtitle: string;
  images: GalleryImage[];
}

/**
 * Section 06 — 一餐一景 / Dining & Views
 *
 * Design: Warm editorial feel with breathing room on both sides of the image.
 * The section title is left-aligned (not centred) to break the rhythm from
 * earlier sections. Captions are in italic serif — evoking a handwritten menu.
 * Navigation uses thin progress-bar indicators (not arrow-heavy controls) so
 * the eye rests on the food imagery rather than the chrome.
 */
export default function GalleryDining({ title, subtitle, images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  return (
    <section className="bg-[--color-about-bg] py-16 sm:py-20 md:py-28">

      {/* Header — left-aligned to break symmetry */}
      <div className="mb-10 px-page">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-sans text-[0.55rem] tracking-[0.45em] text-[--color-gold-warm] uppercase">
            06
          </span>
          <div className="h-px w-7 bg-[--color-gold-warm]" />
          <span className="font-sans text-[0.55rem] tracking-[0.35em] text-[--color-warm-text] uppercase">
            {subtitle}
          </span>
        </div>
        <h2
          className="max-w-sm font-serif leading-[1.2] text-[--color-section-text]"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
        >
          {title}
        </h2>
      </div>

      {/* Image with breathing room on sides */}
      <div className="px-5 sm:px-10 md:px-page">
        <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              <Image
                src={images[current].src}
                alt={images[current].title}
                fill
                sizes="(min-width: 768px) calc(100vw - 8rem), calc(100vw - 2.5rem)"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Minimal ghost arrows inside image */}
          <button
            onClick={prev}
            aria-label="上一张"
            className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-white/40 transition-colors hover:text-white/80"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="下一张"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-white/40 transition-colors hover:text-white/80"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Caption + progress indicators */}
      <div className="mt-6 px-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          {/* Italic caption */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`dn-cap-${current}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-sans italic text-base text-[--color-section-text] sm:text-lg"
            >
              {images[current].title}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar indicators */}
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`第 ${i + 1} 张`}
                className={`h-0.5 transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-[--color-gold-warm]'
                    : 'w-4 bg-[--color-warm-text]/25 hover:bg-[--color-warm-text]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
