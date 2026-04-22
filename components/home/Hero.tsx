'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Play, Pause } from 'lucide-react';

const HERO_VIDEO =
  'https://mgx-backend-cdn.metadl.com/generate/videos/1129659/2026-04-18/m2r2dqqaae6q/hero-resort-aerial.mp4';
const HERO_IMAGE =
  'https://mgx-backend-cdn.metadl.com/generate/images/1129659/2026-04-17/m2pc7hyaafba/hero-resort-aerial.png';

export function Hero() {
  const t = useTranslations('Index');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMd, setIsMd] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
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
    <>
      {/* ======================= */}
      {/*    Desktop Hero (md+)   */}
      {/* ======================= */}
      <motion.section
        initial={{ height: '100vh' }}
        animate={{ height: isMd ? 'calc(100vh - 80px)' : '100vh' }}
        transition={{ delay: 3, duration: 1, ease: 'easeInOut' }}
        className="relative z-20 hidden min-h-175 overflow-hidden bg-[--color-primary] md:block"
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
            className="h-full w-full object-cover"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/15 to-black/60" />
          <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />
        </div>

        {/* Content 鈥?left-aligned editorial layout */}
        <div className="relative z-10 h-full w-full pb-20 md:pb-28">
          <div className="flex h-full w-full flex-col items-start justify-end px-6 md:px-12 lg:px-20 xl:pl-[8vw] xl:pr-6">
            {/* Subtitle */}
            <p
              className="animate-fade-in mb-4 font-sans text-xs uppercase tracking-[0.4em] text-white/70 md:text-sm"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              {t('subtitle')}
            </p>

            {/* Main Title */}
            <h1
              className="animate-fade-in-up max-w-3xl font-serif leading-[1.05] text-white"
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
              className="animate-fade-in mt-6 max-w-lg font-sans text-sm font-light leading-relaxed text-white/80 md:text-base"
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
              className="animate-fade-in mt-12 flex flex-wrap items-center gap-6 border-t border-white/20 pt-6 md:mt-16 md:gap-10"
              style={{ animationDelay: '1.3s', animationFillMode: 'both' }}
            >
              <span
                className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.12em] text-white/70"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              >
                {t('address')}
              </span>
              <a
                href="tel:+60123456789"
                className="font-sans text-[0.6875rem] font-light tracking-[0.12em] text-white/70 transition-colors duration-500 hover:text-white"
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
          className={`absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center transition-opacity duration-700 ${
            hasScrolled ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transitionDelay: hasScrolled ? '0s' : '3.5s' }}
        >
          <span className="mb-3 ml-[0.3em] font-sans text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
            {t('scroll')}
          </span>
          <div className="relative h-10 w-px overflow-hidden bg-white/30">
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="h-full w-full bg-white"
            />
          </div>
        </div>
      </motion.section>

      {/* ======================= */}
      {/*   Mobile Hero  (<md)    */}
      {/* ======================= */}
      <section className="flex w-full flex-col overflow-x-hidden bg-background pt-17 sm:pt-20 md:hidden">
        {/* Full-width image with title overlay */}
        <div className="relative h-[50vh] min-h-80 w-full">
          <Image
            src={HERO_IMAGE}
            alt="Meili Resort Semporna"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/20" />
          <div className="absolute bottom-8 left-0 z-10 flex w-full flex-col items-center px-4 text-center text-white">
            <p className="mb-2 font-sans text-[10px] font-bold uppercase italic tracking-[0.2em] text-white/90 drop-shadow-md sm:text-[11px] sm:tracking-[0.3em]">
              {t('subtitle')}
            </p>
            <h1 className="font-serif text-4xl leading-none tracking-widest drop-shadow-xl sm:text-5xl">
              {t('title')}
            </h1>
          </div>
        </div>

        {/* Elegant Content Area */}
        <div className="flex w-full flex-col items-center justify-center px-8 py-16 pb-24 text-center text-black">
          <p className="mb-6 font-sans text-[10px] leading-relaxed uppercase tracking-[0.2em] text-zinc-500 max-w-xs">
            {t('address')}
          </p>
          
          <div className="flex flex-col flex-wrap items-center justify-center gap-4 text-center font-sans text-[11px] tracking-widest text-zinc-800 uppercase sm:flex-row sm:gap-8">
            <a
              href="tel:+60123456789"
              className="transition-colors hover:text-zinc-500"
            >
              {t('phone')}
            </a>
            <span className="hidden h-3 w-px bg-zinc-300 sm:block" />
            <a
              href="mailto:reservations@sempornameili.com"
              className="transition-colors hover:text-zinc-500"
            >
              reservations@sempornameili.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
