'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductInsert } from '@/types/supabase';
import { createProduct, updateProduct } from '@/app/actions/product-actions';
import { Loader2 } from 'lucide-react';
import ImageUpload from '@/components/admin/media/ImageUpload';

interface ProductFormProps {
    initialData?: Product;
    onSuccess?: () => void;
}

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<ProductInsert>>({
        name: initialData?.name || '',
        category: initialData?.category || 'Small unit',
        sub_category: initialData?.sub_category || 'Private',
        size_category: initialData?.size_category || 'S',
        image_url: initialData?.image_url || '',
        tagline: initialData?.tagline || '',
        description: initialData?.description || '',
        price: initialData?.price || '위트문의',
        structure: initialData?.structure || '',
        roof_type: initialData?.roof_type || '',
        exterior_finish: initialData?.exterior_finish || '',
        interior_finish: initialData?.interior_finish || '',
        size: initialData?.size || '',
        floor_plan_url: initialData?.floor_plan_url || '',
        display_order: initialData?.display_order || 0,
        is_active: initialData?.is_active ?? true,
        is_signature: initialData?.is_signature ?? false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleImageChange = (url: string) => {
        setFormData(prev => ({ ...prev, image_url: url }));
    };

    const handleFloorPlanChange = (url: string) => {
        setFormData(prev => ({ ...prev, floor_plan_url: url }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (initialData) {
                await updateProduct(initialData.id, formData);
            } else {
                await createProduct(formData as ProductInsert);
            }
            router.refresh();
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2">기본 정보</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">제품명</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">서브 카테고리</label>
                            <select
                                name="sub_category"
                                value={formData.sub_category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg outline-none"
                            >
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">사이즈 카테고리</label>
                        <select
                            name="size_category"
                            value={formData.size_category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg outline-none"
                        >
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="SOLUTION">SOLUTION</option>
                            <option value="DESIGN">DESIGN</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">순서 (Display Order)</label>
                        <input
                            type="number"
                            name="display_order"
                            value={formData.display_order}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label className="text-sm font-medium text-gray-700">활성화 (공개)</label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_signature"
                            checked={formData.is_signature}
                            onChange={handleChange}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label className="text-sm font-medium text-gray-700">시그니처 라인 노출</label>
                    </div>
                </div>

                {/* Images & Description */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2">이미지 및 설명</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">메인 이미지</label>
                        <ImageUpload
                            value={formData.image_url || ''}
                            onChange={handleImageChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">도면 이미지</label>
                        <div className="space-y-2">
                            <ImageUpload
                                value={formData.floor_plan_url || ''}
                                onChange={handleFloorPlanChange}
                                className="h-[200px]"
                            />
                            <input
                                type="text"
                                name="floor_plan_url"
                                value={formData.floor_plan_url || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg outline-none text-sm font-mono text-gray-600"
                                placeholder="URL 직접 입력 또는 크롭 파라미터 추가"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            * 크롭 파라미터 포함 가능 (예: ?crop_w=300%&crop_h=440%&crop_t=-111%&crop_l=0%)
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">설명 (Description)</label>
                        <textarea
                            name="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg outline-none resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">상세 스펙</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">가격</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">구조</label>
                        <input
                            type="text"
                            name="structure"
                            value={formData.structure || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">지붕형태</label>
                        <input
                            type="text"
                            name="roof_type"
                            value={formData.roof_type || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">외부마감</label>
                        <input
                            type="text"
                            name="exterior_finish"
                            value={formData.exterior_finish || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">내부마감</label>
                        <input
                            type="text"
                            name="interior_finish"
                            value={formData.interior_finish || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">크기</label>
                        <input
                            type="text"
                            name="size"
                            value={formData.size || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 sticky bottom-0 bg-white border-t mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {initialData ? '수정하기' : '등록하기'}
                </button>
            </div>
        </form>
    );
}
