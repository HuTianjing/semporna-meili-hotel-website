'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

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

export default function LocationCulture() {
  const t = useTranslations('Location');

  const geoRef = useRef<HTMLDivElement>(null);
  const bajauRef = useRef<HTMLDivElement>(null);

  const geoInView = useInView(geoRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });
  const bajauInView = useInView(bajauRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  return (
    <section
      id="location-culture"
      className="bg-[--color-about-bg] pt-16 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-40 pb-0"
    >
      {/* 1-A 地理优势 */}
      <div
        ref={geoRef}
        className="flex flex-col md:flex-row items-center px-page gap-12 md:gap-0 max-w-7xl mx-auto"
      >
        {/* 左图 */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={geoInView ? 'visible' : 'hidden'}
          className="w-full md:w-1/2 relative aspect-4/3 overflow-hidden shrink-0 rounded-sm"
        >
          <Image
            src="https://picsum.photos/seed/meili_loc_1/1920/1080"
            alt={t('info.imageAlt.geo')}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* 右文 */}
        <div className="w-full md:w-1/2 md:pl-16 lg:pl-24 flex flex-col justify-center">
          {/* 章节标签 */}
          <motion.div
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate={geoInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">01</span>
            <div className="w-8 sm:w-12 h-px bg-gold-warm" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
              {t('intro.tag')}
            </span>
          </motion.div>

          {/* 主标题 */}
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={geoInView ? 'visible' : 'hidden'}
            className="font-serif text-[--color-section-text] leading-[1.15] mb-8 sm:mb-10"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            {t('intro.title1')}
          </motion.h2>

          {/* 正文三段 */}
          <motion.p
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate={geoInView ? 'visible' : 'hidden'}
            className="font-sans text-[--color-section-text]/75 text-sm sm:text-base leading-relaxed mb-5"
          >
            {t('intro.desc1')}
          </motion.p>
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={geoInView ? 'visible' : 'hidden'}
            className="font-sans text-[--color-section-text]/75 text-sm sm:text-base leading-relaxed mb-5"
          >
            {t('intro.desc2')}
          </motion.p>
          <motion.p
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate={geoInView ? 'visible' : 'hidden'}
            className="font-sans text-[--color-section-text]/75 text-sm sm:text-base leading-relaxed mb-10 sm:mb-14"
          >
            {t('intro.desc3')}
          </motion.p>
        </div>
      </div>

      {/* 分割空间 */}
      <div className="h-20 sm:h-28 md:h-36" />

      {/* 1-B 巴瑶族 */}
      <div
        ref={bajauRef}
        className="flex flex-col md:flex-row-reverse items-center px-page gap-12 md:gap-0 max-w-7xl mx-auto"
      >
        {/* 右图（桌面右，移动上） */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={bajauInView ? 'visible' : 'hidden'}
          className="w-full md:w-1/2 relative aspect-4/3 overflow-hidden shrink-0 rounded-sm"
        >
          <Image
            src="https://picsum.photos/seed/meili_loc_2/1920/1080"
            alt={t('info.imageAlt.bajau')}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* 左文 */}
        <div className="w-full md:w-1/2 md:pr-16 lg:pr-24 flex flex-col justify-center">
          {/* 章节标签 */}
          <motion.div
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate={bajauInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">02</span>
            <div className="w-8 sm:w-12 h-px bg-gold-warm" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
              {t('culture.bajau.tag')}
            </span>
          </motion.div>

          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={bajauInView ? 'visible' : 'hidden'}
            className="font-serif text-[--color-section-text] leading-[1.15] mb-8 sm:mb-10"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            {t('culture.bajau.title')}
          </motion.h2>

          <motion.p
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate={bajauInView ? 'visible' : 'hidden'}
            className="font-sans text-[--color-section-text]/75 text-sm sm:text-base leading-relaxed mb-5"
          >
            {t('culture.bajau.desc1')}
          </motion.p>
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={bajauInView ? 'visible' : 'hidden'}
            className="font-sans text-[--color-section-text]/75 text-sm sm:text-base leading-relaxed"
          >
            {t('culture.bajau.desc2')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
