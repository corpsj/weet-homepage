import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import FullscreenHero from '@/components/sections/FullscreenHero';

const TrustBadges = dynamic(
  () => import('@/components/sections/TrustBadges').then((m) => m.TrustBadges),
  { loading: () => <section className="py-16 bg-white" /> },
);

const ModelComparison = dynamic(
  () =>
    import('@/components/sections/ModelComparison').then(
      (m) => m.ModelComparison,
    ),
  { loading: () => <section className="py-16 bg-gray-50" /> },
);

const HomeCTA = dynamic(
  () => import('./HomeCTA').then((m) => m.HomeCTA),
  { loading: () => <section className="py-24 bg-gray-900" /> },
);

export const metadata: Metadata = {
  title: '위트있는 모듈러 하우스',
  description:
    '시스템 모듈러 건축 전문 기업 위트(weet). S/M/L/XL 규격 모듈부터 BESPOKE 맞춤 설계까지, 빠르고 합리적인 건축 솔루션을 제안합니다.',
  alternates: { canonical: '/home' },
  openGraph: {
    url: '/home',
    title: '위트(weet) | 위트있는 모듈러 하우스',
    description:
      '시스템 모듈러 건축 전문 기업 위트(weet). S부터 XL까지, 위트있는 집을 만나보세요.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  twitter: {
    card: 'summary_large_image',
    title: '위트(weet) | 위트있는 모듈러 하우스',
    description:
      'S부터 XL까지, 위트있는 모듈러 하우스를 만나보세요.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '위트(weet)',
  url: 'https://www.we-et.com',
  logo: 'https://www.we-et.com/logo.png',
  description: '시스템 모듈러 건축 전문 기업',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '함평군 대동면 금산길 205-27',
    addressCountry: 'KR',
  },
  telephone: '010-9645-2348',
  sameAs: [
    'https://www.instagram.com/weet_kr/',
    'https://blog.naver.com/we-et',
  ],
};

export default function RedesignHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">위트(weet) 모듈러 건축 전문 기업</h1>
      <FullscreenHero />
      <TrustBadges />
      <ModelComparison />
      <HomeCTA />
    </>
  );
}
