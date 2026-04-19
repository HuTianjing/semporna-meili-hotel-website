'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export function Footer() {
  const t = useTranslations('Footer');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const columns = [
    {
      heading: t('col1.heading'),
      links: [t('col1.link1'), t('col1.link2'), t('col1.link3')],
    },
    {
      heading: t('col2.heading'),
      links: [t('col2.link1'), t('col2.link2'), t('col2.link3'), t('col2.link4')],
    },
    {
      heading: t('col3.heading'),
      links: [t('col3.link1'), t('col3.link2'), t('col3.link3')],
    },
    {
      heading: t('col4.heading'),
      links: [t('col4.link1'), t('col4.link2'), t('col4.link3'), t('col4.link4')],
    },
  ];

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Contact */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.25em] text-white/40 block mb-6">
              {t('contactTitle')}
            </span>
            <div className="space-y-3">
              <a
                href="mailto:reservations@sempornameili.com"
                className="block font-sans text-sm font-light text-white/70 hover:text-white transition-colors duration-500"
              >
                {t('col3.link1')}
              </a>
              <p className="font-sans text-sm font-light text-white/70">{t('col3.link2')}</p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.25em] text-white/40 block mb-6">
              {columns[0].heading}
            </span>
            <p className="font-sans text-sm font-light text-white/70 leading-relaxed">
              {t('address')}
            </p>
          </motion.div>

          {/* Social */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.25em] text-white/40 block mb-6">
              {t('followUs')}
            </span>
            <div className="space-y-3">
              {columns[3].links.map((platform) => (
                <button
                  key={platform}
                  className="block font-sans text-sm font-light text-white/70 hover:text-white transition-colors duration-500"
                >
                  {platform}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 md:mt-20 border-t pt-12"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.25em] text-white/40 block mb-2">
                {t('newsletter')}
              </span>
              <p className="font-sans text-sm font-light text-white/50">{t('newsletterDesc')}</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="flex-1 md:w-64 bg-transparent border-b pb-2 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
              />
              <button
                className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.2em] text-white border px-5 py-2 transition-all duration-500 hover:bg-white hover:text-[--color-navy]"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              >
                {t('subscribe')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-20 md:mt-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.05em] text-white leading-none">
              Semporna
            </span>
            <span className="font-sans text-[0.55rem] uppercase tracking-[0.3em] mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Meili Resort
            </span>
          </div>

          {/* Legal links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {[t('legal.privacy'), t('legal.cookie'), t('legal.terms'), t('legal.accessibility')].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans text-[0.625rem] font-light uppercase tracking-[0.15em] transition-colors duration-500 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {item}
              </a>
            ))}
          </nav>

          <span className="font-sans text-[0.625rem] font-light uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            &copy; {t('copyright')}
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
