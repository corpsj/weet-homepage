'use client';

import { useMemo, useState, useTransition, useEffect } from 'react';
import { Save, Plus, Trash2, GripVertical, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Database } from '@/types/supabase';
import ImageUpload from '@/components/admin/media/ImageUpload';
import { createHeroSlide, updateHeroSlide, deleteHeroSlide, updateSignatureStatus, reorderHeroSlides } from '@/app/actions/cms-actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ConsolePageHeader, ConsolePanel, ConsoleSectionTitle, consoleInputClass, consolePrimaryButtonClass, consoleSecondaryButtonClass } from '@/components/admin/ConsolePrimitives';

type HeroSlide = Database['public']['Tables']['hero_slides']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

interface MainCmsClientProps {
    initialHeroSlides: HeroSlide[];
    initialProducts: Product[];
}

export default function MainCmsClient({ initialHeroSlides, initialProducts }: MainCmsClientProps) {
    const [activeTab, setActiveTab] = useState('hero');

    return (
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="CONTENTS"
                title="랜딩 페이지 관리"
                description="홈페이지의 주요 섹션 이미지를 관리합니다."
            />

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('hero')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'hero'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Hero Section
                    </button>
                    <button
                        onClick={() => setActiveTab('signature')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'signature'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Signature Line
                    </button>
                </nav>
            </div>

            {/* Content */}
            <ConsolePanel className="p-6 min-h-[500px]">
                {activeTab === 'hero' ? (
                    <HeroSectionEditor slides={initialHeroSlides} />
                ) : (
                    <SignatureLineEditor products={initialProducts} />
                )}
            </ConsolePanel>
        </div>
    );
}

function HeroSectionEditor({ slides }: { slides: HeroSlide[] }) {
    const [isAdding, setIsAdding] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [heroSlides, setHeroSlides] = useState(slides);

    useEffect(() => {
        setHeroSlides(slides);
    }, [slides]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setHeroSlides((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                updateSortOrder(newItems);

                return newItems;
            });
        }
    };

    const updateSortOrder = async (items: HeroSlide[]) => {
        startTransition(async () => {
            try {
                const ids = items.map(item => item.id);
                const result = await reorderHeroSlides(ids);

                if (result.success) {
                    toast.success('순서가 저장되었습니다.');
                } else {
                    toast.error(`순서 저장 실패: ${result.error}`);
                }
                router.refresh();
            } catch (error: any) {
                toast.error(`순서 저장 중 오류 발생: ${error.message || '알 수 없는 오류'}`);
                router.refresh();
            }
        });
    };

    const handleCreate = async (data: { title: string; subtitle: string; image_url: string }) => {
        startTransition(async () => {
            try {
                const result = await createHeroSlide(data);
                if (result.success) {
                    setIsAdding(false);
                    router.refresh();
                    toast.success('슬라이드가 추가되었습니다.');
                } else {
                    toast.error('슬라이드 추가 실패: ' + result.error);
                }
            } catch (error) {
                toast.error('슬라이드 추가 중 오류 발생');
            }
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        startTransition(async () => {
            try {
                await deleteHeroSlide(id);
                router.refresh();
                toast.success('삭제되었습니다.');
            } catch (error) {
                toast.error('삭제 실패');
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <ConsoleSectionTitle>슬라이드 관리</ConsoleSectionTitle>
                <button
                    onClick={() => setIsAdding(true)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
                >
                    <Plus className="w-4 h-4" /> 새 슬라이드
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={heroSlides.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-3">
                        {heroSlides.map((slide, index) => (
                            <SortableHeroSlideItem key={slide.id} slide={slide} onDelete={handleDelete} eager={index === 0} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {isAdding && (
                <div className="border border-[#e5e5df] rounded-md p-4 bg-[#fbfbfa]">
                    <h4 className="text-sm font-bold text-gray-900 mb-4">새 슬라이드</h4>
                    <HeroSlideForm
                        onSubmit={handleCreate}
                        onCancel={() => setIsAdding(false)}
                        isPending={isPending}
                    />
                </div>
            )}
        </div>
    );
}

function SortableHeroSlideItem({
    slide,
    onDelete,
    eager = false,
}: {
    slide: HeroSlide;
    onDelete: (id: string) => void;
    eager?: boolean;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: slide.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isEditing, setIsEditing] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleUpdate = async (data: { title: string; subtitle: string; image_url: string }) => {
        startTransition(async () => {
            try {
                const result = await updateHeroSlide(slide.id, data);
                if (result.success) {
                    setIsEditing(false);
                    router.refresh();
                    toast.success('수정되었습니다.');
                } else {
                    toast.error('수정 실패: ' + result.error);
                }
            } catch (error) {
                toast.error('수정 중 오류 발생');
            }
        });
    };

    if (isEditing) {
        return (
            <div className="border border-[#e5e5df] rounded-md p-4 bg-[#fbfbfa]" style={style} ref={setNodeRef}>
                <HeroSlideForm
                    initialData={slide}
                    onSubmit={handleUpdate}
                    onCancel={() => setIsEditing(false)}
                    isPending={isPending}
                />
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-4 p-3 bg-white rounded-md border border-[#e5e5df] hover:border-gray-300 transition-colors group"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-move text-gray-400 hover:text-gray-600 p-1"
            >
                <GripVertical className="w-5 h-5" />
            </div>
            <div className="relative w-20 h-14 bg-gray-100 rounded flex-shrink-0 border border-gray-200 overflow-hidden">
                {slide.image_url ? (
                    <Image
                        src={slide.image_url}
                        alt={slide.title}
                        fill
                        loading={eager ? 'eager' : 'lazy'}
                        sizes="80px"
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-5 h-5" />
                    </div>
                )}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-[11px] font-bold text-gray-500 mb-0.5">메인 타이틀</p>
                    <p className="text-sm font-bold text-gray-900">{slide.title}</p>
                </div>
                <div>
                    <p className="text-[11px] font-bold text-gray-500 mb-0.5">서브 타이틀</p>
                    <p className="text-xs text-gray-600 truncate">{slide.subtitle || '-'}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-2 py-1 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
                >
                    수정
                </button>
                <button
                    onClick={() => onDelete(slide.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function HeroSlideForm({
    initialData,
    onSubmit,
    onCancel,
    isPending
}: {
    initialData?: HeroSlide,
    onSubmit: (data: { title: string; subtitle: string; image_url: string }) => void,
    onCancel: () => void,
    isPending: boolean
}) {
    const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isUploading) {
            toast.error('이미지 업로드 중입니다.');
            return;
        }
        const formData = new FormData(e.currentTarget);
        onSubmit({
            title: (formData.get('title') as string) || '',
            subtitle: (formData.get('subtitle') as string) || '',
            image_url: imageUrl
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-6">
                <div className="w-48 flex-shrink-0">
                    <label className="block text-xs font-bold text-gray-600 mb-2">이미지</label>
                    <ImageUpload
                        value={imageUrl}
                        onChange={(url) => {
                            setImageUrl(url);
                            setIsUploading(false);
                        }}
                        onUploadStart={() => setIsUploading(true)}
                        className="h-32"
                    />
                </div>
                <div className="flex-1 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">메인 타이틀</label>
                        <input
                            name="title"
                            defaultValue={initialData?.title}
                            className={`${consoleInputClass} w-full`}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">서브 타이틀</label>
                        <input
                            name="subtitle"
                            defaultValue={initialData?.subtitle || ''}
                            className={`${consoleInputClass} w-full`}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className={consoleSecondaryButtonClass}
                    disabled={isPending}
                >
                    취소
                </button>
                <button
                    type="submit"
                    className={consolePrimaryButtonClass}
                    disabled={isPending || isUploading || !imageUrl}
                >
                    {(isPending || isUploading) && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    저장
                </button>
            </div>
        </form>
    );
}

function SignatureLineEditor({ products }: { products: Product[] }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const serverSignatureIds = useMemo(
        () => new Set(products.filter(p => p.is_signature).map(p => p.id)),
        [products]
    );
    const [pendingOverrides, setPendingOverrides] = useState<Record<string, boolean>>({});
    const optimisticIds = useMemo(() => {
        const next = new Set(serverSignatureIds);
        Object.entries(pendingOverrides).forEach(([id, isSignature]) => {
            if (isSignature) next.add(id);
            else next.delete(id);
        });
        return next;
    }, [serverSignatureIds, pendingOverrides]);

    const handleToggle = (productId: string) => {
        const currentStatus = optimisticIds.has(productId);
        const newStatus = !currentStatus;

        setPendingOverrides(prev => ({ ...prev, [productId]: newStatus }));

        startTransition(async () => {
            try {
                await updateSignatureStatus(productId, newStatus);
                setPendingOverrides(prev => {
                    const { [productId]: _, ...rest } = prev;
                    return rest;
                });
                router.refresh();
            } catch (error: any) {
                toast.error(error.message || '업데이트 실패');
                setPendingOverrides(prev => {
                    const { [productId]: _, ...rest } = prev;
                    return rest;
                });
            }
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <ConsoleSectionTitle>노출 제품 선택 (최대 10개)</ConsoleSectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    {products.map((product) => {
                        const isSelected = optimisticIds.has(product.id);
                        return (
                            <div
                                key={product.id}
                                onClick={() => !isPending && handleToggle(product.id)}
                                className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${isSelected
                                    ? 'border-gray-900 bg-[#f4f4f1] shadow-sm'
                                    : 'border-[#e5e5df] hover:border-gray-400 bg-white'
                                    } ${isPending ? 'opacity-70' : ''}`}
                            >
                                <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? 'bg-gray-900 border-gray-900' : 'border-gray-300 bg-white'
                                    }`}>
                                    {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
                                </div>

                                <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex-shrink-0 relative overflow-hidden">
                                    {product.image_url && (
                                        <Image src={product.image_url} alt={product.name} fill sizes="40px" className="object-cover" />
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate">{product.name}</p>
                                    <p className="text-[11px] text-gray-500">{product.size_category}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
