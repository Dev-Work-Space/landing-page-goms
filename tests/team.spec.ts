import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [390, 1440]) {
  test(`Perfis individuais, setas e teclado em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/#quem')
    const carousel = page.getByRole('region', { name: 'Pessoas da Goms' })
    const previous = carousel.getByRole('button', { name: 'Pessoa anterior', exact: true })
    const next = carousel.getByRole('button', { name: 'Próxima pessoa', exact: true })
    await expect(carousel.getByRole('heading', { name: 'Prazer, Bruno.' })).toBeVisible()
    await expect(carousel.getByRole('heading', { name: 'Prazer, Joao.' })).toHaveCount(0)
    await expect(previous).toBeDisabled()
    await next.click()
    await expect(carousel.getByRole('heading', { name: 'Prazer, Joao.' })).toBeVisible()
    await expect(carousel.getByRole('heading', { name: 'Prazer, Bruno.' })).toHaveCount(0)
    await expect(next).toBeDisabled()
    await expect(carousel.getByRole('button', { name: 'Ver perfil de Joao' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await expect(page.locator('#profile-bruno')).toHaveAttribute('inert', '')
    await previous.click()
    await carousel.focus()
    await page.keyboard.press('ArrowRight')
    await expect(carousel.getByRole('heading', { name: 'Prazer, Joao.' })).toBeVisible()
    await page.keyboard.press('ArrowLeft')
    await expect(carousel.getByRole('heading', { name: 'Prazer, Bruno.' })).toBeVisible()
    await carousel.getByRole('button', { name: 'Ver perfil de Joao' }).click()
    await expect(carousel.getByRole('heading', { name: 'Prazer, Joao.' })).toBeVisible()
    await page.locator('#quem').screenshot({
      path: `artifacts/quem-faz-${width}.png`,
      style: '.navbar, .skip-link { visibility: hidden !important; }',
    })
    const viewportLeft = await carousel
      .locator('[data-slot="carousel-content"]')
      .evaluate((element) => element.getBoundingClientRect().left)
    const profileLeft = await page
      .locator('#profile-joao .founder-art')
      .evaluate((element) => element.getBoundingClientRect().left)
    expect(Math.abs(profileLeft - viewportLeft)).toBeLessThan(1)
    const result = await new AxeBuilder({ page })
      .include('#quem')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(result.violations).toEqual([])
    await page.setViewportSize({ width: width === 390 ? 1440 : 390, height: 900 })
    await expect(carousel.getByRole('heading', { name: 'Prazer, Joao.' })).toBeVisible()
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
      .toBeLessThanOrEqual(width === 390 ? 1440 : 390)
  })
}

test('Gesto de arrastar troca o perfil no celular', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  try {
    await page.goto('http://127.0.0.1:5175/#quem')
    const portrait = page.locator('#profile-bruno .founder-art')
    await portrait.scrollIntoViewIfNeeded()
    const box = await portrait.boundingBox()
    expect(box).not.toBeNull()
    const touch = await context.newCDPSession(page)
    const startX = box!.x + box!.width - 25
    const y = box!.y + box!.height / 2
    await touch.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: startX, y }],
    })
    for (let step = 1; step <= 10; step++) {
      await touch.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: startX - step * 27, y }],
      })
    }
    await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await expect(page.getByRole('heading', { name: 'Prazer, Joao.' })).toBeVisible()
  } finally {
    await context.close()
  }
})
