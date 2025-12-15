import HeroCarousel from '@/components/sections/HeroCarousel';
import PartnersBanner from '@/components/sections/PartnersBanner';
import SignatureLine from '@/components/sections/SignatureLine';
import VideoSection from '@/components/sections/VideoSection';

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">위트(WEET) 모듈러 건축 전문 기업</h1>
      <HeroCarousel />
      <PartnersBanner />
      <SignatureLine />
      <VideoSection />
    </main>
  );
}
