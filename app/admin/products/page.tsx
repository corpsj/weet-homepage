import { supabaseAdmin } from '@/lib/supabase';
import { Product } from '@/types/supabase';
import ProductGrid from '@/components/admin/products/ProductGrid';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const { data: products, error } = await supabaseAdmin
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .returns<Product[]>();

    if (error) {
        console.error('Error fetching products:', error);
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                <h3 className="font-bold">Error loading products</h3>
                <pre className="text-xs mt-2 whitespace-pre-wrap">
                    {JSON.stringify(error, null, 2)}
                </pre>
                <p className="text-xs mt-2 text-gray-500">
                    Check server logs for more details.
                </p>
            </div>
        );
    }

    return (
        <div>
            <ProductGrid products={products || []} />
        </div>
    );
}
