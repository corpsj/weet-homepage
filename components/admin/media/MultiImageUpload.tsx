'use client';

import { useState, useRef } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';
import { uploadImageAction } from '@/app/actions/storage-actions';

interface MultiImageUploadProps {
    onUpload: (urls: string[]) => void;
    className?: string;
    bucket?: string;
    quality?: 'high' | 'standard';
}

// Reject obviously-wrong originals early. The server enforces a 5MB cap on the
// final (post-compression) file; this generous pre-compression ceiling just
// blocks files that can never compress down in time.
const MAX_FILE_COUNT = 20;
const MAX_ORIGINAL_BYTES = 30 * 1024 * 1024;

export default function MultiImageUpload({ onUpload, className = '', bucket = 'products', quality = 'high' }: MultiImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;

        const files = Array.from(fileList);

        // Pre-upload validation: count / format / size.
        if (files.length > MAX_FILE_COUNT) {
            toast.error(`한 번에 최대 ${MAX_FILE_COUNT}장까지 업로드할 수 있습니다.`);
            if (inputRef.current) inputRef.current.value = '';
            return;
        }
        const nonImage = files.find((file) => !file.type.startsWith('image/'));
        if (nonImage) {
            toast.error(`이미지 파일만 업로드할 수 있습니다: ${nonImage.name}`);
            if (inputRef.current) inputRef.current.value = '';
            return;
        }
        const tooLarge = files.find((file) => file.size > MAX_ORIGINAL_BYTES);
        if (tooLarge) {
            toast.error(`파일이 너무 큽니다 (최대 30MB): ${tooLarge.name}`);
            if (inputRef.current) inputRef.current.value = '';
            return;
        }

        setLoading(true);
        const uploadedUrls: string[] = [];
        let failedCount = 0;

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setProgress(`${i + 1}/${files.length}`);
                try {
                    let fileToUpload = file;

                    // Compress/Convert to WebP (all files here are images, validated above).
                    const options = quality === 'high' ? {
                        maxSizeMB: 4.5,
                        maxWidthOrHeight: 2560,
                        useWebWorker: true,
                        fileType: 'image/webp',
                        initialQuality: 0.9,
                    } : {
                        maxSizeMB: 4.5,
                        maxWidthOrHeight: 1600,
                        useWebWorker: true,
                        fileType: 'image/webp',
                        initialQuality: 0.8,
                    };
                    try {
                        const compressedFile = await imageCompression(file, options);
                        const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                        fileToUpload = new File([compressedFile], newFileName, { type: 'image/webp' });
                    } catch (err) {
                        console.warn('Compression failed, using original file', err);
                        // Fallback to original file
                    }

                    // Send only the folder prefix (bucket root here); the final
                    // storage key is generated server-side (random UUID) so it can
                    // never overwrite a live object.
                    const formData = new FormData();
                    formData.append('file', fileToUpload);
                    formData.append('bucket', bucket);
                    formData.append('prefix', '');

                    const result = await uploadImageAction(formData);

                    if (!result.success || !result.url) {
                        throw new Error(result.error || 'Upload failed');
                    }

                    uploadedUrls.push(result.url);
                } catch (error) {
                    failedCount += 1;
                    console.error('File upload error:', {
                        error,
                        fileName: file.name,
                        fileSize: file.size,
                        fileType: file.type
                    });
                    // Surface the server-provided reason for the failed file.
                    const reason = error instanceof Error ? error.message : '알 수 없는 오류';
                    toast.error(`${file.name} 업로드 실패: ${reason}`);
                }
            }

            if (uploadedUrls.length > 0) {
                onUpload(uploadedUrls);
                toast.success(`${uploadedUrls.length}장의 이미지가 업로드되었습니다.`);
            } else if (failedCount > 0) {
                toast.error('이미지를 업로드하지 못했습니다.');
            }
        } catch (error) {
            console.error('Multi image upload failed:', error);
            toast.error('이미지 업로드 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
            setProgress('');
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
                className="w-full h-full min-h-[120px] border-2 border-dashed border-admin-line-2 rounded-[12px] hover:border-admin-accent hover:bg-admin-accent-soft transition-all flex flex-col items-center justify-center gap-2 text-admin-muted hover:text-admin-accent group"
            >
                {loading ? (
                    <div className="flex flex-col items-center gap-1.5">
                        <Loader2 className="w-6 h-6 animate-spin text-admin-accent" />
                        {progress && <span className="text-[11px] font-bold text-admin-accent">{progress} 업로드 중...</span>}
                    </div>
                ) : (
                    <>
                        <div className="p-2 bg-[#f4f4f5] rounded-full group-hover:bg-white transition-colors">
                            <Plus className="w-5 h-5" />
                        </div>
                        <div className="text-center px-2">
                            <p className="text-sm font-medium">이미지 추가</p>
                            <p className="text-[10px] text-[#a1a1aa] mt-0.5">여러 장 선택 가능</p>
                        </div>
                    </>
                )}
            </button>
        </div>
    );
}
