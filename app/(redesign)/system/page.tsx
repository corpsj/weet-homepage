import type { Metadata } from 'next'

import { SystemClient } from './system-client'

export const metadata: Metadata = {
  title: '시스템건축 소개 | weet:)',
  description: '이동식주택과 현장건축을 아우르는 위트만의 시스템건축 방식',
}

export default function SystemPage() {
  return <SystemClient />
}
