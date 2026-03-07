import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const SystemClient = dynamic(
  () => import('./system-client').then(m => ({ default: m.SystemClient })),
  {
    loading: () => (
      <div className="min-h-screen space-y-8">
        <Skeleton className="h-[60vh] w-full" />
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
  title: '시스템건축 소개 | weet:)',
  description: '이동식주택과 현장건축을 아우르는 위트만의 시스템건축 방식',
  openGraph: {
    title: '시스템건축 소개 | weet:)',
    description: '이동식주택과 현장건축을 아우르는 위트만의 시스템건축 방식',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:) 시스템건축',
  },
  twitter: {
    card: 'summary_large_image',
    title: '시스템건축 소개 | weet:)',
    description: '이동식주택과 현장건축을 아우르는 위트만의 시스템건축 방식',
  },
}

export default function SystemPage() {
  return <SystemClient />
}
