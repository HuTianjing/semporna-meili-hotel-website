'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useInView } from 'framer-motion';

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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeRoom = roomItems[selectedIndex];
  const activeImage = ROOMS[selectedIndex];

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-cream py-24 md:py-32 lg:py-40"
    >
      {/* Section header */}
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

      {/* 主体：左 65% 固定大图 + 右 35% 房型列表 + 简介 + CTA */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16"
        >
          {/* 左侧大图：固定，切换房型时图片淡入淡出 */}
          <div className="relative w-full overflow-hidden lg:w-[65%]">
            <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-auto lg:h-[78vh] lg:min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage.image}
                    alt={activeRoom?.title ?? activeImage.id}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover"
                    priority={selectedIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 右侧：房型列表 + 当前简介 + CTA — 完全可见，与图同框 */}
          <div className="flex w-full flex-col justify-between lg:w-[35%]">
            {/* 房型索引列表 */}
            <ul className="flex flex-col">
              {roomItems.map((item, index) => {
                const isActive = index === selectedIndex;
                return (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className="group flex w-full items-baseline gap-4 py-4 text-left transition-colors duration-500"
                    >
                      <span
                        className={`shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.35em] transition-colors duration-500 ${
                          isActive ? 'text-gold-warm' : 'text-warm-text/50'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-serif text-base leading-snug transition-colors duration-500 sm:text-lg ${
                          isActive
                            ? 'text-section-text'
                            : 'text-section-text/45 group-hover:text-section-text/75'
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* 当前房型描述 + CTA */}
            <div className="mt-10 lg:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <p className="font-sans text-[0.9375rem] font-light leading-[2] text-[#5a5347]">
                    {activeRoom?.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <Link
                href="/villas"
                className="group mt-10 inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-section-text"
              >
                {t('viewAll')}
                <span className="text-gold-warm transition-transform duration-700 ease-out group-hover:translate-x-2">
                  &#8594;
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
