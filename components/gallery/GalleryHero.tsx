import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function GalleryHero() {
  const t = useTranslations('Gallery.Hero');

  return (
    <section className="relative h-[85vh] w-full overflow-hidden md:h-[90vh]">
      {/* 
        Image priority since it's above the fold hero image. 
        Using N-01 / N-03 as per specs. 
      */}
      <Image
        src="/Photos on OTA/iStock-1145118710.jpg"
        alt={t('line1')}
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/65" />

      {/* Center text container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {/* line 1 */}
        <h1
          className="font-serif text-white/85 tracking-[0.05em] leading-[1.05]"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
        >
          {t('line1')}
        </h1>

        {/* line 2 */}
        <p className="mt-4 font-sans text-xs text-white/45 tracking-[0.45em] uppercase max-w-2xl">
          {t('line2')}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-white/35">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </section>
  );
}
