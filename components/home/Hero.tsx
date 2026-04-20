'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { MapPin, BedDouble, Images, Play, Pause } from 'lucide-react';

const HERO_VIDEO =
  'https://mgx-backend-cdn.metadl.com/generate/videos/1129659/2026-04-18/m2r2dqqaae6q/hero-resort-aerial.mp4';
const HERO_IMAGE =
  'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-17/m2pc7hyaafba/hero-resort-aerial.png';

const CardIcons = [MapPin, BedDouble, Images];

export function Hero() {
  const t = useTranslations('Index');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  // hasScrolled 通过 useLenis 监听，替代 window.addEventListener('scroll')
  const [hasScrolled, setHasScrolled] = useState(false);
  // 仅在桌面端 (md+) 执行 Hero 向上收缩效果，对齐 resort-website 的 HeroDesktop 行为
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsMd(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useLenis(({ scroll }) => {
    if (scroll > 20 && !hasScrolled) {
      setHasScrolled(true);
    }
  }, [hasScrolled]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.section
      initial={{ height: '100vh' }}
      animate={{ height: isMd ? 'calc(100vh - 80px)' : '100vh' }}
      transition={{ delay: 3, duration: 1, ease: 'easeInOut' }}
      className="relative z-20 min-h-[700px] overflow-hidden bg-[--color-primary]"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMAGE}
          className="w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Overlays for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content — left-aligned editorial layout */}
      <div className="relative z-10 w-full h-full pb-20 md:pb-28">
        <div className="w-full h-full px-6 md:px-12 lg:px-20 xl:pl-[8vw] xl:pr-6 flex flex-col justify-end items-start">
          {/* Subtitle */}
          <p
            className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-white/70 mb-4 animate-fade-in"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            {t('subtitle')}
          </p>

          {/* Main Title */}
          <h1
            className="font-serif font-normal text-white leading-[1.05] max-w-3xl animate-fade-in-up"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 4rem)',
              letterSpacing: '0.04em',
              animationDelay: '0.6s',
              animationFillMode: 'both',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {t('title')}
          </h1>

          {/* Tagline */}
          <p
            className="font-sans font-light text-white/80 text-sm md:text-base max-w-lg mt-6 leading-relaxed animate-fade-in"
            style={{
              animationDelay: '1s',
              animationFillMode: 'both',
              textShadow: '0 1px 8px rgba(0,0,0,0.2)',
            }}
          >
            {t('description')}
          </p>

          {/* Bottom info bar */}
          <div
            className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/20 pt-6 animate-fade-in"
            style={{ animationDelay: '1.3s', animationFillMode: 'both' }}
          >
            <span
              className="font-sans text-[0.6875rem] font-light tracking-[0.12em] text-white/70 uppercase"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              {t('address')}
            </span>
            <a
              href="tel:+60123456789"
              className="font-sans text-[0.6875rem] font-light tracking-[0.12em] text-white/70 hover:text-white transition-colors duration-500"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              {t('phone')}
            </a>
            <span
              className="font-sans text-[0.6875rem] font-light tracking-[0.12em] text-white/70"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              reservations@sempornameili.com
            </span>
          </div>

          {/* Quick nav cards */}
          {/* <div
            className="mt-8 hidden md:flex gap-3 animate-fade-in"
            style={{ animationDelay: '1.5s', animationFillMode: 'both' }}
          >
            {(t.raw('heroCards') as string[]).map((cardTitle, idx) => {
              const Icon = CardIcons[idx % CardIcons.length];
              return (
                <div
                  key={idx}
                  className="group flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-3 border border-white/10 bg-zinc-900/60 font-sans text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-zinc-800/80 hover:shadow-2xl md:h-32 md:w-32"
                >
                  <Icon
                    strokeWidth={1}
                    className="h-6 w-6 opacity-70 transition-opacity group-hover:opacity-100"
                  />
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    {cardTitle}
                  </span>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>

      {/* Video control */}
      <button
        onClick={togglePlay}
        className="absolute right-6 bottom-20 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause size={14} strokeWidth={1.5} />
        ) : (
          <Play size={14} strokeWidth={1.5} className="ml-0.5" />
        )}
      </button>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center transition-opacity duration-800 ${
          hasScrolled ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transitionDelay: hasScrolled ? '0s' : '3.5s' }}
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-white/50 ml-[0.3em] mb-3">
          {t('scroll')}
        </span>
        <div className="h-10 w-[1.5px] bg-white/30 overflow-hidden relative">
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear',
            }}
            className="w-full h-full bg-white"
          />
        </div>
      </div>
    </motion.section>
  );
}
