import { test, expect } from '@playwright/test'

test.describe('VisualArea', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/customize-proto')
    await page.waitForLoadState('networkidle')
  })

  test('기본 모델 S의 베이스 이미지가 표시된다', async ({ page }) => {
    const baseImage = page.locator('img[alt$="모델 외관"]').first()
    await expect(baseImage).toHaveAttribute('src', expect.stringContaining('s-model'))
  })

  test('모델 변경 시 베이스 이미지 src가 교첻된다', async ({ page }) => {
    const baseImage = page.locator('img[alt$="모델 외관"]').first()

    await page.getByTestId('model-btn-M').click()
    await expect(baseImage).toHaveAttribute('src', expect.stringContaining('m-model'))

    await page.getByTestId('model-btn-L').click()
    await expect(baseImage).toHaveAttribute('src', expect.stringContaining('l-model'))

    await page.getByTestId('model-btn-S').click()
    await expect(baseImage).toHaveAttribute('src', expect.stringContaining('s-model'))
  })

  test('외장마감재 옵션 변경 시 오버레이 이미지 src가 교첻된다', async ({ page }) => {
    const sidebar = page.locator('aside').filter({ hasText: '옵션 선택' })
    await sidebar.getByRole('tab', { name: '외장마감재' }).click()

    const steelWhiteBtn = sidebar.locator('button').filter({ hasText: '골강판 - 화이트' })
    const steelGrayBtn = sidebar.locator('button').filter({ hasText: '골강판 - 그레이' })

    await steelGrayBtn.click()

    const overlayImage = page.locator('img[alt="외장마감재 오버레이"]').first()
    await expect(overlayImage).toHaveAttribute('src', expect.stringContaining('steel-gray'))

    await steelWhiteBtn.click()
    await expect(overlayImage).toHaveAttribute('src', expect.stringContaining('steel-white'))
  })

  test('외관/남장/평멵도 탭이 전환된다', async ({ page }) => {
    const tabs = page.locator('[data-slot="tabs-list"]').first()

    await tabs.getByRole('tab', { name: '외관 보기' }).click()
    await expect(page.locator('img[alt$="모델 외관"]').first()).toBeAttached()

    await tabs.getByRole('tab', { name: '남장 보기' }).click()
    await expect(page.locator('img[alt$="모델 남장"]').first()).toBeAttached()

    await tabs.getByRole('tab', { name: '평멵도' }).click()
    await expect(page.locator('img[alt="평멵도"]').first()).toBeAttached()
  })
})
