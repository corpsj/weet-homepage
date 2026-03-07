import type { Metadata } from 'next'

import ProductsV2ClientPage from './products-v2-client'

export const metadata: Metadata = {
  title: '이동식주택 제품 | weet:)',
}

export default function ProductsV2Page() {
  return <ProductsV2ClientPage />
}
