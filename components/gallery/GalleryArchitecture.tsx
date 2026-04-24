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
 * Section 04 — 建筑传奇 / Architecture
 *
 * Design: Panoramic / ultra-wide format. The image bleeds edge-to-edge with
 * no horizontal padding — at 21:9 on desktop, this echoes the scale of the
 * 396,000 sqm complex itself. Below the image, the section header and image
 * caption sit in a two-column row, giving it an architectural drawing feel.
 * No background color flanking the image on mobile either — it just uses
 * 4:3 and scales naturally.
 */
export default function GalleryArchitecture({ title, subtitle, images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  return (
    <section className="bg-background py-16 sm:py-20 md:py-28">

      {/* Ultra-wide carousel — full bleed, no side padding */}
      <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-video lg:aspect-21/9">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[current].src}
              alt={images[current].title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons — translucent, positioned inside image */}
        <button
          onClick={prev}
          aria-label="上一张"
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/12 text-white backdrop-blur-sm transition-all hover:bg-white/28 md:left-8"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          aria-label="下一张"
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/12 text-white backdrop-blur-sm transition-all hover:bg-white/28 md:right-8"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Below-image row: identity left, caption + counter right */}
      <div className="mt-7 flex flex-col gap-5 px-page md:flex-row md:items-end md:justify-between">

        {/* Left: heading block */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-sans text-[0.55rem] tracking-[0.45em] text-[--color-gold-warm] uppercase">
              04
            </span>
            <div className="h-px w-7 bg-[--color-gold-warm]" />
            <span className="font-sans text-[0.55rem] tracking-[0.35em] text-[--color-warm-text] uppercase">
              {subtitle}
            </span>
          </div>
          <h2
            className="font-serif leading-[1.15] text-[--color-section-text]"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            {title}
          </h2>
        </div>

        {/* Right: caption + counter */}
        <div className="text-left md:text-right">
          <AnimatePresence mode="wait">
            <motion.p
              key={`arch-cap-${current}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-sans text-sm text-[--color-warm-text]"
            >
              {images[current].title}
            </motion.p>
          </AnimatePresence>
          <span className="mt-1 block font-sans text-[0.6rem] tracking-[0.3em] text-[--color-warm-text]/35 tabular-nums">
            {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(images.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
