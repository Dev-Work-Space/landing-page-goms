import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Simulação recalcula horas e mantém as premissas ao ajustar o volume pelo teclado', async ({
  page,
}) => {
  await page.goto('/#produtividade')
  const volume = page.getByRole('slider', { name: 'Operações por mês' })
  const savedTime = page.locator('.productivity-metrics > div').first()
  const distribution = page.getByRole('img', { name: /horas liberadas e/ })

  await expect(volume).toHaveValue('100')
  await expect(savedTime).toContainText('30h')
  await expect(distribution).toHaveAccessibleName(
    '30 horas liberadas e 10 horas de operação com sistema, de um total de 40 horas com planilhas.',
  )

  await volume.focus()
  await page.keyboard.press('Home')
  await expect(volume).toHaveValue('20')
  await expect(savedTime).toContainText('6h')
  await expect(distribution).toHaveAccessibleName(
    '6 horas liberadas e 2 horas de operação com sistema, de um total de 8 horas com planilhas.',
  )

  await page.keyboard.press('End')
  await expect(volume).toHaveValue('300')
  await expect(savedTime).toContainText('90h')
  await expect(distribution).toHaveAccessibleName(
    '90 horas liberadas e 30 horas de operação com sistema, de um total de 120 horas com planilhas.',
  )
  await expect(page.locator('.productivity-metrics')).toContainText('−75%')
  await expect(page.locator('.productivity-metrics')).toContainText('4×')
  await expect(page.locator('#productivity-assumptions')).toContainText(
    'não são resultados medidos',
  )
  await expect(page.locator('.task-chart-row')).toHaveCount(4)
  await page.getByRole('link', { name: 'Vamos entender seu processo' }).click()
  await expect(page).toHaveURL(/#contato$/)
})

test('Comparativo e gráficos acessíveis em desktop e celular', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    for (const id of ['comparativo', 'produtividade']) {
      const section = page.locator(`#${id}`)
      await section.scrollIntoViewIfNeeded()
      await expect(section.getByRole('heading', { level: 2 })).toBeVisible()
      await section.screenshot({
        path: `artifacts/${id}-${width}.png`,
        style: '.navbar, .skip-link { visibility: hidden !important; }',
      })
      const result = await new AxeBuilder({ page })
        .include(`#${id}`)
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
      expect(result.violations).toEqual([])
    }
  }
})
