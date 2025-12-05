
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listAllProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('id, name, image_url');

    if (error) {
        console.error('Error:', error);
        return;
    }

    fs.writeFileSync('all_products.json', JSON.stringify(data, null, 2));
    console.log('Products saved to all_products.json');
}

listAllProducts();
