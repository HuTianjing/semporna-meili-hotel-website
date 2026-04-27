'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const allPosts = t.raw('posts') as Array<{
    tag: string;
    title: string;
    date: string;
    excerpt?: string;
  }>;
  const posts = allPosts.slice(0, 3);

  return (
    <section ref={sectionRef} className="relative w-full bg-cream py-24 md:py-32 lg:py-40">
      {/* Section header — 与 HotelIntro / VillasAndSuites 完全统一 */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-10 font-sans text-[0.65rem] uppercase tracking-[0.45em] text-warm-text sm:mb-14"
          >
            Journal
          </motion.p>

          <motion.h2
            custom={0.12}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-16 font-serif font-light leading-[1.15] tracking-tight text-section-text sm:mb-24"
            style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.5rem)' }}
          >
            {t('title')}
          </motion.h2>
        </div>
      </div>

      {/* 文章列表：1280px 容器 + 4:3 固定比例图 + 章节间米色呼吸带 */}
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-5 sm:px-8 md:gap-28 md:px-12 lg:gap-36 lg:px-16">
        {posts.map((post, i) => (
          <motion.article
            key={i}
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="group grid cursor-pointer grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12 lg:gap-16"
          >
            {/* 图片：左侧 7/12，固定 4:3 比例 */}
            <div className="relative aspect-[4/3] w-full overflow-hidden md:col-span-7">
              <Image
                src={POST_IMAGES[i]}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                sizes="(min-width: 768px) 58vw, 100vw"
              />
            </div>

            {/* 文字面板：右侧 5/12 */}
            <div className="md:col-span-5">
              <div className="max-w-md">
                <p className="mb-5 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-warm-text">
                  {post.tag}
                  <span className="mx-3 text-gold-warm">/</span>
                  {post.date}
                </p>
                <h3 className="mb-6 font-serif text-2xl leading-[1.25] text-section-text md:text-[1.75rem] lg:text-3xl">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mb-8 font-sans text-[0.9375rem] font-light leading-[1.95] text-[#5a5347]">
                    {post.excerpt}
                  </p>
                )}
                <span className="inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-section-text">
                  {t('btn')}
                  <span className="text-gold-warm transition-transform duration-700 ease-out group-hover:translate-x-2">
                    &#8594;
                  </span>
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* 章节收束：统一 CTA 进入完整 Journal */}
      <motion.div
        custom={0.25}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-20 flex justify-center md:mt-28 lg:mt-32"
      >
        <Link
          href="/journal"
          className="group inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-section-text"
        >
          {t('viewAll')}
          <span className="text-gold-warm transition-transform duration-700 ease-out group-hover:translate-x-2">
            &#8594;
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
