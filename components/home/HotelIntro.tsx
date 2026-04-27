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
      <div className="py-32 md:py-40 lg:py-52">
        {/* 统一容器宽度 1280px (max-w-7xl)，内部所有元素共享同一阅读宽度 max-w-3xl 实现左右对齐 */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* 标题 — headingLine1 + headingLine2 单行展示 */}
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-serif font-light leading-[1.2] tracking-tight text-section-text text-balance"
              style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.5rem)' }}
            >
              {t('headingLine1')}，{t('headingLine2')}
            </motion.h2>

            {/* 描述 — body1 与 body2 合并为一段 */}
            <motion.p
              custom={0.18}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-12 font-sans text-[0.9375rem] font-light leading-[2] text-[#5a5347] sm:mt-16 sm:text-base"
            >
              {t('body1')}
              {t('body2')}
            </motion.p>

            {/* CTA — 纯文字 + 箭头，无下划线 */}
            <motion.div
              custom={0.32}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-14 sm:mt-20"
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
        </div>
      </div>
    </section>
  );
}
