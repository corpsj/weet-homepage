
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const main = async () => {
    const { data: slides, error } = await supabase.from('hero_slides').select('*').order('sort_order');
    if (error) {
        console.error('Error fetching slides:', error);
        return;
    }
    console.log('Hero Slides:', JSON.stringify(slides, null, 2));
};

main();
