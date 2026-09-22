import ProductsPageClient from './ProductsPageClient';
import { getProducts } from '@/lib/products';
import { getPublicCustomizeCatalog } from '@/app/actions/customize-actions';
import ModelLinks from '@/components/products/ModelLinks';

// ISR: cache the page and revalidate every 5 minutes instead of rendering
// fully dynamically on every request. Product data is admin-managed and changes
// infrequently, so cached + revalidated TTFB is far better. (F12)
export const revalidate = 300;

export default async function ProductsPage() {
  const [products, catalog] = await Promise.all([getProducts(), getPublicCustomizeCatalog()]);

  return <><ModelLinks models={catalog.models} /><ProductsPageClient initialProducts={products} /></>;
}
