import GalleryPageHeader from '@/components/gallery/GalleryPageHeader';
import GallerySkyAndSea from '@/components/gallery/GallerySkyAndSea';
import GalleryDiving from '@/components/gallery/GalleryDiving';
import GalleryVilla from '@/components/gallery/GalleryVilla';
import GalleryArchitecture from '@/components/gallery/GalleryArchitecture';
import GalleryAmenities from '@/components/gallery/GalleryAmenities';
import GalleryDining from '@/components/gallery/GalleryDining';
import GalleryVideo from '@/components/gallery/GalleryVideo';
import GalleryCTA from '@/components/gallery/GalleryCTA';
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface GalleryImage {
  src: string;
  title: string;
}

interface ThemeData {
  id: string;
  title: string;
  subtitle: string;
  images: GalleryImage[];
}

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Gallery' });
  return {
    title: t('Hero.line1'),
    description: 'Explore the beauty of Semporna',
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tGallery = await getTranslations({ locale, namespace: 'Gallery' });
  const themes = tGallery.raw('Themes') as ThemeData[];

  const [skyAndSea, diving, villa, architecture, amenities, dining] = themes;

  return (
    <main className="w-full flex-1">
      <GalleryPageHeader />

      <GallerySkyAndSea
        title={skyAndSea.title}
        subtitle={skyAndSea.subtitle}
        images={skyAndSea.images}
      />

      <GalleryDiving
        title={diving.title}
        subtitle={diving.subtitle}
        images={diving.images}
      />

      <GalleryVilla
        title={villa.title}
        subtitle={villa.subtitle}
        images={villa.images}
      />

      <GalleryArchitecture
        title={architecture.title}
        subtitle={architecture.subtitle}
        images={architecture.images}
      />

      <GalleryAmenities
        title={amenities.title}
        subtitle={amenities.subtitle}
        images={amenities.images}
      />

      <GalleryDining
        title={dining.title}
        subtitle={dining.subtitle}
        images={dining.images}
      />

      <GalleryVideo />

      <GalleryCTA />
    </main>
  );
}
