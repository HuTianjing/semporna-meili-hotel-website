'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function LocationCTA() {
  const t = useTranslations('Location');

  return (
    <div className="px-page max-w-7xl mx-auto pt-8 sm:pt-12 md:pt-16 w-full pb-16 sm:pb-24 lg:pb-32 bg-white">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -20px 0px', amount: 0.02 }}
        className="pt-16 sm:pt-20 border-t border-[--color-section-text]/10 flex flex-col items-center text-center w-full"
      >
        <h2 
          className="font-serif text-[--color-section-text] leading-[1.2] mb-3 font-normal" 
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
        >
          {t('cta.title')}
        </h2>
        <p className="font-text italic text-[--color-warm-text] tracking-[0.15em] text-sm sm:text-base mb-8">
          {t('cta.titleEn')}
        </p>

        <div className="max-w-2xl mx-auto mb-10">
          <p className="font-sans text-[--color-section-text]/75 text-sm sm:text-base leading-relaxed">
            {t('cta.desc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <a
            href="https://wa.me/601127803997"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-12.5 px-10 py-3.5 inline-flex items-center justify-center border border-[--color-section-text]/20 text-[--color-section-text]/80 font-sans text-xs tracking-[0.2em] transition-all duration-400 hover:border-[--color-section-text] hover:text-[--color-section-text]"
          >
            {t('cta.whatsapp')}
          </a>
          <a
            href="mailto:amy@meilihotel.com"
            className="w-full sm:w-auto min-h-12.5 px-10 py-3.5 inline-flex items-center justify-center border border-[--color-section-text]/20 text-[--color-section-text]/80 font-sans text-xs tracking-[0.2em] transition-all duration-400 hover:border-[--color-section-text] hover:text-[--color-section-text]"
          >
            {t('cta.email')}
          </a>
        </div>
      </motion.div>
    </div>
  );
}