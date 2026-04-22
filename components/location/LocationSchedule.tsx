'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

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

export default function LocationSchedule() {
  const t = useTranslations('Location');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-36 lg:py-44 px-page bg-[--color-villas-bg]">
      <div className="max-w-5xl mx-auto">

        {/* ── Section tag */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center"
        >
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold">03</span>
          <div className="w-8 sm:w-12 h-px bg-gold/40" />
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
            {t('schedule.tag')}
          </span>
        </motion.div>

        {/* ── Title */}
        <motion.h2
          custom={0.1} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-serif text-white leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-4"
        >
          {t('arrival.scheduleTitle')}
        </motion.h2>

        {/* ── Subtitle */}
        <motion.p
          custom={0.15} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-sans text-white/60 text-sm sm:text-base text-center mb-16 sm:mb-20 md:mb-24 max-w-prose mx-auto leading-relaxed"
        >
          {t('arrival.footer')}
        </motion.p>

        {/* ── Schedule grid */}
        <motion.div
          custom={0.2} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 mb-16 sm:mb-20"
        >

          {/* Arrival column */}
          <div className="py-10 md:py-0 md:pr-12 lg:pr-16 first:pt-0 md:first:pt-0">
            <h4 className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold mb-6 sm:mb-8">
              {t('schedule.arrivalTitle')}
            </h4>
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-6">
                <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed">
                  {t('schedule.arrTawauToJetty')}
                </p>
                <p className="font-serif text-white text-base sm:text-lg whitespace-nowrap shrink-0">
                  08:30 · 10:30
                </p>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-start justify-between gap-6">
                <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed">
                  {t('schedule.arrJettyToResort')}
                </p>
                <p className="font-serif text-white text-base sm:text-lg whitespace-nowrap shrink-0">
                  10:00 · 12:30
                </p>
              </div>
            </div>
          </div>

          {/* Departure column */}
          <div className="py-10 md:py-0 md:pl-12 lg:pl-16 last:pb-0 md:last:pb-0">
            <h4 className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold mb-6 sm:mb-8">
              {t('schedule.departureTitle')}
            </h4>
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-6">
                <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed">
                  {t('schedule.depResortToJetty')}
                </p>
                <p className="font-serif text-white text-base sm:text-lg whitespace-nowrap shrink-0">
                  11:00 · 13:30
                </p>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-start justify-between gap-6">
                <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed">
                  {t('schedule.depJettyToTawau')}
                </p>
                <p className="font-serif text-white text-base sm:text-lg whitespace-nowrap shrink-0">
                  12:00 · 14:30
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Important notices */}
        <motion.div
          custom={0.3} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="border-t border-white/10 pt-10 sm:pt-12"
        >
          <ul className="space-y-4">
            {[t('schedule.notice1'), t('schedule.notice2')].map((notice, idx) => (
              <li key={idx} className="flex items-start gap-3 font-sans text-white/70 text-sm sm:text-base leading-relaxed">
                <AlertTriangle size={15} strokeWidth={1.5} className="text-gold shrink-0 mt-0.5" />
                <span>{notice}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
