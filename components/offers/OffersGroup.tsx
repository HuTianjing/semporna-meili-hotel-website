'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
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

export default function OffersGroup() {
  const t = useTranslations('OffersGroup');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -20% 0px',
    amount: 0.2,
  });

  const items = Array.from({ length: 6 }).map((_, i) => t(`items.${i}`));

  return (
    <section id="group" className="bg-cream py-16 sm:py-24 md:py-36" ref={sectionRef}>
      <div className="px-page max-w-[1280px] mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center">
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.div 
            custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="inline-block border border-gold-warm px-4 py-2 text-gold-warm text-xs font-sans tracking-[0.25em] mb-8 w-fit uppercase"
          >
            {t('badge')}
          </motion.div>
          
          <motion.h2 
            custom={0.1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="font-serif text-section-text leading-[1.1] mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
          >
            <span className="block text-section-text">{t('subtitle')}</span>
          </motion.h2>

          <motion.div 
            custom={0.15} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="w-12 sm:w-16 h-px bg-gold-warm mb-8 sm:mb-12" 
          />

          <ul className="space-y-4 sm:space-y-5 mb-12 flex-1">
            {items.map((item, idx) => (
              <motion.li 
                key={idx}
                custom={0.2 + idx * 0.05} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
                className="flex items-start gap-4"
              >
                <div className="w-5 h-5 mt-1 shrink-0 bg-gold-warm/20 rounded-full flex items-center justify-center">
                  <Check className="text-gold-warm w-3 h-3" />
                </div>
                <span className="text-section-text font-sans text-sm sm:text-base leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
          
          <motion.div 
            custom={0.5} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-wrap gap-x-6 gap-y-4 items-center mt-auto pt-6"
          >
            <Link 
              href="#contact-form"
              className="flex items-center justify-center min-h-[44px] border border-primary bg-transparent text-primary px-8 py-3 text-sm font-bold tracking-widest uppercase transition-colors hover:border-primary-light hover:text-primary-light"
            >
              {t('ctaMain')}
            </Link>
            <a 
              href="https://wa.me/60112780399" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center min-h-[44px] gap-2 text-sm tracking-widest text-gold-warm uppercase transition-colors hover:text-section-text"
            >
              {t('ctaSub')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          custom={0.2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="w-full md:w-1/2"
        >
          <div className="aspect-[4/5] sm:aspect-square md:aspect-[4/5] relative overflow-hidden group">
            <Image 
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200"
              alt="Group Dining" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              unoptimized
            />
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/0" />
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
