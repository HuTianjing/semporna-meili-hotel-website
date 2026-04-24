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

export default function GalleryCTA() {
  const t = useTranslations('Gallery.CTA');

  return (
    <div className="px-page max-w-7xl mx-auto pt-16 sm:pt-20 w-full pb-16 sm:pb-24 lg:pb-32 bg-white">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -20px 0px', amount: 0.02 }}
        className="pt-16 sm:pt-20 border-t border-black/10 flex flex-col items-center text-center w-full"
      >
        <h2 className="font-serif text-black leading-[1.15] mb-3 font-normal text-3xl md:text-5xl lg:text-[64px] tracking-tight max-w-[800px] mb-5">
          {t('title')}
        </h2>
        <p className="font-sans text-black/60 max-w-[500px] text-base sm:text-lg mb-8 sm:mb-12">
          {t('desc')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <a
            href="https://wa.me/something"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 md:py-4 rounded-full border border-black/20 text-black font-sans uppercase tracking-widest text-xs sm:text-sm hover:bg-black/5 transition-colors duration-300 w-full sm:w-auto"
          >
            {t('whatsapp')}
          </a>
          <button className="px-8 py-3.5 md:py-4 rounded-full bg-gold-warm text-white font-sans uppercase tracking-widest text-xs sm:text-sm hover:bg-gold-warm/90 transition-colors duration-300 w-full sm:w-auto shadow-md">
            {t('button')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
