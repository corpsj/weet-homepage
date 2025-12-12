'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductInsert } from '@/types/supabase';
import { createProduct, updateProduct } from '@/app/actions/product-actions';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from '@/components/admin/media/ImageUpload';
import MultiImageUpload from '@/components/admin/media/MultiImageUpload';

interface ProductFormProps {
    initialData?: Product;
    onSuccess?: () => void;
}

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<ProductInsert>>({
        name: initialData?.name || '',
        sub_category: (!initialData || initialData.size_category === 'S') ? (initialData?.sub_category || 'Private') : null,
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
        is_active: initialData?.is_active ?? true,
        is_signature: initialData?.is_signature ?? false,
        sub_images: initialData?.sub_images || [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // S 카테고리가 아니면 세부 카테고리를 null로 설정
        if (name === 'size_category' && value !== 'S') {
            setFormData(prev => ({
                ...prev,
                size_category: value,
                sub_category: null
            }));
            return;
        }

        // S 카테고리로 변경 시 기본값 설정
        if (name === 'size_category' && value === 'S') {
            setFormData(prev => ({
                ...prev,
                size_category: value,
                sub_category: prev.sub_category || 'Private'
            }));
            return;
        }

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

    const handleSubImageAdd = (urls: string[]) => {
        if (!urls || urls.length === 0) return;
        setFormData(prev => ({
            ...prev,
            sub_images: [...(prev.sub_images || []), ...urls]
        }));
    };

    const handleSubImageRemove = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            sub_images: (prev.sub_images || []).filter((_, index) => index !== indexToRemove)
        }));
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
            } else {
                router.push('/admin/products');
            }
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                toast.error(`저장 중 오류가 발생했습니다: ${error.message}`);
            } else {
                toast.error('저장 중 알 수 없는 오류가 발생했습니다.');
            }
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

                    <div className={formData.size_category === 'S' ? "grid grid-cols-2 gap-4" : ""}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
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
                        {formData.size_category === 'S' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">세부 카테고리</label>
                                <select
                                    name="sub_category"
                                    value={formData.sub_category || 'Private'}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg outline-none"
                                >
                                    <option value="Private">Private</option>
                                    <option value="Public">Public</option>
                                </select>
                            </div>
                        )}
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

                    {/* Details - moved here */}
                    <div className="pt-4 mt-4 border-t">
                        <h3 className="text-lg font-bold border-b pb-2 mb-4">상세 스펙</h3>
                        <div className="grid grid-cols-2 gap-4">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">크기</label>
                                <input
                                    type="text"
                                    name="size"
                                    value={formData.size || ''}
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
                        </div>
                    </div>

                    {/* Description - moved here */}
                    <div className="pt-4 mt-4 border-t">
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

                {/* Images */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2">이미지</h3>

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
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">서브 이미지 (추가)</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            {formData.sub_images?.map((url, index) => (
                                <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                                    <img src={url} alt={`Sub ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleSubImageRemove(index)}
                                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                                    </button>
                                </div>
                            ))}
                            <div className="aspect-video">
                                <div className="aspect-video">
                                    <MultiImageUpload
                                        onUpload={handleSubImageAdd}
                                        className="h-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">
                            * + 버튼을 눌러 이미지를 계속 추가할 수 있습니다.
                        </p>
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
