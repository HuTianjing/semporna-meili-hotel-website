'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

const ROOMS = [
  {
    id: 'room-1',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkbryaafaa/villa-ocean-view-1.png',
  },
  {
    id: 'room-2',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkb6qaafba/villa-overwater-1.png',
  },
  {
    id: 'room-3',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkawaaae7q/villa-premium-1.png',
  },
  {
    id: 'room-4',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkcoyaafaq/villa-ocean-view-2.png',
  },
  {
    id: 'room-5',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkalaaae7a/villa-overwater-2.png',
  },
];

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

export function VillasAndSuites() {
  const t = useTranslations('Villas');
  const roomItems = t.raw('items') as Array<{ title: string; desc: string }>;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -40px 0px',
    amount: 0.05,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const total = ROOMS.length;
  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  const activeRoom = roomItems[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-cream py-24 md:py-32 lg:py-40"
    >
      {/* Section header — 与 HotelIntro / Storytelling 完全统一 */}
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10 font-sans text-[0.65rem] uppercase tracking-[0.45em] text-warm-text sm:mb-14"
        >
          Suites
        </motion.p>

        <motion.div
          custom={0.12}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 sm:mb-24"
        >
          <h2
            className="font-serif font-light leading-[1.15] tracking-tight text-section-text"
            style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.5rem)' }}
          >
            {t('title')}
          </h2>
        </motion.div>
      </div>

      {/* Carousel：3 张可见，中间放大、两侧缩小 */}
      <motion.div
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative w-full"
      >
        <div className="relative mx-auto flex h-[60vh] max-w-7xl items-center justify-center px-6 sm:h-[68vh] sm:px-10 lg:px-16">
          {ROOMS.map((room, i) => {
            const offset = (i - activeIndex + total) % total;
            const pos = offset > total / 2 ? offset - total : offset;
            const isCenter = pos === 0;
            const isVisible = Math.abs(pos) <= 1;

            return (
              <motion.div
                key={room.id}
                onClick={() => setActiveIndex(i)}
                animate={{
                  x: `${pos * 60}%`,
                  scale: isCenter ? 1 : 0.85,
                  opacity: isVisible ? (isCenter ? 1 : 0.5) : 0,
                  zIndex: isCenter ? 10 : 1,
                }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`absolute aspect-[4/5] h-full max-h-full w-[60%] overflow-hidden sm:w-[55%] md:w-[48%] lg:w-[42%] ${
                  isCenter ? '' : 'cursor-pointer'
                }`}
                style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
              >
                <Image
                  src={room.image}
                  alt={roomItems[i]?.title ?? room.id}
                  fill
                  sizes="(max-width: 768px) 60vw, 42vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </motion.div>
            );
          })}
        </div>

        {/* 圆点 indicator */}
        <div className="mt-10 flex items-center justify-center gap-3 sm:mt-14">
          {ROOMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`第 ${i + 1} 间房型`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? 'w-8 bg-section-text' : 'w-1.5 bg-section-text/30'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* 当前房型 editorial 文字（在 carousel 下方，居中、限制宽度） */}
      <div className="mx-auto mt-14 max-w-2xl px-6 text-center sm:mt-20 sm:px-10">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h3 className="font-serif text-xl font-light leading-snug text-section-text sm:text-2xl">
            {activeRoom?.title}
          </h3>
          <p className="mx-auto mt-6 max-w-xl font-sans text-[0.9375rem] font-light leading-[2] text-[#5a5347]">
            {activeRoom?.desc}
          </p>
        </motion.div>
      </div>

      {/* 单一次级 CTA — 纯文字 + 箭头，无下划线 */}
      <div className="mt-14 flex justify-center sm:mt-20">
        <Link
          href="/villas"
          className="group inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-section-text"
        >
          {t('viewAll')}
          <span className="text-gold-warm transition-transform duration-700 ease-out group-hover:translate-x-2">
            &#8594;
          </span>
        </Link>
      </div>

      {/* 左右切换按钮 — 桌面端浮动在两侧 */}
      <button
        onClick={prev}
        aria-label="上一间"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 text-section-text/40 transition-colors duration-500 hover:text-section-text lg:block"
      >
        <span className="font-sans text-3xl">&#8592;</span>
      </button>
      <button
        onClick={next}
        aria-label="下一间"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-section-text/40 transition-colors duration-500 hover:text-section-text lg:block"
      >
        <span className="font-sans text-3xl">&#8594;</span>
      </button>
    </section>
  );
}
