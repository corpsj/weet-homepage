import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

function TestComponent({ name }: { name: string }) {
  return <div>Hello, {name}!</div>;
}

describe('TestComponent', () => {
  it('renders correctly with name prop', () => {
    render(<TestComponent name="weet" />);
    expect(screen.getByText('Hello, weet!')).toBeInTheDocument();
  });

  it('renders with different name', () => {
    render(<TestComponent name="World" />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
