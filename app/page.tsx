import HeroCarousel from '@/components/sections/HeroCarousel';
import PartnersBanner from '@/components/sections/PartnersBanner';
import SignatureLine from '@/components/sections/SignatureLine';
import VideoSection from '@/components/sections/VideoSection';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <PartnersBanner />
      <SignatureLine />
      <VideoSection />
    </>
  );
}
