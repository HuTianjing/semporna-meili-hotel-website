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
 * Section 01 — 天光与海色 / Sky & Sea
 *
 * Design: Full-viewport immersive carousel. The image IS the section — no
 * background color, no container padding. Text floats at the bottom over a
 * dark gradient, so the ocean fills the visitor's entire screen on arrival.
 */
export default function GallerySkyAndSea({ title, subtitle, images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  return (
    <section className="relative h-[75vh] sm:h-[80vh] md:h-[88vh] w-full overflow-hidden">

      {/* Full-bleed image — crossfade between slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="absolute inset-0"
        >
          <Image
            src={images[current].src}
            alt={images[current].title}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient: subtle top veil + strong bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/75" />

      {/* Top-left: section identity */}
      <div className="absolute left-6 top-8 flex items-center gap-3 sm:left-10 sm:top-10 md:left-12 md:top-12">
        <span className="font-sans text-[0.55rem] tracking-[0.45em] text-[--color-gold-warm] uppercase">
          01
        </span>
        <div className="h-px w-7 bg-[--color-gold-warm]/60" />
        <span className="font-sans text-[0.55rem] tracking-[0.35em] text-white/45 uppercase">
          {subtitle}
        </span>
      </div>

      {/* Top-right: slide counter */}
      <div className="absolute right-6 top-8 sm:right-10 sm:top-10 md:right-12 md:top-12">
        <span className="font-sans text-[0.6rem] tracking-[0.3em] text-white/35 tabular-nums">
          {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom: title block + image caption + arrow navigation */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 pb-8 sm:px-10 sm:pb-10 md:px-12 md:pb-14">

        {/* Left: title + caption */}
        <div className="flex-1 min-w-0 pr-6">
          {/* Gold accent line */}
          <div className="mb-4 h-px w-10 bg-[--color-gold-warm]" />

          {/* Section title — stays fixed */}
          <h2
            className="font-serif leading-[1.15] text-white"
            style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.8rem)' }}
          >
            {title}
          </h2>

          {/* Image caption — animates per slide */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sky-cap-${current}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              className="mt-2 font-sans text-xs text-white/50 tracking-wide sm:text-sm"
            >
              {images[current].title}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Right: nav arrows */}
        <div className="flex shrink-0 gap-2">
          <button
            onClick={prev}
            aria-label="上一张"
            className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/65 transition-colors hover:border-white/55 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="下一张"
            className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/65 transition-colors hover:border-white/55 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
