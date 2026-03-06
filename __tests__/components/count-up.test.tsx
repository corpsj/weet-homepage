import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';

vi.mock('framer-motion', () => ({
  useInView: () => true,
}));

import { CountUp } from '@/components/ui/CountUp';

describe('CountUp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with prefix and suffix', () => {
    render(<CountUp end={100} prefix="₩" suffix="만" />);
    const el = screen.getByText(/₩.*만/);
    expect(el).toBeInTheDocument();
  });

  it('starts from 0', () => {
    render(<CountUp end={50} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CountUp end={10} className="text-bold" />);
    const el = screen.getByText('0');
    expect(el).toHaveClass('text-bold');
  });
});
