'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit, LayoutGrid, List, GripVertical } from 'lucide-react';
import { Product } from '@/types/supabase';
import ProductModal from './ProductModal';
import ProductStatusToggle from './ProductStatusToggle';
import DeleteProductButton from './DeleteProductButton';
import { reorderProducts } from '@/app/actions/product-actions';
import { toast } from 'sonner';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ProductGridProps {
    products: Product[];
}

// Grid Card Component (No drag)
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

// Sortable List Row Component
function SortableListRow({ product, onEdit }: { product: Product; onEdit: (p: Product) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: product.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex items-center gap-4 p-4"
        >
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
            >
                <GripVertical className="w-5 h-5" />
            </div>

            {/* Thumbnail */}
            <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
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

export default function ProductGrid({ products: initialProducts }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter State
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterSubCategory, setFilterSubCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    // DnD Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = products.findIndex((p) => p.id === active.id);
            const newIndex = products.findIndex((p) => p.id === over.id);

            const newProducts = arrayMove(products, oldIndex, newIndex);
            setProducts(newProducts);

            try {
                await reorderProducts(newProducts.map((p) => p.id));
                toast.success('순서가 변경되었습니다');
            } catch {
                // Rollback on error
                setProducts(products);
                toast.error('순서 변경에 실패했습니다');
            }
        }
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        if (filterCategory !== 'All' && product.size_category !== filterCategory) return false;
        if (filterSubCategory !== 'All' && product.sub_category !== filterSubCategory) return false;
        if (filterStatus !== 'All') {
            const isActive = filterStatus === 'Active';
            if (product.is_active !== isActive) return false;
        }
        return true;
    });

    // Categories
    const categories = ['All', 'S', 'M', 'L', 'XL', 'SOLUTION', 'DESIGN'];

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">제품 관리</h1>

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

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <GridCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <div className="space-y-8">
                        {categories.filter(c => c !== 'All').map((category) => {
                            const categoryProducts = filteredProducts.filter(p => p.size_category === category);
                            if (categoryProducts.length === 0) return null;

                            // S, M, L, XL은 세부 카테고리(Private/Public) 구분
                            const hasSubCategories = ['S', 'M', 'L', 'XL'].includes(category);
                            const privateProducts = hasSubCategories
                                ? categoryProducts.filter(p => p.sub_category === 'Private')
                                : [];
                            const publicProducts = hasSubCategories
                                ? categoryProducts.filter(p => p.sub_category === 'Public')
                                : [];

                            return (
                                <div key={category}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <h2 className="text-lg font-bold text-gray-900">{category}</h2>
                                        <span className="text-sm text-gray-500">({categoryProducts.length})</span>
                                    </div>

                                    {hasSubCategories ? (
                                        <div className="space-y-6">
                                            {privateProducts.length > 0 && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-2 pl-2">Private ({privateProducts.length})</h3>
                                                    <SortableContext
                                                        items={privateProducts.map(p => p.id)}
                                                        strategy={verticalListSortingStrategy}
                                                    >
                                                        <div className="space-y-3">
                                                            {privateProducts.map((product) => (
                                                                <SortableListRow
                                                                    key={product.id}
                                                                    product={product}
                                                                    onEdit={handleEdit}
                                                                />
                                                            ))}
                                                        </div>
                                                    </SortableContext>
                                                </div>
                                            )}
                                            {publicProducts.length > 0 && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-2 pl-2">Public ({publicProducts.length})</h3>
                                                    <SortableContext
                                                        items={publicProducts.map(p => p.id)}
                                                        strategy={verticalListSortingStrategy}
                                                    >
                                                        <div className="space-y-3">
                                                            {publicProducts.map((product) => (
                                                                <SortableListRow
                                                                    key={product.id}
                                                                    product={product}
                                                                    onEdit={handleEdit}
                                                                />
                                                            ))}
                                                        </div>
                                                    </SortableContext>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <SortableContext
                                            items={categoryProducts.map(p => p.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            <div className="space-y-3">
                                                {categoryProducts.map((product) => (
                                                    <SortableListRow
                                                        key={product.id}
                                                        product={product}
                                                        onEdit={handleEdit}
                                                    />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </DndContext>
            )}

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
