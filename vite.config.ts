import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import site from './site.config.json'

function seoPlugin(siteUrl: string, indexable: boolean): Plugin {
  const imageUrl = new URL(site.socialImage, siteUrl).href
  const organizationId = `${siteUrl}#organization`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: site.name,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: new URL('/icon-512.png', siteUrl).href,
          width: 512,
          height: 512,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        name: site.name,
        url: siteUrl,
        inLanguage: 'pt-BR',
        publisher: { '@id': organizationId },
      },
    ],
  }
  let serverBuild = false

  return {
    name: 'goms-seo',
    configResolved(config) {
      serverBuild = Boolean(config.build.ssr)
    },
    transformIndexHtml() {
      const meta = (name: string, content: string, property = false) => ({
        tag: 'meta',
        attrs: { [property ? 'property' : 'name']: name, content },
      })
      return [
        { tag: 'title', children: site.title },
        meta('description', site.description),
        ...(indexable ? [] : [meta('robots', 'noindex, follow')]),
        { tag: 'link', attrs: { rel: 'canonical', href: siteUrl } },
        meta('og:type', 'website', true),
        meta('og:locale', 'pt_BR', true),
        meta('og:site_name', site.name, true),
        meta('og:title', site.title, true),
        meta('og:description', site.description, true),
        meta('og:url', siteUrl, true),
        meta('og:image', imageUrl, true),
        meta('og:image:type', 'image/png', true),
        meta('og:image:width', '1200', true),
        meta('og:image:height', '630', true),
        meta('og:image:alt', 'Goms — Sites e sistemas sob medida.', true),
        meta('twitter:card', 'summary_large_image'),
        meta('twitter:title', site.title),
        meta('twitter:description', site.description),
        meta('twitter:image', imageUrl),
        meta('twitter:image:alt', 'Goms — Sites e sistemas sob medida.'),
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        },
      ]
    },
    generateBundle() {
      if (serverBuild) return
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${indexable ? `Sitemap: ${siteUrl}sitemap.xml\n` : ''}`,
      })
      if (indexable) {
        // Only the home is a public, indexable route. Anchors and the 404 stay out.
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}</loc></url></urlset>\n`,
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  const siteUrl = new URL(env.SITE_URL || site.url)
  if (
    siteUrl.protocol !== 'https:' ||
    siteUrl.pathname !== '/' ||
    siteUrl.search ||
    siteUrl.hash ||
    siteUrl.username ||
    siteUrl.password
  ) {
    throw new Error(
      'SITE_URL precisa ser uma origem HTTPS, sem caminho, parâmetros ou credenciais.',
    )
  }
  const environment = env.VERCEL_ENV || (mode === 'production' ? 'production' : 'development')

  return {
    plugins: [react(), tailwindcss(), seoPlugin(siteUrl.href, environment === 'production')],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  }
})
