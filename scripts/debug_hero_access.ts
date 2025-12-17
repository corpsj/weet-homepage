
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function main() {
    console.log('--- Debugging Hero Slides Access ---');

    // 1. Check with Service Role (Admin view)
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: adminData, error: adminError } = await adminClient
        .from('hero_slides')
        .select('id, title, image_url')
        .order('display_order');

    console.log('\n[Admin/Service Role Client]');
    if (adminError) console.error('Error:', adminError.message);
    else {
        console.log(`Count: ${adminData.length}`);
        adminData.forEach(s => console.log(` - ${s.id}: ${s.image_url.slice(0, 50)}...`));
    }

    // 2. Check with Anon Key (Public view)
    const publicClient = createClient(supabaseUrl, supabaseAnonKey);
    const { data: publicData, error: publicError } = await publicClient
        .from('hero_slides')
        .select('id, title, image_url')
        .order('display_order');

    console.log('\n[Public/Anon Client]');
    if (publicError) console.error('Error:', publicError.message);
    else {
        console.log(`Count: ${publicData.length}`);
        publicData.forEach(s => console.log(` - ${s.id}: ${s.image_url.slice(0, 50)}...`));
    }
}

main();
