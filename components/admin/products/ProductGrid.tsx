'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Edit, LayoutGrid, List } from 'lucide-react';
import { Product } from '@/types/supabase';
import ProductModal from './ProductModal';
import ProductStatusToggle from './ProductStatusToggle';
import DeleteProductButton from './DeleteProductButton';
import Pagination from './Pagination';

interface ProductGridProps {
    products: Product[];
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    initialCategory?: string;
    initialStatus?: string;
}

// Grid Card Component
function GridCard({ product, onEdit }: { product: Product; onEdit: (p: Product) => void }) {
    return (
        <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
            {/* Image Area */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}

                {/* Edit Button */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-3 opacity-0 group-hover:opacity-100">
                    <button
                        onClick={() => onEdit(product)}
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
                            {product.size_category} / {product.sub_category}
                        </p>
                    </div>
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
    );
}

// List Row Component
function ListRow({ product, onEdit }: { product: Product; onEdit: (p: Product) => void }) {
    return (
        <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex items-center gap-4 p-4">
            {/* Thumbnail */}
            <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        loading="lazy"
                        sizes="80px"
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                        No Image
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500">
                    {product.size_category} / {product.sub_category}
                </p>
            </div>

            {/* Price */}
            <div className="text-sm font-medium text-gray-900 flex-shrink-0">
                {product.price || '가격 미정'}
            </div>

            {/* Status */}
            <div className="flex-shrink-0">
                <ProductStatusToggle id={product.id} isActive={product.is_active} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
                <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    <Edit className="w-4 h-4" />
                </button>
                <DeleteProductButton productId={product.id} />
            </div>
        </div>
    );
}

export default function ProductGrid({
    products,
    totalCount,
    currentPage,
    itemsPerPage,
    initialCategory = 'All',
    initialStatus = 'All'
}: ProductGridProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const updateFilters = (newCategory: string, newStatus: string) => {
        const params = new URLSearchParams();
        if (newCategory !== 'All') params.set('category', newCategory);
        if (newStatus !== 'All') params.set('status', newStatus);
        params.set('page', '1'); // Reset to page 1 on filter change
        router.push(`?${params.toString()}`);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        updateFilters(newValue, initialStatus);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        updateFilters(initialCategory, newValue);
    };

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

    // Categories
    const categories = ['All', 'S', 'M', 'L', 'XL', 'SOLUTION', 'DESIGN'];

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">제품 관리 <span className="text-sm font-normal text-gray-500 ml-2">Total {totalCount}</span></h1>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* View Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Filters */}
                    <select
                        value={initialCategory}
                        onChange={handleCategoryChange}
                        className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                    >
                        {categories.map(c => (
                            <option key={c} value={c}>
                                {c === 'All' ? '전체 카테고리' : c}
                            </option>
                        ))}
                    </select>

                    <select
                        value={initialStatus}
                        onChange={handleStatusChange}
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

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {products.map((product) => (
                        <GridCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4 mb-8">
                    {products.map((product) => (
                        <ListRow
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}

            {/* No Data */}
            {products.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300 mb-8">
                    <p className="text-gray-500">등록된 제품이 없습니다.</p>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center pb-8">
                <Pagination
                    totalItems={totalCount}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                />
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={handleClose}
                product={selectedProduct}
            />
        </>
    );
}
