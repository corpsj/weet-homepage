import type { Metadata } from 'next'
import { ModularClient } from './modular-client'

export const metadata: Metadata = {
  title: '모듈러 건축 소개',
  description: '공장에서 태어난 집. 시스템건축의 원리와 장점을 알아보세요. 3개월 시공, 50년 내구성.',
  openGraph: {
    title: '모듈러 건축 소개 | weet:) 시스템건축',
    description: '공장에서 태어난 집. 시스템건축의 원리와 장점.',
  },
}

export default function ModularPage() {
  return <ModularClient />
}
