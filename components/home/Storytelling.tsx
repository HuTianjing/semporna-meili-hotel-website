'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

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

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.9', 'start 0.1'],
  });
  const listWidth = useTransform(scrollYProgress, [0, 1], ['82%', '100%']);
  const listRadius = useTransform(scrollYProgress, [0, 1], ['12px', '0px']);

  const posts = t.raw('posts') as Array<{ tag: string; title: string; date: string }>;

  return (
    <section ref={sectionRef} className="bg-background relative w-full pt-20 pb-32">
      {/* 标题区 */}
      <div className="container mx-auto mb-14 flex flex-col items-center px-8 text-center md:mb-20 md:px-16">
        <p className="text-muted-foreground mb-2 font-sans text-[10px] font-semibold tracking-[0.2em] uppercase md:mb-4 md:text-sm md:tracking-[0.3em]">
          {t('subtitle')}
        </p>
        <h2 className="text-foreground font-serif text-4xl md:text-5xl lg:text-6xl">
          {t('title')}
        </h2>
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
