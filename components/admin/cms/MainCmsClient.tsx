'use client';

import { useMemo, useState, useTransition, useEffect } from 'react';
import {
    CheckCircle2,
    Eye,
    EyeOff,
    GripVertical,
    Image as ImageIcon,
    Link as LinkIcon,
    Loader2,
    Plus,
    Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { Database } from '@/types/supabase';
import ImageUpload from '@/components/admin/media/ImageUpload';
import { createHeroSlide, updateHeroSlide, deleteHeroSlide, setHeroSlideActive, updateSignatureStatus, reorderHeroSlides } from '@/app/actions/cms-actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { confirmToast } from '@/lib/ui/confirm';
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning';
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
import {
    ConsoleMetricCard,
    ConsolePageHeader,
    ConsolePanel,
    ConsoleSectionTitle,
    ConsoleStatusPill,
    consoleIconButtonClass,
    consoleInputClass,
    consolePrimaryButtonClass,
    consoleSecondaryButtonClass,
} from '@/components/admin/ConsolePrimitives';

type HeroSlide = Database['public']['Tables']['hero_slides']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type HeroSlideFormData = {
    title: string;
    subtitle: string;
    image_url: string;
    link_url: string;
    is_active: boolean;
};

interface MainCmsClientProps {
    initialHeroSlides: HeroSlide[];
    initialProducts: Product[];
}

export default function MainCmsClient({ initialHeroSlides, initialProducts }: MainCmsClientProps) {
    const [activeTab, setActiveTab] = useState('hero');
    const activeSlides = initialHeroSlides.filter((slide) => slide.is_active).length;
    const signatureProducts = initialProducts.filter((product) => product.is_signature && product.is_active).length;
    const inactiveSignatureProducts = initialProducts.filter((product) => product.is_signature && !product.is_active).length;

    return (
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="CONTENTS"
                title="랜딩 페이지 관리"
                description="홈 첫 화면과 시그니처 제품 노출을 실제 공개 상태와 함께 관리합니다."
            />

            <div className="grid gap-3 md:grid-cols-3">
                <ConsoleMetricCard
                    label="공개 히어로"
                    value={`${activeSlides}/${initialHeroSlides.length}`}
                    caption="홈 첫 화면에 노출되는 슬라이드"
                    tone={activeSlides === 0 ? 'warning' : 'dark'}
                    icon={<ImageIcon className="h-5 w-5" />}
                />
                <ConsoleMetricCard
                    label="시그니처 제품"
                    value={signatureProducts}
                    caption="공개 제품 중 홈 노출 선택"
                    tone={signatureProducts === 0 ? 'warning' : 'neutral'}
                    icon={<CheckCircle2 className="h-5 w-5" />}
                />
                <ConsoleMetricCard
                    label="비공개 선택"
                    value={inactiveSignatureProducts}
                    caption="공개 전환 전에는 홈에 표시되지 않음"
                    tone={inactiveSignatureProducts > 0 ? 'warning' : 'neutral'}
                    icon={<EyeOff className="h-5 w-5" />}
                />
            </div>

            <div className="overflow-x-auto">
                <nav className="inline-flex min-w-max items-center rounded-[9px] border border-admin-line-2 bg-[#f4f4f5] p-1">
                    <button
                        onClick={() => setActiveTab('hero')}
                        className={`inline-flex items-center gap-2 rounded-[7px] px-4 py-2 text-sm font-bold transition-colors ${activeTab === 'hero'
                            ? 'bg-white text-admin-ink shadow-sm'
                            : 'text-admin-muted hover:text-admin-ink'
                            }`}
                    >
                        <ImageIcon className="h-4 w-4" />
                        히어로 슬라이드
                    </button>
                    <button
                        onClick={() => setActiveTab('signature')}
                        className={`inline-flex items-center gap-2 rounded-[7px] px-4 py-2 text-sm font-bold transition-colors ${activeTab === 'signature'
                            ? 'bg-white text-admin-ink shadow-sm'
                            : 'text-admin-muted hover:text-admin-ink'
                            }`}
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        시그니처 제품
                    </button>
                </nav>
            </div>

            <ConsolePanel className="p-4 md:p-6 min-h-[500px]">
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

    // F41: an open "new slide" form is an unsaved in-progress draft.
    useUnsavedChangesWarning(isAdding);

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
            const oldIndex = heroSlides.findIndex((item) => item.id === active.id);
            const newIndex = heroSlides.findIndex((item) => item.id === over.id);
            const newItems = arrayMove(heroSlides, oldIndex, newIndex);
            const previousItems = heroSlides;

            setHeroSlides(newItems);
            updateSortOrder(newItems, previousItems);
        }
    };

    const updateSortOrder = async (items: HeroSlide[], previousItems: HeroSlide[]) => {
        startTransition(async () => {
            try {
                const ids = items.map(item => item.id);
                const result = await reorderHeroSlides(ids);

                if (result.success) {
                    toast.success('순서가 저장되었습니다.');
                } else {
                    setHeroSlides(previousItems);
                    toast.error(`순서 저장 실패: ${result.error}`);
                }
                router.refresh();
            } catch (error) {
                setHeroSlides(previousItems);
                const message = error instanceof Error ? error.message : String(error);
                toast.error(`순서 저장 중 오류 발생: ${message || '알 수 없는 오류'}`);
                router.refresh();
            }
        });
    };

    const handleCreate = async (data: HeroSlideFormData) => {
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
        if (!(await confirmToast('정말 삭제하시겠습니까?', { confirmLabel: '삭제' }))) return;
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

    const handleToggleActive = async (slide: HeroSlide) => {
        startTransition(async () => {
            const result = await setHeroSlideActive(slide.id, !slide.is_active);
            if (result.success) {
                toast.success(!slide.is_active ? '슬라이드가 공개되었습니다.' : '슬라이드가 숨김 처리되었습니다.');
                router.refresh();
            } else {
                toast.error(`공개 상태 변경 실패: ${result.error}`);
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <ConsoleSectionTitle>슬라이드 관리</ConsoleSectionTitle>
                <button
                    onClick={() => setIsAdding(true)}
                    className="text-xs text-admin-accent hover:text-admin-accent-hover font-bold flex items-center gap-1"
                >
                    <Plus className="w-4 h-4" /> 새 슬라이드
                </button>
            </div>

            <DndContext
                id="admin-hero-slides"
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
                            <SortableHeroSlideItem
                                key={slide.id}
                                slide={slide}
                                onDelete={handleDelete}
                                onToggleActive={handleToggleActive}
                                eager={index === 0}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {isAdding && (
                <div className="border border-admin-line-2 rounded-[11px] p-4 bg-[#fafafb]">
                    <h4 className="text-sm font-bold text-admin-ink mb-4">새 슬라이드</h4>
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
    onToggleActive,
    eager = false,
}: {
    slide: HeroSlide;
    onDelete: (id: string) => void;
    onToggleActive: (slide: HeroSlide) => void;
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

    // F41: an open slide edit form is an unsaved in-progress draft.
    useUnsavedChangesWarning(isEditing);

    const handleUpdate = async (data: HeroSlideFormData) => {
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
            <div className="border border-admin-line-2 rounded-[11px] p-4 bg-[#fafafb]" style={style} ref={setNodeRef}>
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
            className="grid gap-3 p-3 bg-white rounded-[11px] border border-admin-line hover:border-admin-line-2 transition-colors group md:grid-cols-[auto_80px_minmax(0,1fr)_auto] md:items-center"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab text-[#d4d4d8] hover:text-[#a1a1aa] p-1 hidden md:block"
                aria-label={`${slide.title} 순서 변경`}
            >
                <GripVertical className="w-5 h-5" />
            </div>
            <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 md:contents">
                <div className="relative w-20 h-14 bg-[#f4f4f5] rounded-[7px] flex-shrink-0 border border-admin-line-2 overflow-hidden">
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
                        <div className="absolute inset-0 flex items-center justify-center text-[#a1a1aa]">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                    )}
                </div>
                <div className="min-w-0 grid gap-2 md:grid-cols-2 md:gap-4">
                    <div className="min-w-0">
                    <p className="text-[11px] font-bold text-admin-muted mb-0.5">메인 타이틀</p>
                    <p className="text-sm font-bold text-admin-ink truncate">{slide.title}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                        <ConsoleStatusPill tone={slide.is_active ? 'success' : 'neutral'}>
                            {slide.is_active ? '공개' : '숨김'}
                        </ConsoleStatusPill>
                        {slide.link_url && (
                            <ConsoleStatusPill tone="dark">링크 있음</ConsoleStatusPill>
                        )}
                    </div>
                    </div>
                    <div className="min-w-0">
                    <p className="text-[11px] font-bold text-admin-muted mb-0.5">서브 타이틀</p>
                    <p className="text-xs text-[#52525b] truncate">{slide.subtitle || '-'}</p>
                    {slide.link_url && (
                        <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-[#a1a1aa]">
                            <LinkIcon className="h-3 w-3 shrink-0" />
                            {slide.link_url}
                        </p>
                    )}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end gap-2">
                <button
                    type="button"
                    onClick={() => onToggleActive(slide)}
                    className={consoleIconButtonClass}
                    aria-label={slide.is_active ? `${slide.title} 숨기기` : `${slide.title} 공개하기`}
                    title={slide.is_active ? '숨기기' : '공개하기'}
                >
                    {slide.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-2 py-1 text-xs font-bold text-admin-muted hover:text-admin-ink transition-colors"
                    aria-label={`${slide.title} 수정`}
                >
                    수정
                </button>
                <button
                    onClick={() => onDelete(slide.id)}
                    className="p-1.5 text-[#a1a1aa] hover:text-red-600 transition-colors"
                    aria-label={`${slide.title} 삭제`}
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
    onSubmit: (data: HeroSlideFormData) => void,
    onCancel: () => void,
    isPending: boolean
}) {
    const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
    const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
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
            image_url: imageUrl,
            link_url: (formData.get('link_url') as string) || '',
            is_active: isActive,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-[192px_minmax(0,1fr)]">
                <div>
                    <label className="block text-xs font-bold text-admin-muted mb-2">이미지</label>
                    <ImageUpload
                        value={imageUrl}
                        onChange={(url) => {
                            setImageUrl(url);
                            setIsUploading(false);
                        }}
                        onUploadStart={() => setIsUploading(true)}
                        className="h-32"
                    />
                    <label className="mt-3 block text-xs font-bold text-admin-muted mb-1">이미지 URL 직접 입력</label>
                    <input
                        value={imageUrl}
                        onChange={(event) => setImageUrl(event.target.value)}
                        placeholder="/images/hero_main.webp 또는 https://..."
                        className={`${consoleInputClass} w-full bg-white`}
                    />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-xs font-bold text-admin-muted mb-1">메인 타이틀</label>
                            <input
                                name="title"
                                defaultValue={initialData?.title}
                                className={`${consoleInputClass} w-full`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-admin-muted mb-1">서브 타이틀</label>
                            <input
                                name="subtitle"
                                defaultValue={initialData?.subtitle || ''}
                                className={`${consoleInputClass} w-full`}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-admin-muted mb-1">클릭 링크 URL (선택)</label>
                        <input
                            name="link_url"
                            defaultValue={initialData?.link_url || ''}
                            placeholder="/customize 또는 https://..."
                            className={`${consoleInputClass} w-full`}
                        />
                    </div>
                    <label className="inline-flex items-center gap-2 rounded-[9px] border border-admin-line-2 bg-[#fafafb] px-3 py-2 text-xs font-bold text-[#3f3f46]">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(event) => setIsActive(event.target.checked)}
                            className="h-4 w-4 accent-admin-accent"
                        />
                        홈 화면에 공개
                    </label>
                    <div className="rounded-[9px] border border-admin-line-2 bg-[#fafafb] px-3 py-2 text-[11px] font-medium leading-5 text-admin-muted">
                        숨김 상태의 슬라이드는 관리자 목록에 남지만 공개 홈 캐러셀에는 표시되지 않습니다.
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
    const [failedThumbnails, setFailedThumbnails] = useState<Set<string>>(() => new Set());
    const markThumbnailFailed = (id: string) => {
        setFailedThumbnails((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
        });
    };
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
        const product = products.find((item) => item.id === productId);
        const currentStatus = optimisticIds.has(productId);
        const newStatus = !currentStatus;

        if (newStatus && product && !product.is_active) {
            toast.error('비공개 제품은 먼저 제품 관리에서 공개 상태로 전환해야 합니다.');
            return;
        }

        setPendingOverrides(prev => ({ ...prev, [productId]: newStatus }));

        startTransition(async () => {
            try {
                await updateSignatureStatus(productId, newStatus);
                setPendingOverrides(prev => {
                    const { [productId]: _, ...rest } = prev;
                    return rest;
                });
                router.refresh();
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                toast.error(message || '업데이트 실패');
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
                <p className="mt-1 text-xs font-medium leading-5 text-admin-muted">
                    공개 상태 제품만 홈 시그니처 라인에 표시됩니다. 비공개 제품은 선택을 해제할 수 있지만 새로 노출할 수 없습니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    {products.map((product) => {
                        const isSelected = optimisticIds.has(product.id);
                        const isInactive = !product.is_active;
                        return (
                            <div
                                key={product.id}
                                onClick={() => !isPending && handleToggle(product.id)}
                                className={`flex items-center gap-3 p-3 rounded-[11px] border cursor-pointer transition-all ${isSelected
                                    ? 'border-admin-accent-line bg-admin-accent-soft shadow-sm'
                                    : 'border-admin-line-2 hover:border-[#d4d4d8] bg-white'
                                    } ${isPending ? 'opacity-70' : ''} ${isInactive && !isSelected ? 'opacity-60' : ''}`}
                                role="button"
                                tabIndex={0}
                                aria-pressed={isSelected}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        if (!isPending) handleToggle(product.id);
                                    }
                                }}
                            >
                                <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? 'bg-admin-accent border-admin-accent' : 'border-[#d4d4d8] bg-white'
                                    }`}>
                                    {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
                                </div>

                                <div className="w-10 h-10 bg-[#f4f4f5] rounded-[7px] border border-admin-line-2 flex-shrink-0 relative overflow-hidden">
                                    {product.image_url && !failedThumbnails.has(product.id) ? (
                                        <Image
                                            src={product.image_url}
                                            alt={product.name}
                                            fill
                                            sizes="40px"
                                            className="object-cover"
                                            onError={() => markThumbnailFailed(product.id)}
                                        />
                                    ) : product.image_url ? (
                                        <div className="absolute inset-0 flex items-center justify-center text-[#a1a1aa]">
                                            <ImageIcon className="w-4 h-4" />
                                        </div>
                                    ) : null}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-admin-ink truncate">{product.name}</p>
                                    <div className="mt-1 flex flex-wrap gap-1.5">
                                        <ConsoleStatusPill tone={product.is_active ? 'success' : 'neutral'}>
                                            {product.is_active ? '공개' : '비공개'}
                                        </ConsoleStatusPill>
                                        {isSelected && <ConsoleStatusPill tone="dark">시그니처</ConsoleStatusPill>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
