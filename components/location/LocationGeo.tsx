'use client';

import { type LucideIcon, MapPin, Navigation, Sun, ShieldCheck } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';

const HEADER_OFFSET = 'pt-32 sm:pt-36';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

interface GeoHighlight {
  icon: LucideIcon;
  value: string;
  label: string;
}

export default function LocationGeo() {
  const t = useTranslations('Location');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  const geoHighlights: GeoHighlight[] = [
    { icon: Navigation, value: '4°N', label: t('highlights.latitude') },
    { icon: Sun, value: '26–32°C', label: t('highlights.climate') },
    { icon: ShieldCheck, value: '100+', label: t('highlights.typhoonFree') },
    { icon: MapPin, value: t('highlights.sipadanValue'), label: t('highlights.sipadan') },
  ];

  return (
    <section ref={ref} className={`${HEADER_OFFSET} pb-16 sm:pb-24 md:pb-36 lg:pb-44 px-page bg-primary`}>

      {/* ── Lightweight page title header */}
      <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
        <motion.div
          custom={0} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center"
        >
          <div className="w-8 sm:w-12 h-px bg-[--color-gold-warm]/40" />
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.35em] text-white/50">
            LOCATION · 位置
          </span>
          <div className="w-8 sm:w-12 h-px bg-[--color-gold-warm]/40" />
        </motion.div>

        <motion.h1
          custom={0.08} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-serif text-white leading-[1.1] mb-3 sm:mb-4"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          custom={0.14} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-sans text-white/60 text-sm sm:text-base leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          custom={0.18} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center mt-6 sm:mt-8"
        >
          <div className="w-12 sm:w-16 h-px bg-[--color-gold-warm]/60" />
        </motion.div>
      </div>

      {/* ── Main geo content: image + text */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-center">

        {/* Text — right on desktop */}
        <div className="w-full md:w-1/2 md:order-2">
          <motion.div
            custom={0.25} variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-[--color-gold-warm]">01</span>
            <div className="w-8 sm:w-12 h-px bg-[--color-gold-warm]" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
              {t('intro.tag')}
            </span>
          </motion.div>

          <motion.h2
            custom={0.33} variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="font-serif text-white leading-[1.15] mb-8 sm:mb-10"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
          >
            <span className="block">{t('intro.title1')}</span>
            <span className="block text-[--color-gold-warm]">{t('intro.title2')}</span>
          </motion.h2>

          <motion.div
            custom={0.4} variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-5 font-sans text-white/70 text-sm sm:text-base leading-relaxed"
          >
            <p>{t('intro.desc1')}</p>
            <p>{t('intro.desc2')}</p>
            <p>{t('intro.desc3')}</p>
          </motion.div>
        </div>

        {/* Image — left on desktop */}
        <motion.div
          custom={0.3} variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="group w-full md:w-1/2 md:order-1 relative aspect-4/5 md:max-h-140 overflow-hidden bg-primary"
        >
          <Image
            src="/Photos on OTA/iStock-831459576.jpg"
            alt="Semporna Coral Triangle aerial view"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/15 transition-colors duration-500 group-hover:bg-black/25" />
        </motion.div>
      </div>

      {/* Four geo data highlights */}
      <motion.div
        custom={0.5} variants={fadeUp} initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mt-20 md:mt-28 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
          {geoHighlights.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3">
              <Icon className="text-[--color-gold-warm]" size={22} strokeWidth={1.5} />
              <span
                className="font-serif text-white leading-none"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
              >
                {value}
              </span>
              <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
