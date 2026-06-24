import { test, expect } from '@playwright/test';

// Verifies the client-side language switch (localStorage 'weet-language') actually
// renders EN/ES content across the newly-i18n'd pages — not just that KO still works.
async function withLang(page: import('@playwright/test').Page, lang: 'EN' | 'ES') {
  await page.addInitScript((l) => {
    try {
      localStorage.setItem('weet-language', l);
    } catch {
      /* ignore */
    }
  }, lang);
}

test.describe('i18n EN/ES smoke', () => {
  test('English renders across key pages', async ({ page }) => {
    await withLang(page, 'EN');

    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    // Home body content from HomeClient COPY.EN (proves content COPY is consumed, not just nav).
    await expect(page.getByText('clear standards.').first()).toBeVisible();
    // Header nav localized.
    await expect(page.getByText('About Modular', { exact: true }).first()).toBeVisible();

    await page.goto('/support');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByText('About Modular', { exact: true }).first()).toBeVisible();

    await page.goto('/projects');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // Configurator hides the global header (full-screen), so just assert it renders in EN context.
    await page.goto('/customize');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('Spanish renders across key pages', async ({ page }) => {
    await withLang(page, 'ES');

    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByText('Sobre Modular', { exact: true }).first()).toBeVisible();

    await page.goto('/support');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');

    await page.goto('/customize');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });
});
