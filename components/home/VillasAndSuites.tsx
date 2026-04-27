'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
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
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -40px 0px',
    amount: 0.05,
  });

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

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-cream py-20 md:py-32"
    >
      {/* Section header */}
      <div className="mx-auto mb-12 max-w-3xl px-5 text-center sm:mb-16 sm:px-8">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-4 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-warm-text sm:text-xs"
        >
          {t('subtitle')}
        </motion.p>

        <motion.h2
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-6 font-serif text-3xl leading-tight text-section-text sm:text-4xl md:text-5xl"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-2xl font-sans text-sm font-light leading-[1.9] text-warm-text sm:text-base"
        >
          {t('desc')}
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="relative mx-auto w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex w-full touch-pan-y items-center">
            {ROOMS.map((room, index) => {
              const isActive = index === selectedIndex;
              const roomItem = roomItems[index];
              return (
                <div
                  key={room.id}
                  className="relative flex-[0_0_85%] px-3 sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_42%]"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(0.88)',
                    opacity: isActive ? 1 : 0.5,
                    transition:
                      'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  <div className="bg-white shadow-lg">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={room.image}
                        alt={roomItem?.title ?? room.id}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 42vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="px-6 py-7 sm:px-8 sm:py-9">
                      <h3 className="mb-3 font-serif text-lg font-bold leading-snug text-section-text sm:text-xl">
                        {roomItem?.title}
                      </h3>
                      <p className="mb-6 font-sans text-sm font-light leading-[1.85] text-warm-text">
                        {roomItem?.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          className="bg-primary px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90"
                        >
                          {t('checkRates')}
                        </button>
                        <button
                          type="button"
                          className="group inline-flex items-center gap-1 font-sans text-xs uppercase tracking-[0.2em] text-section-text"
                        >
                          {t('details')}
                          <ChevronRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            strokeWidth={1.75}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop nav buttons */}
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-section-text shadow-md backdrop-blur-md transition-all hover:bg-white focus:outline-none md:flex"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next"
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-section-text shadow-md backdrop-blur-md transition-all hover:bg-white focus:outline-none md:flex"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      {/* Dot indicator */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {ROOMS.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'w-8 bg-primary'
                : 'w-2 bg-section-text/20 hover:bg-section-text/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
