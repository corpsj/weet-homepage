
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
const BUCKET_NAME = 'products'; // Assuming 'products' bucket based on earlier list

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

    const mappings = [];

    // 3. Match files to products
    for (const file of files) {
        // Skip directories for now, focus on files
        if (fs.statSync(path.join(SOURCE_DIR, file)).isDirectory()) continue;

        const normalizedName = file.normalize('NFC'); // Handle Korean chars
        let matchedProduct = null;

        // Matching Logic
        if (normalizedName.includes('3x9집') || normalizedName.includes('3x9.jpg')) {
            matchedProduct = products.find(p => p.name.includes('3X9') && (p.name.includes('집') || p.name.includes('유닛')));
        } else if (normalizedName.includes('3x6집') || normalizedName.includes('3. 3x6집') || normalizedName.includes('4. 3x6집')) {
            // Need careful matching if there are multiple 3x6 types
            matchedProduct = products.find(p => p.name.includes('3X6') && p.name.includes('집'));
            // Refine: There might be multiple "3x6 집" products. 
        } else if (normalizedName.includes('캠퍼')) {
            matchedProduct = products.find(p => p.name.includes('CAMPER') || p.name.includes('캠퍼'));
        } else if (normalizedName.includes('피터팬')) {
            matchedProduct = products.find(p => p.name.includes('피터팬')); // Assuming Product name has Peter Pan?
        } else if (normalizedName.includes('리트릿')) {
            matchedProduct = products.find(p => p.name.includes('RETREAT') || p.name.includes('리트릿'));
        } else if (normalizedName.includes('맨즈케이브')) {
            matchedProduct = products.find(p => p.name.includes('맨스케이브') || p.name.includes('MANSCAVE'));
        } else if (normalizedName.includes('사우나')) {
            matchedProduct = products.find(p => p.name.includes('사우나') || p.name.includes('SAUNA'));
        } else if (normalizedName.includes('3x3 내서재')) {
            matchedProduct = products.find(p => p.name.includes('서재') || p.name.includes('LIBRARY'));
        }

        mappings.push({
            file,
            matchedProduct
        });
    }

    // 4. Report Mappings
    console.log('\n--- MAPPING REPORT ---');
    mappings.forEach(m => {
        if (m.matchedProduct) {
            console.log(`[MATCH] File: "${m.file}"  ->  Product: "${m.matchedProduct.name}" (ID: ${m.matchedProduct.id})`);
        } else {
            console.log(`[NO MATCH] File: "${m.file}"`);
        }
    });

    if (isDryRun) {
        console.log('\nDry run complete. No changes made.');
        return;
    }

    // 5. Upload and Update (Only if not dry run)
    // ... Implement upload logic here later ...
}

main();
