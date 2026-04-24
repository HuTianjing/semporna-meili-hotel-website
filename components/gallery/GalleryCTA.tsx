import { useTranslations } from 'next-intl';

export default function GalleryCTA() {
  const t = useTranslations('Gallery.CTA');

  return (
    <section className="bg-cream py-16 sm:py-24 md:py-36 text-center px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="font-serif leading-[1.15] text-[--color-section-text] mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}>
          {t('title')}
        </h2>
        <p className="font-sans text-[--color-warm-text] text-sm sm:text-base leading-relaxed mb-10 sm:mb-12 max-w-prose">
          {t('desc')}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button className="bg-primary text-white hover:bg-primary-light px-8 py-3 text-sm tracking-widest uppercase transition-colors duration-300 min-h-11">
            {t('button')}
          </button>

          <a href="#" className="group flex items-center gap-2 text-sm font-semibold tracking-widest text-[#25D366] uppercase transition-colors min-h-11 ml-0 sm:ml-4 border border-[#25D366]/20 px-8 py-3 hover:bg-[#25D366]/10">
            {t('whatsapp')}
          </a>
        </div>
      </div>
    </section>
  );
}
