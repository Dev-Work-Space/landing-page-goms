# Goms

Landing page responsiva em React, Vite, TypeScript e Tailwind CSS. O build pré-renderiza a página em HTML estático (SSG); React hidrata as interações no navegador. Interface em português, com tema escuro e verde-lima. Ícones Lucide e fonte Manrope hospedada localmente pelo build.

## Rodar

```sh
npm install
npm run dev
```

`npm run build` valida os tipos, gera os assets e pré-renderiza o conteúdo em `dist/index.html`. O renderer temporário é removido ao final; não é necessário um servidor Node em produção. `npm run preview` serve o resultado de produção. `npm run dev` usa renderização no navegador para manter o fluxo de desenvolvimento do Vite.

## Verificação

```sh
npx playwright install chromium
npm test
```

Os testes cobrem cinco larguras de tela (320–1440px), âncoras, menu móvel, foco e fechamento dos diálogos, estado do contato e auditoria automatizada WCAG com axe. `npm run format` formata o código. Testes automatizados não substituem uma auditoria completa com tecnologias assistivas.

Para verificar o HTML publicado e a hidratação:

```sh
npm run build
npm run test:seo
npm run test:production
```

`test:seo` não usa navegador: verifica conteúdo inicial, âncoras, indexação, sitemap, JSON-LD e dimensões dos assets. `test:production` roda a suíte Playwright contra o build, incluindo leitura sem JavaScript e interações após hidratação; exige um Chromium já disponível. O preview local do Vite possui fallback de SPA para URLs desconhecidas e não reproduz os status 404 ou redirecionamentos da Vercel.

## Organização

```text
src/
  components/    # Navbar, botões, cards, previews, títulos e scroll reveal
    ui/          # Carousel, Avatar, Card e Button do shadcn/ui
  sections/      # Hero, Services, Comparison, Productivity, Work, Process, About, Contact e Footer
  data/site.ts   # Navegação, portfólio e configuração de contato
  data/team.ts   # Perfis individuais de Bruno e Joao
  data/productivity.ts # Premissas ilustrativas e tempos da simulação de produtividade
  styles.css     # Tokens Tailwind, estilos dos componentes e responsividade
  App.tsx
  main.tsx
public/
  favicon.svg
```

## Personalização

- WhatsApp: copie `.env.example` para `.env.local` e preencha `VITE_WHATSAPP_NUMBER` com o número internacional, apenas dígitos. Reinicie o servidor ou refaça o build. Enquanto o placeholder estiver vazio, os botões iniciais levam à seção de contato; o botão final fica desabilitado e informa a indisponibilidade do canal. Nenhum número fictício recebe mensagens.
- Portfólio: os três projetos em `src/data/site.ts` são demonstrativos e estão identificados como conceitos. Os cards abrem detalhes em diálogos acessíveis. Substitua textos e previews por projetos reais quando disponíveis.
- Equipe: `src/data/team.ts` contém as bios genéricas individuais de Bruno e Joao. `src/sections/About.tsx` apresenta os perfis em um carrossel, com avatares tipográficos e um perfil por vez. Edite os dados para personalizar cada pessoa.
- Marca: usei Goms em toda a página. A menção a Algox no briefing foi tratada como remanescente.
- SEO: nome, URL principal, title e description estão em `site.config.json`. `vite.config.ts` injeta canonical, Open Graph, Twitter Card e JSON-LD (`Organization` e `WebSite`), e gera robots/sitemap. `SITE_URL` pode substituir a URL principal pelo domínio definitivo, sempre HTTPS e sem caminho. Não use a URL de cada preview como domínio canônico.
- Ambientes: Vercel fornece `VERCEL_ENV` no build. Produção é indexável; previews/desenvolvimento recebem `noindex, follow` no HTML inicial e não geram sitemap. Para staging em outro provedor, configure `VERCEL_ENV=preview`. Builds locais normais são de produção. Não bloqueie o rastreamento de previews no robots, pois o robô precisa ler o `noindex`.
- Compartilhamento: `public/og-image.png` mede 1200×630; o SVG editável está em `public/og-image.svg`. Favicon PNG, Apple Touch Icon e ícones do manifest seguem o favicon SVG existente. Os PNGs são versionados; o build não depende de ferramentas de imagem.
- Cores e fonte: tokens em `@theme`, no início de `src/styles.css`.
- Comparativo: `src/sections/Comparison.tsx` apresenta controles manuais e processos conectados. As ilustrações em `OperationPreview.tsx` usam CSS e Lucide, seguindo os previews existentes.
- Produtividade: a seção `Productivity.tsx` simula de 20 a 300 operações mensais. Os tempos hipotéticos por atividade ficam em `src/data/productivity.ts` (24 min em planilhas e 6 min em sistema por operação). Indicadores e gráficos derivam dessas premissas; não representam resultados medidos de clientes. Atualize os tempos com dados validados antes de apresentar ganhos reais.

## Decisões

- Tailwind integrado pelo plugin oficial do Vite: https://tailwindcss.com/docs/installation/using-vite
- Componentes oficiais shadcn/ui em `src/components/ui`, instalados manualmente do registro new-york-v4: [Carousel](https://ui.shadcn.com/docs/components/carousel), Card, Avatar e Button. Imports adaptados para `@/lib/utils` e pacotes Radix individuais. Paleta preservada nos tokens Tailwind.
- O carrossel da equipe usa Embla, sem reprodução automática, com setas, seleção por nome, teclado e gesto de arrastar. Respeita movimento reduzido e remove os slides inativos da navegação por teclado. Os testes verificam também a troca de perfil após redimensionar a tela.
- Previews de projetos, avatar e arte do hero criados com CSS e SVG de ícones; não dependem de imagens remotas.
- Scroll reveal usa IntersectionObserver e respeita `prefers-reduced-motion`. A animação mantém o conteúdo visível; nenhuma seção depende do scroll para se tornar legível.
- Menu móvel com controle por teclado e Escape. Diálogos nativos com foco contido, fechamento por Escape, botão e fundo.
- Navbar fixa com blur ao rolar, scroll suave e compensação para as âncoras.

Paleta: `#101211` (fundo), `#191C19` (superfícies), `#30352F` (bordas), `#F4F5EF` (texto), `#A6ADA3` (apoio), `#C8F56A` (destaque).

## Publicação e configurações externas

`vercel.json` define o build, a pasta `dist`, o redirecionamento permanente de `/index.html` para `/`, a política sem barra final nas rotas e cache longo apenas para assets com hash. `public/404.html` é a página de erro estática da Vercel; não adicione um rewrite global para a home. HTTPS e HSTS são fornecidos pela hospedagem. Após publicar, confirme respostas HTTP, o redirecionamento e o `noindex` em cada preview.

- Search Console: com domínio próprio, adicione uma propriedade de Domínio e cadastre o TXT fornecido no DNS. No subdomínio `vercel.app`, use uma propriedade de Prefixo de URL e verificação por arquivo HTML em `public/` ou meta tag. Depois de publicar, envie `/sitemap.xml` e inspecione a home.
- Bing Webmaster: importe a propriedade do Search Console ou verifique o site diretamente e envie o sitemap.
- Analytics: crie a propriedade e o fluxo Web, obtenha o ID de medição e defina os eventos de contato antes de integrar. Nenhum tracker está instalado por padrão.
- Google Business Profile: use apenas se houver atendimento presencial elegível; negócios exclusivamente online não se qualificam.
- Autoridade: mantenha perfis oficiais da empresa/equipe, diretórios pertinentes e referências a projetos reais. Sem compra de links.
- Palavras-chave: valide as hipóteses de sites, software sob medida e automação no Search Console e no Planejador de Palavras-chave; este projeto não contém estimativas de volume.
- Conteúdo futuro: páginas de soluções, artigos e cases devem ter URLs próprias e links internos. Depoimentos e resultados precisam de dados reais e autorização para publicação. Não há marcação `Review`, `AggregateRating`, `FAQPage` ou `SoftwareApplication` nesta landing de serviços.
- Performance: compare Lighthouse mobile/desktop antes e depois de publicar; acompanhe LCP, CLS e INP no percentil 75 em dados de campo. Não há notas Lighthouse incluídas neste repositório.

# landing-page

# la-lolla
