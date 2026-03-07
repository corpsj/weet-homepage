import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const HomeClient = dynamic(
  () => import('./home-client').then(m => ({ default: m.HomeClient })),
  {
    loading: () => (
      <div className="min-h-screen space-y-8">
        <Skeleton className="h-[80vh] w-full" />
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
  title: '홈 | weet:) 시스템건축',
  description: '시스템건축의 새로운 기준 — 이동식주택과 현장건축 전문 기업 위트',
  openGraph: {
    title: '홈 | weet:) 시스템건축',
    description: '시스템건축의 새로운 기준 — 이동식주택과 현장건축 전문 기업 위트',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:) 시스템건축',
  },
  twitter: {
    card: 'summary_large_image',
    title: '홈 | weet:) 시스템건축',
    description: '시스템건축의 새로운 기준 — 이동식주택과 현장건축 전문 기업 위트',
  },
}

export default function HomePage() {
  return <HomeClient />
}
