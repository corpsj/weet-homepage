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
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { saveGalleryItem } from '@/app/actions/gallery-actions';
import { uploadImageAction } from '@/app/actions/storage-actions';

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            display_order: initialData?.display_order || 0,
            is_active: initialData?.is_active ?? true,
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const newImages: string[] = [];

        try {
            for (const file of files) {
                let fileToUpload = file;

                // Compress/Convert to WebP if it's an image
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
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('이미지 업로드에 실패했습니다.');
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setImages(items);
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
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
            {/* Image Upload Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        이미지 (첫 번째 이미지가 대표 이미지가 됩니다)
                    </label>
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
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${uploading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-black text-white hover:bg-gray-800'
                                }`}
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
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="images" direction="horizontal">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex gap-4 overflow-x-auto pb-4"
                                >
                                    {images.map((url, index) => (
                                        <Draggable key={url} draggableId={url} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="relative flex-shrink-0 w-40 aspect-[4/3] group"
                                                >
                                                    <Image
                                                        src={url}
                                                        alt={`Gallery image ${index + 1}`}
                                                        fill
                                                        className={`object-cover rounded-lg border-2 ${index === 0 ? 'border-primary' : 'border-transparent'
                                                            }`}
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="p-1 bg-white rounded-full text-red-600 hover:bg-red-50"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    {index === 0 && (
                                                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-xs font-bold rounded">
                                                            대표
                                                        </span>
                                                    )}
                                                    <div className="absolute top-2 right-2 p-1 bg-black/50 rounded cursor-grab active:cursor-grabbing text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <GripVertical className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                        <p className="text-gray-500 text-sm">이미지를 업로드해주세요</p>
                    </div>
                )}
            </div>

            {/* Basic Info Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        제목
                    </label>
                    <input
                        {...register('title')}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                        placeholder="프로젝트 제목을 입력하세요"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        설명
                    </label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                        placeholder="프로젝트 설명을 입력하세요"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            표시 순서
                        </label>
                        <input
                            type="number"
                            {...register('display_order', { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-8">
                        <input
                            type="checkbox"
                            id="is_active"
                            {...register('is_active')}
                            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700 select-none">
                            공개 여부
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                    취소
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {initialData ? '수정하기' : '등록하기'}
                </button>
            </div>
        </form>
    );
}
