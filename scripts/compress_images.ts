
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing environment variables. Please check .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const SETTINGS = {
    high: { quality: 90, width: 2560 }, // Hero, Products
    standard: { quality: 80, width: 1600 } // Gallery
};

async function processImage(url: string, preset: 'high' | 'standard', bucket: string): Promise<string | null> {
    if (!url) return null;

    try {
        // Parse URL to get path
        const urlObj = new URL(url);
        // Helper to extract path from Supabase Public URL
        const publicPathMarker = `/storage/v1/object/public/${bucket}/`;
        if (!url.includes(publicPathMarker)) {
            // Try signed URL format or other variations if necessary, but purely public for now
            console.warn(`URL does not match expected bucket format structure: ${url}`);
            return null;
        }

        const filePath = decodeURIComponent(url.split(publicPathMarker)[1]);

        console.log(`Processing: ${filePath} (${preset})`);

        // Download
        const { data: blob, error: downloadError } = await supabase.storage.from(bucket).download(filePath);
        if (downloadError || !blob) {
            console.error(`Failed to download ${filePath}:`, downloadError);
            return null;
        }

        const buffer = await blob.arrayBuffer();

        // Information check
        const metadata = await sharp(buffer).metadata();
        // If already WebP and small enough, maybe skip? 
        // But we want to enforce quality/width.

        // Compress
        const { quality, width } = SETTINGS[preset];
        const compressedBuffer = await sharp(buffer)
            .resize(width, null, { withoutEnlargement: true })
            .webp({ quality })
            .toBuffer();

        // Compare sizes
        if (compressedBuffer.length >= buffer.byteLength && metadata.format === 'webp') {
            console.log(`Skipping ${filePath}: Compressed size larger or equal to original and already WebP.`);
            // Return original URL if we didn't change it
            return url;
        }

        // New Path
        const pathObj = path.parse(filePath);
        const newFileName = `${pathObj.name}.webp`;
        const newFilePath = pathObj.dir ? `${pathObj.dir}/${newFileName}` : newFileName;

        // Upload
        const { error: uploadError } = await supabase.storage.from(bucket).upload(newFilePath, compressedBuffer, {
            contentType: 'image/webp',
            upsert: true
        });

        if (uploadError) {
            console.error(`Failed to upload ${newFilePath}:`, uploadError);
            return null;
        }

        // Get Public URL
        const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(newFilePath);

        // Delete old file if name is different
        if (newFilePath !== filePath) {
            await supabase.storage.from(bucket).remove([filePath]);
            console.log(`Replaced ${filePath} with ${newFilePath}`);
        } else {
            console.log(`Overwrote ${filePath} with optimized version`);
        }

        return publicUrlData.publicUrl;

    } catch (e) {
        console.error(`Error processing ${url}:`, e);
        return null;
    }
}

async function run() {
    console.log('Starting image optimization...');

    // 1. Products (High Quality) - 'products' bucket
    console.log('\n--- Processing Products ---');
    const { data: products } = await supabase.from('products').select('id, name, image_url, sub_images, floor_plan_url');
    if (products) {
        for (const p of products) {
            let updated = false;
            let updates: any = {};

            console.log(`Product: ${p.name}`);

            // Main Image
            if (p.image_url) {
                const newUrl = await processImage(p.image_url, 'high', 'products');
                if (newUrl && newUrl !== p.image_url) {
                    updates.image_url = newUrl;
                    updated = true;
                }
            }
            // Floor Plan
            if (p.floor_plan_url) {
                const newUrl = await processImage(p.floor_plan_url, 'high', 'products');
                if (newUrl && newUrl !== p.floor_plan_url) {
                    updates.floor_plan_url = newUrl;
                    updated = true;
                }
            }
            // Sub Images
            if (p.sub_images && p.sub_images.length > 0) {
                const newSubImages = [];
                let subChanged = false;
                for (const url of p.sub_images) {
                    const newUrl = await processImage(url, 'high', 'products');
                    newSubImages.push(newUrl || url);
                    if (newUrl && newUrl !== url) subChanged = true;
                }
                if (subChanged) {
                    updates.sub_images = newSubImages;
                    updated = true;
                }
            }

            if (updated) {
                await supabase.from('products').update(updates).eq('id', p.id);
                console.log(`Updated Product DB Record: ${p.id}`);
            }
        }
    }

    // 2. Hero Slides (High Quality) - 'products' bucket (based on code analysis)
    console.log('\n--- Processing Hero Slides ---');
    const { data: slides } = await supabase.from('hero_slides').select('id, title, image_url');
    if (slides) {
        for (const s of slides) {
            if (s.image_url) {
                console.log(`Slide: ${s.title}`);
                const newUrl = await processImage(s.image_url, 'high', 'products');
                if (newUrl && newUrl !== s.image_url) {
                    await supabase.from('hero_slides').update({ image_url: newUrl }).eq('id', s.id);
                    console.log(`Updated Slide DB Record: ${s.id}`);
                }
            }
        }
    }

    // 3. Gallery (Standard Quality) - 'images' bucket
    console.log('\n--- Processing Gallery ---');
    const { data: gallery } = await supabase.from('gallery').select('id, title, image_url, sub_images');
    if (gallery) {
        for (const g of gallery) {
            let updated = false;
            let updates: any = {};

            console.log(`Gallery: ${g.title}`);

            // Main Image
            if (g.image_url) {
                const newUrl = await processImage(g.image_url, 'standard', 'images');
                if (newUrl && newUrl !== g.image_url) {
                    updates.image_url = newUrl;
                    updated = true;
                }
            }

            // Sub Images
            if (g.sub_images && g.sub_images.length > 0) {
                const newSubImages = [];
                let subChanged = false;
                for (const url of g.sub_images) {
                    const newUrl = await processImage(url, 'standard', 'images');
                    newSubImages.push(newUrl || url);
                    if (newUrl && newUrl !== url) subChanged = true;
                }
                if (subChanged) {
                    updates.sub_images = newSubImages;
                    updated = true;
                }
            }

            if (updated) {
                await supabase.from('gallery').update(updates).eq('id', g.id);
                console.log(`Updated Gallery DB Record: ${g.id}`);
            }
        }
    }

    console.log('\nDone.');
}

run().catch(console.error);
