'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

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

export default function LocationNeedToKnow() {
  const t = useTranslations('Location');
  const checklistItems = t.raw('info.checklistItems') as string[];
  const stayItems = t.raw('info.stayItems') as string[];

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });
  const rightInView = useInView(rightRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  return (
    <section
      id="location-info"
      className="bg-white pt-10 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-20"
    >
      <div className="px-page max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

        {/* ════════════════════════════════════════
            左列：行前清单  BUTLER'S NOTE
        ════════════════════════════════════════ */}
        <div ref={leftRef} className="w-full lg:w-1/2">

          {/* 01 章节标签 */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">
              05
            </span>
            <div className="w-8 sm:w-12 h-px bg-gold-warm" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
              {t('info.checklistTag')}
            </span>
          </motion.div>

          {/* 主标题 */}
          <motion.h2
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="font-serif text-[--color-section-text] leading-[1.1] mb-8 sm:mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
          >
            {t('info.checklistTitle')}
          </motion.h2>

          {/* 清单条目 */}
          <motion.ul
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="space-y-6 sm:space-y-8 mb-10"
          >
            {checklistItems.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <Check
                  size={16}
                  strokeWidth={2}
                  className="text-gold-warm flex-shrink-0 mt-0.5"
                />
                <span className="font-sans text-sm sm:text-base text-[--color-section-text]/75 leading-relaxed tracking-wide">
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* 收笔斜体 — 管家承诺语气 */}
          <motion.p
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="font-text italic text-[--color-warm-text] text-sm sm:text-base leading-relaxed mt-12"
          >
            {t('info.closingNote')}
          </motion.p>
        </div>

        {/* ════════════════════════════════════════
            右列：入住须知  STAY ESSENTIALS
        ════════════════════════════════════════ */}
        <div ref={rightRef} className="w-full lg:w-1/2">

          {/* 02 章节标签 */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">
              06
            </span>
            <div className="w-8 sm:w-12 h-px bg-gold-warm" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
              {t('info.stayTag')}
            </span>
          </motion.div>

          {/* 主标题（替代原本巨大的时间显示，与左侧标题对齐对称） */}
          <motion.h2
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            className="font-serif text-[--color-section-text] leading-[1.1] mb-8 sm:mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
          >
            {t('info.stayTitle')}
          </motion.h2>

          {/* 须知条款 — 去除割裂的横线，使用与左侧同样的行距与文字质感 */}
          <motion.ul
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            className="space-y-6 sm:space-y-8"
          >
            {/* 将原本占地方的入住/退房时间整合成第一条须知 */}
            <li className="flex items-start gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-warm/60 flex-shrink-0 mt-2" />
              <span className="font-sans text-sm sm:text-base text-[--color-section-text]/75 leading-relaxed tracking-wide">
                <span className="font-medium text-[--color-section-text]">{t('info.checkinLabel')}：</span>
                {t('info.checkinValue')} 
                <span className="mx-3 opacity-40">|</span> 
                <span className="font-medium text-[--color-section-text]">{t('info.checkoutLabel')}：</span>
                {t('info.checkoutValue')}
              </span>
            </li>

            {stayItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-warm/60 flex-shrink-0 mt-2" />
                <span className="font-sans text-sm sm:text-base text-[--color-section-text]/75 leading-relaxed tracking-wide">
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

      </div>
    </section>
  );
}
