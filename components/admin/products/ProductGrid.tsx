'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit, LayoutGrid, List, Package } from 'lucide-react';
import { Product } from '@/types/supabase';
import ProductModal from './ProductModal';
import ProductStatusToggle from './ProductStatusToggle';
import DeleteProductButton from './DeleteProductButton';
import Pagination from './Pagination';
import {
    ConsoleMetricCard,
    ConsolePageHeader,
    ConsolePanel,
    ConsoleStatusPill,
    ReadinessRing,
    consoleIconButtonClass,
    consoleInputClass,
    consolePrimaryButtonClass,
    consoleSelectClass,
} from '@/components/admin/ConsolePrimitives';

interface ProductGridProps {
    products: Product[];
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    initialCategory?: string;
    initialStatus?: string;
}

const hasValidProductImageUrl = (value: string | null | undefined) => {
    if (!value) return false;
    return /^https?:\/\/.+/i.test(value) || value.startsWith('/images/');
};

const getProductReadinessScore = (product: Product) => {
    let score = 100;
    if (!product.is_active) score -= 20;
    if (!product.price) score -= 16;
    if (!hasValidProductImageUrl(product.image_url)) score -= 24;
    if (!product.description || product.description.length < 24) score -= 16;
    if (!product.size) score -= 12;
    if (!product.floor_plan_url) score -= 12;

    return Math.max(0, score);
};

// Grid Card Component
function GridCard({
    product,
    onEdit,
    priority = false,
}: {
    product: Product;
    onEdit: (p: Product) => void;
    priority?: boolean;
}) {
    const imageUrl = hasValidProductImageUrl(product.image_url) ? product.image_url : null;
    const readinessScore = getProductReadinessScore(product);

    return (
        <div className="group flex flex-col overflow-hidden rounded-md border border-[#e5e5df] bg-white shadow-sm transition-colors hover:border-[#cfcfcf]">
            {/* Image Area */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f1]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        loading={priority ? 'eager' : 'lazy'}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        이미지 점검 필요
                    </div>
                )}

                {/* Edit Button */}
                <div className="absolute inset-0 flex items-end justify-end bg-black/0 p-3 opacity-0 transition-colors group-hover:bg-black/10 group-hover:opacity-100">
                    <button
                        onClick={() => onEdit(product)}
                        className={consoleIconButtonClass}
                        aria-label={`${product.name} 수정`}
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                    <ProductStatusToggle id={product.id} isActive={product.is_active ?? false} />
                </div>
                <div className="absolute right-3 top-3">
                    <ReadinessRing score={readinessScore} />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-start justify-between">
                    <div>
                        <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {product.size_category} / {product.sub_category}
                        </p>
                    </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    <ConsoleStatusPill tone={product.is_active ? 'success' : 'neutral'}>
                        {product.is_active ? '공개' : '비공개'}
                    </ConsoleStatusPill>
                    <ConsoleStatusPill tone={imageUrl ? 'success' : 'warning'}>
                        {imageUrl ? '이미지 정상' : '이미지 보완'}
                    </ConsoleStatusPill>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#f0f0ec] pt-4">
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
function ListRow({
    product,
    onEdit,
    priority = false,
}: {
    product: Product;
    onEdit: (p: Product) => void;
    priority?: boolean;
}) {
    const imageUrl = hasValidProductImageUrl(product.image_url) ? product.image_url : null;
    const readinessScore = getProductReadinessScore(product);

    return (
        <div className="group grid gap-4 rounded-md border border-[#e5e5df] bg-white p-4 shadow-sm transition-colors hover:border-[#cfcfcf] md:grid-cols-[48px_80px_minmax(180px,1fr)_120px_100px_96px] md:items-center">
            <ReadinessRing score={readinessScore} />
            {/* Thumbnail */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-[#e5e5df] bg-[#f4f4f1]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        loading={priority ? 'eager' : 'lazy'}
                        sizes="80px"
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                        이미지 없음
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500">
                    {product.size_category} / {product.sub_category}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                    <ConsoleStatusPill tone={imageUrl ? 'success' : 'warning'}>
                        {imageUrl ? '이미지 정상' : '이미지 보완'}
                    </ConsoleStatusPill>
                    <ConsoleStatusPill tone={product.price ? 'success' : 'warning'}>
                        {product.price ? '가격 입력' : '가격 미정'}
                    </ConsoleStatusPill>
                </div>
            </div>

            {/* Price */}
            <div className="text-sm font-medium text-gray-900 flex-shrink-0">
                {product.price || '가격 미정'}
            </div>

            {/* Status */}
            <div className="flex-shrink-0">
                <ProductStatusToggle id={product.id} isActive={product.is_active ?? false} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
                <button
                    onClick={() => onEdit(product)}
                    className={consoleIconButtonClass}
                    aria-label={`${product.name} 수정`}
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
    const [searchTerm, setSearchTerm] = useState('');
    const productSummary = products.reduce(
        (summary, product) => {
            if (product.is_active) summary.active += 1;
            if (!hasValidProductImageUrl(product.image_url)) summary.needsImage += 1;
            if (!product.price) summary.needsPrice += 1;
            return summary;
        },
        { active: 0, needsImage: 0, needsPrice: 0 }
    );
    const filteredProducts = products.filter((product) => {
        const normalized = searchTerm.trim().toLowerCase();
        if (!normalized) return true;

        return [
            product.name,
            product.size_category,
            product.sub_category,
            product.price,
            product.tagline,
        ]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(normalized));
    });

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
            <div className="mb-6 space-y-6">
                <ConsolePageHeader
                    eyebrow="PRODUCT READINESS"
                    title={`제품 관리 · ${totalCount.toLocaleString('ko-KR')}건`}
                    description="공개 제품, 이미지 상태, 가격 입력 여부를 빠르게 점검하고 모델별 준비도를 관리합니다."
                    actions={
                        <button onClick={handleCreate} className={consolePrimaryButtonClass}>
                            <Plus className="w-4 h-4" />
                            제품 추가
                        </button>
                    }
                />

                <div className="grid gap-3 sm:grid-cols-3">
                    <ConsoleMetricCard label="현재 페이지 공개" value={productSummary.active.toLocaleString('ko-KR')} caption="활성 상태 제품" tone="dark" icon={<Package className="h-5 w-5" />} />
                    <ConsoleMetricCard label="이미지 보완" value={productSummary.needsImage.toLocaleString('ko-KR')} caption="깨진 URL 또는 미등록" tone={productSummary.needsImage > 0 ? 'warning' : 'neutral'} />
                    <ConsoleMetricCard label="가격 보완" value={productSummary.needsPrice.toLocaleString('ko-KR')} caption="상담 전 기준가 확인" tone={productSummary.needsPrice > 0 ? 'warning' : 'neutral'} />
                </div>

                <ConsolePanel className="p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center bg-[#f4f4f1] rounded-md border border-[#e5e5df] p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="그리드 보기"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="목록 보기"
                        >
                            <List className="w-4 h-4" />
                        </button>
                        </div>

                        <div className="flex flex-1 flex-col gap-3 md:flex-row md:justify-end">
                            <input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="현재 페이지 제품 검색"
                                className={`${consoleInputClass} md:max-w-xs`}
                            />
                            <select
                                value={initialCategory}
                                onChange={handleCategoryChange}
                                className={consoleSelectClass}
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
                                className={consoleSelectClass}
                            >
                                <option value="All">전체 상태</option>
                                <option value="Active">활성</option>
                                <option value="Inactive">비활성</option>
                            </select>
                        </div>
                    </div>
                </ConsolePanel>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {filteredProducts.map((product, index) => (
                        <GridCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            priority={index === 0}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4 mb-8">
                    {filteredProducts.map((product, index) => (
                        <ListRow
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            priority={index === 0}
                        />
                    ))}
                </div>
            )}

            {/* No Data */}
            {filteredProducts.length === 0 && (
                <div className="mb-8 rounded-md border border-dashed border-[#d8d8d2] bg-white py-20 text-center">
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
