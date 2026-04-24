'use client';

/**
 * GalleryGSAPShowcase 鈥?闈堟劅渚嗚嚜 signalsfs.com
 *
 * 鏍稿績姗熷埗锛?
 * - 瀹瑰櫒 (Section) 浣旂敤楂樺害 = (鍦栫墖鏁搁噺 + 1) * 100vh
 * - 鍒╃敤 GSAP ScrollTrigger 閲橀伕锛坧in锛夊乏鍙冲叐鍋?
 * - 宸﹀伌锛氭枃妗堝崁濉婏紝闅ㄦ痪鍕曢€愭几鏀硅畩鏂囧瓧鍏у鎴栦笉閫忔槑搴?
 * - 鍙冲伌锛氬湒鐗囧爢鐤婂崁锛屽埄鐢?`clip-path` 瀵︿綔鐢变笅寰€涓婄殑銆屾彮闁嬨€嶅嫊鐣紙Reveal锛?
 */

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// Helper to split text into characters/words for GSAP animation
// ----------------------------------------------------------------------
function SplitChars({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((char, i) =>
        char === ' ' ? (
          <span key={i} className="inline-block whitespace-pre">
            &nbsp;
          </span>
        ) : (
          <span key={i} className="inline-flex overflow-hidden pb-1 align-bottom">
            <span className="split-char inline-block">{char}</span>
          </span>
        ),
      )}
    </span>
  );
}

interface GalleryImage {
  src: string;
  title: string;
  desc?: string;
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

// --------------------------------------------------
// Single chapter section implementing signalsfs-like reveal
// --------------------------------------------------
function ChapterSection({ theme, index }: { theme: ThemeData; index: number }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      // ---------- DESKTOP (>= 1024 px) ----------
      mm.add('(min-width: 1024px)', () => {
        // 找出右侧所有图片面板
        const rightPanels = gsap.utils.toArray('.ch-image-panel') as HTMLElement[];
        // 找出左侧对应的文案面板
        const textPanels = gsap.utils.toArray('.ch-text-panel') as HTMLElement[];

        if (rightPanels.length === 0) return;

        // 绑定整个Container的ScrollTrigger
        // end 距离: 每一张要揭开的图片额外加 100vh
        const scrollDistance = (rightPanels.length - 1) * 100;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollDistance}%`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        // Intro animation for chapter header elements (when section enters/pins)
        const headerTitle = container.querySelector('.ch-anim-title');
        const headerSub = container.querySelector('.ch-anim-sub');
        const headerMain = container.querySelector('.ch-anim-main');
        const headerLine = container.querySelector('.ch-anim-line');
        const firstTextPanel = textPanels[0];

        // Ensure first panel and header act correctly
        if (firstTextPanel) {
          const firstTitleChars = firstTextPanel.querySelectorAll('.panel-title .split-char');
          const firstDescChars = firstTextPanel.querySelectorAll('.panel-desc .split-char');

          // Setup initial states
          gsap.set(firstTextPanel, { opacity: 1 });
          if (firstTitleChars.length) gsap.set(firstTitleChars, { opacity: 0, y: 40 });
          if (firstDescChars.length) gsap.set(firstDescChars, { opacity: 0, y: 40 });

          if (headerTitle) gsap.set(headerTitle, { opacity: 0, x: -50, scale: 0.9 });
          if (headerSub) gsap.set(headerSub, { opacity: 0, x: -30 });
          if (headerMain) gsap.set(headerMain, { opacity: 0, y: 30 });
          if (headerLine)
            gsap.set(headerLine, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });

          // Play intro independently of the scrub timeline
          gsap.to([headerTitle, headerSub, headerMain, headerLine], {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: container,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          });

          if (firstTitleChars.length) {
            gsap.to(firstTitleChars, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.02,
              scrollTrigger: {
                trigger: container,
                start: 'top 60%',
                toggleActions: 'play none none none',
              },
            });
          }
          if (firstDescChars.length) {
            gsap.to(firstDescChars, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.01,
              delay: 0.3,
              scrollTrigger: {
                trigger: container,
                start: 'top 60%',
                toggleActions: 'play none none none',
              },
            });
          }
        }

        // 设定图片和文字的出入场动画
        rightPanels.forEach((panel, i) => {
          // 第一张图 (i===0) 一开始可见，不需要 clip-path 动画
          if (i > 0) {
            // 从下往上遮罩 (隐藏状态: 顶部裁切 100%)
            gsap.set(panel, { clipPath: 'inset(100% 0% 0% 0%)' });

            // 当滚动时，clip-path 逐渐展开 (由 100% 变为 0%)
            // 确保段落式衔接
            tl.to(
              panel,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: 'none',
                duration: 1,
              },
              i - 1,
            );

            // 文字动画 (前一段文字淡出，当前文字淡入)
            if (textPanels[i - 1] && textPanels[i]) {
              const prevWrapper = textPanels[i - 1];
              const currWrapper = textPanels[i];

              const prevTitle = prevWrapper.querySelector('.panel-title');
              const prevDesc = prevWrapper.querySelector('.panel-desc');
              const currTitle = currWrapper.querySelector('.panel-title');
              const currDesc = currWrapper.querySelector('.panel-desc');

              // Wrapper opacity 切换 (提前完成隐藏/显示)
              tl.to(
                prevWrapper,
                {
                  opacity: 0,
                  ease: 'power1.inOut',
                  duration: 0.1,
                },
                i - 1 + 0.3,
              );

              tl.to(
                currWrapper,
                {
                  opacity: 1,
                  ease: 'power1.inOut',
                  duration: 0.1,
                },
                i - 1 + 0.4,
              );

              // 旧文字往上滑动淡出 (稍微提早结束)
              if (prevTitle) {
                const prevChars = prevTitle.querySelectorAll('.split-char');
                tl.to(
                  prevChars.length ? prevChars : prevTitle,
                  {
                    y: -40,
                    opacity: 0,
                    ease: 'power2.inOut',
                    duration: 0.4,
                    stagger: prevChars.length ? 0.01 : 0,
                  },
                  i - 1,
                );
              }
              if (prevDesc) {
                const prevChars = prevDesc.querySelectorAll('.split-char');
                tl.to(
                  prevChars.length ? prevChars : prevDesc,
                  {
                    y: -40,
                    opacity: 0,
                    ease: 'power2.inOut',
                    duration: 0.4,
                    stagger: prevChars.length ? 0.005 : 0,
                  },
                  i - 1 + 0.05,
                ); // slightly delayed out
              }

              // 新文字从下方滑上并淡入
              if (currTitle) {
                const currChars = currTitle.querySelectorAll('.split-char');
                tl.fromTo(
                  currChars.length ? currChars : currTitle,
                  {
                    y: 40,
                    opacity: 0,
                  },
                  {
                    y: 0,
                    opacity: 1,
                    ease: 'power3.out',
                    duration: 0.6,
                    stagger: currChars.length ? 0.02 : 0,
                  },
                  i - 1 + 0.4,
                );
              }
              if (currDesc) {
                const currChars = currDesc.querySelectorAll('.split-char');
                tl.fromTo(
                  currChars.length ? currChars : currDesc,
                  {
                    y: 40,
                    opacity: 0,
                  },
                  {
                    y: 0,
                    opacity: 1,
                    ease: 'power3.out',
                    duration: 0.6,
                    stagger: currChars.length ? 0.01 : 0,
                  },
                  i - 1 + 0.5,
                ); // stagggered in
              }
            }

            // 右侧图片内部 Parallax (缩放还原)
            const img = panel.querySelector('img');
            if (img) {
              tl.fromTo(
                img,
                {
                  scale: 1.15,
                  yPercent: -10,
                },
                {
                  scale: 1,
                  yPercent: 0,
                  ease: 'none',
                  duration: 1,
                },
                i - 1,
              );
            }
          } else {
            // 确保第一个文字面板初始可见
            // This is now handled in the intro animation block above,
            // but we keep this empty branch for clarity of i > 0 structure.
          }
        });

        return () => {
          tl.kill();
        };
      });

      mm.add('(max-width: 1023px)', () => {
        const header = containerRef.current?.querySelector('.ch-mobile-header');
        if (header) {
          gsap.fromTo(
            header,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 80%',
              },
            },
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="bg-about-bg relative w-full overflow-hidden"
      aria-label={`Gallery Chapter: ${theme.title}`}
    >
      {/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺?
          DESKTOP (Split Screen Pin)
          鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺?*/}
      <div className="relative hidden h-screen w-full lg:flex">
        {/* Left Column - Sticky Text */}
        <div className="relative z-20 flex h-full w-[45%] flex-col justify-center pr-[4vw] pl-[6vw]">
          {/* Chapter Basic Info (Fixed position within the flex container) */}
          <div className="ch-header absolute top-1/4 left-[6vw] z-30 w-full max-w-[30vw]">
            <span className="ch-anim-title text-foreground/5 pointer-events-none absolute -top-[8vw] -left-[2vw] font-serif text-[18vw] leading-none font-bold select-none">
              {theme.id}
            </span>
            <p className="ch-anim-sub text-gold-warm mb-5 font-sans text-xs tracking-[0.4em] uppercase">
              Chapter 鈥?{theme.id}
            </p>
            <h2 className="ch-anim-main text-foreground mb-8 font-serif text-5xl leading-tight xl:text-6xl">
              {theme.title}
            </h2>
            <div className="ch-anim-line flex items-center gap-5">
              <div className="bg-foreground/20 h-px w-10" />
              <p className="text-foreground/50 font-sans text-xs tracking-[0.3em] uppercase">
                {theme.subtitle}
              </p>
            </div>
          </div>

          {/* Stacking Text Panels for Image Captions */}
          {/* Container handles position layout, text sets wait for absolute overlapping */}
          <div className="relative z-40 mt-[35vh] h-25 w-full">
            {theme.images.map((img, idx) => (
              <div
                key={`txt-${idx}`}
                className="ch-text-panel pointer-events-none absolute inset-0 flex flex-col items-start justify-center"
                style={{ opacity: 0 }} // JS handles opacity entirely
              >
                <p className="panel-title text-foreground/90 font-serif text-3xl leading-snug xl:text-4xl">
                  <SplitChars text={img.title} />
                </p>
                {img.desc && (
                  <p className="panel-desc text-foreground/60 mt-5 max-w-[80vw] font-sans text-sm leading-relaxed lg:max-w-90">
                    <SplitChars text={img.desc} />
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Revealing Images */}
        <div className="relative z-10 h-full w-[55%]">
          {theme.images.map((img, idx) => (
            <div
              key={`img-${idx}`}
              className="ch-image-panel absolute inset-0 h-full w-full overflow-hidden"
              // z-index 寰€涓婂姞锛岀⒑淇濆緦绾岀殑闈㈢増鑳借搵鍦ㄥ墠涓€鍊嬩笂闈?(寰屾彮闁嬮伄缃?
              style={{ zIndex: 10 + idx }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  priority={index === 0 && idx === 0}
                />
                {/* Gradient slightly darkening at bottom for better slide counter visible */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Slide counter */}
                <div className="absolute right-10 bottom-8 z-20 flex flex-col items-end">
                  <p className="font-sans text-[11px] tracking-[0.2em] text-white/50">
                    {String(idx + 1).padStart(2, '0')} /{' '}
                    {String(theme.images.length).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺?
          MOBILE (< 1024 px) Stack
          鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺?*/}
      <div className="w-full px-5 py-16 lg:hidden">
        {/* Mobile Header */}
        <div className="ch-mobile-header relative mb-12 overflow-hidden">
          <span className="text-foreground/5 pointer-events-none absolute -top-8 -right-4 font-serif text-[40vw] leading-none font-bold select-none">
            {theme.id}
          </span>
          <p className="text-gold-warm mb-4 font-sans text-xs tracking-[0.4em] uppercase">
            Chapter 鈥?{theme.id}
          </p>
          <h2 className="text-foreground mb-5 font-serif text-4xl leading-tight">{theme.title}</h2>
          <div className="flex items-center gap-3">
            <div className="bg-foreground/20 h-px w-8" />
            <p className="text-foreground/50 font-sans text-[10px] tracking-[0.2em] uppercase">
              {theme.subtitle}
            </p>
          </div>
        </div>

        {/* Mobile Image Stack (CSS only sticky / or basic scroll) */}
        <div className="flex flex-col gap-6">
          {theme.images.map((img, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm sm:aspect-square">
                <Image src={img.src} alt={img.title} fill sizes="100vw" className="object-cover" />
              </div>
              <div className="border-gold-warm/50 flex flex-col gap-2 border-l-[1.5px] px-1 py-1 pl-4">
                <p className="text-foreground/90 font-serif text-lg">{img.title}</p>
                {img.desc && (
                  <p className="text-foreground/60 font-sans text-sm leading-relaxed">{img.desc}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// Root component
// --------------------------------------------------
export default function GalleryGSAPShowcase({ themes }: Props) {
  return (
    <div className="bg-villas-bg relative z-10 w-full">
      {themes.map((theme, index) => (
        <ChapterSection key={theme.id} theme={theme} index={index} />
      ))}
    </div>
  );
}
