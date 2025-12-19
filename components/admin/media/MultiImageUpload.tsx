'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';
import { uploadImageAction } from '@/app/actions/storage-actions';

interface MultiImageUploadProps {
    onUpload: (urls: string[]) => void;
    className?: string;
    bucket?: string;
}

export default function MultiImageUpload({ onUpload, className = '', bucket = 'products' }: MultiImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setLoading(true);
        const uploadedUrls: string[] = [];
        const errors: string[] = [];

        try {
            // Process all files
            const uploadPromises = Array.from(files).map(async (file) => {
                try {
                    let fileToUpload = file;

                    // Compress/Convert to WebP if it's an image
                    if (file.type.startsWith('image/')) {
                        const options = {
                            maxSizeMB: 20,
                            maxWidthOrHeight: 2560,
                            useWebWorker: true,
                            fileType: 'image/webp',
                            initialQuality: 0.9,
                        };
                        try {
                            const compressedFile = await imageCompression(file, options);
                            const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                            fileToUpload = new File([compressedFile], newFileName, { type: 'image/webp' });
                        } catch (e) {
                            console.warn('Compression failed, using original file', e);
                            // Fallback to original file
                        }
                    }

                    const fileExt = fileToUpload.name.split('.').pop();
                    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                    const filePath = `${fileName}`;

                    const formData = new FormData();
                    formData.append('file', fileToUpload);
                    formData.append('bucket', bucket);
                    formData.append('path', filePath);

                    const result = await uploadImageAction(formData);

                    if (!result.success) {
                        throw new Error(result.error || 'Upload failed');
                    }

                    return result.url;
                } catch (error) {
                    console.error('File upload error:', error);
                    return null;
                }
            });

            const results = await Promise.all(uploadPromises);

            results.forEach(url => {
                if (url) uploadedUrls.push(url);
            });

            if (uploadedUrls.length > 0) {
                onUpload(uploadedUrls);
                toast.success(`${uploadedUrls.length}장의 이미지가 업로드되었습니다.`);
            }

            if (results.includes(null)) {
                toast.error('일부 이미지 업로드에 실패했습니다.');
            }

        } catch (error) {
            console.error('Multi image upload failed:', error);
            toast.error('이미지 업로드 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    return (
        <div className={`relative ${className}`}>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="hidden"
            />

            <button
                onClick={handleClick}
                disabled={loading}
                type="button"
                className="w-full h-full min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-black group"
            >
                {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-black" />
                ) : (
                    <>
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-white transition-colors">
                            <Plus className="w-5 h-5" />
                        </div>
                        <div className="text-center px-2">
                            <p className="text-sm font-medium">이미지 추가</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">여러 장 선택 가능</p>
                        </div>
                    </>
                )}
            </button>
        </div>
    );
}
