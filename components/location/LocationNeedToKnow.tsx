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

const CHECKLIST_ITEMS = [
  '护照或身份证件',
  '预订确认函（截图即可，我们已有记录）',
  '个人常用药物',
  '泳衣（数套）+ 防晒霜（推荐珊瑚友好型）',
  '防滑鞋（快艇甲板）+ 墨镜 · 遮阳帽',
  '水下摄影装备（可选）',
];

const POLICY_ITEMS = [
  '不可退款，需全额预付',
  '有效期：2026年10月起',
  '套餐不含：水疗 · 酒吧及其他特别注明项目',
];

export default function LocationNeedToKnow() {
  const t = useTranslations('Location');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  return (
    <section
      id="location-info"
      ref={sectionRef}
      className="bg-white py-16 sm:py-24 md:py-36 lg:py-44"
    >
      <div className="px-page max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

        {/* ── 左列：行前清单 (约 50%) ── */}
        <div className="w-full lg:w-1/2">

          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">01</span>
            <div className="w-8 sm:w-12 h-px bg-gold-warm" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
              {t('info.checklistTag')}
            </span>
          </motion.div>

          <motion.h2
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="font-serif text-[--color-section-text] leading-[1.1] mb-8"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
          >
            {t('info.checklistTitle')}
          </motion.h2>

          <motion.ul
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-3 mb-8"
          >
            {CHECKLIST_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  size={14}
                  strokeWidth={2.5}
                  className="text-gold-warm shrink-0 mt-1"
                />
                <span className="font-sans text-sm text-[--color-section-text]/75 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.p
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="font-text italic text-[--color-warm-text] text-sm leading-relaxed"
          >
            岛上一切已为您备妥，轻装出发即可。
          </motion.p>
        </div>

        {/* ── 右列：预订须知 (约 50%) ── */}
        <div className="w-full lg:w-1/2">

          <motion.div
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">02</span>
            <div className="w-8 sm:w-12 h-px bg-gold-warm" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
              {t('info.policyTag')}
            </span>
          </motion.div>

          {/* 价格大字 */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-10"
          >
            <p
              className="font-serif text-[--color-section-text] leading-none mb-2"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            >
              {t('info.priceValue')}
            </p>
            <p className="font-sans text-sm text-[--color-warm-text]">
              {t('info.priceUnit')}
            </p>
          </motion.div>

          {/* 政策条款 */}
          <motion.ul
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="divide-y divide-[--color-section-text]/10"
          >
            {POLICY_ITEMS.map((item) => (
              <li
                key={item}
                className="py-4 font-sans text-sm text-[--color-section-text]/75 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
