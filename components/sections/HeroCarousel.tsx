import { createClient } from '@/utils/supabase/server';
import HeroCarouselClient, { Slide } from './HeroCarouselClientComponent';

async function getHeroSlides() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }

  return data || [];
}

export default async function HeroCarousel() {
  // Force usage of local slides due to DB connection issues
  // const slides = await getHeroSlides();
  // const initialSlides: Slide[] = slides.length > 0 ? slides : [
  const initialSlides: Slide[] = [
    {
      id: 1,
      image_url: '/images/hero_main.jpg',
      title: 'Welcome to weet:)',
      subtitle: 'We make dreams come true.',
    },
    {
      id: 2,
      image_url: '/images/hero_2.jpg',
      title: '',
      subtitle: '',
    },
    {
      id: 3,
      image_url: '/images/hero_3.jpg',
      title: '',
      subtitle: '',
    },
    {
      id: 4,
      image_url: '/images/hero_4.jpg',
      title: '',
      subtitle: '',
    },
  ];

  return <HeroCarouselClient initialSlides={initialSlides} />;
}
