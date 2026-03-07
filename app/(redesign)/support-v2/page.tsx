import type { Metadata } from 'next'

import { SupportV2Client } from './support-v2-client'

export const metadata: Metadata = {
  title: '고객지원 | weet:)',
  description: '위트 고객지원 센터 — 전화, 카카오톡, 이메일로 24시간 상담 가능',
}

export default function SupportPage() {
  return <SupportV2Client />
}
