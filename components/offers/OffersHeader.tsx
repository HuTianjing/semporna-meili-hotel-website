'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function OffersHeader() {
  const t = useTranslations('OffersHeader');

  return (
    <section className="bg-primary pt-32 pb-20 md:pt-40 md:pb-24 border-b border-white/10">
      <div className="px-page flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
        <motion.p
          className="font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.45em] text-white/50 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          {t('tag')}
        </motion.p>

        <motion.h1
          className="font-serif text-white leading-[1.05] mb-8"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
          {t('title')}
        </motion.h1>

        <div className="flex justify-center mb-8 overflow-hidden">
          <motion.div
            className="w-12 sm:w-16 h-px bg-gold-warm"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        <motion.p
          className="font-sans text-white/70 text-sm sm:text-base tracking-[0.2em] uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
        >
          {t('subtitle')}
        </motion.p>
      </div>
    </section>
  );
}
