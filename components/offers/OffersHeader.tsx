'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function OffersHeader() {
  const t = useTranslations('OffersHeader');

  return (
    <section className="bg-primary pt-32 pb-20 md:pt-40 md:pb-24 border-b border-white/10">
      <div className="px-page flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-white leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)' }}
        >
          {t('title')}
        </motion.h1>
        
        <motion.div
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-8"
        >
          <div className="w-12 sm:w-16 h-px bg-gold-warm" />
        </motion.div>
        
        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-sans text-white/80 text-sm sm:text-base tracking-[0.2em] uppercase"
        >
          {t('subtitle')}
        </motion.p>
      </div>
    </section>
  );
}
