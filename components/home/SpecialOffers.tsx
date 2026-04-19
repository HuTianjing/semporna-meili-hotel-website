'use client';

import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const OFFER_IMAGES = [
  'https://picsum.photos/seed/offer1/1200/800',
  'https://picsum.photos/seed/offer2/1200/800',
  'https://picsum.photos/seed/offer3/1200/800',
];

export function SpecialOffers() {
  const t = useTranslations('Offers');
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const items = t.raw('items') as Array<{ title: string; desc: string }>;

  return (
    <section className="w-full bg-[#0a0a0a] py-24 text-white">
      <div className="container mx-auto mb-12 flex flex-col justify-between gap-6 px-4 md:flex-row md:items-end md:px-8">
        <h2 className="font-serif text-4xl text-white md:text-5xl lg:text-6xl">{t('title')}</h2>
        <button className="text-accent group flex items-center gap-2 text-sm font-semibold tracking-widest uppercase transition-colors hover:text-white">
          {t('allOffers')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="overflow-hidden pl-4 md:pl-8 lg:pl-16" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y">
          {items.map((item, index) => (
            <div key={index} className="flex-[0_0_85%] pl-4 sm:flex-[0_0_60%] md:flex-[0_0_40%]">
              <div className="group bg-muted relative block aspect-[4/5] w-full cursor-pointer overflow-hidden">
                <Image
                  src={OFFER_IMAGES[index % OFFER_IMAGES.length]}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50" />

                <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col items-start p-8 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="mb-3 font-serif text-2xl leading-tight">{item.title}</h3>
                  <p className="mb-6 line-clamp-2 font-sans text-sm text-white/80 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                    {item.desc}
                  </p>
                  <span className="border-accent text-accent inline-block border-b pb-1 font-sans text-sm tracking-widest uppercase transition-colors hover:border-white hover:text-white">
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
