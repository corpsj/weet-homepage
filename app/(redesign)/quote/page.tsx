import type { Metadata } from 'next'
import { QuoteClient } from './quote-client'

export const metadata: Metadata = {
  title: '견적 받기',
  description: '간단한 정보만 알려주시면 맞춤 견적을 보내드려요. 위트 시스템건축 견적 요청.',
  openGraph: {
    title: '견적 받기 | weet:) 시스템건축',
    description: '간단한 정보만 알려주시면 맞춤 견적을 보내드려요.',
  },
}

export default function QuotePage() {
  return <QuoteClient />
}
