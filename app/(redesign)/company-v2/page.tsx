import type { Metadata } from 'next'

import { CompanyV2Client } from './company-v2-client'

export const metadata: Metadata = {
  title: '회사소개 | weet:)',
  description: '시스템건축 전문 기업 위트 — 이동식주택과 현장건축으로 더 나은 삶의 공간을 만듭니다',
}

export default function CompanyPage() {
  return <CompanyV2Client />
}
