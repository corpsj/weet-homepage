import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, ...rest }: Record<string, unknown>) => (
      <div className={className as string} style={style as React.CSSProperties}>
        {children as React.ReactNode}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockOpenKakaoChannel = vi.fn();
let mockKakaoReady = false;

vi.mock('@/lib/kakao', () => ({
  isKakaoReady: () => mockKakaoReady,
  openKakaoChannel: () => mockOpenKakaoChannel(),
}));

vi.mock('@/components/ui/ConsultationModal', () => ({
  ConsultationModal: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid="consultation-modal">
        <button type="button" onClick={onClose}>닫기</button>
      </div>
    ) : null,
}));

import { FloatingKakaoCTA } from '@/components/ui/FloatingKakaoCTA';

describe('FloatingKakaoCTA', () => {
  it('renders the kakao button', () => {
    render(<FloatingKakaoCTA />);
    expect(screen.getByLabelText('카카오톡 상담')).toBeInTheDocument();
  });

  it('opens consultation modal when Kakao is not ready', () => {
    mockKakaoReady = false;
    render(<FloatingKakaoCTA />);
    fireEvent.click(screen.getByLabelText('카카오톡 상담'));
    expect(screen.getByTestId('consultation-modal')).toBeInTheDocument();
  });

  it('calls openKakaoChannel when Kakao is ready', () => {
    mockKakaoReady = true;
    render(<FloatingKakaoCTA />);
    fireEvent.click(screen.getByLabelText('카카오톡 상담'));
    expect(mockOpenKakaoChannel).toHaveBeenCalled();
  });
});
