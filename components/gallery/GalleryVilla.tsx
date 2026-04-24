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
 * Section 03 — 别墅与居停 / Villa & Stay
 *
 * Design: Editorial split layout. On desktop: large image fills 65% of the
 * width on the left; section title, navigation controls, and a thumbnail
 * strip occupy the right 35%. The warm paper background (`about-bg`) and
 * gold border on the image reinforce the BELIAN-wood warmth of this section.
 * On mobile: the layout stacks — image first, then controls below.
 */
export default function GalleryVilla({ title, subtitle, images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  // Show up to 5 thumbnails
  const thumbs = images.slice(0, 5);

  return (
    <section className="bg-[--color-about-bg] py-16 sm:py-20 md:py-28">
      <div className="px-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10 lg:gap-14">

          {/* ── Left: main image (65%) ── */}
          <div className="w-full shrink-0 md:w-[65%]">
            <div className="relative aspect-4/3 w-full overflow-hidden border border-[--color-gold]/25">
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
                    sizes="(min-width: 768px) 65vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption + counter below image */}
            <div className="mt-3 flex items-center justify-between">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`villa-cap-${current}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-sans text-sm text-[--color-warm-text]"
                >
                  {images[current].title}
                </motion.p>
              </AnimatePresence>
              <span className="font-sans text-xs tracking-[0.25em] text-[--color-warm-text]/45 tabular-nums">
                {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(images.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* ── Right: heading + controls (35%) ── */}
          <div className="flex flex-col justify-center md:flex-1">
            {/* Section identity */}
            <div className="mb-6 flex items-center gap-3">
              <span className="font-sans text-[0.55rem] tracking-[0.45em] text-[--color-gold-warm] uppercase">
                03
              </span>
              <div className="h-px w-7 bg-[--color-gold-warm]" />
              <span className="font-sans text-[0.55rem] tracking-[0.35em] text-[--color-warm-text] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-serif leading-[1.2] text-[--color-section-text]"
              style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)' }}
            >
              {title}
            </h2>

            {/* Gold divider */}
            <div className="my-8 h-px w-12 bg-[--color-gold-warm]" />

            {/* Arrow navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="上一张"
                className="flex h-10 w-10 items-center justify-center border border-[--color-gold]/35 text-[--color-section-text] transition-colors hover:border-[--color-gold] hover:text-[--color-gold]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="下一张"
                className="flex h-10 w-10 items-center justify-center border border-[--color-gold]/35 text-[--color-section-text] transition-colors hover:border-[--color-gold] hover:text-[--color-gold]"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Thumbnail strip (first 5 images) */}
            <div className="mt-8 flex gap-2">
              {thumbs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={img.title}
                  className={`relative aspect-square w-12 overflow-hidden transition-opacity duration-200 ${
                    current === i
                      ? 'opacity-100 ring-1 ring-[--color-gold-warm]'
                      : 'opacity-35 hover:opacity-65'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
