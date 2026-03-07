import type { Metadata } from 'next'

import ProductsV2ClientPage from './products-v2-client'

export const metadata: Metadata = {
  title: '이동식주택 제품 | weet:)',
  description: 'S·M·L·XL 사이즈의 이동식주택 제품 라인업 — 농막, 세컨하우스, 단독주택까지 다양한 용도로 활용 가능',
}

export default function ProductsV2Page() {
  return <ProductsV2ClientPage />
}
