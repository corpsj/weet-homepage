import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const BespokeV2Client = dynamic(
  () => import('./bespoke-v2-client').then(m => ({ default: m.BespokeV2Client })),
  {
    loading: () => (
      <div className="min-h-screen space-y-8">
        <Skeleton className="h-[55vh] w-full" />
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-1/3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: '비스포크 맞춤 설계 | weet:)',
  description: '당신만의 공간을 완전 맞춤 설계로 완성 — 카페, 팝업스토어, 스마트팜 등 다양한 용도 가능',
  openGraph: {
    title: '비스포크 맞춤 설계 | weet:)',
    description: '당신만의 공간을 완전 맞춤 설계로 완성 — 카페, 팝업스토어, 스마트팜 등 다양한 용도 가능',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:) 시스템건축',
  },
  twitter: {
    card: 'summary_large_image',
    title: '비스포크 맞춤 설계 | weet:)',
    description: '당신만의 공간을 완전 맞춤 설계로 완성 — 카페, 팝업스토어, 스마트팜 등 다양한 용도 가능',
  },
}

export default function BespokePage() {
  return <BespokeV2Client />
}
