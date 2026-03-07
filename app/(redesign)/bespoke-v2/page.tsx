import type { Metadata } from 'next'

import { BespokeV2Client } from './bespoke-v2-client'

export const metadata: Metadata = {
  title: '비스포크 맞춤 설계 | weet:)',
  description: '당신만의 공간을 완전 맞춤 설계로 완성 — 카페, 팝업스토어, 스마트팜 등 다양한 용도 가능',
}

export default function BespokePage() {
  return <BespokeV2Client />
}
