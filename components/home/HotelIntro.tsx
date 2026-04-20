'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { MapPin, Waves, Star, Compass } from 'lucide-react';

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

export function HotelIntro() {
  const t = useTranslations('HotelIntro');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isObscured, setIsObscured] = useState(false);
  // 仅在桌面端 (md+) 执行滚动上移效果，对齐 HeroDesktop 行为
  const [isMd, setIsMd] = useState(false);
  // useInView 替代 IntersectionObserver + .reveal CSS class
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -40px 0px', amount: 0.08 });

  const { scrollY } = useScroll();
  const contentYOffset = useTransform(scrollY, [0, 100], [0, -80]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsMd(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 监听滚动，一旦向下滚动被鳟盖仓就永久隐藏显示器
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 120 && !isObscured) {
      setIsObscured(true);
    }
  });

  const highlights = [
    { icon: MapPin, value: t('highlight1Value'), label: t('highlight1Label') },
    { icon: Waves, value: t('highlight2Value'), label: t('highlight2Label') },
    { icon: Star, value: t('highlight3Value'), label: t('highlight3Label') },
    { icon: Compass, value: t('highlight4Value'), label: t('highlight4Label') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden bg-transparent"
    >
      {/* Scroll Indicator Box — Hero 收缩后露出的顶郥 80px，仅在桌面端显示 */}
      {!isObscured && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8, ease: 'easeOut' }}
          className="absolute top-0 left-0 z-0 hidden h-20 w-full flex-col items-center justify-center md:flex"
          style={{ backgroundColor: 'var(--color-about-bg)' }}
        >
          <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#8a7e6b]">
            {t('scrollDown')}
          </span>
        </motion.div>
      )}

      {/* Main Content 区域——桌面端滚动时向上滑动 80px 以鳟盖显示器 */}
      <motion.div
        style={{
          y: isMd ? (isObscured ? -80 : contentYOffset) : 0,
          backgroundColor: 'var(--color-about-bg)',
        }}
        className="relative z-20 w-full md:mt-20"
      >
        <div className="py-20 sm:py-28 md:py-36 lg:py-44">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

          {/* Section label */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center"
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-[#c2996c]">01</span>
            <div className="w-8 sm:w-12 h-px bg-[#c2996c]" />
            <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8a7e6b]">
              {t('sectionLabel')}
            </span>
          </motion.div>

          {/* Quote */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-10 sm:mb-14 md:mb-16"
          >
            <p className="font-serif italic text-[#1a2a3a]/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              &ldquo;{t('quote')}&rdquo;
            </p>
          </motion.div>

          {/* Main heading */}
          <motion.div
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="font-serif text-[#1a2a3a] leading-[1.15]">
              <span className="block" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
                {t('headingLine1')}
              </span>
              <span
                className="block mt-1 sm:mt-2"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', color: '#0086cd' }}
              >
                {t('headingLine2')}
              </span>
            </h2>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex justify-center mb-8 sm:mb-10 md:mb-12"
          >
            <div className="w-12 sm:w-16 h-px bg-[#c2996c]" />
          </motion.div>

          {/* Body text */}
          <motion.div
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center max-w-[680px] mx-auto space-y-4 sm:space-y-5 mb-12 sm:mb-16 md:mb-20"
          >
            <p className="font-sans text-[0.875rem] sm:text-[0.9375rem] leading-[1.85] sm:leading-[1.95] text-[#5a5347] font-light">
              {t('body1')}
            </p>
            <p className="font-sans text-[0.875rem] sm:text-[0.9375rem] leading-[1.85] sm:leading-[1.95] text-[#5a5347] font-light">
              {t('body2')}
            </p>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-[800px] mx-auto"
          >
            {highlights.map((h) => (
              <div key={h.label} className="flex flex-col items-center text-center">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: 'rgba(0,51,101,0.06)' }}
                >
                  <h.icon size={16} style={{ color: '#0086cd' }} strokeWidth={1.5} />
                </div>
                <span className="block font-serif text-lg sm:text-xl text-[#1a2a3a] leading-none mb-1">
                  {h.value}
                </span>
                <span className="block font-sans text-[0.625rem] sm:text-[0.7rem] text-[#8a7e6b] tracking-wide leading-snug">
                  {h.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-12 sm:mt-16 text-center"
          >
            <a
              href="/villas"
              className="inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-[#1a2a3a] border-b border-[#1a2a3a]/30 pb-1 hover:border-[#1a2a3a] transition-colors duration-500"
            >
              {t('cta')}
              <span className="text-[#0086cd]">→</span>
            </a>
          </motion.div>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
