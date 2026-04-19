'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const VILLA_IMAGES: Record<string, string[]> = {
  'ocean-view': [
    'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkbryaafaa/villa-ocean-view-1.png',
    'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkcoyaafaq/villa-ocean-view-2.png',
  ],
  overwater: [
    'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkb6qaafba/villa-overwater-1.png',
    'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkalaaae7a/villa-overwater-2.png',
  ],
  premium: [
    'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkawaaae7q/villa-premium-1.png',
    'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bj72yaafbq/villa-premium-2.png',
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export function VillasAndSuites() {
  const t = useTranslations('Villas');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  const items = t.raw('items') as Array<{ id: string; title: string; desc: string }>;

  const [activeIdx, setActiveIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeVilla = items[activeIdx];
  const activeImages = VILLA_IMAGES[activeVilla?.id] ?? [];

  // 每 5 秒自动切换图片
  useEffect(() => {
    if (activeImages.length <= 1) return;
    const timer = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % activeImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIdx, activeImages.length]);

  const handleTabSwitch = useCallback(
    (idx: number) => {
      if (idx === activeIdx || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIdx(idx);
        setImgIdx(0);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 400);
    },
    [activeIdx, isTransitioning],
  );

  return (
    <section
      id="villas"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-navy)' }}
    >
      {/* Section header */}
      <div className="pt-20 sm:pt-28 md:pt-32 pb-10 sm:pb-14">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

          {/* Label */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-[#8a7e6b]">02</span>
            <div className="w-8 sm:w-12 h-px" style={{ backgroundColor: 'rgba(196,185,154,0.4)' }} />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8a7e6b]">
              {t('subtitle')}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-4 sm:mb-5"
          >
            <h2
              className="font-serif text-white leading-[1.15]"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
            >
              {t('title')}
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center max-w-[620px] mx-auto"
          >
            <p className="font-sans text-[0.875rem] sm:text-[0.9375rem] leading-[1.85] text-white/50 font-light">
              {t('desc')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Immersive image showcase */}
      <motion.div
        custom={0.25}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pb-20 sm:pb-28 md:pb-32"
      >
        {/* Main image */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] rounded-sm overflow-hidden bg-[#111820]">
          {/* Crossfade images */}
          {items.map((villa) =>
            (VILLA_IMAGES[villa.id] ?? []).map((src, iIdx) => (
              <img
                key={`${villa.id}-${iIdx}`}
                src={src}
                alt={villa.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity:
                    villa.id === activeVilla?.id && iIdx === imgIdx && !isTransitioning ? 1 : 0,
                  transition: 'opacity 700ms ease-in-out',
                }}
                loading={villa.id === items[0]?.id && iIdx === 0 ? 'eager' : 'lazy'}
              />
            )),
          )}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />

          {/* Content overlay — bottom left */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="max-w-[560px]">
              <h3
                className="font-serif text-white leading-tight mb-3"
                style={{
                  fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(16px)' : 'translateY(0)',
                  transition: 'opacity 500ms, transform 500ms',
                }}
              >
                {activeVilla?.title}
              </h3>

              <p
                className="font-sans text-[0.8rem] sm:text-[0.9rem] leading-[1.7] text-white/70 font-light mb-5 sm:mb-6"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(16px)' : 'translateY(0)',
                  transition: 'opacity 500ms 75ms, transform 500ms 75ms',
                }}
              >
                {activeVilla?.desc}
              </p>

              <a
                href={`/rooms/${activeVilla?.id}`}
                className="group inline-flex items-center gap-3 font-sans text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-white/80 hover:text-white"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(16px)' : 'translateY(0)',
                  transition: 'opacity 500ms 150ms, transform 500ms 150ms',
                }}
              >
                {t('details')}
                <ArrowRight
                  size={12}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          {/* Tab switcher — bottom right */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 flex gap-2">
            {items.map((villa, idx) => (
              <button
                key={villa.id}
                onClick={() => handleTabSwitch(idx)}
                className="font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-all duration-300"
                style={{
                  background:
                    idx === activeIdx
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(255,255,255,0.12)',
                  color: idx === activeIdx ? '#0a0f14' : 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {villa.title}
              </button>
            ))}
          </div>
        </div>

        {/* View all CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href="/villas"
            className="inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-white/50 hover:text-white border-b border-white/20 hover:border-white/50 pb-1 transition-colors duration-500"
          >
            {t('viewAll')}
            <ArrowRight size={12} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
