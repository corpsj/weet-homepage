import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

function TestButton({ label }: { label: string }) {
  return <button>{label}</button>;
}

describe('Example React component', () => {
  it('renders button with label', () => {
    render(<TestButton label="테스트 버튼" />);
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });
});
