'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin-auth';

const ALLOWED_BUCKETS = new Set(['products', 'images']);
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const SAFE_PATH_PATTERN = /^[a-zA-Z0-9/_-]+\.(jpe?g|png|webp|gif)$/i;

export async function uploadImageAction(formData: FormData) {
    await requireAdmin();

    try {
        const file = formData.get('file') as File;
        const bucket = formData.get('bucket') as string || 'products';
        const path = formData.get('path') as string;

        if (!file) {
            throw new Error('No file provided');
        }

        if (!ALLOWED_BUCKETS.has(bucket)) {
            throw new Error('허용되지 않은 스토리지 버킷입니다.');
        }

        if (!path || !SAFE_PATH_PATTERN.test(path) || path.includes('..') || path.startsWith('/')) {
            throw new Error('업로드 경로가 올바르지 않습니다.');
        }

        if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
            throw new Error('이미지 파일만 업로드할 수 있습니다.');
        }

        if (file.size > MAX_UPLOAD_BYTES) {
            throw new Error('이미지는 5MB 이하로 업로드해주세요.');
        }

        const supabaseAdmin = getSupabaseAdmin();

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(path, buffer, {
                contentType: file.type,
                upsert: true
            });

        if (error) {
            throw error;
        }

        const { data: publicUrlData } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(path);

        return { success: true, url: publicUrlData.publicUrl };
    } catch (error) {
        console.error('Upload error details:', {
            error,
            bucket: formData.get('bucket'),
            path: formData.get('path'),
            fileName: (formData.get('file') as File)?.name,
            fileSize: (formData.get('file') as File)?.size,
            fileType: (formData.get('file') as File)?.type,
        });
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed'
        };
    }
}
