
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
        .select('*')
        .eq('is_signature', true);

    if (error) console.error(error);
    else {
        console.log('Signature Products:', products.map(p => ({ name: p.name, image: p.image_url })));
    }
}
checkSignature();
