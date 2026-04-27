'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Waves, Star, Compass } from 'lucide-react';
import Link from 'next/link';

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

export function HotelIntro() {
  const t = useTranslations('HotelIntro');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -40px 0px', amount: 0.08 });

  const highlights = [
    { icon: MapPin, value: t('highlight1Value'), label: t('highlight1Label') },
    { icon: Waves, value: t('highlight2Value'), label: t('highlight2Label') },
    { icon: Star, value: t('highlight3Value'), label: t('highlight3Label') },
    { icon: Compass, value: t('highlight4Value'), label: t('highlight4Label') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden bg-about-bg"
    >
      <div className="py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-275 px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Section header — 统一刊头模板 */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-6 flex items-center justify-center gap-3 sm:mb-8 sm:gap-4"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">
              01
            </span>
            <div className="h-px w-8 bg-gold-warm sm:w-12" />
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-warm-text sm:text-[0.65rem] sm:tracking-[0.3em]">
              {t('sectionLabel')}
            </span>
          </motion.div>

          {/* Main heading — 单色 section-text，去除 #0086cd 蓝 */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-8 text-center sm:mb-10"
          >
            <h2 className="font-serif leading-[1.15] text-section-text">
              <span className="block" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
                {t('headingLine1')}
              </span>
              <span
                className="mt-1 block sm:mt-2"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
              >
                {t('headingLine2')}
              </span>
            </h2>
          </motion.div>

          {/* Decorative gold line */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-10 flex justify-center sm:mb-14"
          >
            <div className="h-px w-12 bg-gold-warm sm:w-16" />
          </motion.div>

          {/* Body text */}
          <motion.div
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mx-auto mb-14 max-w-170 space-y-4 text-center sm:mb-20 sm:space-y-5"
          >
            <p className="font-sans text-[0.875rem] font-light leading-[1.85] text-[#5a5347] sm:text-[0.9375rem] sm:leading-[1.95]">
              {t('body1')}
            </p>
            <p className="font-sans text-[0.875rem] font-light leading-[1.85] text-[#5a5347] sm:text-[0.9375rem] sm:leading-[1.95]">
              {t('body2')}
            </p>
          </motion.div>

          {/* Highlights grid — icon 颜色改为 primary，去除蓝色圆底 */}
          <motion.div
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mx-auto grid max-w-200 grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8"
          >
            {highlights.map((h) => (
              <div key={h.label} className="flex flex-col items-center text-center">
                <h.icon
                  size={20}
                  className="mb-4 text-primary"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <span className="mb-1 block font-serif text-lg leading-none text-section-text sm:text-xl">
                  {h.value}
                </span>
                <span className="block font-sans text-[0.625rem] leading-snug tracking-wide text-warm-text sm:text-[0.7rem]">
                  {h.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA — 统一次级 CTA 样式，去除 #0086cd 蓝箭头 */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-16 text-center sm:mt-20"
          >
            <Link
              href="/villas"
              className="group inline-flex items-center gap-3 border-b border-section-text/30 pb-1 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-section-text transition-colors duration-500 hover:border-section-text"
            >
              {t('cta')}
              <span className="text-gold-warm transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
