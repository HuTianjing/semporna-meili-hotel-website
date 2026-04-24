'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Tag, Gift, Bell, MessageCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const icons = [Clock, Tag, Gift, Bell, MessageCircle, Lock];

export default function OffersMember() {
  const t = useTranslations('OffersMember');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -20% 0px',
    amount: 0.2,
  });

  return (
    <section id="member" className="bg-background py-16 sm:py-20 md:py-28 lg:py-36 xl:py-44 px-page overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
        
        {/* Left: Image Card Side */}
        <motion.div 
          custom={0} variants={fadeScale} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="w-full lg:w-[45%] relative aspect-4/5 sm:aspect-4/5 lg:aspect-3/4 shrink-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200" 
            alt="Member Privileges" 
            fill 
            className="object-cover"
            unoptimized
          />
          {/* Subtle gold border decoration around the image */}
          <div className="absolute -inset-4 md:-inset-6 border border-gold-warm/30 z-[-1] hidden md:block" />
        </motion.div>

        {/* Right: Content Side */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center text-left">
          
          <motion.div 
            custom={0.1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="inline-flex border border-gold-warm px-4 py-2 text-gold-warm text-xs font-sans tracking-[0.25em] mb-8 w-fit uppercase"
          >
            {t('badge')}
          </motion.div>

          <motion.p
            custom={0.2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="font-text italic text-section-text/90 leading-[1.2] mb-12"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
          >
            &ldquo;{t('subtitle')}&rdquo;
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 mb-16 w-full">
            {icons.map((Icon, idx) => {
              const text = t(`items.${idx}`);
              return (
                <motion.div 
                  key={idx}
                  custom={0.3 + idx * 0.05} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border border-gold-warm/30 flex items-center justify-center shrink-0 text-gold-warm transition-colors duration-500 group-hover:border-gold-warm group-hover:text-gold-warm mt-1">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-h-12">
                    <h3 className="font-serif text-section-text text-base leading-snug group-hover:text-gold-warm transition-colors duration-300">
                      {text}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            custom={0.6} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="pt-10 border-t border-section-text/10 w-full"
          >
            <p className="font-sans text-sm text-warm-text mb-10 leading-relaxed max-w-lg">
              {t('note')}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-4 items-center">
              <Link 
                href="#contact-form"
                className="flex items-center justify-center min-w-40 min-h-11 border border-section-text bg-transparent text-section-text px-8 py-3 text-sm font-bold tracking-widest uppercase transition-colors hover:border-primary-light hover:text-primary-light"
              >
                {t('ctaMain')}
              </Link>
              <a 
                href="mailto:amy@meilihotel.com" 
                className="inline-flex items-center"
              >
                {t('ctaSub')}
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
