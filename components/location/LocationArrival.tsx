'use client';

import { type LucideIcon, Plane, Car, Ship } from 'lucide-react';
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

interface Stage {
  icon: LucideIcon;
  num: string;
  label: string;
  body: string;
  sub: string;
}

export default function LocationArrival() {
  const t = useTranslations('Location');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  const stages: Stage[] = [
    {
      icon: Plane,
      num: '01',
      label: t('arrival.stage1Label'),
      body: t('arrival.stage1Body'),
      sub: t('arrival.stage1Sub'),
    },
    {
      icon: Car,
      num: '02',
      label: t('arrival.stage2Label'),
      body: t('arrival.stage2Body'),
      sub: t('arrival.stage2Sub'),
    },
    {
      icon: Ship,
      num: '03',
      label: t('arrival.stage3Label'),
      body: t('arrival.stage3Body'),
      sub: t('arrival.stage3Sub'),
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-36 lg:py-44 px-page bg-[--color-villas-bg]">
      <div className="max-w-5xl mx-auto">

        {/* ── Section tag */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center"
        >
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold">02</span>
          <div className="w-8 sm:w-12 h-px bg-gold/40" />
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
            {t('arrival.sectionTag')}
          </span>
        </motion.div>

        {/* ── Title */}
        <motion.h2
          custom={0.1} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-serif text-white leading-[1.1] text-3xl sm:text-4xl md:text-5xl text-center mb-4 sm:mb-5"
        >
          {t('arrival.title')}
        </motion.h2>

        {/* ── Subtitle */}
        <motion.p
          custom={0.15} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-sans text-white/50 text-sm sm:text-base text-center mb-16 sm:mb-20 md:mb-24 max-w-prose mx-auto leading-relaxed"
        >
          {t('arrival.subtitle')}
        </motion.p>

        {/* ── Three journey stages */}
        <motion.div
          custom={0.2} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 mb-16 sm:mb-20 md:mb-24"
        >
          {stages.map(({ icon: Icon, num, label, body, sub }) => (
            <div key={num} className="flex flex-col gap-5 py-10 md:py-0 md:px-10 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0">

              {/* Number badge + icon */}
              <div className="flex items-center gap-4">
                <span className="font-sans text-[0.55rem] uppercase tracking-[0.3em] text-gold/50">{num}</span>
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
                  <Icon size={18} strokeWidth={1.2} />
                </div>
              </div>

              {/* Stage heading */}
              <h3
                className="font-serif text-white leading-snug"
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}
              >
                {label}
              </h3>

              {/* Narrative body */}
              <p className="font-sans text-white/50 text-sm leading-relaxed flex-1">
                {body}
              </p>

              {/* Location sub-label */}
              <span className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-gold/60">
                {sub}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Transfer schedule (minimal typography) */}
        <motion.div
          custom={0.3} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="border-t border-white/10 pt-12 sm:pt-16 mb-12 sm:mb-16"
        >
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-white/30 text-center mb-10">
            {t('arrival.scheduleTitle')}
          </p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">

            {/* Arrival column */}
            <div>
              <h4 className="font-serif text-gold text-sm tracking-wide mb-5 pb-4 border-b border-white/10">
                {t('arrival.arrivalDay')}
              </h4>
              <div className="space-y-5">
                <div className="flex justify-between items-center gap-4">
                  <p className="font-sans text-white/40 text-xs leading-relaxed">{t('arrival.scheduleArr1')}</p>
                  <p className="font-serif text-white text-sm whitespace-nowrap shrink-0">08:30 · 10:30</p>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <p className="font-sans text-white/40 text-xs leading-relaxed">{t('arrival.scheduleArr2')}</p>
                  <p className="font-serif text-white text-sm whitespace-nowrap shrink-0">10:00 · 12:30</p>
                </div>
              </div>
            </div>

            {/* Departure column */}
            <div>
              <h4 className="font-serif text-gold text-sm tracking-wide mb-5 pb-4 border-b border-white/10">
                {t('arrival.departureDay')}
              </h4>
              <div className="space-y-5">
                <div className="flex justify-between items-center gap-4">
                  <p className="font-sans text-white/40 text-xs leading-relaxed">{t('arrival.scheduleDep1')}</p>
                  <p className="font-serif text-white text-sm whitespace-nowrap shrink-0">11:00 · 13:30</p>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <p className="font-sans text-white/40 text-xs leading-relaxed">{t('arrival.scheduleDep2')}</p>
                  <p className="font-serif text-white text-sm whitespace-nowrap shrink-0">12:00 · 14:30</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Warm closing note + CTA */}
        <motion.div
          custom={0.4} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <p className="font-sans text-white/40 text-sm leading-relaxed max-w-prose mx-auto mb-8">
            {t('arrival.footer')}
          </p>
          <a
            href="https://wa.me/60112780399"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center border border-gold/40 text-gold px-8 py-3 text-xs tracking-widest uppercase transition-all duration-300 hover:border-gold hover:bg-gold/10 min-h-11"
          >
            {t('arrival.cta')}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
