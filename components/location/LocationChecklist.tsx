'use client';

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

export default function LocationChecklist() {
  const t = useTranslations('Location');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  const prepareItems = t.raw('prepare.items') as string[];

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-36 lg:py-44 px-page bg-[--color-about-bg]">
      <div className="max-w-4xl mx-auto">

        {/* ── Checklist */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center">
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-[--color-gold-warm]">04</span>
            <div className="w-8 sm:w-12 h-px bg-[--color-gold-warm]" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
              {t('prepare.tag')}
            </span>
          </div>

          <h2
            className="font-serif text-[--color-section-text] leading-[1.15] mb-6"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
          >
            {t('prepare.title')}
          </h2>

          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="w-12 sm:w-16 h-px bg-[--color-gold-warm]" />
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
            {prepareItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 font-sans text-[--color-warm-text] text-sm sm:text-base">
                <span className="text-[--color-gold-warm] shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-text italic text-[--color-section-text]/60 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t('prepare.tip')}
          </p>
        </motion.div>

        {/* ── Gold separator */}
        <motion.div
          custom={0.1} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center mt-16 sm:mt-20 md:mt-24 mb-12 sm:mb-16"
        >
          <div className="w-20 sm:w-28 h-px bg-[--color-gold-warm]/30" />
        </motion.div>

        {/* ── Bottom CTA — 區块6: 底部 CTA */}
        <motion.div
          custom={0.2} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <h2
            className="font-serif text-[--color-section-text] leading-[1.15] mb-4"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
          >
            {t('cta.title')}
          </h2>
          <p className="font-sans text-[--color-warm-text] mb-10 max-w-prose mx-auto text-sm sm:text-base leading-relaxed">
            {t('cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/60112780399"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center bg-primary text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors duration-300 hover:bg-primary-light min-h-11"
            >
              {t('cta.whatsapp')}
            </a>
            <a
              href="mailto:amy@meilihotel.com"
              className="flex items-center justify-center border border-gold text-gold px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gold hover:text-white min-h-11"
            >
              {t('cta.email')}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
