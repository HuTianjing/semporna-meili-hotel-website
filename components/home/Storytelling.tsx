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
      {/* ── Section header — 与 HotelIntro / VillasAndSuites 完全统一：英文小词 + serif 主标题 ── */}
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10 font-sans text-[0.65rem] uppercase tracking-[0.45em] text-warm-text sm:mb-14"
        >
          Journal
        </motion.p>

        <motion.div
          custom={0.12}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 sm:mb-24"
        >
          <h2
            className="font-serif font-light leading-[1.15] tracking-tight text-section-text"
            style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.5rem)' }}
          >
            {t('title')}
          </h2>
        </motion.div>
      </div>

      {/* 博客列表：统一左图右文，60/40 比例（不对半开） */}
      <div className="w-full">
        {posts.map((post, i) => (
          <article
            key={i}
            className="group flex cursor-pointer flex-col items-stretch md:flex-row"
          >
            {/* 图片：固定左侧，60% 宽 */}
            <div className="relative h-[62vw] w-full shrink-0 overflow-hidden md:h-[72vh] md:w-[60%]">
              <Image
                src={POST_IMAGES[i]}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>

            {/* 文字面板：右侧 40%，editorial 内边距 */}
            <div className="flex flex-1 items-center bg-cream md:w-[40%]">
              <div className="w-full max-w-lg px-8 py-14 sm:px-10 md:px-14 md:py-0 lg:px-20">
                <p className="mb-6 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-warm-text">
                  {post.tag}&nbsp;&nbsp;&#47;&nbsp;&nbsp;{post.date}
                </p>
                <h3 className="mb-10 font-serif text-2xl leading-[1.25] text-section-text md:text-[1.75rem] lg:text-3xl">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-section-text">
                  {t('btn')}
                  <span className="text-gold-warm transition-transform duration-700 ease-out group-hover:translate-x-2">
                    &#8594;
                  </span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
