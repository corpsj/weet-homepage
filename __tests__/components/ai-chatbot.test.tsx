import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style }: Record<string, unknown>) => (
      <div className={className as string} style={style as React.CSSProperties}>
        {children as React.ReactNode}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('lucide-react', () => ({
  MessageCircle: () => <span data-testid="icon-message" />,
  X: () => <span data-testid="icon-x" />,
  Send: () => <span data-testid="icon-send" />,
  Bot: () => <span data-testid="icon-bot" />,
  User: () => <span data-testid="icon-user" />,
}));

vi.mock('@/lib/design-tokens', () => ({
  zIndex: { chatbot: 500 },
}));

import { AIChatbot } from '@/components/ui/AIChatbot';

describe('AIChatbot', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders toggle button', () => {
    render(<AIChatbot />);
    expect(screen.getByLabelText('AI 상담 시작')).toBeInTheDocument();
  });

  it('opens chat on toggle click', () => {
    render(<AIChatbot />);
    fireEvent.click(screen.getByLabelText('AI 상담 시작'));
    expect(screen.getByText('위트 AI 상담')).toBeInTheDocument();
  });

  it('shows initial greeting message', () => {
    render(<AIChatbot />);
    fireEvent.click(screen.getByLabelText('AI 상담 시작'));
    expect(screen.getByText(/위트 AI 상담봇이에요/)).toBeInTheDocument();
  });

  it('shows quick replies on initial state', () => {
    render(<AIChatbot />);
    fireEvent.click(screen.getByLabelText('AI 상담 시작'));
    expect(screen.getByText('모듈러 건축이 뭔가요?')).toBeInTheDocument();
    expect(screen.getByText('가격대가 궁금해요')).toBeInTheDocument();
  });

  it('sends user message via quick reply and gets auto-reply', () => {
    render(<AIChatbot />);
    fireEvent.click(screen.getByLabelText('AI 상담 시작'));
    fireEvent.click(screen.getByText('가격대가 궁금해요'));

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      vi.advanceTimersByTime(900);
    });

    expect(screen.getByText(/견적/)).toBeInTheDocument();
  });

  it('sends user message via input and gets auto-reply', () => {
    render(<AIChatbot />);
    fireEvent.click(screen.getByLabelText('AI 상담 시작'));
    const input = screen.getByPlaceholderText('질문을 입력하세요...');
    fireEvent.change(input, { target: { value: '체류형 쉼터' } });
    fireEvent.submit(input.closest('form')!);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      vi.advanceTimersByTime(900);
    });

    expect(screen.getByText(/33㎡/)).toBeInTheDocument();
  });

  it('returns fallback reply for unknown input', () => {
    render(<AIChatbot />);
    fireEvent.click(screen.getByLabelText('AI 상담 시작'));
    const input = screen.getByPlaceholderText('질문을 입력하세요...');
    fireEvent.change(input, { target: { value: '날씨 어때?' } });
    fireEvent.submit(input.closest('form')!);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      vi.advanceTimersByTime(900);
    });

    expect(screen.getByText(/전문 상담사와 연결/)).toBeInTheDocument();
  });
});
