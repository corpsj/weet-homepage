
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
    console.log('Starting 3x6 Image Reorder (ABC -> BCA)...');

    // 1. Fetch 3x6 Products
    // Based on previous knowledge, these are Orders 7, 8, 9
    // Names: 3X6 집 (적삼목), 3X6 집 (스타코), 3X6 집(골강판)
    // Note: '3X6 집(골강판)' name might vary slightly

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .in('name', ['3X6 집 (적삼목)', '3X6 집 (스타코)', '3X6 집(골강판)'])
        .order('display_order', { ascending: true });

    if (error || !products || products.length < 3) {
        console.error('Error fetching products or insufficient products found:', error || products);
        return;
    }

    // Expected Order (based on display_order):
    // 0: A (Start)
    // 1: B
    // 2: C (End)

    const productA = products[0];
    const productB = products[1];
    const productC = products[2];

    const imageA = productA.image_url;
    const imageB = productB.image_url;
    const imageC = productC.image_url;

    console.log('Current State:');
    console.log(`  [A] ${productA.name}: ${imageA}`);
    console.log(`  [B] ${productB.name}: ${imageB}`);
    console.log(`  [C] ${productC.name}: ${imageC}`);

    // New State (ABC -> BCA):
    // A gets B's image
    // B gets C's image
    // C gets A's image

    console.log('\nApplying updates (ABC -> BCA)...');

    // Update A -> Image B
    await updateImage(productA, imageB);

    // Update B -> Image C
    await updateImage(productB, imageC);

    // Update C -> Image A
    await updateImage(productC, imageA);

    console.log('\nDone.');
}

async function updateImage(product: any, newImageUrl: string) {
    const { error } = await supabase
        .from('products')
        .update({
            image_url: newImageUrl,
            updated_at: new Date().toISOString()
        })
        .eq('id', product.id);

    if (error) {
        console.error(`  Failed to update ${product.name}:`, error.message);
    } else {
        console.log(`  Updated ${product.name} -> New Image`);
    }
}

main();
