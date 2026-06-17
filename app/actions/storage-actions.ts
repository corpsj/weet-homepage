'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin-auth';

const ALLOWED_BUCKETS = new Set(['products', 'images']);
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const SAFE_PATH_PATTERN = /^[a-zA-Z0-9/_-]+\.(jpe?g|png|webp|gif)$/i;

/**
 * Folders the client may upload into. The final storage key is always derived
 * server-side from one of these prefixes plus a random UUID, so a client can
 * never choose (and therefore never overwrite) an existing object's key.
 */
const ALLOWED_PREFIXES = new Set(['', 'products', 'projects', 'gallery', 'customize']);

/** Map a validated MIME type to the file extension used for the storage key. */
const MIME_EXTENSIONS: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
};

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
        const prefixField = formData.get('prefix');
        const legacyPath = formData.get('path');

        if (!file) {
            throw new Error('No file provided');
        }

        if (!ALLOWED_BUCKETS.has(bucket)) {
            throw new Error('허용되지 않은 스토리지 버킷입니다.');
        }

        if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
            throw new Error('이미지 파일만 업로드할 수 있습니다.');
        }

        if (file.size > MAX_UPLOAD_BYTES) {
            throw new Error('이미지는 5MB 이하로 업로드해주세요.');
        }

        // Resolve the final storage key.
        //
        // Preferred mode (`prefix`): the client only supplies a folder from a
        // server allowlist; the key is generated here with a random UUID and an
        // extension derived from the validated MIME, so the client can never
        // target — and therefore never overwrite — an existing object's key.
        //
        // Legacy mode (`path`): a fully-specified key is still accepted for
        // callers not yet migrated, but is strictly validated. Combined with
        // `upsert: false` below it can never clobber an existing object either.
        let path: string;
        if (typeof prefixField === 'string') {
            const prefix = prefixField.replace(/^\/+|\/+$/g, '');
            if (!ALLOWED_PREFIXES.has(prefix)) {
                throw new Error('허용되지 않은 업로드 폴더입니다.');
            }
            const ext = MIME_EXTENSIONS[file.type];
            const fileName = `${crypto.randomUUID()}.${ext}`;
            path = prefix ? `${prefix}/${fileName}` : fileName;
        } else if (typeof legacyPath === 'string') {
            if (!SAFE_PATH_PATTERN.test(legacyPath) || legacyPath.includes('..') || legacyPath.startsWith('/')) {
                throw new Error('업로드 경로가 올바르지 않습니다.');
            }
            path = legacyPath;
        } else {
            throw new Error('업로드 폴더가 지정되지 않았습니다.');
        }

        const supabaseAdmin = getSupabaseAdmin();

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Content sniff: the declared MIME (client-supplied) must match the real bytes. (F49)
        if (!hasValidImageMagicBytes(buffer, file.type)) {
            throw new Error('파일 내용이 이미지 형식과 일치하지 않습니다.');
        }

        const { error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(path, buffer, {
                contentType: file.type,
                // Never overwrite an existing object. With server-derived UUID keys
                // a collision is effectively impossible; this is defence in depth.
                upsert: false
            });

        if (error) {
            // Supabase returns a 409/"already exists" style error on key collision.
            const message = error.message?.toLowerCase() ?? '';
            if (message.includes('exists') || message.includes('duplicate')) {
                throw new Error('동일한 경로의 파일이 이미 존재합니다. 다시 시도해주세요.');
            }
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
            prefix: formData.get('prefix'),
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
