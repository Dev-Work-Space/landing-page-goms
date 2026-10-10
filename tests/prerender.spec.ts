import { expect, test } from '@playwright/test'

// These checks exercise the actual build; the dev server intentionally still uses CSR.
test.describe('Pré-renderização de produção', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(!testInfo.config.configFile?.includes('production'), 'Requer o build de produção.')
  })

  test('HTML HTTP inicial contém conteúdo e metadados sem executar JavaScript', async ({
    request,
  }) => {
    const response = await request.get('/')
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html).toContain('data-prerendered="true"')
    expect(html).toContain('<h1 id="hero-title">Sites e')
    expect(html).toContain('Sites &amp; landing pages')
    expect(html).toContain('application/ld+json')
    expect(html).not.toContain('noindex')
    expect((await request.get('/robots.txt')).status()).toBe(200)
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    expect(await sitemap.text()).toContain('<urlset')
  })

  test('Conteúdo permanece legível com JavaScript desativado', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    try {
      const page = await context.newPage()
      await page.goto('http://127.0.0.1:5175/')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sites esistemassob medida.')
      await expect(page.getByRole('heading', { name: 'Sites & landing pages' })).toBeVisible()
      await expect(page.locator('.project-summary').first()).toBeVisible()
    } finally {
      await context.close()
    }
  })

  test('Hidratação mantém simulador, carrossel e diálogos funcionais', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    await page.goto('/')
    await page.getByRole('slider', { name: 'Operações por mês' }).fill('200')
    await expect(page.locator('.productivity-metrics > div').first().locator('strong')).toHaveText(
      '60h',
    )
    await page.getByRole('button', { name: 'Ver perfil de Joao' }).click()
    await expect(page.getByRole('heading', { name: 'Prazer, Joao.' })).toBeVisible()
    await page.getByRole('button', { name: 'Conhecer Orbit, projeto conceitual' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toBeHidden()
    expect(errors).toEqual([])
  })
})
