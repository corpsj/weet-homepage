'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, Upload, X, GripVertical } from 'lucide-react';
import { Project } from '@/types/supabase';
import { createProject, updateProject } from '@/app/actions/project-actions';
import { uploadImageAction } from '@/app/actions/storage-actions';
import imageCompression from 'browser-image-compression';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    ConsolePanel,
    ConsoleSectionTitle,
    consoleInputClass,
    consolePrimaryButtonClass,
    consoleSecondaryButtonClass
} from '@/components/admin/ConsolePrimitives';

const formSchema = z.object({
    title: z.string().min(1, '프로젝트 이름을 입력해주세요.'),
    client: z.string().optional(),
    location: z.string().optional(),
    completed_at: z.string().optional(),
    description: z.string().optional(),
    tags: z.string().optional(),
    status: z.string().default('completed'),
});

type FormData = z.input<typeof formSchema>;

interface ProjectFormProps {
    initialData?: Project | null;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>(initialData?.images || []);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || '',
            client: initialData?.client || '',
            location: initialData?.location || '',
            completed_at: initialData?.completed_at || '',
            description: initialData?.description || '',
            tags: initialData?.tags?.join(', ') || '',
            status: initialData?.status || 'completed',
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const newImages: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setUploadProgress(`${i + 1}/${files.length}`);
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
                        const newFileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
                        fileToUpload = new File([compressedFile], newFileName, { type: 'image/webp' });
                    } catch (err) {
                        console.warn('Compression failed, using original file', err);
                    }
                }

                const fileExt = fileToUpload.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `projects/${fileName}`;

                const formData = new FormData();
                formData.append('file', fileToUpload);
                formData.append('bucket', 'images');
                formData.append('path', filePath);

                const result = await uploadImageAction(formData);

                if (!result.success) {
                    throw new Error(result.error);
                }

                newImages.push(result.url || '');
            }

            setImages((prev) => [...prev, ...newImages]);
            toast.success(`${newImages.length}장 업로드 완료`);
        } catch (error) {
            console.error('Error uploading images:', error);
            const msg = error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.';
            toast.error(msg);
        } finally {
            setUploading(false);
            setUploadProgress('');
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
        setLoading(true);
        try {
            const tagsArray = data.tags
                ? data.tags.split(',').map((s) => s.trim()).filter(Boolean)
                : [];

            const payload = {
                title: data.title,
                client: data.client || null,
                location: data.location || null,
                completed_at: data.completed_at || null,
                description: data.description || null,
                images: images.length > 0 ? images : null,
                tags: tagsArray.length > 0 ? tagsArray : null,
                status: data.status,
            };

            if (initialData) {
                await updateProject(initialData.id, payload);
                toast.success('프로젝트가 수정되었습니다.');
            } else {
                await createProject(payload);
                toast.success('프로젝트가 등록되었습니다.');
            }

            router.push('/admin/projects');
            router.refresh();
        } catch (error) {
            console.error('Error saving project:', error);
            toast.error('저장에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6">
            {/* Image Upload Section */}
            <ConsolePanel className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <ConsoleSectionTitle>프로젝트 이미지</ConsoleSectionTitle>
                        <p className="text-xs text-gray-500 mt-1">첫 번째 이미지가 대표 이미지로 사용됩니다.</p>
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="project-image-upload"
                            disabled={uploading}
                        />
                        <label
                            htmlFor="project-image-upload"
                            className={`${consoleSecondaryButtonClass} flex items-center gap-2 cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {uploadProgress && <span>{uploadProgress} 업로드 중...</span>}
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    이미지 업로드
                                </>
                            )}
                        </label>
                    </div>
                </div>

                {images.length > 0 ? (
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="project-images" direction="horizontal">
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
                                                    className="relative flex-shrink-0 w-40 aspect-[4/3] group bg-[#f4f4f1] border border-[#e5e5df] rounded"
                                                >
                                                    <Image
                                                        src={url}
                                                        alt={`Project image ${index + 1}`}
                                                        fill
                                                        sizes="160px"
                                                        className="object-cover rounded"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="p-1.5 bg-white rounded shadow text-red-600 hover:bg-red-50"
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
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <div className="h-40 flex items-center justify-center border border-dashed border-[#d8d8d2] rounded bg-[#fbfbfa]">
                        <p className="text-gray-500 text-xs font-bold">이미지를 업로드해주세요</p>
                    </div>
                )}
            </ConsolePanel>

            {/* Basic Info Section */}
            <ConsolePanel className="p-6 space-y-6">
                <ConsoleSectionTitle>기본 정보</ConsoleSectionTitle>

                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                        프로젝트 이름 *
                    </label>
                    <input
                        {...register('title')}
                        className={`${consoleInputClass} w-full`}
                        placeholder="프로젝트 이름을 입력하세요"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs mt-1 font-bold">{errors.title.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">
                            클라이언트
                        </label>
                        <input
                            {...register('client')}
                            className={`${consoleInputClass} w-full`}
                            placeholder="클라이언트명"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">
                            위치
                        </label>
                        <input
                            {...register('location')}
                            className={`${consoleInputClass} w-full`}
                            placeholder="프로젝트 위치"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">
                            완공일
                        </label>
                        <input
                            type="date"
                            {...register('completed_at')}
                            className={`${consoleInputClass} w-full`}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">
                            상태
                        </label>
                        <select
                            {...register('status')}
                            className={`${consoleInputClass} w-full`}
                        >
                            <option value="completed">완료</option>
                            <option value="in_progress">진행중</option>
                            <option value="planned">계획중</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                        설명
                    </label>
                    <textarea
                        {...register('description')}
                        rows={3}
                        className={`${consoleInputClass} w-full resize-none`}
                        placeholder="프로젝트 설명을 입력하세요"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                        태그 (쉼표로 구분)
                    </label>
                    <input
                        {...register('tags')}
                        className={`${consoleInputClass} w-full`}
                        placeholder="모듈러, 스마트팜, 디자인"
                    />
                </div>
            </ConsolePanel>

            {/* Actions */}
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
