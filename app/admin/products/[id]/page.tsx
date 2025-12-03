import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import ProductForm from '@/components/admin/ProductForm';

// 빌드 시 정적 생성 방지
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
    const { id } = await params;

    const { data: product, error } = await supabaseAdmin
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !product) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">제품 수정</h1>
            <ProductForm initialData={product} />
        </div>
    );
}
