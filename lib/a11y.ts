/** Minimum touch target size per KWCAG 2.2 */
export const MIN_TOUCH_TARGET = 44;

/** Minimum color contrast ratio per KWCAG 2.2 */
export const MIN_CONTRAST_RATIO = 4.5;

/**
 * Announce a message to screen readers via aria-live region
 */
export function announceToScreenReader(message: string): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById('a11y-announcer');
  if (el) {
    el.textContent = '';
    // Force reannounce by clearing first
    requestAnimationFrame(() => {
      el.textContent = message;
    });
  }
}

/**
 * Trap focus within a container (for modals/dialogs)
 * Returns a cleanup function
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
  }

  container.addEventListener('keydown', handleKeyDown);
  first?.focus();

  return () => container.removeEventListener('keydown', handleKeyDown);
}

/**
 * Calculate relative luminance (WCAG 2.1)
 */
function luminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/.{2}/g)?.map(c => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }) ?? [0, 0, 0];
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

/**
 * Check color contrast ratio between two hex colors
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
