'use client';

import { Plane, Car, Ship, MapPin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function LocationRoute() {
  const t = useTranslations('Location');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-36 lg:py-44 px-page bg-[--color-about-bg]">
      <div className="max-w-2xl mx-auto">

        {/* ── Section tag */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center"
        >
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-[--color-gold-warm]">02</span>
          <div className="w-8 sm:w-12 h-px bg-[--color-gold-warm]" />
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
            {t('route.tag')}
          </span>
        </motion.div>

        {/* ── Title */}
        <motion.h2
          custom={0.1} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-serif text-[--color-section-text] leading-[1.15] text-center mb-4"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
        >
          {t('route.title')}
        </motion.h2>

        {/* ── Gold line */}
        <motion.div
          custom={0.15} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center mb-12 sm:mb-16"
        >
          <div className="w-12 sm:w-16 h-px bg-[--color-gold-warm]" />
        </motion.div>

        {/* ── Zone 1: User self-arranged (muted) */}
        <motion.div
          custom={0.2} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-[--color-warm-text] mb-4 text-center">
            {t('route.selfZone')}
          </p>
          <div className="border border-[--color-warm-text]/20 p-6 sm:p-8 flex items-center gap-5">
            <Plane className="text-[--color-warm-text] shrink-0" size={26} strokeWidth={1.2} />
            <div>
              <p className="font-serif text-[--color-section-text]" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                {t('route.airport')}
              </p>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[--color-warm-text] mt-1.5">
                {t('route.airportHint')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Divider: gold line + centered text */}
        <motion.div
          custom={0.25} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 my-8 sm:my-10"
        >
          <div className="flex-1 h-px bg-[--color-gold-warm]/35" />
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-[--color-gold-warm] text-center whitespace-nowrap px-1">
            {t('route.divider')}
          </p>
          <div className="flex-1 h-px bg-[--color-gold-warm]/35" />
        </motion.div>

        {/* ── Zone 2: Hotel-managed timeline */}
        <motion.div
          custom={0.3} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Node 1 — Tawau */}
          <div className="flex gap-5">
            <div className="flex flex-col items-center shrink-0">
              <div className="z-10 w-11 h-11 rounded-full border border-[--color-gold-warm] bg-[--color-about-bg] flex items-center justify-center text-[--color-gold-warm]">
                <Car size={18} strokeWidth={1.2} />
              </div>
              <div className="flex-1 w-px bg-[--color-gold-warm]/30 my-2 min-h-10" />
            </div>
            <div className="flex-1 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-1">
                <p className="font-serif text-[--color-section-text]" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                  {t('route.tawauLabel')}
                </p>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[--color-gold-warm] shrink-0">
                  {t('route.tawauDuration')}
                </p>
              </div>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[--color-warm-text]">
                {t('route.tawauSub')} · {t('route.tawauMode')}
              </p>
              <p className="font-sans text-[0.65rem] text-[--color-gold-warm] mt-2.5 flex items-center gap-1.5">
                <span>✓</span>
                {t('route.included')}
              </p>
            </div>
          </div>

          {/* Node 2 — Jetty */}
          <div className="flex gap-5">
            <div className="flex flex-col items-center shrink-0">
              <div className="z-10 w-11 h-11 rounded-full border border-[--color-gold-warm] bg-[--color-about-bg] flex items-center justify-center text-[--color-gold-warm]">
                <Ship size={18} strokeWidth={1.2} />
              </div>
              <div className="flex-1 w-px bg-[--color-gold-warm]/30 my-2 min-h-10" />
            </div>
            <div className="flex-1 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-1">
                <p className="font-serif text-[--color-section-text]" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                  {t('route.jettyLabel')}
                </p>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[--color-gold-warm] shrink-0">
                  {t('route.jettyDuration')}
                </p>
              </div>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[--color-warm-text]">
                {t('route.jettySub')} · {t('route.jettyMode')}
              </p>
              <p className="font-sans text-[0.65rem] text-[--color-gold-warm] mt-2.5 flex items-center gap-1.5">
                <span>✓</span>
                {t('route.included')}
              </p>
            </div>
          </div>

          {/* Node 3 — Resort (destination) */}
          <div className="flex gap-5">
            <div className="flex flex-col items-center shrink-0">
              <div className="z-10 w-11 h-11 rounded-full border border-[--color-gold-warm] bg-[--color-gold-warm]/10 flex items-center justify-center text-[--color-gold-warm]">
                <MapPin size={18} strokeWidth={1.2} />
              </div>
            </div>
            <div className="flex-1 pt-1.5">
              <p className="font-serif text-[--color-section-text]" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}>
                {t('route.resortLabel')}
              </p>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[--color-warm-text] mt-1">
                {t('route.resortSub')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Promise quote */}
        <motion.p
          custom={0.4} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-text italic text-[--color-section-text]/55 text-sm sm:text-base leading-relaxed text-center mt-12 sm:mt-16 px-4"
        >
          &ldquo;{t('route.promise')}&rdquo;
        </motion.p>

      </div>
    </section>
  );
}
