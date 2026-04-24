'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';

const ROOMS = [
  {
    id: 'room-1',
    title: '单卧室海滩景观水上别墅套房',
    desc: '下榻礁湖边的别墅套房，从配备家居的宽敞平台上可将酒店的白沙滩尽收眼底。',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkbryaafaa/villa-ocean-view-1.png',
  },
  {
    id: 'room-2',
    title: '双卧室 POERAVA 水上别墅套房',
    desc: '享受极致奢华的双卧空间，带有私人冷水池，直通清澈见底的仙本那海洋。',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkb6qaafba/villa-overwater-1.png',
  },
  {
    id: 'room-3',
    title: '三卧室尊贵海滨别墅宅邸',
    desc: '无与伦比的私密滨海庄园，适合家庭至臻度假，紧邻细白沙滩与椰林。',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkawaaae7q/villa-premium-1.png',
  },
  {
    id: 'room-4',
    title: '双卧室尊贵海滨别墅宅邸',
    desc: '在专属的海滨庭院享受私密时光，宽敞的起居空间与自然环境完美融合。',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkcoyaafaq/villa-ocean-view-2.png',
  },
  {
    id: 'room-5',
    title: '单卧室奥特曼努冷水池水上别墅套房',
    desc: '标志性的奥特曼努山景，专属冷水池与浪漫的水上生活空间。',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkalaaae7a/villa-overwater-2.png',
  },
];

export function VillasAndSuites() {
  const t = useTranslations('Villas');
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
    setSelectedIndex(emblaApi.internalEngine().index.get());
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
              return (
                <div 
                  key={room.id}
                  className="relative flex-[0_0_72%] sm:flex-[0_0_60%] md:flex-[0_0_55%] lg:flex-[0_0_40%] xl:flex-[0_0_35%] px-2 md:px-4"
                  style={{
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <div 
                    style={{
                      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                      '--card-scale': isActive ? '1' : '0.85',
                      '--card-opacity': isActive ? '1' : '0.4',
                    } as React.CSSProperties}
                    className={`bg-white flex flex-col h-full mx-auto scale-100 opacity-100 shadow-md sm:scale-(--card-scale) sm:opacity-(--card-opacity) ${
                      isActive ? 'sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]' : 'sm:shadow-none'
                    }`}
                  >
                    <div className="relative w-full h-90 sm:h-70 md:h-85 shrink-0">
                      <Image
                        src={room.image}
                        alt={room.title}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 55vw, 35vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-center text-center p-6 md:p-8 flex-1">
                      <h3 className="font-serif text-[--color-section-text] text-base md:text-lg font-bold">
                        {room.title}
                      </h3>

                      <div 
                        className="hidden sm:flex flex-col items-center justify-center w-full overflow-hidden"
                        style={{
                          transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                          maxHeight: isActive ? '400px' : '0px',
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? '1.5rem' : '0px',
                        }}
                      >
                        <div className="w-8 h-px bg-[--color-gold-warm] mb-6" />
                        
                        <p className="font-sans text-sm text-[--color-warm-text] leading-loose mb-8">
                          {room.desc}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full mt-auto">
                          <button className="flex-1 w-full bg-primary text-white py-3 text-xs tracking-widest hover:bg-primary/90 transition-colors uppercase whitespace-nowrap">
                            {t('checkRates')}
                          </button>
                          <button className="flex-1 w-full flex items-center justify-center gap-2 text-[--color-section-text] py-3 text-xs tracking-widest hover:opacity-70 transition-opacity uppercase whitespace-nowrap">
                            {t('details')} <ChevronRight className="w-4 h-4" />
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
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex 
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