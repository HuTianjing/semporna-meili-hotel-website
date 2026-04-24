'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
}

interface GalleryThemeProps {
  id: string;
  title: string;
  subtitle: string;
  images: GalleryImage[];
  bgColor: 'bg-cream' | 'bg-background';
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function GalleryTheme({
  id,
  title,
  subtitle,
  images,
  bgColor,
}: GalleryThemeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -20px 0px',
    amount: 0.02,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  return (
    <section ref={sectionRef} className={`py-16 sm:py-20 md:py-28 ${bgColor}`}>
      {/* Header */}
      <div className="mb-10 text-center px-4">
        {/* Sequence tag */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <span className="font-sans text-[0.6rem] text-[--color-gold-warm] uppercase tracking-[0.35em]">
            {id}
          </span>
          <div className="h-px w-8 sm:w-12 bg-[--color-gold-warm]" />
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] text-[--color-warm-text] uppercase tracking-[0.3em]">
            {subtitle}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="font-serif text-[--color-section-text] leading-[1.15]"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
        >
          {title}
        </motion.h2>

        <motion.div
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex justify-center mt-8 sm:mt-10"
        >
          <div className="h-px w-12 sm:w-16 bg-[--color-gold-warm]" />
        </motion.div>
      </div>

      {/* Carousel */}
      <motion.div
        custom={0.3}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative mx-auto w-full md:px-page"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-video lg:aspect-21/9">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              {/* Left */}
              <div className="absolute left-0 top-0 bottom-0 flex md:px-6 w-1/4 items-center justify-start z-10 
                              bg-linear-to-r from-black/0 to-transparent">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="bg-black/20 text-white rounded-full p-2 ml-4  
                             hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                </button>
              </div>
              
              {/* Right */}
              <div className="absolute right-0 top-0 bottom-0 flex md:px-6 w-1/4 items-center justify-end z-10
                              bg-linear-to-l from-black/0 to-transparent">
                <button
                  type="button"
                  onClick={nextSlide}
                  className="bg-black/20 text-white rounded-full p-2 mr-4 
                             hover:bg-black/60 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Counter and Caption */}
        <div className="mt-8 text-center px-4">
          <div className="text-sm font-sans text-muted-foreground uppercase tracking-widest mb-3">
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(images.length).padStart(2, '0')}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + '-title'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-serif text-[--color-section-text] text-base md:text-xl"
            >
              {images[currentIndex].title}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
