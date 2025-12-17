
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkSignature() {
    const { data: products, error } = await supabase
        .from('products')
        .select('id, name, is_active, is_signature, image_url, display_order')
        .eq('is_signature', true)
        .order('display_order');

    if (error) console.error(error);
    else {
        console.log('Signature Products count:', products.length);
        products.forEach(p => console.log(`[${p.is_active ? 'Active' : 'Inactive'}] ${p.name} (Order:${p.display_order})`));
    }
}
checkSignature();
