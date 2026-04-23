'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Plane, Car, Anchor, MapPin } from 'lucide-react';

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

interface ScheduleRow {
  route: string;
  time1: string;
  time2: string;
}

export default function LocationTransport() {
  const t = useTranslations('Location');

  const arrivalRows: ScheduleRow[] = [
    { route: t('arrival.scheduleArr1'), time1: '08:30', time2: '10:30' },
    { route: t('arrival.scheduleArr2'), time1: '10:00', time2: '12:30' },
  ];

  const departureRows: ScheduleRow[] = [
    { route: t('arrival.scheduleDep1'), time1: '11:00', time2: '13:30' },
    { route: t('arrival.scheduleDep2'), time1: '12:00', time2: '14:30' },
  ];

  const scheduleNotices = [
    t('schedule.notice1'),
    t('schedule.notice2'),
    t('schedule.notice3'),
  ];

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const leftInView = useInView(leftRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });
  const rightInView = useInView(rightRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  return (
    <section
      id="location-transport"
      className="bg-cream pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-0"
    >
      <div className="px-page max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* ════════════════════════════════════════
            左列：到达路线图 & 联系方式
        ════════════════════════════════════════ */}
        <div ref={leftRef} className="w-full lg:w-5/12 flex flex-col">
          {/* 章节标签 */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">03</span>
            <div className="w-8 sm:w-12 h-px bg-gold-warm" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
              {t('route.tag')}
            </span>
          </motion.div>

          <motion.h2
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="font-serif text-[--color-section-text] leading-[1.15] mb-10 sm:mb-14"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            {t('route.title')}
          </motion.h2>

          {/* 时间轴 */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* 自行安排标签 */}
            <div className="flex items-center gap-4 mb-6 ml-12">
              <span className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[--color-warm-text] border border-[--color-section-text]/20 px-3 py-1">
                {t('route.selfZone')}
              </span>
            </div>

            {/* 节点 1：塔瓦机场 */}
            <div className="flex items-start gap-4 mb-8">
              <div className="shrink-0 w-11 h-11 rounded-full border border-gold-warm flex items-center justify-center bg-cream z-10">
                <Plane size={16} className="text-gold-warm" />
              </div>
              <div className="pt-2">
                <p className="font-serif text-[--color-section-text] text-base leading-tight">
                  {t('route.tawauLabel')}
                </p>
                <p className="font-sans text-[--color-warm-text] text-xs mt-1">
                  {t('route.tawauSub')}
                </p>
                <p className="font-sans text-[--color-warm-text] text-[0.65rem] mt-1 italic">
                  {t('route.airportHint')}
                </p>
              </div>
            </div>

            {/* 分割标签：以下由我们安排 */}
            <div className="flex items-center gap-4 mb-8 ml-12">
              <div className="h-px w-8 bg-gold-warm/40" />
              <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-gold-warm whitespace-nowrap px-3">
                {t('route.divider')}
              </span>
              <div className="h-px flex-1 bg-gold-warm/40" />
            </div>

            {/* 节点 2：专属车辆 */}
            <div className="flex items-start gap-4 mb-2">
              <div className="shrink-0 w-11 h-11 rounded-full border border-gold-warm flex items-center justify-center bg-cream z-10">
                <Car size={16} className="text-gold-warm" />
              </div>
              <div className="pt-2">
                <p className="font-serif text-[--color-section-text] text-base leading-tight">
                  {t('route.tawauLabel')} → {t('route.jettyLabel')}
                </p>
                <p className="font-sans text-[--color-warm-text] text-xs mt-1">
                  {t('route.tawauMode')} · {t('route.tawauDuration')}
                </p>
                <p className="font-sans text-gold-warm/70 text-[0.6rem] mt-1 uppercase tracking-[0.15em]">
                  ✓ {t('route.included')}
                </p>
              </div>
            </div>

            {/* 节点 3：专属快艇 */}
            <div className="flex items-start gap-4 mb-2">
              <div className="shrink-0 w-11 h-11 rounded-full border border-gold-warm flex items-center justify-center bg-cream z-10">
                <Anchor size={16} className="text-gold-warm" />
              </div>
              <div className="pt-2">
                <p className="font-serif text-[--color-section-text] text-base leading-tight">
                  {t('route.jettyLabel')} → {t('route.resortLabel')}
                </p>
                <p className="font-sans text-[--color-warm-text] text-xs mt-1">
                  {t('route.jettyMode')} · {t('route.jettyDuration')}
                </p>
                <p className="font-sans text-gold-warm/70 text-[0.6rem] mt-1 uppercase tracking-[0.15em]">
                  ✓ {t('route.included')}
                </p>
              </div>
            </div>

            {/* 节点 4：美丽度假酒店 */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-full border border-gold-warm flex items-center justify-center bg-gold-warm/20 z-10">
                <MapPin size={16} className="text-gold-warm" />
              </div>
              <div className="pt-2">
                <p className="font-serif text-[--color-section-text] text-base leading-tight">
                  {t('route.resortLabel')}
                </p>
                <p className="font-sans text-[--color-warm-text] text-xs mt-1">
                  {t('route.resortSub')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 承诺引言 */}
          <motion.p
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="font-text italic text-[--color-section-text]/60 text-sm sm:text-base leading-relaxed mt-12 sm:mt-16"
          >
            &ldquo;{t('route.promise')}&rdquo;
          </motion.p>
        </div>

        {/* ════════════════════════════════════════
            右列：班次时刻表
        ════════════════════════════════════════ */}
        <div ref={rightRef} className="w-full lg:w-7/12 mt-20 lg:mt-0">
          {/* 将 schedule 整体对齐上沿 */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">04</span>
            <div className="w-8 sm:w-12 h-px bg-gold-warm" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
              {t('schedule.tag')}
            </span>
          </motion.div>

          <motion.h2
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            className="font-serif text-[--color-section-text] leading-[1.15] mb-10 sm:mb-14"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            {t('schedule.title')}
          </motion.h2>

          {/* 右侧主时刻表区域 */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            className="bg-white p-8 sm:p-10 md:p-12 rounded-sm"
          >
            <div className="flex flex-col xl:flex-row gap-12 xl:gap-8">
              {/* 到达方向 */}
              <div className="w-full xl:w-1/2">
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-gold-warm mb-6">
                  {t('schedule.arrivalTitle')}
                </p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[--color-section-text]/10">
                      <th className="text-left font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 pr-2 whitespace-nowrap">{t('schedule.colRoute')}</th>
                      <th className="text-center font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 px-2 whitespace-nowrap">{t('schedule.colTime1')}</th>
                      <th className="text-center font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 whitespace-nowrap">{t('schedule.colTime2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrivalRows.map((row) => (
                      <tr key={row.route} className="border-b border-[--color-section-text]/5">
                        <td className="py-4 pr-2 font-sans text-[--color-section-text]/75 text-sm leading-snug whitespace-nowrap">{row.route}</td>
                        <td className="py-4 px-2 text-center">
                          <span className="font-serif text-[--color-section-text] text-[1.1rem] sm:text-lg">{row.time1}</span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="font-serif text-[--color-section-text] text-[1.1rem] sm:text-lg">{row.time2}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 竖向分割线（XL 端） */}
              <div className="hidden xl:block w-px bg-[--color-section-text]/10 mx-2" aria-hidden="true" />

              {/* 离开方向 */}
              <div className="w-full xl:w-1/2">
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-gold-warm mb-6">
                  {t('schedule.departureTitle')}
                </p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[--color-section-text]/10">
                      <th className="text-left font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 pr-2 whitespace-nowrap">{t('schedule.colRoute')}</th>
                      <th className="text-center font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 px-2 whitespace-nowrap">{t('schedule.colTime1')}</th>
                      <th className="text-center font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 whitespace-nowrap">{t('schedule.colTime2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departureRows.map((row) => (
                      <tr key={row.route} className="border-b border-[--color-section-text]/5">
                        <td className="py-4 pr-2 font-sans text-[--color-section-text]/75 text-sm leading-snug whitespace-nowrap">{row.route}</td>
                        <td className="py-4 px-2 text-center">
                          <span className="font-serif text-[--color-section-text] text-[1.1rem] sm:text-lg">{row.time1}</span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="font-serif text-[--color-section-text] text-[1.1rem] sm:text-lg">{row.time2}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 时刻表提示 */}
            <ul className="mt-8 sm:mt-10 space-y-3">
              {scheduleNotices.map((notice, i) => (
                <li key={i} className="font-sans text-xs sm:text-sm text-[--color-warm-text] leading-relaxed pl-4 border-l border-[--color-section-text]/10">
                  {notice}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
