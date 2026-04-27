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
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          {/* Eyebrow — 仅一个英文小词，无编号、无短线、无装饰 */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-10 font-sans text-[0.65rem] uppercase tracking-[0.45em] text-warm-text sm:mb-14"
          >
            About
          </motion.p>

          {/* Manifesto serif 主标题 — 一句话点题 */}
          <motion.h2
            custom={0.12}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="font-serif font-light leading-[1.15] tracking-tight text-section-text"
            style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.5rem)' }}
          >
            {t('headingLine1')}
          </motion.h2>

          {/* body 段落 — 仅一段，宽度受限制造编辑式阅读节奏 */}
          <motion.p
            custom={0.24}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mx-auto mt-12 max-w-xl font-sans text-[0.9375rem] font-light leading-[2] text-[#5a5347] sm:mt-16"
          >
            {t('body1')}
          </motion.p>

          {/* CTA — 纯文字 + 箭头，无下划线 */}
          <motion.div
            custom={0.36}
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
    </section>
  );
}
