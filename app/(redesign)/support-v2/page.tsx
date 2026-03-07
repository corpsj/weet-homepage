import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const SupportV2Client = dynamic(
  () => import('./support-v2-client').then(m => ({ default: m.SupportV2Client })),
  {
    loading: () => (
      <div className="min-h-screen space-y-8">
        <Skeleton className="h-[50vh] w-full" />
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: '고객지원 | weet:)',
  description: '위트 고객지원 센터 — 전화, 카카오톡, 이메일로 24시간 상담 가능',
  openGraph: {
    title: '고객지원 | weet:)',
    description: '위트 고객지원 센터 — 전화, 카카오톡, 이메일로 24시간 상담 가능',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:) 시스템건축',
  },
  twitter: {
    card: 'summary_large_image',
    title: '고객지원 | weet:)',
    description: '위트 고객지원 센터 — 전화, 카카오톡, 이메일로 24시간 상담 가능',
  },
}

export default function SupportPage() {
  return <SupportV2Client />
}
