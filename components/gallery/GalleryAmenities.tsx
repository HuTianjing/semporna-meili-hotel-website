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
 * Section 05 — 设施与体验 / Amenities
 *
 * Design: Triptych composition. On desktop: one large image on the left (3fr)
 * paired with two smaller images stacked on the right (2fr). Each "next" click
 * advances the primary index, and the two side images automatically pull from
 * index+1 and index+2 (wrapping). This creates a flowing sense of discovery —
 * like turning pages of a resort brochure — without being a mechanical
 * slide-show.
 */
export default function GalleryAmenities({ title, subtitle, images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  const idx1 = (current + 1) % images.length;
  const idx2 = (current + 2) % images.length;

  return (
    <section className="bg-cream py-16 sm:py-20 md:py-28">

      {/* Header — centred */}
      <div className="mb-10 px-page text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="font-sans text-[0.55rem] tracking-[0.45em] text-[--color-gold-warm] uppercase">
            05
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
        <div className="mx-auto mt-6 h-px w-12 bg-[--color-gold-warm]" />
      </div>

      {/* Image composition */}
      <div className="px-page">

        {/* Desktop triptych: large left + 2 stacked right */}
        <div className="hidden grid-cols-[3fr_2fr] gap-3 md:grid" style={{ height: '56vh' }}>

          {/* Primary image */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`am-main-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[current].src}
                  alt={images[current].title}
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column: two stacked images */}
          <div className="flex flex-col gap-3">
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`am-s1-${idx1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[idx1].src}
                    alt={images[idx1].title}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`am-s2-${idx2}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[idx2].src}
                    alt={images[idx2].title}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: single-image carousel */}
        <div className="relative aspect-4/3 w-full overflow-hidden md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`am-mob-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
        </div>

        {/* Controls row */}
        <div className="mt-5 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={`am-cap-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-sans text-sm text-[--color-warm-text]"
            >
              {images[current].title}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <span className="font-sans text-[0.6rem] tracking-[0.25em] text-[--color-warm-text]/40 tabular-nums">
              {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(images.length).padStart(2, '0')}
            </span>
            <button
              onClick={prev}
              aria-label="上一张"
              className="flex h-8 w-8 items-center justify-center border border-[--color-gold]/30 text-[--color-section-text] transition-colors hover:border-[--color-gold] hover:text-[--color-gold]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="下一张"
              className="flex h-8 w-8 items-center justify-center border border-[--color-gold]/30 text-[--color-section-text] transition-colors hover:border-[--color-gold] hover:text-[--color-gold]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
