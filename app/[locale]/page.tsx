import { Hero } from '@/components/home/Hero';
import { HotelIntro } from '@/components/home/HotelIntro';
import { VillasAndSuites } from '@/components/home/VillasAndSuites';
import { SpecialOffers } from '@/components/home/SpecialOffers';
import { Storytelling } from '@/components/home/Storytelling';

export default function Home() {
  return (
    <main className="relative w-full grow" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* 1. Hero 视频大图 */}
      <Hero />

      {/* 2. 酒店介绍 */}
      <HotelIntro />

      {/* 3. 别墅与套房 */}
      <VillasAndSuites />

      {/* 4. 优惠精选 */}
      {/* <SpecialOffers /> */}

      {/* 5. 品牌故事引言 */}
      <Storytelling />
    </main>
  );
}
