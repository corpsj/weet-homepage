
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SOURCE_DIR = '대체이미지';
const BUCKET_NAME = 'products';

async function main() {
    const isDryRun = process.argv.includes('--dry-run');

    console.log(`Starting Image Replacement Script (Dry Run: ${isDryRun})`);

    // 1. Get all products from DB
    const { data: products, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }
    console.log(`Fetched ${products.length} products from DB.`);

    // 2. Scan source directory
    const files = fs.readdirSync(SOURCE_DIR).filter(f => !['.DS_Store', 'Thumbs.db'].includes(f));
    console.log(`Found ${files.length} files in ${SOURCE_DIR}.`);

    const mappings: { file: string, matchedProduct: any }[] = [];

    // 3. Match files to products
    const ambiguous3x6Files: string[] = [];
    const ambiguous3x6Products: any[] = [];

    // Pre-filtering products for ambiguous matching
    // Based on Order 7, 8, 9 in product_list.txt
    products.forEach((p: any) => {
        // Match specific names we know are the simple 3x6 types
        if (p.name === '3X6 집 (적삼목)' || p.name === '3X6 집 (스타코)' || p.name === '3X6 집(골강판)') {
            ambiguous3x6Products.push(p);
        }
    });
    // Sort products by display_order to align with file numbering 2, 3, 4
    // Assumption: Files 2, 3, 4 map to Orders 7, 8, 9 (or simply the lowest 3x6 orders)
    ambiguous3x6Products.sort((a, b) => a.display_order - b.display_order);

    for (const file of files) {
        if (fs.statSync(path.join(SOURCE_DIR, file)).isDirectory()) continue;
        const normalizedName = file.normalize('NFC');
        let matchedProduct = null;

        if (normalizedName.includes('3x9집') || normalizedName.includes('3x9.jpg')) {
            matchedProduct = products.find((p: any) => p.name.includes('3X9 집') && !p.name.includes('+'));
        } else if (normalizedName.match(/^\d+\.\s*3x6집/i) || normalizedName.includes('3x6집')) {
            // Catch 2. 3x6집, 3. 3x6집, 4. 3x6집
            ambiguous3x6Files.push(file);
            continue;
        } else if (normalizedName.includes('캠퍼')) {
            matchedProduct = products.find((p: any) => p.name.includes('CAMPER') || p.name.includes('캠퍼'));
        } else if (normalizedName.includes('피터팬')) {
            matchedProduct = products.find((p: any) => p.name.includes('피터팬'));
        } else if (normalizedName.includes('리트릿') && !normalizedName.includes('리트릿2')) {
            matchedProduct = products.find((p: any) => p.name.includes('RETREAT') || p.name.includes('리트릿'));
        } else if (normalizedName.includes('맨즈케이브')) {
            matchedProduct = products.find((p: any) => p.name.includes('맨스케이브') || p.name.includes('MANSCAVE'));
        } else if (normalizedName.includes('사우나')) {
            matchedProduct = products.find((p: any) => p.name.includes('사우나') || p.name.includes('SAUNA'));
        } else if (normalizedName.includes('3x3 내서재')) {
            matchedProduct = products.find((p: any) => p.name.includes('서재') || p.name.includes('LIBRARY'));
        }

        if (matchedProduct) {
            mappings.push({ file, matchedProduct });
        }
    }

    // Handle ambiguous 3x6 files
    // Sort files by name to ensure 2. comes before 3. before 4.
    ambiguous3x6Files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    ambiguous3x6Files.forEach((file, index) => {
        if (index < ambiguous3x6Products.length) {
            mappings.push({ file, matchedProduct: ambiguous3x6Products[index] });
        } else {
            console.log(`[WARNING] No product slot for 3x6 file: ${file}`);
        }
    });

    // 4. Report Mappings
    console.log('\n--- MAPPING REPORT ---');
    mappings.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));

    mappings.forEach(m => {
        if (m.matchedProduct) {
            console.log(`[MATCH] File: "${m.file}"  ->  Product: "${m.matchedProduct.name}" (ID: ${m.matchedProduct.id}) (Finish: ${m.matchedProduct.exterior_finish})`);
        } else {
            console.log(`[NO MATCH] File: "${m.file}"`);
        }
    });

    if (isDryRun) {
        console.log('\nDry run complete. No changes made.');
        return;
    }

    // 5. Upload and Update
    for (const m of mappings) {
        if (!m.matchedProduct) continue;

        const filePath = path.join(SOURCE_DIR, m.file);

        // Sanitize filename for URL
        // Use random string to ensure uniqueness and cache busting
        const randomString = Math.random().toString(36).substring(2, 10);
        const newFileName = `replacement_${randomString}.webp`;
        const storagePath = `products/webp/${newFileName}`;

        console.log(`\nProcessing ${m.file}...`);
        try {
            // Convert to WebP
            const buffer = await sharp(filePath)
                .rotate() // Auto-rotate based on metadata
                .webp({ quality: 80 })
                .toBuffer();

            // Upload to Supabase
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(storagePath, buffer, {
                    contentType: 'image/webp',
                    upsert: true
                });

            if (uploadError) {
                console.error(`  Upload failed: ${uploadError.message}`);
                continue;
            }

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(storagePath);

            console.log(`  Uploaded to ${publicUrl}`);

            // Update Database
            const { error: dbError } = await supabase
                .from('products')
                .update({
                    image_url: publicUrl,
                    updated_at: new Date().toISOString()
                })
                .eq('id', m.matchedProduct.id);

            if (dbError) {
                console.error(`  DB Update failed: ${dbError.message}`);
            } else {
                console.log(`  Database updated for ${m.matchedProduct.name}`);
            }

        } catch (err) {
            console.error(`  Error processing ${m.file}:`, err);
        }
    }
}

main();
