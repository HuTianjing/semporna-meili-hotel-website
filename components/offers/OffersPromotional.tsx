'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

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

export default function OffersPromotional() {
  const t = useTranslations('OffersPromotional');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -20% 0px',
    amount: 0.2,
  });

  return (
    <section id="offers" className="bg-cream py-16 sm:py-20 md:py-28 lg:py-36 xl:py-44 px-page" ref={sectionRef}>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.div 
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="inline-flex border border-gold-warm px-4 py-2 text-gold-warm text-xs font-sans tracking-[0.25em] mb-12 sm:mb-16 w-fit uppercase"
        >
          {t('badge')}
        </motion.div>

        <motion.div 
          custom={0.1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col lg:flex-row w-full bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          {/* Left Image */}
          <div className="w-full lg:w-[40%] relative aspect-4/3 lg:aspect-auto">
            <Image 
              src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200" 
              alt={t('title')} 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="absolute top-6 left-6 bg-gold-warm text-white px-4 py-1.5 text-xs font-bold tracking-widest uppercase shadow-md">
              {t('tag')}
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[60%] p-8 sm:p-12 md:p-16 flex flex-col">
            <h2 className="font-serif text-section-text leading-[1.15] mb-4"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}>
              {t('title')}
            </h2>
            
            <div className="flex flex-col items-start gap-1 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-gold-warm" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                  {t('price')}
                </span>
                <span className="font-sans text-sm text-warm-text">
                  {t('priceDesc')}
                </span>
              </div>
              <span className="font-sans text-xs text-warm-text/80 italic">
                {t('taxNote')}
              </span>
            </div>

            <div className="inline-flex border border-border px-4 py-2 text-section-text text-xs tracking-widest uppercase mb-6 w-fit font-bold">
              {t('validity')}
            </div>

            <p className="font-text italic text-section-text/80 text-sm sm:text-base leading-relaxed mb-10 pb-10 border-b border-border">
              &ldquo;{t('pitch')}&rdquo;
            </p>

            {/* Includes & Excludes */}
            <div className="grid grid-cols-1 gap-8 mb-12">
              <div>
                <h4 className="font-bold text-section-text text-sm tracking-widest uppercase mb-6 flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  {t('includesTitle')}
                </h4>
                <ul className="space-y-4">
                  {(t.raw('includes') as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-gold-warm shrink-0 mt-2.5" />
                      <span className="text-section-text font-sans text-sm sm:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-section-text text-sm tracking-widest uppercase mb-4 flex items-center gap-3 mt-6">
                  <X className="w-4 h-4 text-red-600/60" />
                  {t('excludesTitle')}
                </h4>
                <p className="text-section-text/60 font-sans text-xs sm:text-sm leading-relaxed ml-7">
                  {t('excludesDesc')}
                </p>
              </div>
            </div>

            <details className="group border-t border-border pt-6 mb-12">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h4 className="font-bold text-section-text text-xs sm:text-sm tracking-widest uppercase">
                  {t('termsTitle')}
                </h4>
                <ChevronDown className="w-4 h-4 text-section-text/50 group-open:-scale-100 transition-transform" />
              </summary>
              <div className="mt-4 pl-0">
                <p className="text-section-text/60 font-sans text-xs leading-relaxed">
                  {t('terms')}
                </p>
              </div>
            </details>
            
            <div className="flex flex-wrap gap-x-6 gap-y-4 items-center mt-auto">
              <Link 
                href="#contact-form"
                className="flex items-center justify-center min-h-11 border border-primary bg-transparent text-primary px-8 py-3 text-sm font-bold tracking-widest uppercase transition-colors hover:border-primary-light hover:text-primary-light"
              >
                {t('ctaMain')}
              </Link>
              <a 
                href="https://wa.me/60112780399" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-center min-h-11 gap-2 text-sm tracking-widest text-gold-warm uppercase transition-colors hover:text-gold"
              >
                {t('ctaSub')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
}
