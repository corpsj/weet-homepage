import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const CompanyV2Client = dynamic(
  () => import('./company-v2-client').then(m => ({ default: m.CompanyV2Client })),
  {
    loading: () => (
      <div className="min-h-screen space-y-8">
        <Skeleton className="h-[55vh] w-full" />
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: '회사소개 | weet:)',
  description: '시스템건축 전문 기업 위트 — 이동식주택과 현장건축으로 더 나은 삶의 공간을 만듭니다',
  openGraph: {
    title: '회사소개 | weet:)',
    description: '시스템건축 전문 기업 위트 — 이동식주택과 현장건축으로 더 나은 삶의 공간을 만듭니다',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:) 시스템건축',
  },
  twitter: {
    card: 'summary_large_image',
    title: '회사소개 | weet:)',
    description: '시스템건축 전문 기업 위트 — 이동식주택과 현장건축으로 더 나은 삶의 공간을 만듭니다',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'weet:) 시스템건축',
  url: 'https://www.weet.kr',
  description: '시스템건축의 새로운 기준 — 이동식주택과 현장건축 전문 기업',
  address: { '@type': 'PostalAddress', addressCountry: 'KR' },
}

export default function CompanyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompanyV2Client />
    </>
  )
}
