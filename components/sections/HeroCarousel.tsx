import { createClient } from '@/utils/supabase/server';
import HeroCarouselClient, { Slide } from './HeroCarouselClientComponent';

async function getHeroSlides() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }

  return data || [];
}

export default async function HeroCarousel() {
  const slides = await getHeroSlides();

  // Fallback slides if DB is empty
  const initialSlides: Slide[] = slides.length > 0 ? slides : [
    {
      id: 1,
      image_url: '/images/products/small/private/02-3x6-house-render.jpg',
      title: '3x6 House',
      subtitle: '',
    },
    {
      id: 2,
      image_url: '/images/products/small/private/01-3x9-house.jpg',
      title: '3x9 House',
      subtitle: '',
    },
  ];

  return <HeroCarouselClient initialSlides={initialSlides} />;
}
