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
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const POST_IMAGES = [
  'https://picsum.photos/seed/post-story1/1600/1100',
  'https://picsum.photos/seed/post-story2/900/1100',
  'https://picsum.photos/seed/post-story3/900/1100',
];

export function Storytelling() {
  const t = useTranslations('Story');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -20px 0px',
    amount: 0.02,
  });

  // 首页只展示精选 3 篇：1 篇头条 + 2 篇次篇
  const allPosts = t.raw('posts') as Array<{ tag: string; title: string; date: string }>;
  const posts = allPosts.slice(0, 3);
  const featured = posts[0];
  const secondary = posts.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-cream py-24 md:py-32 lg:py-40"
    >
      {/* Section header */}
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
          className="mb-20 sm:mb-28"
        >
          <h2
            className="font-serif font-light leading-[1.15] tracking-tight text-section-text"
            style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.5rem)' }}
          >
            {t('title')}
          </h2>
        </motion.div>
      </div>

      {/* 头条文章：图在上、文字在下、容器宽度限制让两侧露出米色留白 */}
      <motion.article
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="group mx-auto max-w-7xl cursor-pointer px-6 sm:px-10 lg:px-16"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={POST_IMAGES[0]}
            alt={featured.title}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center md:mt-14">
          <p className="mb-6 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-warm-text">
            {featured.tag}&nbsp;&nbsp;&#47;&nbsp;&nbsp;{featured.date}
          </p>
          <h3
            className="font-serif font-light leading-[1.2] text-section-text"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {featured.title}
          </h3>
          <span className="mt-8 inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-section-text">
            {t('btn')}
            <span className="text-gold-warm transition-transform duration-700 ease-out group-hover:translate-x-2">
              &#8594;
            </span>
          </span>
        </div>
      </motion.article>

      {/* 头条与次篇之间的留白带 */}
      <div className="h-24 md:h-40 lg:h-52" />

      {/* 次篇双栏：图上文下，并排两篇 */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          {secondary.map((post, i) => (
            <motion.article
              key={i}
              custom={0.3 + i * 0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={POST_IMAGES[i + 1]}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-8">
                <p className="mb-5 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-warm-text">
                  {post.tag}&nbsp;&nbsp;&#47;&nbsp;&nbsp;{post.date}
                </p>
                <h3 className="mb-7 font-serif text-xl font-light leading-[1.3] text-section-text md:text-2xl lg:text-[1.625rem]">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-section-text">
                  {t('btn')}
                  <span className="text-gold-warm transition-transform duration-700 ease-out group-hover:translate-x-2">
                    &#8594;
                  </span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
