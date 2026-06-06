import type { Metadata } from 'next';
import ProductsPageClient from './ProductsPageClient';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '제품 소개',
  description: '위트 이동식주택의 크기별 제품 라인업과 사양을 확인하고 상담 구성을 시작하세요.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    url: '/products',
    title: '위트 제품 소개',
    description: '작고 단단한 내 집, 필요한 크기와 목적에 맞는 위트 제품을 찾아보세요.',
  },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsPageClient initialProducts={products} />;
}
