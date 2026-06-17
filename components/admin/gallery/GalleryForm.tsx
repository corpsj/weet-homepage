'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, Plus, X, Upload, GripVertical } from 'lucide-react';
import { GalleryItem } from '@/types/supabase';
import imageCompression from 'browser-image-compression';
import {
    DndContext,
    DragEndEvent,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning';
import { saveGalleryItem } from '@/app/actions/gallery-actions';
import { uploadImageAction } from '@/app/actions/storage-actions';
import {
    ConsolePanel,
    ConsoleSectionTitle,
    consoleInputClass,
    consolePrimaryButtonClass,
    consoleSecondaryButtonClass
} from '@/components/admin/ConsolePrimitives';

const formSchema = z.object({
    title: z.string().min(1, '제목을 입력해주세요.'),
    description: z.string().optional(),
    display_order: z.number().int().default(0),
    is_active: z.boolean().default(true),
});

type FormData = z.input<typeof formSchema>;

interface GalleryFormProps {
    initialData?: GalleryItem | null;
}

export default function GalleryForm({ initialData }: GalleryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>(
        initialData ? [initialData.image_url, ...(initialData.sub_images || [])].filter(Boolean) : []
    );
    const [uploading, setUploading] = useState(false);
    const [imagesDirty, setImagesDirty] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty: formIsDirty },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            display_order: initialData?.display_order || 0,
            is_active: initialData?.is_active ?? true,
        },
    });

    useUnsavedChangesWarning(formIsDirty || imagesDirty);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const newImages: string[] = [];

        try {
            for (const file of files) {
                let fileToUpload = file;

                if (file.type.startsWith('image/')) {
                    const options = {
                        maxSizeMB: 10,
                        maxWidthOrHeight: 1600,
                        useWebWorker: true,
                        fileType: 'image/webp',
                        initialQuality: 0.8,
                    };
                    try {
                        const compressedFile = await imageCompression(file, options);
                        const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                        fileToUpload = new File([compressedFile], newFileName, { type: 'image/webp' });
                    } catch (e) {
                        console.warn('Compression failed, using original file', e);
                    }
                }

                const fileExt = fileToUpload.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `gallery/${fileName}`;

                const formData = new FormData();
                formData.append('file', fileToUpload);
                formData.append('bucket', 'images');
                formData.append('path', filePath);

                const result = await uploadImageAction(formData);

                if (!result.success || !result.url) {
                    throw new Error(result.error || 'Upload failed');
                }

                newImages.push(result.url);
            }

            setImages((prev) => [...prev, ...newImages]);
            setImagesDirty(true);
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('이미지 업로드에 실패했습니다.');
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagesDirty(true);
    };

    const handleOnDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setImages((prev) => {
            const oldIndex = prev.indexOf(String(active.id));
            const newIndex = prev.indexOf(String(over.id));
            if (oldIndex === -1 || newIndex === -1) return prev;
            return arrayMove(prev, oldIndex, newIndex);
        });
        setImagesDirty(true);
    };

    const onSubmit = async (data: FormData) => {
        if (images.length === 0) {
            toast.error('최소 1장의 이미지를 등록해주세요.');
            return;
        }

        const parsed = formSchema.parse(data);

        setLoading(true);
        try {
            const mainImage = images[0];
            const subImages = images.slice(1);

            const result = await saveGalleryItem({
                ...(initialData ? { id: initialData.id } : {}),
                ...parsed,
                image_url: mainImage,
                sub_images: subImages,
            });

            if (!result.success) {
                throw new Error(result.message || 'Save failed');
            }

            setImagesDirty(false);
            toast.success(initialData ? '수정되었습니다.' : '등록되었습니다.');
            router.push('/admin/gallery');
            router.refresh();
        } catch (error) {
            console.error('Error saving gallery item:', error);
            toast.error('저장에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6">
            <ConsolePanel className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <ConsoleSectionTitle>이미지 등록</ConsoleSectionTitle>
                        <p className="text-xs text-gray-500 mt-1">첫 번째 이미지가 대표 이미지가 됩니다.</p>
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            disabled={uploading}
                        />
                        <label
                            htmlFor="image-upload"
                            className={`${consoleSecondaryButtonClass} flex items-center gap-2 cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {uploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Upload className="w-4 h-4" />
                            )}
                            이미지 업로드
                        </label>
                    </div>
                </div>

                {images.length > 0 ? (
                    <DndContext
                        id="admin-gallery-images"
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleOnDragEnd}
                    >
                        <SortableContext items={images} strategy={horizontalListSortingStrategy}>
                            <div className="flex gap-4 overflow-x-auto pb-4">
                                {images.map((url, index) => (
                                    <SortableImage
                                        key={url}
                                        url={url}
                                        index={index}
                                        onRemove={removeImage}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                ) : (
                    <div className="h-40 flex items-center justify-center border border-dashed border-[#d8d8d2] rounded bg-[#fbfbfa]">
                        <p className="text-gray-500 text-xs font-bold">이미지를 업로드해주세요</p>
                    </div>
                )}
            </ConsolePanel>

            <ConsolePanel className="p-6 space-y-6">
                <ConsoleSectionTitle>기본 정보</ConsoleSectionTitle>
                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">제목</label>
                    <input
                        {...register('title')}
                        className={`${consoleInputClass} w-full`}
                        placeholder="프로젝트 제목을 입력하세요"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs mt-1 font-bold">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">설명</label>
                    <textarea
                        {...register('description')}
                        rows={3}
                        className={`${consoleInputClass} w-full resize-none`}
                        placeholder="프로젝트 설명을 입력하세요"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">표시 순서</label>
                        <input
                            type="number"
                            {...register('display_order', { valueAsNumber: true })}
                            className={`${consoleInputClass} w-full`}
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                        <input
                            type="checkbox"
                            id="is_active"
                            {...register('is_active')}
                            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                        />
                        <label htmlFor="is_active" className="text-xs font-bold text-gray-700 cursor-pointer">
                            공개 여부
                        </label>
                    </div>
                </div>
            </ConsolePanel>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className={consoleSecondaryButtonClass}
                >
                    취소
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={consolePrimaryButtonClass}
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    {initialData ? '수정하기' : '등록하기'}
                </button>
            </div>
        </form>
    );
}

function SortableImage({
    url,
    index,
    onRemove,
}: {
    url: string;
    index: number;
    onRemove: (index: number) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: url });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative flex-shrink-0 w-40 aspect-[4/3] group bg-[#f4f4f1] border border-[#e5e5df] rounded"
        >
            <Image
                src={url}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="160px"
                className="object-cover rounded"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="p-1.5 bg-white rounded shadow text-red-600 hover:bg-red-50"
                    aria-label={`갤러리 이미지 ${index + 1} 제거`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            {index === 0 && (
                <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black text-white text-[10px] font-bold rounded">
                    대표
                </span>
            )}
            <div className="absolute top-2 right-2 p-1 bg-black/50 rounded cursor-grab active:cursor-grabbing text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-4 h-4" />
            </div>
        </div>
    );
}
