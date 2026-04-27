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
      className="relative z-10 w-full overflow-hidden bg-about-bg py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        {/* Eyebrow — 仅保留英文小词 */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10 font-sans text-[0.65rem] uppercase tracking-[0.45em] text-warm-text sm:mb-14"
        >
          About
        </motion.p>

        {/* Manifesto 主标题 */}
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

        {/* body 正文 */}
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
    </section>
  );
}
