import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`Layout sem overflow em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
    for (const id of ['servicos', 'trabalhos', 'como', 'quem', 'contato']) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
    if (width === 390 || width === 1440) {
      await page.screenshot({ path: `artifacts/goms-${width}.png`, fullPage: true })
    }
  })
}

test('Navegação móvel por âncora e teclado', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Abrir menu' })
  await menu.click()
  await expect(page.locator('#mobile-nav')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-nav')).toBeHidden()
  await expect(menu).toBeFocused()
  await menu.click()
  await page.locator('#mobile-nav').getByRole('link', { name: 'Como trabalhamos' }).click()
  await expect(page).toHaveURL(/#como$/)
  await expect(page.locator('#mobile-nav')).toBeHidden()
  await expect(page.locator('.navbar')).toHaveClass(/navbar-scrolled/)
  const top = await page.locator('#como').evaluate((element) => element.getBoundingClientRect().top)
  expect(top).toBeGreaterThanOrEqual(82)
})

test('Projetos abrem detalhes, contêm foco e restauram foco ao fechar', async ({ page }) => {
  await page.goto('/')
  for (const name of ['Orbit', 'Forma Studio', 'Essência']) {
    const card = page.getByRole('button', { name: `Conhecer ${name}, projeto conceitual` })
    await card.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { name, exact: true })).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Fechar projeto' })).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(dialog.getByRole('link', { name: 'Quero algo assim' })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(card).toBeFocused()
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  }
})

test('Contato placeholder e ausência de erros de execução', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.locator('.nav-cta').click()
  await expect(page).toHaveURL(/#contato$/)
  await expect(page.getByRole('button', { name: 'Falar comigo' })).toBeDisabled()
  await expect(page.getByRole('status')).toHaveText('Contato pelo WhatsApp disponível em breve.')
  expect(errors).toEqual([])
})

test('Acessibilidade WCAG em desktop, mobile e diálogo', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(result.violations).toEqual([])
  }
  await page.getByRole('button', { name: 'Conhecer Orbit, projeto conceitual' }).click()
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(result.violations).toEqual([])
})
