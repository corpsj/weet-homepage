'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit, MoreVertical, Trash2 } from 'lucide-react';
import { Product } from '@/types/supabase';
import ProductModal from './ProductModal';
import ProductStatusToggle from './ProductStatusToggle';
import DeleteProductButton from './DeleteProductButton';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

    // Filter State
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterSubCategory, setFilterSubCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const handleCreate = () => {
        setSelectedProduct(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedProduct(undefined);
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        if (filterCategory !== 'All' && product.category !== filterCategory) return false;
        if (filterSubCategory !== 'All' && product.sub_category !== filterSubCategory) return false;
        if (filterStatus !== 'All') {
            const isActive = filterStatus === 'Active';
            if (product.is_active !== isActive) return false;
        }
        return true;
    });

    // Extract unique categories
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category))).filter(Boolean)];

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">제품 관리</h1>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Filters */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                    >
                        {categories.map(c => (
                            <option key={c} value={c}>
                                {c === 'All' ? '전체 카테고리' : c}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filterSubCategory}
                        onChange={(e) => setFilterSubCategory(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                    >
                        <option value="All">전체 용도</option>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                    >
                        <option value="All">전체 상태</option>
                        <option value="Active">활성</option>
                        <option value="Inactive">비활성</option>
                    </select>

                    <button
                        onClick={handleCreate}
                        className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 ml-auto md:ml-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">제품 추가</span>
                        <span className="sm:hidden">추가</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                    >
                        {/* Image Area */}
                        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                            {product.image_url ? (
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-3 opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="bg-white text-gray-700 p-2 rounded-full shadow-sm hover:text-blue-600 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <ProductStatusToggle id={product.id} isActive={product.is_active} />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {product.category} / {product.sub_category}
                                    </p>
                                </div>
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                                    {product.size_category}
                                </span>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900">
                                    {product.price || '가격 미정'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <DeleteProductButton productId={product.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results from Filter */}
            {filteredProducts.length === 0 && products.length > 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">검색 결과가 없습니다.</p>
                    <button
                        onClick={() => {
                            setFilterCategory('All');
                            setFilterSubCategory('All');
                            setFilterStatus('All');
                        }}
                        className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                        필터 초기화
                    </button>
                </div>
            )}

            {/* No Data at all */}
            {products.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">등록된 제품이 없습니다.</p>
                    <button
                        onClick={handleCreate}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                        첫 번째 제품을 등록해보세요
                    </button>
                </div>
            )}

            <ProductModal
                isOpen={isModalOpen}
                onClose={handleClose}
                product={selectedProduct}
            />
        </>
    );
}
