
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function listProducts() {
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    const lines = products.map(p => `[Order:${p.display_order}] ${p.name} (Finish: ||${p.exterior_finish}||) (ID: ${p.id})`);
    fs.writeFileSync('product_list.txt', lines.join('\n'));
    console.log('Written to product_list.txt');
}

listProducts();
