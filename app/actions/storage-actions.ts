'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin-auth';

const ALLOWED_BUCKETS = new Set(['products', 'images']);
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const SAFE_PATH_PATTERN = /^[a-zA-Z0-9/_-]+\.(jpe?g|png|webp|gif)$/i;

/**
 * Verify the file's actual leading bytes (magic numbers) match the declared
 * MIME type, so a client can't bypass the MIME allowlist by mislabelling a
 * non-image (e.g. an HTML/SVG/script) as image/png. (review backlog F49)
 */
function hasValidImageMagicBytes(buffer: Buffer, mime: string): boolean {
    if (buffer.length < 12) return false;
    switch (mime) {
        case 'image/jpeg':
            return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
        case 'image/png':
            return (
                buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47 &&
                buffer[4] === 0x0d && buffer[5] === 0x0a && buffer[6] === 0x1a && buffer[7] === 0x0a
            );
        case 'image/gif':
            // "GIF87a" / "GIF89a"
            return buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38;
        case 'image/webp':
            // "RIFF"...."WEBP"
            return (
                buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
                buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
            );
        default:
            return false;
    }
}

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

        // Content sniff: the declared MIME (client-supplied) must match the real bytes. (F49)
        if (!hasValidImageMagicBytes(buffer, file.type)) {
            throw new Error('파일 내용이 이미지 형식과 일치하지 않습니다.');
        }

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
