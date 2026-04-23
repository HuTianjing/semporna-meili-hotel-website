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

const ARRIVAL_ROWS: ScheduleRow[] = [
  { route: '塔瓦机场 → 仙本那码头', time1: '08:30', time2: '10:30' },
  { route: '仙本那码头 → 美丽度假酒店', time1: '10:00', time2: '12:30' },
];

const DEPARTURE_ROWS: ScheduleRow[] = [
  { route: '美丽度假酒店 → 仙本那码头', time1: '11:00', time2: '13:30' },
  { route: '仙本那码头 → 塔瓦机场', time1: '12:00', time2: '14:30' },
];

const SCHEDULE_NOTICES = [
  '我们将在您抵达塔瓦机场后，安排专属司机在出口处等候',
  '如您的航班时间特殊，请提前联系我们，我们将灵活调整接送安排',
  '所有接送行程均已含于套餐，无需额外支付',
];

export default function LocationTransport() {
  const t = useTranslations('Location');

  const routeRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const routeInView = useInView(routeRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });
  const scheduleInView = useInView(scheduleRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });
  const ctaInView = useInView(ctaRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  return (
    <section
      id="location-transport"
      className="bg-[--color-about-bg] py-16 sm:py-24 md:py-36 lg:py-44"
    >
      {/* ── 3-A 到达路线图 ── */}
      <div
        ref={routeRef}
        className="px-page max-w-2xl mx-auto mb-20 sm:mb-28 md:mb-36"
      >
        {/* 章节标签 */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={routeInView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center"
        >
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">04</span>
          <div className="w-8 sm:w-12 h-px bg-gold-warm" />
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
            {t('route.tag')}
          </span>
        </motion.div>

        <motion.h2
          custom={0.05}
          variants={fadeUp}
          initial="hidden"
          animate={routeInView ? 'visible' : 'hidden'}
          className="font-serif text-[--color-section-text] leading-[1.1] text-center mb-14 sm:mb-16"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
        >
          {t('route.title')}
        </motion.h2>

        {/* 时间轴 */}
        <motion.div
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={routeInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* 竖线 */}
          <div className="absolute left-[1.375rem] top-0 bottom-0 w-px bg-[--color-gold-warm]/30" aria-hidden="true" />

          {/* 自行安排标签 */}
          <div className="flex items-center gap-4 mb-6 ml-12">
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[--color-warm-text] border border-[--color-section-text]/20 px-3 py-1">
              {t('route.selfZone')}
            </span>
          </div>

          {/* 节点 1：塔瓦机场 */}
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gold-warm flex items-center justify-center bg-[--color-about-bg] z-10">
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
            <div className="h-px flex-1 bg-gold-warm/40" />
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-gold-warm whitespace-nowrap px-3">
              {t('route.divider')}
            </span>
            <div className="h-px flex-1 bg-gold-warm/40" />
          </div>

          {/* 节点 2：专属车辆 */}
          <div className="flex items-start gap-4 mb-2">
            <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gold-warm flex items-center justify-center bg-[--color-about-bg] z-10">
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

          <div className="ml-[1.375rem] w-px h-8 bg-[--color-gold-warm]/20" aria-hidden="true" />

          {/* 节点 3：专属快艇 */}
          <div className="flex items-start gap-4 mb-2">
            <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gold-warm flex items-center justify-center bg-[--color-about-bg] z-10">
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

          <div className="ml-[1.375rem] w-px h-8 bg-[--color-gold-warm]/20" aria-hidden="true" />

          {/* 节点 4：美丽度假酒店 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gold-warm flex items-center justify-center bg-gold-warm/20 z-10">
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
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={routeInView ? 'visible' : 'hidden'}
          className="font-text italic text-[--color-section-text]/60 text-sm sm:text-base leading-relaxed text-center mt-12 sm:mt-16 max-w-xl mx-auto"
        >
          &ldquo;{t('route.promise')}&rdquo;
        </motion.p>
      </div>

      {/* ── 3-B 班次时刻表 ── */}
      <div
        ref={scheduleRef}
        className="px-page max-w-screen-lg mx-auto mb-20 sm:mb-28 md:mb-36"
      >
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={scheduleInView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12 justify-center"
        >
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">05</span>
          <div className="w-8 sm:w-12 h-px bg-gold-warm" />
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
            {t('schedule.tag')}
          </span>
        </motion.div>

        <motion.div
          custom={0.05}
          variants={fadeUp}
          initial="hidden"
          animate={scheduleInView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row gap-10 md:gap-0"
        >
          {/* 到达方向 */}
          <div className="w-full md:w-1/2 md:pr-10 lg:pr-16">
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-gold-warm mb-6">
              {t('schedule.arrivalTitle')}
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[--color-section-text]/10">
                  <th className="text-left font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 pr-4">行程</th>
                  <th className="text-center font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 px-3">班次一</th>
                  <th className="text-center font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3">班次二</th>
                </tr>
              </thead>
              <tbody>
                {ARRIVAL_ROWS.map((row) => (
                  <tr key={row.route} className="border-b border-[--color-section-text]/5">
                    <td className="py-4 pr-4 font-sans text-[--color-section-text]/75 text-sm leading-snug">{row.route}</td>
                    <td className="py-4 px-3 text-center">
                      <span className="font-serif text-[--color-section-text] text-lg sm:text-xl">{row.time1}</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="font-serif text-[--color-section-text] text-lg sm:text-xl">{row.time2}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 竖向分割线（桌面端） */}
          <div className="hidden md:block w-px bg-[--color-section-text]/10 mx-0" aria-hidden="true" />

          {/* 离开方向 */}
          <div className="w-full md:w-1/2 md:pl-10 lg:pl-16">
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-gold-warm mb-6">
              {t('schedule.departureTitle')}
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[--color-section-text]/10">
                  <th className="text-left font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 pr-4">行程</th>
                  <th className="text-center font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3 px-3">班次一</th>
                  <th className="text-center font-sans text-[0.6rem] text-[--color-warm-text] uppercase tracking-[0.2em] pb-3">班次二</th>
                </tr>
              </thead>
              <tbody>
                {DEPARTURE_ROWS.map((row) => (
                  <tr key={row.route} className="border-b border-[--color-section-text]/5">
                    <td className="py-4 pr-4 font-sans text-[--color-section-text]/75 text-sm leading-snug">{row.route}</td>
                    <td className="py-4 px-3 text-center">
                      <span className="font-serif text-[--color-section-text] text-lg sm:text-xl">{row.time1}</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="font-serif text-[--color-section-text] text-lg sm:text-xl">{row.time2}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 时刻表提示 */}
        <motion.ul
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={scheduleInView ? 'visible' : 'hidden'}
          className="mt-10 space-y-3"
        >
          {SCHEDULE_NOTICES.map((notice, i) => (
            <li key={i} className="font-sans text-sm text-[--color-warm-text] leading-relaxed pl-4 border-l border-[--color-section-text]/10">
              {notice}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* ── 3-C 底部 CTA ── */}
      <div
        ref={ctaRef}
        className="px-page max-w-screen-md mx-auto text-center"
      >
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          className="w-16 h-px bg-gold-warm/40 mx-auto mb-12"
        />

        <motion.h2
          custom={0.05}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          className="font-serif text-white leading-[1.15] mb-3"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)' }}
        >
          {t('cta.title')}
        </motion.h2>

        <motion.p
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          className="font-text italic text-white/40 text-sm sm:text-base mb-6"
        >
          {t('cta.titleEn')}
        </motion.p>

        <motion.p
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          className="font-sans text-white/60 text-sm sm:text-base leading-relaxed mb-10 sm:mb-12 max-w-lg mx-auto"
        >
          {t('cta.desc')}
        </motion.p>

        <motion.div
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* 主按钮：WhatsApp */}
          <a
            href="https://wa.me/601127803997"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-warm text-primary-dark font-sans text-sm tracking-widest uppercase px-8 py-3 min-h-11 transition-opacity duration-300 hover:opacity-90 inline-flex items-center justify-center w-full sm:w-auto"
          >
            {t('cta.whatsapp')}
          </a>

          {/* 次按钮：邮件 */}
          <a
            href="mailto:amy@meilihotel.com"
            className="border border-gold-warm text-gold-warm font-sans text-sm tracking-widest uppercase px-8 py-3 min-h-11 transition-all duration-300 hover:bg-gold-warm hover:text-primary-dark inline-flex items-center justify-center w-full sm:w-auto"
          >
            {t('cta.email')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
