'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  'https://picsum.photos/seed/post-story4/1200/900',
  'https://picsum.photos/seed/post-story5/1200/900',
];

export function Storytelling() {
  const t = useTranslations('Story');
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -20px 0px', amount: 0.02 });

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.9', 'start 0.1'],
  });
  const listWidth = useTransform(scrollYProgress, [0, 1], ['82%', '100%']);
  const listRadius = useTransform(scrollYProgress, [0, 1], ['12px', '0px']);

  const posts = t.raw('posts') as Array<{ tag: string; title: string; date: string }>;

  return (
    <section ref={sectionRef} className="relative w-full pb-32 pt-20">
      {/* ── Section header ── */}
      <div className="mx-auto max-w-375 px-5 pb-10 sm:px-8 sm:pb-14 md:px-12 lg:px-16">
        {/* Section label */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-6 flex items-center justify-center gap-3 sm:mb-8 sm:gap-4"
        >
          <span className="font-sans text-[0.6rem] tracking-[0.35em] text-[#8a7e6b] uppercase">
            03
          </span>
          <div className="h-px w-8 bg-[#c4b99a]/40 sm:w-12" />
          <span className="font-sans text-[0.6rem] tracking-[0.25em] text-[#8a7e6b] uppercase sm:text-[0.65rem] sm:tracking-[0.3em]">
            {t('subtitle')}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10 text-center sm:mb-14 md:mb-20"
        >
          <h2
            className="font-serif leading-[1.15] text-[#1a2a3a]"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            {t('title')}
          </h2>
        </motion.div>
      </div>

      {/* 博客列表：随滚动从圆角窄盒展开至全宽 */}
      <div ref={listRef} className="relative flex w-full justify-center overflow-hidden">
        <motion.div
          style={{ width: listWidth, borderRadius: listRadius }}
          className="overflow-hidden"
        >
          {posts.map((post, i) => {
            const isEven = i % 2 === 0;
            return (
              <article
                key={i}
                className={`group flex cursor-pointer flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} items-stretch`}
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
                  className={`flex flex-1 items-center ${isEven ? 'justify-start' : 'justify-end'} bg-background`}
                >
                  <div className="max-w-md px-10 py-16 md:px-16 md:py-0">
                    <p className="text-muted-foreground mb-6 text-xs tracking-[0.25em] uppercase">
                      {post.tag}&nbsp;&nbsp;&#47;&nbsp;&nbsp;{post.date}
                    </p>
                    <h3 className="text-foreground mb-8 font-serif text-3xl leading-tight md:text-4xl">
                      {post.title}
                    </h3>
                    <span className="text-foreground border-foreground/30 group-hover:border-foreground inline-flex items-center gap-3 border-b pb-1 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300">
                      {t('btn')}
                      <svg
                        width="16"
                        height="8"
                        viewBox="0 0 16 8"
                        fill="none"
                        className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M0 4h14M11 1l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
