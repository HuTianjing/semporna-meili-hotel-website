'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
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

export function VillasAndSuites() {
  const t = useTranslations('Villas');
  const roomItems = t.raw('items') as Array<{ title: string; desc: string }>;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false
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
    <section className="w-full py-20 md:py-32 bg-[--color-cream] overflow-hidden">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="font-serif text-[--color-section-text] text-3xl md:text-4xl lg:text-5xl mb-4">
          {t('subtitle')}
        </h2>
      </div>

      <div className="w-full relative max-w-480 mx-auto">
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex w-full items-center touch-pan-y">
            {ROOMS.map((room, index) => {
              const isActive = index === selectedIndex;
              const roomItem = roomItems[index];
              return (
                <div
                  key={room.id}
                  className="relative flex-[0_0_72%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] px-2 md:px-3"
                  style={{
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <div
                    onClick={() => !isActive && emblaApi?.scrollTo(index)}
                    style={{
                      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                      '--card-scale': isActive ? '1' : '0.88',
                      '--card-opacity': isActive ? '1' : '0.5',
                      cursor: isActive ? 'default' : 'pointer',
                    } as React.CSSProperties}
                    className={`bg-white flex flex-col h-full mx-auto scale-100 opacity-100 shadow-md sm:scale-(--card-scale) sm:opacity-(--card-opacity) ${isActive ? 'sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]' : 'sm:shadow-none'
                      }`}
                  >
                    <div className="relative w-full h-80 sm:h-64 md:h-72 lg:h-80 xl:h-72 shrink-0">
                      <Image
                        src={room.image}
                        alt={roomItem?.title ?? room.id}
                        fill
                        sizes="(max-width: 640px) 72vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-center text-center p-4 md:p-5 flex-1">
                      <h3 className="font-serif text-[--color-section-text] text-sm md:text-base font-bold">
                        {roomItem?.title}
                      </h3>

                      <div
                        className="hidden sm:flex flex-col items-center justify-center w-full overflow-hidden"
                        style={{
                          transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                          maxHeight: isActive ? '400px' : '0px',
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? '1rem' : '0px',
                        }}
                      >
                        <div className="w-8 h-px bg-[--color-gold-warm] mb-4" />

                        <p className="font-sans text-xs text-[--color-warm-text] leading-loose mb-5">
                          {roomItem?.desc}
                        </p>

                        <div className="flex flex-col items-stretch gap-2 w-full mt-auto">
                          <button className="w-full bg-primary text-white py-2.5 text-[0.65rem] tracking-widest hover:bg-primary/90 transition-colors uppercase whitespace-nowrap">
                            {t('checkRates')}
                          </button>
                          <button className="w-full flex items-center justify-center gap-1 text-[--color-section-text] py-2 text-[0.65rem] tracking-widest hover:opacity-70 transition-opacity uppercase whitespace-nowrap">
                            {t('details')} <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons overlay on desktop for easier navigation (matches Apple style) */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-20">
          <button
            onClick={scrollPrev}
            className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-md text-[--color-section-text] hover:bg-white transition-all focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-20">
          <button
            onClick={scrollNext}
            className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-md text-[--color-section-text] hover:bg-white transition-all focus:outline-none"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-10 md:mt-12">
        <div className="flex items-center gap-2">
          {ROOMS.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex
                  ? 'w-8 bg-[--color-section-text]'
                  : 'w-2 bg-[--color-section-text]/20 hover:bg-[--color-section-text]/40'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
