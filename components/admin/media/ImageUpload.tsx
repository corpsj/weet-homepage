'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import imageCompression from 'browser-image-compression';
import { uploadImageAction } from '@/app/actions/storage-actions';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    onUploadStart?: () => void;
    className?: string;
    bucket?: string;
}

export default function ImageUpload({ value, onChange, onUploadStart, className = '', bucket = 'products' }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const handleClick = () => {
        inputRef.current?.click();
    };


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        onUploadStart?.();
        try {
            let fileToUpload = file;

            // Compress/Convert to WebP if it's an image
            if (file.type.startsWith('image/')) {
                const options = {
                    maxSizeMB: 20, // Increased from 5MB to 20MB
                    maxWidthOrHeight: 2560, // Increased to support QHD/Retina
                    useWebWorker: true,
                    fileType: 'image/webp',
                    initialQuality: 0.9, // High quality
                };
                try {
                    const compressedFile = await imageCompression(file, options);
                    // Create a new file with .webp extension
                    const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                    fileToUpload = new File([compressedFile], newFileName, { type: 'image/webp' });
                } catch (e) {
                    console.warn('Compression failed, using original file', e);
                    // Fallback to original file but attempting to rename extension might be misleading if content isn't webp. 
                    // Ideally we should still try to upload, maybe as original.
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
                throw new Error(result.error);
            }

            onChange(result.url || '');
        } catch (error) {
            console.error('Image upload failed calling action:', {
                error,
                fileName: file?.name,
                fileSize: file?.size,
                fileType: file?.type,
            });
            const errorMessage = error instanceof Error ? error.message : '스토리지 버킷 설정을 확인해주세요.';
            toast.error(`이미지 업로드 실패: ${errorMessage}`);
        } finally {
            setLoading(false);
            // Reset input so same file can be selected again if needed
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className={`relative ${className}`}>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
            />

            {value ? (
                <div className="relative w-full h-full min-h-[200px] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
                    <Image
                        src={value}
                        alt="Uploaded image"
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <button
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        type="button"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleClick}
                    disabled={loading}
                    type="button"
                    className="w-full h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-gray-600"
                >
                    {loading ? (
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    ) : (
                        <>
                            <div className="p-3 bg-gray-100 rounded-full">
                                <Upload className="w-6 h-6" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium">클릭하여 이미지 업로드</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 20MB</p>
                            </div>
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
