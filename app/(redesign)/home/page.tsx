import type { Metadata } from 'next'

import { HomeClient } from './home-client'

export const metadata: Metadata = {
  title: '홈 | weet:) 시스템건축',
  description: '시스템건축의 새로운 기준 — 이동식주택과 현장건축 전문 기업 위트',
}

export default function HomePage() {
  return <HomeClient />
}
