import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function GalleryVideo() {
  const t = useTranslations('Gallery.Video');

  return (
    <section className="relative w-full overflow-hidden bg-black text-white py-24 sm:py-36 md:py-48 lg:py-64 min-h-[60vh] md:min-h-[80vh] flex items-center justify-center">
      {/* Background layer */}
      <div className="absolute inset-0">
        <Image
          src="/Photos on OTA/iStock-1456971881.jpg"
          alt="Video placeholder"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80 z-10" />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto h-full">
        {/* Decorative elements */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center">
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-[--color-gold-warm]">
            {t('tag')}
          </span>
          <div className="w-8 sm:w-12 h-px bg-[--color-gold-warm]" />
        </div>

        {/* Text */}
        <h2 
          className="font-serif leading-[1.1] mb-4 sm:mb-6 md:mb-8"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          {t('title')}
        </h2>

        <p className="font-sans text-white/70 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-10 sm:mb-12 md:mb-16">
          {t('desc')}
        </p>

        {/* Placeholder Play Button */}
        <button className="group relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/30 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white">
          <svg className="ml-1 h-6 w-6 sm:h-8 sm:w-8 fill-white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <span className="mt-4 font-sans text-[0.65rem] tracking-widest text-white/50 uppercase">
          {t('cta')}
        </span>
      </div>
    </section>
  );
}
