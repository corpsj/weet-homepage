import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroCarouselClient from '../HeroCarouselClientComponent';

vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    common: {
      more: 'SCROLL',
    },
  }),
}));

describe('HeroCarouselClient', () => {
  it('renders a safe fallback when no active hero slides are provided', () => {
    render(<HeroCarouselClient initialSlides={[]} />);

    expect(screen.getByRole('heading', { name: '공간의 가능성을 설계합니다' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '상담 구성 시작하기' })).toHaveAttribute('href', '/customize');
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });
});
