import { createClient } from '@/utils/supabase/server';
import HeroCarouselClient, { Slide } from './HeroCarouselClientComponent';

async function getHeroSlides() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }

  return (data || []).map(slide => ({
    id: slide.id,
    image_url: slide.image_url,
    title: slide.title,
    subtitle: slide.subtitle || '',
    link_url: slide.link_url || undefined,
  }));
}

export default async function HeroCarousel() {
  const slides = await getHeroSlides();
  const initialSlides: Slide[] = slides.length > 0 ? slides : [
    {
      id: 'fallback-main',
      image_url: '/images/hero_main.webp',
      title: 'Welcome to weet:)',
      subtitle: 'We make dreams come true.',
    }
  ];

  return <HeroCarouselClient initialSlides={initialSlides} />;
}
