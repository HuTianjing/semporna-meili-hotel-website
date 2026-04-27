'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function HotelIntro() {
  const t = useTranslations('HotelIntro');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -40px 0px', amount: 0.05 });

  // 横排数据带 — 去掉 icon 圆底，改为编辑式数字 + 细线分隔
  const stats = [
    { value: t('highlight1Value'), label: t('highlight1Label') },
    { value: t('highlight2Value'), label: t('highlight2Label') },
    { value: t('highlight3Value'), label: t('highlight3Label') },
    { value: t('highlight4Value'), label: t('highlight4Label') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden bg-about-bg"
    >
      <div className="py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-275 px-5 sm:px-8 md:px-12 lg:px-16">
          {/* ── 1. 刊头 [01] —— ABOUT — 左对齐 ── */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-10 flex items-center gap-4 sm:mb-14"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">
              01
            </span>
            <div className="h-px w-10 bg-gold-warm sm:w-12" />
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-warm-text sm:text-[0.65rem]">
              {t('sectionLabel')}
            </span>
          </motion.div>

          {/* ── 2. 大号 serif 主标题 — 左对齐，第二行缩进形成编辑节奏 ── */}
          <motion.div
            custom={0.12}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-10 sm:mb-14"
          >
            <h2
              className="font-serif font-light leading-[1.05] tracking-tight text-section-text"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.25rem)' }}
            >
              <span className="block">{t('headingLine1')}</span>
              <span className="mt-1 block sm:mt-2 sm:pl-[12%] md:pl-[18%]">
                {t('headingLine2')}
              </span>
            </h2>
          </motion.div>

          {/* ── 3. 二栏 editorial 正文：左 lead 引言 / 右 body 段落 ── */}
          <motion.div
            custom={0.22}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 lg:mb-28 lg:gap-16"
          >
            {/* 左：金线 + 一行 lead — manifesto 式 */}
            <div className="md:col-span-5 md:pt-2">
              <div className="mb-6 h-px w-12 bg-gold-warm" />
              <p className="font-serif text-lg italic leading-[1.6] text-section-text/80 sm:text-xl">
                {t('quote')}
              </p>
            </div>

            {/* 右：body 段落 */}
            <div className="space-y-5 md:col-span-7">
              <p className="font-sans text-[0.875rem] font-light leading-[1.95] text-[#5a5347] sm:text-[0.9375rem]">
                {t('body1')}
              </p>
              <p className="font-sans text-[0.875rem] font-light leading-[1.95] text-[#5a5347] sm:text-[0.9375rem]">
                {t('body2')}
              </p>
            </div>
          </motion.div>

          {/* ── 4. 横排数据带 — Aman 风格，去 icon，用细线分隔 ── */}
          <motion.div
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="border-t border-section-text/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, idx) => (
                <div
                  key={s.label}
                  className={`px-4 py-8 sm:px-6 sm:py-10 ${
                    idx > 0 ? 'md:border-l md:border-section-text/10' : ''
                  } ${idx === 1 ? 'border-l border-section-text/10 md:border-l' : ''} ${
                    idx === 2 ? 'border-t border-section-text/10 md:border-t-0' : ''
                  } ${idx === 3 ? 'border-t border-l border-section-text/10 md:border-t-0' : ''}`}
                >
                  <div
                    className="mb-3 font-serif font-light leading-none text-section-text"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                  >
                    {s.value}
                  </div>
                  <div className="font-sans text-[0.65rem] uppercase leading-snug tracking-[0.2em] text-warm-text sm:text-[0.7rem]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-section-text/10" />
          </motion.div>

          {/* ── 5. CTA — 左对齐次级 CTA ── */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-16 sm:mt-20"
          >
            <Link
              href="/villas"
              className="group inline-flex items-center gap-3 border-b border-section-text/30 pb-1 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-section-text transition-colors duration-500 hover:border-section-text"
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
