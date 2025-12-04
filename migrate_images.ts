
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const PRODUCTS_DIR = 'public/images/products/small';
const FLOORPLAN_DIR = 'public/images/floorplan/S';

// Mapping based on filenames and product names (inferred)
// We will fetch products first to see their names
const main = async () => {
    const { data: products, error } = await supabase.from('products').select('*');
    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    console.log(`Found ${products.length} products.`);

    // 1. Process Product Images
    // We look for files in private/ and public/ subdirs of PRODUCTS_DIR
    const productFiles: string[] = [];
    const privateDir = path.join(PRODUCTS_DIR, 'private');
    if (fs.existsSync(privateDir)) {
        fs.readdirSync(privateDir).forEach(f => productFiles.push(path.join('private', f)));
    }
    const publicDir = path.join(PRODUCTS_DIR, 'public');
    if (fs.existsSync(publicDir)) {
        fs.readdirSync(publicDir).forEach(f => productFiles.push(path.join('public', f)));
    }

    console.log(`Found ${productFiles.length} product files.`);
    if (productFiles.length > 0) console.log('Sample files:', productFiles.slice(0, 3));

    for (const product of products) {
        let bestMatch = '';
        const pName = product.name.toLowerCase().replace(/\s+/g, '');

        // Helper to find file by keyword
        const findFile = (keyword: string) => {
            return productFiles.find(f => path.basename(f).normalize('NFC').toLowerCase().replace(/\s+/g, '').includes(keyword));
        };

        if (pName.includes('3x9집')) bestMatch = findFile('3x9집') || '';
        else if (pName.includes('3x6집')) bestMatch = findFile('3x6집') || ''; // Note: multiple 3x6 files, might pick first
        else if (pName.includes('camper') || pName.includes('캠퍼')) bestMatch = findFile('캠퍼') || '';
        else if (pName.includes('sauna') || pName.includes('사우나')) bestMatch = findFile('사우나') || '';
        else if (pName.includes('내서재')) bestMatch = findFile('내서재') || '';
        else if (pName.includes('리트릿')) bestMatch = findFile('리트릿') || '';
        else if (pName.includes('맨스케이브') || pName.includes('맨즈케이브')) bestMatch = findFile('맨즈케이브') || '';
        else if (pName.includes('피터팬')) bestMatch = findFile('피터팬') || '';
        else if (pName.includes('버스정류장')) bestMatch = findFile('버스정류장') || '';
        else if (pName.includes('파고라')) bestMatch = findFile('파고라') || '';
        else if (pName.includes('화장실')) bestMatch = findFile('화장실') || '';

        if (bestMatch) {
            console.log(`Matched Product: "${product.name}" -> File: "${bestMatch}"`);

            // Upload
            const filePath = path.join(PRODUCTS_DIR, bestMatch);
            const fileBuffer = fs.readFileSync(filePath);
            const fileExt = path.extname(bestMatch);
            // Sanitize filename for DB/Storage: product_id_timestamp.ext
            const storagePath = `products/${product.id}_${Date.now()}${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('products')
                .upload(storagePath, fileBuffer, { contentType: fileExt === '.png' ? 'image/png' : 'image/jpeg', upsert: true });

            if (uploadError) {
                console.error(`Error uploading ${bestMatch}:`, uploadError);
            } else {
                const publicUrl = supabase.storage.from('products').getPublicUrl(storagePath).data.publicUrl;
                console.log(`Uploaded to ${publicUrl}`);

                // Update DB
                await supabase.from('products').update({ image_url: publicUrl }).eq('id', product.id);
            }

        } else {
            console.warn(`No match found for product: "${product.name}"`);
        }
    }

    // 2. Process Floor Plans
    const floorPlanFiles = fs.readdirSync(FLOORPLAN_DIR);
    for (const product of products) {
        const pName = product.name.toLowerCase().replace(/\s+/g, '');

        const findFloorPlan = (keyword: string) => {
            return floorPlanFiles.find(f => f.normalize('NFC').toLowerCase().replace(/\s+/g, '').includes(keyword));
        };

        let bestMatch = '';
        if (pName.includes('3x9집')) bestMatch = findFloorPlan('3x9집') || '';
        else if (pName.includes('3x6집')) bestMatch = findFloorPlan('3x6집') || '';
        else if (pName.includes('camper') || pName.includes('캠퍼')) bestMatch = findFloorPlan('캠퍼') || '';
        else if (pName.includes('sauna') || pName.includes('사우나')) bestMatch = findFloorPlan('사우나') || '';
        else if (pName.includes('내서재')) bestMatch = findFloorPlan('내서재') || '';
        else if (pName.includes('리트릿')) bestMatch = findFloorPlan('리트릿') || '';
        else if (pName.includes('맨스케이브') || pName.includes('맨즈케이브')) bestMatch = findFloorPlan('맨스케이브') || ''; // File is '36맨스케이브 도면.png'
        else if (pName.includes('피터팬')) bestMatch = findFloorPlan('피터팬') || '';
        // Public products typically don't have floorplans in the S folder, but check anyway

        // Fallback for "36집" matching "3x6집"
        if (!bestMatch && pName.includes('3x6집')) bestMatch = findFloorPlan('36집') || '';


        if (bestMatch) {
            console.log(`Matched FloorPlan: "${product.name}" -> File: "${bestMatch}"`);

            const filePath = path.join(FLOORPLAN_DIR, bestMatch);
            const fileBuffer = fs.readFileSync(filePath);
            const fileExt = path.extname(bestMatch);
            const storagePath = `floorplans/${product.id}_floorplan_${Date.now()}${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('products')
                .upload(storagePath, fileBuffer, { contentType: 'image/png', upsert: true });

            if (uploadError) {
                console.error(`Error uploading floorplan ${bestMatch}:`, uploadError);
            } else {
                const publicUrl = supabase.storage.from('products').getPublicUrl(storagePath).data.publicUrl;
                console.log(`Uploaded Floorplan to ${publicUrl}`);

                // Update DB
                await supabase.from('products').update({ floor_plan_url: publicUrl }).eq('id', product.id);
            }
        } else {
            // Original code had no else for floorplans, adding one for consistency if no match
            console.warn(`No floorplan match found for product: "${product.name}"`);
        }
    }
};

main();

