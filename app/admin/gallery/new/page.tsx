'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import MultiImageUpload from '@/components/admin/media/MultiImageUpload';

export default function NewGalleryItemPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    // We will use the first image as the main one, and create multiple entries if multiple images are uploaded
    // OR just one entry per image. The user requirement was "Space to post photos".
    // Let's assume we want to create one gallery item per image uploaded to keep it simple and consistent with the grid view.
    // However, usually users might want to upload 10 images at once.
    // So we will allow multi-upload, and for each image, we ask for a common title or generate one.
    // Better: Show the uploaded images and allow editing details for each, or just save them all with a default title?
    // Let's implement a simple flow: Upload images -> Show preview -> Click "Save All" -> Creates rows in DB.

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleUpload = (urls: string[]) => {
        setUploadedImages(prev => [...prev, ...urls]);
    };

    const handleRemoveImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (uploadedImages.length === 0) {
            toast.error('이미지를 업로드해주세요.');
            return;
        }
        if (!title.trim()) {
            toast.error('제목을 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            // Create a gallery item for EACH image
            const promises = uploadedImages.map((url, index) => {
                return supabase.from('gallery').insert({
                    title: uploadedImages.length > 1 ? `${title} (${index + 1})` : title,
                    description: description || null,
                    image_url: url,
                    is_active: true,
                    display_order: 0
                });
            });

            const results = await Promise.all(promises);
            const errors = results.filter(r => r.error);

            if (errors.length > 0) {
                console.error('Errors saving gallery items:', errors);
                throw new Error('Some items failed to save');
            }

            toast.success('갤러리에 추가되었습니다.');
            router.push('/admin/gallery');
            router.refresh();
        } catch (error) {
            console.error('Error saving gallery items:', error);
            toast.error('저장 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/gallery"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">새 이미지 추가</h1>
                    <p className="text-gray-500 text-sm mt-1">갤러리에 새 프로젝트 사진을 추가합니다.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            제목 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="프로젝트 이름 입력"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            설명
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="설명을 입력하세요 (선택사항)"
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            이미지 업로드 <span className="text-red-500">*</span>
                        </label>
                        <MultiImageUpload
                            onUpload={handleUpload}
                            bucket="gallery" // User needs to ensure this bucket exists, or we use products
                            className="mb-4"
                        />

                        {/* Image Preview */}
                        {uploadedImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {uploadedImages.map((url, index) => (
                                    <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Loader2 className="w-4 h-4 rotate-45" /> {/* Using rotate-45 as 'X' or just import X */}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                            * 여러 장의 이미지를 한 번에 선택하여 업로드할 수 있습니다.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={loading || uploadedImages.length === 0 || !title.trim()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                저장 중...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                저장하기
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
