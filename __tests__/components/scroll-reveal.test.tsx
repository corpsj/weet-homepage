import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...rest }: Record<string, unknown>) => (
      <div className={className as string} data-testid="motion-div">
        {children as React.ReactNode}
      </div>
    ),
  },
  useInView: () => true,
}));

vi.mock('@/lib/animations', () => ({
  scrollReveal: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}));

import { ScrollReveal } from '@/components/ui/ScrollReveal';

describe('ScrollReveal', () => {
  it('renders children', () => {
    render(
      <ScrollReveal>
        <p>콘텐츠가 보입니다</p>
      </ScrollReveal>,
    );
    expect(screen.getByText('콘텐츠가 보입니다')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ScrollReveal className="my-class">
        <span>내용</span>
      </ScrollReveal>,
    );
    expect(screen.getByTestId('motion-div')).toHaveClass('my-class');
  });
});
