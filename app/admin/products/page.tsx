import { supabaseAdmin } from '@/lib/supabase';
import { Product } from '@/types/supabase';
import ProductGrid from '@/components/admin/products/ProductGrid';

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: {
        page?: string;
        category?: string;
        status?: string;
    }
}

const ITEMS_PER_PAGE = 12;

export default async function AdminProductsPage({ searchParams }: Props) {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams?.page) || 1;
    const category = resolvedParams?.category || 'All';
    const status = resolvedParams?.status || 'All';

    // Build Query
    let query = supabaseAdmin
        .from('products')
        .select('*', { count: 'exact' });

    // Apply Filters
    if (category !== 'All') {
        query = query.eq('size_category', category as any);
    }

    if (status !== 'All') {
        const isActive = status === 'Active';
        query = query.eq('is_active', isActive);
    }

    // Apply Pagination
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const { data: products, count, error } = await query
        .order('display_order', { ascending: true })
        .range(from, to)
        .returns<Product[]>();

    if (error) {
        console.error('Error fetching products:', error);
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                <h3 className="font-bold">Error loading products</h3>
                <pre className="text-xs mt-2 whitespace-pre-wrap">
                    {JSON.stringify(error, null, 2)}
                </pre>
            </div>
        );
    }

    return (
        <div>
            <ProductGrid
                products={products || []}
                totalCount={count || 0}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                initialCategory={category}
                initialStatus={status}
            />
        </div>
    );
}
