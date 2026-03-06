import { describe, it, expect } from 'vitest';

describe('vitest setup', () => {
  it('should work with jsdom environment', () => {
    expect(typeof document).toBe('object');
    expect(document.createElement('div')).toBeTruthy();
  });
});
