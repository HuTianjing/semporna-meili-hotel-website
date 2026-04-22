'use client';

import { Plane, Car, Ship, Info } from 'lucide-react';
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

  const nodes = [
    { icon: Plane, label: t('route.node1Label'), sub: t('route.node1Sub'), isDestination: false },
    { icon: Plane, label: t('route.node2Label'), sub: t('route.node2Sub'), isDestination: false },
    { icon: Car,   label: t('route.node3Label'), sub: t('route.node3Sub'), isDestination: false },
    { icon: Ship,  label: t('route.node4Label'), sub: t('route.node4Sub'), isDestination: true  },
  ];

  const segs = [t('route.seg1'), t('route.seg2'), t('route.seg3')];

  const notes = [
    { icon: Info, text: t('schedule.notice1') },
    { icon: Info, text: t('schedule.notice2') },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-36 lg:py-44 px-page bg-[--color-about-bg]">
      <div className="max-w-5xl mx-auto">

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
          className="flex justify-center mb-16 sm:mb-20 md:mb-28"
        >
          <div className="w-12 sm:w-16 h-px bg-[--color-gold-warm]" />
        </motion.div>

        {/* ── Route diagram — Desktop horizontal (md+) */}
        <motion.div
          custom={0.2} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="hidden md:flex items-start mb-16 sm:mb-20"
        >
          {nodes.map(({ icon: Icon, label, sub, isDestination }, idx) => (
            <div key={label} className="flex items-start flex-1 min-w-0">

              {/* Node */}
              <div className="flex flex-col items-center gap-3 shrink-0 w-28">
                <div
                  className={
                    isDestination
                      ? 'w-14 h-14 rounded-full border border-[--color-gold-warm] bg-[--color-gold-warm]/10 flex items-center justify-center text-[--color-gold-warm]'
                      : 'w-14 h-14 rounded-full border border-[--color-warm-text]/30 flex items-center justify-center text-[--color-warm-text]'
                  }
                >
                  <Icon size={20} strokeWidth={1.2} />
                </div>
                <div className="text-center px-1">
                  <p
                    className={
                      isDestination
                        ? 'font-serif text-[--color-section-text] text-sm leading-snug'
                        : 'font-sans text-[--color-section-text] text-sm leading-snug'
                    }
                  >
                    {label}
                  </p>
                  <p className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-[--color-warm-text] mt-1">
                    {sub}
                  </p>
                </div>
              </div>

              {/* Connector (not after last node) */}
              {idx < nodes.length - 1 && (
                <div className="flex-1 flex flex-col items-center pt-6 min-w-0 px-1">
                  <p className="font-sans text-[0.55rem] uppercase tracking-[0.12em] text-[--color-warm-text] mb-3 text-center whitespace-nowrap truncate max-w-full">
                    {segs[idx]}
                  </p>
                  <div className="w-full h-px bg-[--color-gold-warm]/25 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-[--color-gold-warm]/40" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* ── Route diagram — Mobile vertical timeline */}
        <motion.div
          custom={0.2} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="md:hidden mb-12"
        >
          {nodes.map(({ icon: Icon, label, sub, isDestination }, idx) => (
            <div key={label} className="flex items-start gap-5">

              {/* Left: circle + vertical connector */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={
                    isDestination
                      ? 'w-10 h-10 rounded-full border border-[--color-gold-warm] bg-[--color-gold-warm]/10 flex items-center justify-center text-[--color-gold-warm]'
                      : 'w-10 h-10 rounded-full border border-[--color-warm-text]/30 flex items-center justify-center text-[--color-warm-text]'
                  }
                >
                  <Icon size={16} strokeWidth={1.2} />
                </div>
                {idx < nodes.length - 1 && (
                  <div className="w-px bg-[--color-gold-warm]/25 flex-1 min-h-18" />
                )}
              </div>

              {/* Right: label, sub, segment */}
              <div className="pt-2 pb-1">
                <p
                  className={
                    isDestination
                      ? 'font-serif text-[--color-section-text] text-sm leading-snug'
                      : 'font-sans text-[--color-section-text] text-sm leading-snug'
                  }
                >
                  {label}
                </p>
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-[--color-warm-text] mt-1">
                  {sub}
                </p>
                {idx < nodes.length - 1 && (
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.15em] text-[--color-warm-text] mt-4 mb-2">
                    {segs[idx]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Transfer notes */}
        <motion.div
          custom={0.3} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="border-t border-[--color-gold-warm]/20 pt-10 sm:pt-12"
        >
          <ul className="space-y-3">
            {notes.map(({ icon: Icon, text }, idx) => (
              <li key={idx} className="flex items-start gap-3 font-sans text-[--color-warm-text] text-sm sm:text-base leading-relaxed">
                <Icon size={15} strokeWidth={1.5} className="text-[--color-gold-warm] shrink-0 mt-0.5" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
