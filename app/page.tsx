import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
  description: "시스템 모듈러 건축 전문 기업 위트(weet). S/M/L/XL 규격 모듈부터 BESPOKE 맞춤 설계까지, 빠르고 합리적인 건축 솔루션을 제안합니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "홈",
    description: "시스템 모듈러 건축 전문 기업 위트(weet). S/M/L/XL 규격 모듈부터 BESPOKE 맞춤 설계까지, 빠르고 합리적인 건축 솔루션을 제안합니다.",
  },
};


import HeroCarousel from '@/components/sections/HeroCarousel';
import PartnersBanner from '@/components/sections/PartnersBanner';
import SignatureLine from '@/components/sections/SignatureLine';
import VideoSection from '@/components/sections/VideoSection';
import GallerySection from '@/components/company/GallerySection';

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">위트(weet) 모듈러 건축 전문 기업</h1>
      <HeroCarousel />
      <PartnersBanner />
      <SignatureLine />
      <VideoSection />
      <GallerySection />
    </main>
  );
}
