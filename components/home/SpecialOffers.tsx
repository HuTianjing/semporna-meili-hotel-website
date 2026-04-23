'use client';

import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const OFFER_IMAGES = [
  'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkbryaafaa/villa-ocean-view-1.png',
  'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkb6qaafba/villa-overwater-1.png',
  'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-18/m3bkawaaae7q/villa-premium-1.png',
];

export function SpecialOffers() {
  const t = useTranslations('Offers');
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const items = t.raw('items') as Array<{ title: string; desc: string }>;

  return (
    <section className="w-full bg-villas-bg py-24 text-white">
      <div className="mx-auto mb-12 flex max-w-350 flex-col justify-between gap-6 px-6 md:flex-row md:items-end lg:px-20">
        <h2 className="font-serif text-4xl text-white md:text-5xl lg:text-6xl">{t('title')}</h2>
        <button className="group flex items-center gap-2 text-sm font-semibold tracking-widest text-[--color-gold] uppercase transition-colors hover:text-white">
          {t('allOffers')}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="overflow-hidden pl-6 lg:pl-20" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y">
          {items.map((item, index) => (
            <div key={index} className="flex-[0_0_85%] pl-4 sm:flex-[0_0_60%] md:flex-[0_0_40%]">
              <div className="group relative block aspect-4/5 w-full cursor-pointer overflow-hidden bg-[--color-muted]">
                <Image
                  src={OFFER_IMAGES[index % OFFER_IMAGES.length]}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/55" />

                <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col items-start p-8 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="mb-3 font-serif text-2xl leading-tight">{item.title}</h3>
                  <p className="mb-6 line-clamp-2 font-sans text-sm text-white/80 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                    {item.desc}
                  </p>
                  <span className="inline-block border-b border-[--color-gold] pb-1 font-sans text-sm tracking-widest text-[--color-gold] uppercase transition-colors hover:border-white hover:text-white">
                    {t('viewOffer')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
