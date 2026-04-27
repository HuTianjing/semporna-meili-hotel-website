'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.6, delay, ease: 'easeOut' as const },
  }),
};

export function HotelIntro() {
  const t = useTranslations('HotelIntro');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -40px 0px',
    amount: 0.05,
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden bg-about-bg"
    >
      {/* 极轻底纹大字 ornament — 仅作为巨大背景装饰，桌面端可见 */}
      <motion.span
        aria-hidden="true"
        variants={fadeIn}
        custom={0.2}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none font-serif italic text-section-text/[0.04] lg:block"
        style={{ fontSize: 'clamp(20rem, 38vw, 44rem)', lineHeight: 1 }}
      >
        M
      </motion.span>

      <div className="relative py-32 md:py-44 lg:py-56">
        {/*
          12 列网格 + 不对称：标题、正文、CTA 全部从第 2 列开始，
          右侧留出"虚位"。最大宽度限制让 manifesto 不会在超宽屏拉得过散。
        */}
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 px-6 sm:px-10 lg:px-16">
          {/* 内容列：mobile 全宽，md 起从第 2 列开始占 9 列 */}
          <div className="col-span-12 md:col-span-9 md:col-start-2 lg:col-span-8 lg:col-start-2">
            {/* Eyebrow */}
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mb-12 font-sans text-[0.65rem] uppercase tracking-[0.45em] text-warm-text sm:mb-16"
            >
              About
            </motion.p>

            {/* Manifesto 主标题 — display size，不对称视觉锚点 */}
            <motion.h2
              custom={0.12}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-serif font-light text-section-text"
              style={{
                fontSize: 'clamp(2.25rem, 7vw, 5.75rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {t('headingLine1')}
            </motion.h2>

            {/* body 段落 — 限制在 ~480px 宽，与大标题形成强对比 */}
            <motion.p
              custom={0.28}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-14 max-w-md font-sans text-[0.9375rem] font-light leading-[2] text-[#5a5347] sm:mt-20"
            >
              {t('body1')}
            </motion.p>

            {/* CTA — 纯文字 + 箭头 */}
            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-12 sm:mt-16"
            >
              <Link
                href="/villas"
                className="group inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-section-text"
              >
                {t('cta')}
                <span className="text-gold-warm transition-transform duration-700 ease-out group-hover:translate-x-2">
                  &#8594;
                </span>
              </Link>
            </motion.div>
          </div>

          {/* 右下角品牌签名块（桌面端可见）— 与左侧文字形成对角线张力 */}
          <motion.div
            variants={fadeIn}
            custom={0.55}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="col-span-12 hidden md:col-span-2 md:col-start-11 md:col-end-13 md:flex md:items-end md:justify-end"
          >
            <div className="flex flex-col items-end gap-3">
              <span className="font-serif text-3xl italic text-section-text/40 lg:text-4xl">
                M
              </span>
              <span className="font-sans text-[0.55rem] uppercase tracking-[0.4em] text-warm-text">
                Sempor&shy;na
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
