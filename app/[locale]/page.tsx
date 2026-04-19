import { Hero } from '@/components/home/Hero';
import { HotelIntro } from '@/components/home/HotelIntro';
import { VillasAndSuites } from '@/components/home/VillasAndSuites';

export default function Home() {
  return (
    <main className="relative w-full grow" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* 1. Hero 视频大图 */}
      <Hero />

      {/* 2. 酒店介绍 */}
      <HotelIntro />

      {/* 3. 别墅与套房 */}
      <VillasAndSuites />
    </main>
  );
}
