import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const SolutionsClient = dynamic(
  () => import('./solutions-client').then(m => ({ default: m.SolutionsClient })),
  {
    loading: () => (
      <div className="min-h-screen space-y-8">
        <Skeleton className="h-[50vh] w-full" />
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: '솔루션 | weet:)',
  description: '스마트홈 IoT, 보안 CCTV, 태양광 발전, 친환경 설계 등 시스템건축에 더하는 스마트 솔루션',
  openGraph: {
    title: '솔루션 | weet:)',
    description: '스마트홈 IoT, 보안 CCTV, 태양광 발전, 친환경 설계 등 시스템건축에 더하는 스마트 솔루션',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:) 시스템건축',
  },
  twitter: {
    card: 'summary_large_image',
    title: '솔루션 | weet:)',
    description: '스마트홈 IoT, 보안 CCTV, 태양광 발전, 친환경 설계 등 시스템건축에 더하는 스마트 솔루션',
  },
}

export default function SolutionsPage() {
  return <SolutionsClient />
}
