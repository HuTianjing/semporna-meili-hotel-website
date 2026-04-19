import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center flex-grow pt-48 pb-32 px-4 text-center min-h-[70vh] mt-20">
      <h1 className="text-8xl md:text-9xl font-serif text-primary mb-4 tracking-widest">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-serif text-primary/80 mb-6">
        {t('title')}
      </h2>
      <p className="max-w-md text-muted-foreground font-sans mb-10 leading-relaxed mx-auto">
        {t('description')}
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase transition-colors hover:bg-primary/90 font-sans mx-auto inline-block"
      >
        {t('returnHome')}
      </Link>
    </div>
  );
}
