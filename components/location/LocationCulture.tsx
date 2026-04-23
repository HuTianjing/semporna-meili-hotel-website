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

interface HighlightItem {
  value: string;
  label: string;
  sublabel: string;
}

export default function LocationCulture() {
  const t = useTranslations('Location');

  const geoRef = useRef<HTMLDivElement>(null);
  const bajauRef = useRef<HTMLDivElement>(null);

  const geoInView = useInView(geoRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });
  const bajauInView = useInView(bajauRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  const highlights: HighlightItem[] = [
    { value: '4°N', label: '北纬四度 · 赤道海域', sublabel: '4° North Latitude' },
    { value: '26–32°C', label: '全年舒适气温', sublabel: 'Year-round Temperature' },
    { value: '100+ 年', label: '无台风记录', sublabel: '100+ Years Typhoon-Free' },
    { value: '< 30 分钟', label: '快艇直达诗巴丹', sublabel: 'Speedboat to Sipadan' },
  ];

  return (
    <section
      id="location-culture"
      className="bg-[--color-about-bg] pt-16 sm:pt-24 md:pt-36 lg:pt-44 pb-16 sm:pb-24 md:pb-36 lg:pb-44"
    >
      {/* 1-A 地理优势 */}
      <div
        ref={geoRef}
        className="flex flex-col md:flex-row items-stretch px-page gap-12 md:gap-0 max-w-screen-xl mx-auto"
      >
        {/* 左图 */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={geoInView ? 'visible' : 'hidden'}
          className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-auto md:min-h-[600px] overflow-hidden flex-shrink-0"
        >
          <Image
            src="/Photos on OTA/iStock-831459576.jpg"
            alt="仙本那玻璃海 — 美丽度假酒店所在的珊瑚金三角海域"
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
            className="font-serif text-[--color-section-text] leading-[1.1] mb-8 sm:mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
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

          {/* 地理数据亮点 4格 */}
          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate={geoInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-[--color-section-text]/10 pt-10"
          >
            {highlights.map((item) => (
              <div key={item.value} className="flex flex-col gap-1">
                <span
                  className="font-serif text-[--color-section-text] leading-none"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                >
                  {item.value}
                </span>
                <span className="font-sans text-[0.6rem] text-[--color-warm-text] leading-snug mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 分割空间 */}
      <div className="h-20 sm:h-28 md:h-36" />

      {/* 1-B 巴瑶族 */}
      <div
        ref={bajauRef}
        className="flex flex-col md:flex-row-reverse items-stretch px-page gap-12 md:gap-0 max-w-screen-xl mx-auto"
      >
        {/* 右图（桌面右，移动上） */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={bajauInView ? 'visible' : 'hidden'}
          className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-auto md:min-h-[500px] overflow-hidden flex-shrink-0"
        >
          <Image
            src="/Photos on OTA/iStock-171577290.jpg"
            alt="巴瑶族海上游牧民族 — 世代守护仙本那珊瑚礁"
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
            className="font-serif text-[--color-section-text] leading-[1.1] mb-8 sm:mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
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
