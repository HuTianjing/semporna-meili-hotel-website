'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const SECTIONS = [
  { id: 'location-culture', key: 'culture' as const, en: 'Culture' },
  { id: 'location-info', key: 'info' as const, en: 'Need to Know' },
  { id: 'location-transport', key: 'transport' as const, en: 'Getting Here' },
] as const;

export default function LocationSubNav() {
  const t = useTranslations('Location.nav');
  const [active, setActive] = useState<string>('location-culture');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: 0 },
    );

    const observer = observerRef.current;
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // 仅需偏移固定主导航高度（无 sticky 副导航）
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const labels: Record<string, string> = {
    culture: t('culture'),
    info: t('info'),
    transport: t('transport'),
  };

  return (
    <div className="bg-primary">
      {/* ── 固定导航的占位空间 ── */}
      <div className="h-17 sm:h-20" />

      {/* ── 页面标题区 ── */}
      <div className="text-center px-page pt-14 sm:pt-18 md:pt-22 pb-8">
        <p className="font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.45em] text-white/50 mb-5">
          {t('pageTag')}
        </p>
        <h1
          className="font-serif text-white leading-[1.05]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          {t('pageTitle')}
        </h1>
      </div>

      {/* ── 简介与地址（创新排版：居中对称、细致分隔） ── */}
      <div className="px-page mb-10 max-w-3xl mx-auto text-center">
        <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed font-light mb-8">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-y-3 sm:gap-x-6 font-sans text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] text-white/40">
          <span>{t('address')}</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/50" />
          <a href={`tel:${t('phone').replace(/\s/g, '')}`} className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">
            {t('phone')}
          </a>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/50" />
          <a href="#map" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">
            {t('map')}
          </a>
        </div>
      </div>

      {/* ── 悬浮感联系卡片（替代原图中的生硬白框） ── */}
      <div className="px-page pb-12">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm transition-colors hover:border-white/20">
            <p className="text-white/90 font-serif text-lg sm:text-xl tracking-wide text-center md:text-left">
              {t('contactText')}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a href={`tel:${t('phone').replace(/\s/g, '')}`} className="font-sans text-white text-sm uppercase tracking-[0.15em] hover:text-white/80 transition-colors whitespace-nowrap">
                {t('phone')}
              </a>
              <button className="bg-white text-primary px-8 py-3.5 font-sans text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] hover:bg-white/90 transition-colors w-full sm:w-auto">
                {t('contactBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 分隔线 ── */}
      <div className="px-page">
        <div className="max-w-5xl mx-auto border-t border-white/10" />
      </div>

      {/* ── Sub-nav tabs ── */}
      <nav aria-label="位置页内导航">
        <div className="flex justify-center items-center px-page flex-wrap">
          {SECTIONS.map(({ id, key, en }, idx) => {
            const isActive = active === id;
            return (
              <span key={id} className="flex items-center shrink-0">
                {idx > 0 && (
                  <span
                    className="mx-4 sm:mx-8 lg:mx-12 text-/30 select-none font-sans text-xs"
                    aria-hidden="true"
                  >
                    •
                  </span>
                )}

                <button
                  onClick={() => handleClick(id)}
                  className="group relative flex flex-col items-center gap-1.5 sm:gap-2 pt-6 pb-8 sm:pt-8 sm:pb-10 cursor-pointer focus-visible:outline-none"
                >
                  {/* 中文主标签 */}
                  <span
                    className="font-sans text-sm sm:text-base tracking-[0.2em] whitespace-nowrap transition-colors duration-300 text-white/60 group-hover:text-white"
                  >
                    {labels[key]}
                  </span>

                  {/* 英文副标签 */}
                  <span
                    className="font-sans text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.25em] whitespace-nowrap transition-colors duration-300 text-white/30 group-hover:text-white/60"
                  >
                    {en}
                  </span>
                </button>
              </span>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
