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
 * Section 02 — 深入水下 / Ocean & Diving
 *
 * Design: Dark-chamber aesthetic using `villas-bg` (deep night blue #0a0f14).
 * The carousel sits inside this dark room — edges of the image bleed to the
 * surrounding darkness, evoking the sensation of descending into the ocean.
 * A large, ghosted slide number in gold anchors the composition.
 */
export default function GalleryDiving({ title, subtitle, images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  return (
    <section className="bg-[--color-villas-bg] py-20 md:py-32">

      {/* Header row: section identity left, ghost counter right */}
      <div className="mb-10 flex items-end justify-between px-page">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-sans text-[0.55rem] tracking-[0.45em] text-[--color-gold-warm] uppercase">
              02
            </span>
            <div className="h-px w-7 bg-[--color-gold-warm]/50" />
            <span className="font-sans text-[0.55rem] tracking-[0.35em] text-white/30 uppercase">
              {subtitle}
            </span>
          </div>
          <h2
            className="font-serif leading-[1.15] text-white"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            {title}
          </h2>
        </div>

        {/* Ghost counter — only desktop */}
        <div className="hidden text-right md:block">
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="block font-sans text-[3.5rem] leading-none tabular-nums text-[--color-gold-warm]/15"
            >
              {String(current + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <span className="font-sans text-[0.6rem] tracking-[0.3em] text-white/20">
            / {String(images.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Full-width 16:9 carousel */}
      <div className="relative w-full">
        <div className="relative aspect-video w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
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

          {/* Overlay arrows */}
          <button
            onClick={prev}
            aria-label="上一张"
            className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-black/35 text-white/60 transition-all hover:bg-black/65 hover:text-white md:left-6"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="下一张"
            className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-black/35 text-white/60 transition-all hover:bg-black/65 hover:text-white md:right-6"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Caption bar below image */}
        <div className="mt-5 flex items-center justify-between px-page">
          <AnimatePresence mode="wait">
            <motion.p
              key={`dive-cap-${current}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-sans text-sm tracking-wide text-white/45"
            >
              {images[current].title}
            </motion.p>
          </AnimatePresence>

          {/* Mobile counter */}
          <span className="font-sans text-[0.6rem] tracking-[0.25em] text-white/25 tabular-nums md:hidden">
            {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(images.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
