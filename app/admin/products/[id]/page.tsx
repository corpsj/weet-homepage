import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import ProductForm from '@/components/admin/ProductForm';
import { ConsolePageHeader } from '@/components/admin/ConsolePrimitives';

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
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="MODEL INVENTORY"
                title="제품 수정"
                description={`${product.name ?? '제품'}의 공개 상태, 스펙, 이미지 구성을 점검합니다.`}
            />
            <ProductForm initialData={product} />
        </div>
    );
}
