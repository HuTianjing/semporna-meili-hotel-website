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

export default function LocationMap() {
  const t = useTranslations('Location');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-28 px-page bg-cream">
      <div className="max-w-5xl mx-auto">

        {/* ── Light section tag (no number, visual block) */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 justify-center"
        >
          <div className="w-8 sm:w-12 h-px bg-[--color-gold-warm]/40" />
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.35em] text-[--color-warm-text]">
            {t('map.tag')}
          </span>
          <div className="w-8 sm:w-12 h-px bg-[--color-gold-warm]/40" />
        </motion.div>

        {/* ── Map embed */}
        <motion.div
          custom={0.1} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '16/9' }}
        >
          <iframe
            src="https://maps.google.com/maps?q=Semporna,Sabah,Malaysia&t=&z=11&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Meili Resort Hotel — Location Map"
          />
        </motion.div>

        {/* ── Landmark legend */}
        <motion.p
          custom={0.2} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[--color-warm-text] text-center mt-6"
        >
          {t('map.caption')}
        </motion.p>

      </div>
    </section>
  );
}
