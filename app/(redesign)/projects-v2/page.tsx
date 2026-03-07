import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const ProjectsV2Client = dynamic(
  () => import('./projects-v2-client').then(m => ({ default: m.ProjectsV2Client })),
  {
    loading: () => (
      <div className="min-h-screen space-y-8">
        <Skeleton className="h-[50vh] w-full" />
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: '시공사례 | weet:)',
  description: '위트의 현장건축 포트폴리오 — 단독주택, 세컨하우스, 상업시설 등 다양한 시공 사례',
  openGraph: {
    title: '시공사례 | weet:)',
    description: '위트의 현장건축 포트폴리오 — 단독주택, 세컨하우스, 상업시설 등 다양한 시공 사례',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:) 시스템건축',
  },
  twitter: {
    card: 'summary_large_image',
    title: '시공사례 | weet:)',
    description: '위트의 현장건축 포트폴리오 — 단독주택, 세컨하우스, 상업시설 등 다양한 시공 사례',
  },
}

export default function ProjectsPage() {
  return <ProjectsV2Client />
}
