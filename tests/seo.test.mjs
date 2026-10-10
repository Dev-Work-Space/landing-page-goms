import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

const output = resolve('dist')
const html = await readFile(resolve(output, 'index.html'), 'utf8')
const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1]
const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'

test('O HTML inicial contém a oferta, as seções e os destinos das âncoras sem JavaScript', () => {
  assert.match(html, /data-prerendered="true"/)
  assert.match(html, /<main id="main">/)
  assert.equal((html.match(/<h1\b/g) || []).length, 1)
  for (const text of [
    'Sites e',
    'sistemas',
    'sob medida.',
    'Sites &amp; landing pages',
    'Integrações',
  ]) {
    assert.ok(html.includes(text), `Conteúdo ausente no HTML inicial: ${text}`)
  }
  for (const id of [
    'inicio',
    'servicos',
    'comparativo',
    'produtividade',
    'trabalhos',
    'como',
    'quem',
    'contato',
  ]) {
    assert.ok(html.includes(`id="${id}"`), `Seção ausente: ${id}`)
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))
  for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(match[1]), `Âncora sem destino: ${match[1]}`)
  }
})

test('Produção permite indexação; preview contém noindex no HTML inicial', async () => {
  assert.ok(canonical && canonical.startsWith('https://'))
  const robots = await readFile(resolve(output, 'robots.txt'), 'utf8')
  if (preview) {
    assert.match(html, /name="robots" content="noindex, follow"/)
    assert.doesNotMatch(robots, /Sitemap:/)
    await assert.rejects(access(resolve(output, 'sitemap.xml')), { code: 'ENOENT' })
  } else {
    assert.doesNotMatch(html, /noindex/)
    assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`))
    const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8')
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`))
    assert.equal((sitemap.match(/<loc>/g) || []).length, 1)
    assert.doesNotMatch(sitemap, /404|index\.html|#|\.vercel\.app\/.*preview/)
  }
})

test('Dados estruturados descrevem a organização e o site com a mesma URL canônica', () => {
  const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  assert.ok(raw, 'JSON-LD ausente')
  const data = JSON.parse(raw)
  assert.deepEqual(
    data['@graph'].map((item) => item['@type']),
    ['Organization', 'WebSite'],
  )
  for (const item of data['@graph']) assert.equal(item.url, canonical)
  assert.doesNotMatch(raw, /Review|AggregateRating|FAQPage|SoftwareApplication/)
})

test('Imagem social e ícones existem e têm as dimensões declaradas', async () => {
  assert.ok(html.includes(`property="og:url" content="${canonical}"`))
  assert.ok(
    html.includes(`property="og:image" content="${new URL('/og-image.png', canonical).href}"`),
  )
  assert.match(html, /name="twitter:card" content="summary_large_image"/)
  for (const [file, width, height] of [
    ['og-image.png', 1200, 630],
    ['favicon-32.png', 32, 32],
    ['apple-touch-icon.png', 180, 180],
    ['icon-192.png', 192, 192],
    ['icon-512.png', 512, 512],
  ]) {
    const png = await readFile(resolve(output, file))
    assert.equal(png.subarray(1, 4).toString(), 'PNG')
    assert.equal(png.readUInt32BE(16), width)
    assert.equal(png.readUInt32BE(20), height)
  }
  const manifest = JSON.parse(await readFile(resolve(output, 'site.webmanifest'), 'utf8'))
  for (const icon of manifest.icons) await access(resolve(output, icon.src.slice(1)))
})

test('Fonte pré-carregada existe; renderer de build não é publicado; 404 não é indexável', async () => {
  const font = html.match(/rel="preload" href="([^"]+)" as="font"/)?.[1]
  assert.ok(font)
  await access(resolve(output, font.slice(1)))
  await assert.rejects(access(resolve(output, '.ssr')), { code: 'ENOENT' })
  const notFound = await readFile(resolve(output, '404.html'), 'utf8')
  assert.match(notFound, /name="robots" content="noindex, follow"/)
  assert.match(notFound, /href="\/"/)
})
