import type { Metadata } from 'next'

import { SolutionsClient } from './solutions-client'

export const metadata: Metadata = {
  title: '솔루션 | weet:)',
  description: '스마트홈 IoT, 보안 CCTV, 태양광 발전, 친환경 설계 등 시스템건축에 더하는 스마트 솔루션',
}

export default function SolutionsPage() {
  return <SolutionsClient />
}
