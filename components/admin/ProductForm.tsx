'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductInsert } from '@/types/supabase';
import { createProduct, updateProduct } from '@/app/actions/product-actions';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from '@/components/admin/media/ImageUpload';
import MultiImageUpload from '@/components/admin/media/MultiImageUpload';
import Image from 'next/image';
import {
    ConsoleSectionTitle,
    consoleInputClass,
    consolePrimaryButtonClass
} from '@/components/admin/ConsolePrimitives';

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

        if (name === 'size_category' && value !== 'S') {
            setFormData(prev => ({
                ...prev,
                size_category: value,
                sub_category: null
            }));
            return;
        }

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
            sub_images: (prev.sub_images || []).filter((_image: string, index: number) => index !== indexToRemove)
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
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-5">
                    <ConsoleSectionTitle>기본 정보</ConsoleSectionTitle>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">제품명</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={consoleInputClass + " w-full"}
                        />
                    </div>

                    <div className={formData.size_category === 'S' ? "grid grid-cols-2 gap-4" : ""}>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">카테고리</label>
                            <select
                                name="size_category"
                                value={formData.size_category}
                                onChange={handleChange}
                                className={consoleInputClass + " w-full"}
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
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">세부 카테고리</label>
                                <select
                                    name="sub_category"
                                    value={formData.sub_category || 'Private'}
                                    onChange={handleChange}
                                    className={consoleInputClass + " w-full"}
                                >
                                    <option value="Private">Private</option>
                                    <option value="Public">Public</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="is_active"
                                id="is_active"
                                checked={formData.is_active ?? false}
                                onChange={handleChange}
                                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black cursor-pointer"
                            />
                            <label htmlFor="is_active" className="text-xs font-bold text-gray-700 cursor-pointer">활성화 (공개)</label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="is_signature"
                                id="is_signature"
                                checked={formData.is_signature ?? false}
                                onChange={handleChange}
                                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black cursor-pointer"
                            />
                            <label htmlFor="is_signature" className="text-xs font-bold text-gray-700 cursor-pointer">시그니처 라인 노출</label>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="pt-6">
                        <ConsoleSectionTitle>상세 스펙</ConsoleSectionTitle>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">가격</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price || ''}
                                    onChange={handleChange}
                                    className={consoleInputClass + " w-full"}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">크기</label>
                                <input
                                    type="text"
                                    name="size"
                                    value={formData.size || ''}
                                    onChange={handleChange}
                                    className={consoleInputClass + " w-full"}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">구조</label>
                                <input
                                    type="text"
                                    name="structure"
                                    value={formData.structure || ''}
                                    onChange={handleChange}
                                    className={consoleInputClass + " w-full"}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">지붕형태</label>
                                <input
                                    type="text"
                                    name="roof_type"
                                    value={formData.roof_type || ''}
                                    onChange={handleChange}
                                    className={consoleInputClass + " w-full"}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">외부마감</label>
                                <input
                                    type="text"
                                    name="exterior_finish"
                                    value={formData.exterior_finish || ''}
                                    onChange={handleChange}
                                    className={consoleInputClass + " w-full"}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">내부마감</label>
                                <input
                                    type="text"
                                    name="interior_finish"
                                    value={formData.interior_finish || ''}
                                    onChange={handleChange}
                                    className={consoleInputClass + " w-full"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="pt-6">
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">설명 (Description)</label>
                        <textarea
                            name="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            className={consoleInputClass + " w-full resize-none"}
                        />
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-5">
                    <ConsoleSectionTitle>이미지</ConsoleSectionTitle>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">메인 이미지</label>
                        <ImageUpload
                            value={formData.image_url || ''}
                            onChange={handleImageChange}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">도면 이미지</label>
                        <div className="space-y-2">
                            <ImageUpload
                                value={formData.floor_plan_url || ''}
                                onChange={handleFloorPlanChange}
                                className="h-[200px]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">서브 이미지 (추가)</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-2">
                            {formData.sub_images?.map((url: string, index: number) => (
                                <div key={index} className="relative aspect-video bg-[#f4f4f1] rounded border border-[#e5e5df] overflow-hidden">
                                    <Image
                                        src={url}
                                        alt={`Sub ${index}`}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 220px"
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleSubImageRemove(index)}
                                        className="absolute top-1 right-1 bg-white shadow-sm text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                                    </button>
                                </div>
                            ))}
                            <div className="aspect-video">
                                <MultiImageUpload
                                    onUpload={handleSubImageAdd}
                                    className="h-full rounded"
                                />
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium">
                            * + 버튼을 눌러 이미지를 계속 추가할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className={consolePrimaryButtonClass + " px-8"}
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    {initialData ? '수정하기' : '등록하기'}
                </button>
            </div>
        </form>
    );
}
