'use client';

/**
 * GalleryGSAPShowcase 鈥?闆诲奖鎰熸┇鍚戞痪鍕曠暙寤?
 *
 * 瑷▓闈堟劅锛歵omcardermedia.com
 * - 姣忓€嬬珷绡€鍥哄畾涓€灞忥紙pin锛夛紝鍨傜洿婊惧嫊椹呭嫊姗悜绉诲嫊
 * - 鍦栫墖甯惰宸紙parallax xPercent锛屾參鏂?track锛?
 * - 绔犵瘈妯欓锛氶€愬瓧鍏冨緸 clip-mask 涓嬫柟鎶崌锛坰plit-char reveal锛?
 * - 鍦栨敞锛氶毃姗悜閫插害婕稿叆
 * - Mobile锛? 1024px锛夛細鍨傜洿鍫嗙枈锛孲crollTrigger 娣″叆
 */

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  title: string;
}

interface ThemeData {
  id: string;
  title: string;
  subtitle: string;
  images: GalleryImage[];
}

interface Props {
  themes: ThemeData[];
}

// Editorial panel rhythm 鈥?portrait/landscape alternating, values in css string
const PANEL_RHYTHM = [
  { w: '62vw', h: '76vh', mt: '0vh'  },
  { w: '46vw', h: '58vh', mt: '13vh' },
  { w: '58vw', h: '72vh', mt: '-9vh' },
  { w: '50vw', h: '64vh', mt: '10vh' },
  { w: '68vw', h: '80vh', mt: '-7vh' },
  { w: '52vw', h: '66vh', mt: '16vh' },
  { w: '72vw', h: '82vh', mt: '0vh'  },
  { w: '48vw', h: '60vh', mt: '-12vh'},
  { w: '56vw', h: '68vh', mt: '7vh'  },
] as const;

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// Single chapter section
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
function ChapterSection({ theme, index }: { theme: ThemeData; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track   = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ DESKTOP (鈮?1024 px) 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
      mm.add('(min-width: 1024px)', () => {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        // Horizontal scrub tween 鈥?entire track shifts left as user scrolls down
        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 1.4,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Chapter header text animations 鈥?triggered by section entering viewport
        const enterTrigger: ScrollTrigger.Vars = {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        };

        // Badge (Chapter 01) 鈥?slide up from below
        gsap.fromTo(
          section.querySelectorAll('.ch-badge'),
          { yPercent: 130, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: 'power3.out', duration: 0.85, scrollTrigger: enterTrigger }
        );

        // Title chars 鈥?staggered reveal from clip-mask
        gsap.fromTo(
          section.querySelectorAll('.ch-char'),
          { yPercent: 120 },
          {
            yPercent: 0,
            ease: 'expo.out',
            duration: 1.15,
            stagger: 0.04,
            scrollTrigger: enterTrigger,
          }
        );

        // Horizontal rule
        gsap.fromTo(
          section.querySelectorAll('.ch-rule'),
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 0.3,
            ease: 'power2.out',
            duration: 0.8,
            scrollTrigger: { trigger: section, start: 'top 68%', toggleActions: 'play none none reverse' },
          }
        );

        // Subtitle + count fade
        gsap.fromTo(
          section.querySelectorAll('.ch-meta'),
          { opacity: 0, y: 12 },
          {
            opacity: 1, y: 0,
            ease: 'power2.out',
            duration: 0.9,
            stagger: 0.13,
            scrollTrigger: { trigger: section, start: 'top 68%', toggleActions: 'play none none reverse' },
          }
        );

        // Per-panel: image parallax + caption reveal (containerAnimation ties to horizontal tween)
        section.querySelectorAll<HTMLElement>('.gallery-panel').forEach((panel) => {
          const inner = panel.querySelector<HTMLElement>('.gallery-img-inner');
          if (inner) {
            gsap.fromTo(
              inner,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              }
            );
          }

          const caption = panel.querySelector<HTMLElement>('.panel-caption');
          if (caption) {
            gsap.fromTo(
              caption,
              { y: 28, opacity: 0 },
              {
                y: 0, opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: 'left 65%',
                  end: 'left 28%',
                  scrub: 1.1,
                },
              }
            );
          }
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      // 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ MOBILE (< 1024 px) 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
      mm.add('(max-width: 1023px)', () => {
        section.querySelectorAll<HTMLElement>('.mobile-card').forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 48 },
            {
              opacity: 1, y: 0,
              ease: 'power2.out',
              duration: 0.7,
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const titleChars = theme.title.split('');

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-villas-bg overflow-hidden"
      aria-label={`鍥惧簱绔犺妭锛?{theme.title}`}
    >
      {/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺?
          DESKTOP 鈥?pinned horizontal scroll
          鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺?*/}
      <div ref={trackRef} className="hidden lg:flex h-screen items-center w-max">

        {/* Chapter intro card */}
        <div
          className="shrink-0 h-screen relative flex flex-col justify-center overflow-hidden"
          style={{ width: '42vw', padding: '0 5.5vw' }}
        >
          {/* Ghost background image for depth */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
            <Image
              src={theme.images[0].src}
              alt=""
              fill
              className="object-cover scale-110 opacity-[0.06]"
            />
            <div className="absolute inset-0 bg-linear-to-r from-villas-bg via-villas-bg/80 to-transparent" />
          </div>

          {/* Decorative over-scale chapter number */}
          <span
            className="absolute select-none pointer-events-none font-serif font-bold text-background/2.5 leading-none"
            style={{ fontSize: '35vw', bottom: '-4vw', right: '-5vw', lineHeight: 1 }}
            aria-hidden
          >
            {theme.id}
          </span>

          {/* Text */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="overflow-hidden mb-7">
              <p className="ch-badge font-sans text-xs tracking-[0.5em] uppercase text-gold-warm">
                Chapter 鈥?{theme.id}
              </p>
            </div>

            {/* Split-char title */}
            <h2 className="font-serif leading-none mb-0" aria-label={theme.title}>
              {titleChars.map((char, i) => (
                <span key={i} className="inline-block overflow-hidden" style={{ lineHeight: 1.06 }}>
                  <span
                    className="ch-char inline-block text-background"
                    style={{ fontSize: 'clamp(2.8rem, 5.5vw, 6rem)' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                </span>
              ))}
            </h2>

            {/* Divider + subtitle */}
            <div className="flex items-center gap-5 mt-10">
              <div className="ch-rule h-px w-12 bg-background origin-left" />
              <p className="ch-meta font-sans text-xs tracking-[0.4em] uppercase text-background/45">
                {theme.subtitle}
              </p>
            </div>

            {/* Image count */}
            <p className="ch-meta font-sans text-xs text-background/25 mt-12 tracking-widest">
              {String(theme.images.length).padStart(2, '0')} IMAGES
            </p>
          </div>
        </div>

        {/* Image panels */}
        {theme.images.map((img, idx) => {
          const layout = PANEL_RHYTHM[idx % PANEL_RHYTHM.length];
          return (
            <div
              key={idx}
              className="gallery-panel shrink-0 relative overflow-hidden mx-3 xl:mx-4"
              style={{ width: layout.w, height: layout.h, marginTop: layout.mt }}
            >
              {/* Parallax inner container 鈥?xPercent animated */}
              <div className="gallery-img-inner absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover scale-[1.18]"
                  priority={index === 0 && idx === 0}
                />
              </div>

              {/* Gradient for caption legibility */}
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent pointer-events-none" />

              {/* Index badge */}
              <span
                className="absolute top-5 right-5 font-sans text-xs tracking-[0.3em] text-background/35 select-none"
                aria-hidden
              >
                {String(idx + 1).padStart(2, '0')} / {String(theme.images.length).padStart(2, '0')}
              </span>

              {/* Caption 鈥?animated */}
              <div className="panel-caption absolute bottom-0 left-0 right-0 px-6 pb-7 pt-16">
                <div className="h-px w-8 bg-gold-warm/60 mb-3" />
                <p
                  className="font-serif text-background leading-snug"
                  style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.2rem)' }}
                >
                  {img.title}
                </p>
              </div>
            </div>
          );
        })}

        {/* End spacer */}
        <div className="shrink-0" style={{ width: '12vw' }} />
      </div>

      {/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺?
          MOBILE 鈥?vertical layout
          鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺?*/}
      <div className="lg:hidden w-full">
        {/* Mobile header */}
        <div className="mobile-card px-6 pt-14 pb-10 relative overflow-hidden">
          <span
            className="absolute select-none pointer-events-none font-serif font-bold text-background/[0.035] leading-none"
            style={{ fontSize: '55vw', bottom: '-8vw', right: '-5vw', lineHeight: 1 }}
            aria-hidden
          >
            {theme.id}
          </span>
          <p className="font-sans text-xs tracking-[0.45em] uppercase text-gold-warm mb-5">
            Chapter 鈥?{theme.id}
          </p>
          <h2 className="font-serif text-4xl text-background leading-tight mb-7">
            {theme.title}
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-px w-9 bg-background/25" />
            <p className="font-sans text-xs tracking-[0.32em] uppercase text-background/40">
              {theme.subtitle}
            </p>
          </div>
        </div>

        {/* Mobile image stack */}
        <div className="flex flex-col gap-1 px-4 pb-12">
          {theme.images.map((img, idx) => (
            <div
              key={idx}
              className="mobile-card relative w-full overflow-hidden"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0 && idx === 0}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-px w-6 bg-gold-warm/60 mb-2" />
                <p className="font-serif text-background text-sm leading-snug">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// Root export
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
export default function GalleryGSAPShowcase({ themes }: Props) {
  return (
    <div className="w-full bg-villas-bg">
      {themes.map((theme, index) => (
        <ChapterSection key={theme.id} theme={theme} index={index} />
      ))}
    </div>
  );
}

