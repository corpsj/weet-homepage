import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function convertImageToWebP(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
        .webp({ quality: 90 }) // High quality WebP
        .toBuffer();
}

async function processTable(tableName: string, urlColumns: string[]) {
    console.log(`Processing table: ${tableName}`);

    const { data: rows, error } = await supabase
        .from(tableName)
        .select('*');

    if (error) {
        console.error(`Error fetching ${tableName}:`, error);
        return;
    }

    console.log(`Found ${rows.length} rows in ${tableName}`);

    for (const row of rows) {
        const updates: any = {};
        let needsUpdate = false;

        for (const col of urlColumns) {
            const value = row[col];

            if (!value) continue;

            // Handle array of URLs (e.g. sub_images)
            if (Array.isArray(value)) {
                const newUrls = [];
                let arrayChanged = false;

                for (const url of value) {
                    const resultUrl = await processUrl(url);
                    newUrls.push(resultUrl);
                    if (resultUrl !== url) arrayChanged = true;
                }

                if (arrayChanged) {
                    updates[col] = newUrls;
                    needsUpdate = true;
                }
            }
            // Handle single string URL
            else if (typeof value === 'string') {
                const resultUrl = await processUrl(value);
                if (resultUrl !== value) {
                    updates[col] = resultUrl;
                    needsUpdate = true;
                }
            }
        }

        if (needsUpdate) {
            const { error: updateError } = await supabase
                .from(tableName)
                .update(updates)
                .eq('id', row.id);

            if (updateError) {
                console.error(`Failed to update ${tableName} id=${row.id}:`, updateError);
            } else {
                console.log(`Updated ${tableName} id=${row.id}`);
            }
        }
    }
}

async function processUrl(url: string): Promise<string> {
    if (!url || url.includes('.webp') || !url.startsWith(process.env.NEXT_PUBLIC_SUPABASE_URL || '')) {
        // Skip if already webp or external URL (not ours)
        // Also skip if it doesn't match our supabase project URL roughly
        if (url.includes('.webp')) return url;
        // Check if it's our bucket
        if (!url.includes('/storage/v1/object/public/')) return url;
    }

    try {
        console.log(`Processing URL: ${url}`);

        // Extract bucket and path
        // URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
        const parts = url.split('/storage/v1/object/public/');
        if (parts.length < 2) return url;

        const bucketAndPath = parts[1];
        const slashIndex = bucketAndPath.indexOf('/');
        const bucket = bucketAndPath.substring(0, slashIndex);
        const oldPath = bucketAndPath.substring(slashIndex + 1);

        // Download
        const { data: blob, error: downloadError } = await supabase
            .storage
            .from(bucket)
            .download(oldPath);

        if (downloadError || !blob) {
            console.warn(`Failed to download ${url}:`, downloadError);
            return url;
        }

        const buffer = Buffer.from(await blob.arrayBuffer());

        // Convert
        const webpBuffer = await convertImageToWebP(buffer);

        // Upload new file
        const newPath = oldPath.replace(/\.[^.]+$/, '') + '.webp';
        const { error: uploadError } = await supabase
            .storage
            .from(bucket)
            .upload(newPath, webpBuffer, {
                contentType: 'image/webp',
                upsert: true
            });

        if (uploadError) {
            console.error(`Failed to upload ${newPath}:`, uploadError);
            return url;
        }

        // Get new Public URL
        const { data: publicUrlData } = supabase
            .storage
            .from(bucket)
            .getPublicUrl(newPath);

        console.log(`Converted: ${oldPath} -> ${newPath}`);
        return publicUrlData.publicUrl;

    } catch (error) {
        console.error(`Error processing URL ${url}:`, error);
        return url;
    }
}

async function main() {
    console.log('Starting migration...');

    await processTable('products', ['image_url', 'sub_images']);
    await processTable('gallery', ['image_url', 'sub_images']);
    await processTable('hero_slides', ['image_url']);
    await processTable('solutions', ['image_url']);

    console.log('Migration complete.');
}

main().catch(console.error);
