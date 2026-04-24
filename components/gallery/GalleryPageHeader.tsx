import { useTranslations } from 'next-intl';

export default function GalleryPageHeader() {
  const t = useTranslations('Gallery.Hero');

  return (
    <section className="bg-primary px-page pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-24 text-center">
      {/* 微标签 */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
        <div className="h-px w-8 sm:w-12 bg-gold/50" />
        <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.35em] text-gold">
          PHOTOS &amp; VIDEOS
        </span>
        <div className="h-px w-8 sm:w-12 bg-gold/50" />
      </div>

      {/* 主标题 */}
      <h1
        className="font-serif text-white leading-[1.05] tracking-[0.04em]"
        style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
      >
        {t('line1')}
      </h1>

      {/* 装饰金线 */}
      <div className="flex justify-center mt-8 sm:mt-10 mb-6 sm:mb-7">
        <div className="h-px w-12 sm:w-16 bg-gold/60" />
      </div>

      {/* 副标题 */}
      <p className="font-sans text-xs text-white/45 tracking-[0.4em] uppercase">
        {t('line2')}
      </p>
    </section>
  );
}
