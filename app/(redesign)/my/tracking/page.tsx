import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const TrackingClient = dynamic(
  () => import('./tracking-client').then(m => ({ default: m.TrackingClient })),
  {
    loading: () => (
      <div className="min-h-screen space-y-8">
        <Skeleton className="h-[45vh] w-full" />
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: '시공 추적 | weet:)',
  description: '주문 번호로 시공 진행 현황을 실시간으로 확인하세요',
  openGraph: {
    title: '시공 추적 | weet:)',
    description: '주문 번호로 시공 진행 현황을 실시간으로 확인하세요',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:) 시스템건축',
  },
  twitter: {
    card: 'summary_large_image',
    title: '시공 추적 | weet:)',
    description: '주문 번호로 시공 진행 현황을 실시간으로 확인하세요',
  },
}

export default function TrackingPage() {
  return <TrackingClient />
}
