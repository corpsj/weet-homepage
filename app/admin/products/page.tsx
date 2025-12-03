import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';
import { deleteProduct } from '@/app/actions/product-actions';
import ProductStatusToggle from '@/components/admin/products/ProductStatusToggle';

import { Product } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const { data: products, error } = await supabaseAdmin
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .returns<Product[]>();

    if (error) {
        console.error('Error fetching products:', error);
        return <div>Error loading products</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">제품 관리</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    제품 추가
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-500">제품명</th>
                            <th className="px-6 py-4 font-medium text-gray-500">카테고리</th>
                            <th className="px-6 py-4 font-medium text-gray-500">사이즈</th>
                            <th className="px-6 py-4 font-medium text-gray-500">상태</th>
                            <th className="px-6 py-4 font-medium text-gray-500 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products?.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 text-gray-600">{product.category} / {product.sub_category}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {product.size_category}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <ProductStatusToggle id={product.id} isActive={product.is_active} />
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <form action={deleteProduct.bind(null, product.id)}>
                                        <button
                                            type="submit"
                                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                            onClick={(e) => {
                                                if (!confirm('정말 삭제하시겠습니까?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {products?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    등록된 제품이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
