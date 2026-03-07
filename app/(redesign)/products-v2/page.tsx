import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const ProductsV2ClientPage = dynamic(
  () => import('./products-v2-client'),
  {
    loading: () => (
      <div className="min-h-screen space-y-8">
        <Skeleton className="h-[40vh] w-full" />
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-1/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: '이동식주택 제품 | weet:)',
  description: 'S·M·L·XL 사이즈의 이동식주택 제품 라인업 — 농막, 세컨하우스, 단독주택까지 다양한 용도로 활용 가능',
  openGraph: {
    title: '이동식주택 제품 | weet:)',
    description: 'S·M·L·XL 사이즈의 이동식주택 제품 라인업 — 농막, 세컨하우스, 단독주택까지 다양한 용도로 활용 가능',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:) 시스템건축',
  },
  twitter: {
    card: 'summary_large_image',
    title: '이동식주택 제품 | weet:)',
    description: 'S·M·L·XL 사이즈의 이동식주택 제품 라인업 — 농막, 세컨하우스, 단독주택까지 다양한 용도로 활용 가능',
  },
}

export default function ProductsV2Page() {
  return <ProductsV2ClientPage />
}
