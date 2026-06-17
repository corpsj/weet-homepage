import ProductsPageClient from './ProductsPageClient';
import { getProducts } from '@/lib/products';

// ISR: cache the page and revalidate every 5 minutes instead of rendering
// fully dynamically on every request. Product data is admin-managed and changes
// infrequently, so cached + revalidated TTFB is far better. (F12)
export const revalidate = 300;

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsPageClient initialProducts={products} />;
}
