import type { Metadata } from 'next'

import { TrackingClient } from './tracking-client'

export const metadata: Metadata = {
  title: '시공 추적 | weet:)',
  description: '주문 번호로 시공 진행 현황을 실시간으로 확인하세요',
}

export default function TrackingPage() {
  return <TrackingClient />
}
