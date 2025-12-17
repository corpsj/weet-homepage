
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
    const { data: slides, error } = await supabase
        .from('hero_slides')
        .select('id, title, image_url')
        .order('sort_order');

    if (error) {
        console.error(error);
        return;
    }

    console.log('Current Hero Slides:');
    slides.forEach(s => console.log(`- [${s.id}] ${s.title}: ${s.image_url}`));
}
main();
