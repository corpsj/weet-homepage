import { test, expect } from '@playwright/test'

test.describe('OptionSidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/customize-proto')
    await page.waitForLoadState('networkidle')
  })

  test('옵션 사이드바가 데스크톱에서 표시된다', async ({ page }) => {
    const sidebar = page.locator('aside').filter({ hasText: '옵션 선택' })
    await expect(sidebar).toBeVisible()
  })

  test('외장마감재 카테고리의 옵션을 선택할 수 있다', async ({ page }) => {
    const sidebar = page.locator('aside').filter({ hasText: '옵션 선택' })

    await sidebar.getByRole('tab', { name: '외장마감재' }).click()

    const optionButton = sidebar.locator('button').filter({ hasText: '적삼목' })
    await optionButton.click()

    await expect(optionButton).toHaveClass(/border-primary/)
  })

  test('옵션 선택 시 가격이 반영된다', async ({ page }) => {
    const sidebar = page.locator('aside').filter({ hasText: '옵션 선택' })

    await page.waitForSelector('[data-testid="total-price"]:has-text("₩50,000,000")')

    await sidebar.getByRole('tab', { name: '외장마감재' }).click()

    const optionButton = sidebar.locator('button').filter({ hasText: '적삼목' })
    await optionButton.click()

    const priceDisplay = page.locator('[data-testid="total-price"]')
    await expect(priceDisplay).toContainText('65,000,000')
  })

  test('기본 포함 옵션은 기본 포함 배지가 표시된다', async ({ page }) => {
    const sidebar = page.locator('aside').filter({ hasText: '옵션 선택' })

    await sidebar.getByRole('tab', { name: '주방' }).click()

    const basicOption = sidebar.locator('button').filter({ hasText: '기본포함' })
    await expect(basicOption.locator('text=기본 포함')).toBeVisible()
  })

  test('유료 옵션은 가격이 인라인으로 표시된다', async ({ page }) => {
    const sidebar = page.locator('aside').filter({ hasText: '옵션 선택' })

    await sidebar.getByRole('tab', { name: '외장마감재' }).click()

    const optionButton = sidebar.locator('button').filter({ hasText: '적삼목' })
    await expect(optionButton.locator('text=+₩15,000,000')).toBeVisible()
  })
})
