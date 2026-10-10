import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

const outputDirectory = resolve('dist')
const rendererDirectory = resolve(outputDirectory, '.ssr')
const mode = 'production'

await build({ mode })

try {
  await build({
    mode,
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: rendererDirectory,
      emptyOutDir: true,
      copyPublicDir: false,
    },
  })
  const { render } = await import(pathToFileURL(resolve(rendererDirectory, 'entry-server.js')))
  const { html, year } = render()
  const template = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')

  if (!template.includes('<!--app-html-->')) {
    throw new Error('O template precisa conter o marcador <!--app-html-->.')
  }

  const assets = await readdir(resolve(outputDirectory, 'assets'))
  const font = assets.find((file) => /^manrope-latin-wght-normal-.*\.woff2$/.test(file))
  const preload = font
    ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />\n`
    : ''
  const result = template
    .replace('<!--app-html-->', () => html)
    .replace('id="root"', `id="root" data-prerendered="true" data-render-year="${year}"`)
    .replace('</head>', `${preload}</head>`)

  await writeFile(resolve(outputDirectory, 'index.html'), result)
  console.log('Landing page pré-renderizada em dist/index.html.')
} finally {
  await rm(rendererDirectory, { recursive: true, force: true })
}
