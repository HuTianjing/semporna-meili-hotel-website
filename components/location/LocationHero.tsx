import { useTranslations } from 'next-intl';

export default function LocationHero() {
  const t = useTranslations('Location');

  return (
    <section className="bg-primary pt-32 pb-16 sm:pb-20 px-page text-center">
      <h1
        className="font-serif text-white tracking-[0.06em]"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)' }}
      >
        {t('hero.title')}
      </h1>
      <p className="font-sans text-white/70 mt-4 max-w-prose mx-auto text-sm sm:text-base leading-relaxed">
        {t('hero.subtitle')}
      </p>
    </section>
  );
}
