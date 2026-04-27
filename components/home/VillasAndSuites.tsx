'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

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
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -40px 0px', amount: 0.05 });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const activeRoom = roomItems[selectedIndex];

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-cream py-24 md:py-32 lg:py-40"
    >
      {/* Section header — 与 HotelIntro / Storytelling 统一：英文小词 + serif 主标题，无编号、无短线 */}
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

      {/* Carousel — 去除白底卡片、去除双按钮、卡片采用透明度变化而非缩放抢戏 */}
      <div className="relative mx-auto w-full max-w-480">
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex w-full touch-pan-y items-stretch">
            {ROOMS.map((room, index) => {
              const isActive = index === selectedIndex;
              const roomItem = roomItems[index];
              return (
                <div
                  key={room.id}
                  className="relative flex-[0_0_72%] px-2 sm:flex-[0_0_46%] sm:px-3 md:flex-[0_0_32%] md:px-3 lg:flex-[0_0_24%] xl:flex-[0_0_20%]"
                  style={{ zIndex: isActive ? 10 : 1 }}
                >
                  <button
                    type="button"
                    onClick={() => !isActive && emblaApi?.scrollTo(index)}
                    aria-label={roomItem?.title ?? room.id}
                    style={{
                      transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                      cursor: isActive ? 'default' : 'pointer',
                    }}
                    className={`flex w-full flex-col text-left ${
                      isActive ? 'opacity-100' : 'sm:opacity-40'
                    }`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={room.image}
                        alt={roomItem?.title ?? room.id}
                        fill
                        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 55vw, 38vw"
                        className="object-cover"
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop nav buttons */}
        <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 md:flex">
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            className="rounded-full bg-white/80 p-3 text-section-text shadow-md backdrop-blur-md transition-all hover:bg-white focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 md:flex">
          <button
            onClick={scrollNext}
            aria-label="Next"
            className="rounded-full bg-white/80 p-3 text-section-text shadow-md backdrop-blur-md transition-all hover:bg-white focus:outline-none"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* 当前房型信息：标题 + 简介在图片下方编辑式呈现 */}
      <div className="mx-auto mt-10 w-full max-w-170 px-5 text-center sm:mt-12 sm:px-8">
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h3 className="font-serif text-xl text-section-text sm:text-2xl">
            {activeRoom?.title}
          </h3>
          <p className="mx-auto mt-4 max-w-md font-sans text-[0.875rem] font-light leading-[1.85] text-[#5a5347]">
            {activeRoom?.desc}
          </p>
        </motion.div>
      </div>

      {/* Dot indicator */}
      <div className="mt-8 flex items-center justify-center gap-2 sm:mt-10">
        {ROOMS.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'w-8 bg-section-text'
                : 'w-2 bg-section-text/20 hover:bg-section-text/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
    </section>
  );
}
