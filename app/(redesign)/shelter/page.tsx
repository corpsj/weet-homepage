import type { Metadata } from 'next'
import { ShelterClient } from './shelter-client'

export const metadata: Metadata = {
  title: '체류형 쉼터',
  description: '건축 허가 없이 내 땅에 놓는 작은 쉼터. 농막·세컨하우스로 활용 가능한 위트 체류형 쉼터.',
  openGraph: {
    title: '체류형 쉼터 | weet:) 시스템건축',
    description: '건축 허가 없이 내 땅에 놓는 작은 쉼터.',
  },
}

export default function ShelterPage() {
  return <ShelterClient />
}
