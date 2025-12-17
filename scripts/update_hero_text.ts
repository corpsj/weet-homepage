
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
    console.log('Starting Hero Text Update...');

    const { data: slides, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('sort_order');

    if (error) {
        console.error('Error fetching slides:', error);
        return;
    }

    // 1. Update First Slide
    if (slides.length > 0) {
        const firstSlide = slides[0];
        console.log(`Updating First Slide [${firstSlide.id}] to "Welcome to weet:)"...`);

        await supabase
            .from('hero_slides')
            .update({
                title: 'Welcome to weet:)',
                subtitle: 'We make dreams come true.'
            })
            .eq('id', firstSlide.id);
    }

    // 2. Clear Others
    const otherSlides = slides.slice(1);
    for (const slide of otherSlides) {
        console.log(`Clearing text for Slide [${slide.id}]...`);
        await supabase
            .from('hero_slides')
            .update({
                title: '',
                subtitle: ''
            })
            .eq('id', slide.id);
    }

    console.log('Hero text update complete.');
}

main();
