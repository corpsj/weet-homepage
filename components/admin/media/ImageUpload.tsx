'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    className?: string;
}

export default function ImageUpload({ value, onChange, className = '' }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        try {
            // For now, just use local URL - in production, upload to Supabase Storage
            const localUrl = URL.createObjectURL(file);
            onChange(localUrl);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('이미지 업로드에 실패했습니다.');
        } finally {
            setLoading(false);
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
                <div className="relative w-full h-full min-h-[120px] rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <Image
                        src={value}
                        alt="Uploaded image"
                        fill
                        className="object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleClick}
                    disabled={loading}
                    className="w-full h-full min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-600"
                >
                    {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <>
                            <Upload className="w-6 h-6" />
                            <span className="text-xs">이미지 업로드</span>
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
