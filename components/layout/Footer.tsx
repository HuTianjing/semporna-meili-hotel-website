'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

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
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

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
      ref={footerRef}
      className="relative overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}
    >
      {/* 装饰性背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        
        {/* 顶部: Logo & Newsletter */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-16 mb-20 md:mb-28">
          
          <motion.div 
            custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col max-w-sm"
          >
            <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-white leading-tight mb-2">
              Semporna
            </h2>
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-white/50 mb-8 block">
              Meili Resort
            </span>
            <p className="font-sans text-sm font-light leading-relaxed text-white/70">
              {t('address')}
            </p>
          </motion.div>

          <motion.div 
            custom={0.1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="w-full md:w-auto relative"
          >
            <h3 className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-white mb-6">
              {t('newsletter')}
            </h3>
            <p className="font-sans text-sm font-light text-white/60 mb-6 max-w-sm">
              {t('newsletterDesc')}
            </p>
            <div className="flex border-b border-white/20 pb-2 transition-colors focus-within:border-white/60 group">
              <input 
                type="email" 
                placeholder={t('emailPlaceholder')}
                className="bg-transparent flex-1 text-sm font-light text-white placeholder:text-white/30 focus:outline-none"
              />
              <button 
                type="button" 
                className="text-white/60 hover:text-white transition-colors px-2"
                aria-label={t('subscribe')}
              >
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>

        </div>

        {/* 中部: 4列导航 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {columns.map((col, idx) => (
            <motion.div 
              key={col.heading}
              custom={0.2 + idx * 0.1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            >
              <h3 className="mb-6 font-sans text-[10px] font-semibold tracking-[0.2em] text-white/50 uppercase">
                {col.heading}
              </h3>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="group inline-flex items-center font-sans text-sm font-light text-white/80 transition-colors duration-300 hover:text-white"
                    >
                      <span className="relative overflow-hidden">
                        {link}
                        <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 底部: 版权与法律信息 */}
        <motion.div 
          custom={0.6} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="mt-20 md:mt-32 pt-8 border-t border-white/10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
        >
          <p className="font-sans text-[10px] sm:text-xs font-light uppercase tracking-widest text-white/40">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>

          <nav aria-label={t('legalNav')} className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {(
              [
                t('legal.privacy'),
                t('legal.cookie'),
                t('legal.terms'),
                t('legal.accessibility'),
              ] as string[]
            ).map((item) => (
              <Link
                key={item}
                href="#"
                className="font-sans text-[10px] sm:text-xs font-light uppercase tracking-widest text-white/40 transition-colors duration-300 hover:text-white"
              >
                {item}
              </Link>
            ))}
          </nav>
        </motion.div>

      </div>
    </footer>
  );
}
