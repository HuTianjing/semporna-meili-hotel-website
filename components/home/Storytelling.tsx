'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const POST_IMAGES = [
  'https://picsum.photos/seed/post-story1/1200/900',
  'https://picsum.photos/seed/post-story2/1200/900',
  'https://picsum.photos/seed/post-story3/1200/900',
];

export function Storytelling() {
  const t = useTranslations('Story');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  // 首页只展示精选 3 篇，其余移交 /journal
  const allPosts = t.raw('posts') as Array<{ tag: string; title: string; date: string }>;
  const posts = allPosts.slice(0, 3);

  return (
    <section ref={sectionRef} className="relative w-full bg-cream py-24 md:py-32 lg:py-40">
      {/* ── Section header — 与 HotelIntro / VillasAndSuites 完全统一 ── */}
      <div className="mx-auto max-w-275 px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-6 flex items-center justify-center gap-3 sm:mb-8 sm:gap-4"
        >
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold-warm">
            03
          </span>
          <div className="h-px w-8 bg-gold-warm sm:w-12" />
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-warm-text sm:text-[0.65rem] sm:tracking-[0.3em]">
            {t('subtitle')}
          </span>
        </motion.div>

        <motion.div
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-8 text-center sm:mb-10"
        >
          <h2
            className="font-serif leading-[1.15] text-section-text"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
          >
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-14 flex justify-center sm:mb-20"
        >
          <div className="h-px w-12 bg-gold-warm sm:w-16" />
        </motion.div>
      </div>

      {/* 博客列表：固定全宽，去除随滚动宽度变化的动画 */}
      <div className="w-full">
        {posts.map((post, i) => {
          const isEven = i % 2 === 0;
          return (
            <article
              key={i}
              className={`group flex cursor-pointer flex-col md:flex-row ${
                isEven ? '' : 'md:flex-row-reverse'
              } items-stretch`}
            >
              {/* 图片 */}
              <div className="relative h-[60vw] w-full shrink-0 overflow-hidden md:h-[70vh] md:w-[55%]">
                <Image
                  src={POST_IMAGES[i]}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="55vw"
                />
              </div>

              {/* 文字面板 */}
              <div
                className={`flex flex-1 items-center bg-cream ${
                  isEven ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className="max-w-md px-10 py-16 md:px-16 md:py-0">
                  <p className="mb-6 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-warm-text">
                    {post.tag}&nbsp;&nbsp;&#47;&nbsp;&nbsp;{post.date}
                  </p>
                  <h3 className="mb-8 font-serif text-2xl leading-tight text-section-text md:text-3xl">
                    {post.title}
                  </h3>
                  <span className="inline-flex items-center gap-3 border-b border-section-text/30 pb-1 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-section-text transition-colors duration-500 group-hover:border-section-text">
                    {t('btn')}
                    <span className="text-gold-warm transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
