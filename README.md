# Goms

Landing page responsiva em React, Vite, TypeScript e Tailwind CSS. Interface em português, com tema escuro e verde-lima. Ícones Lucide e fonte Manrope hospedada localmente pelo build.

## Rodar

```sh
npm install
npm run dev
```

`npm run build` valida os tipos e gera `dist/`. `npm run preview` serve o resultado de produção.

## Verificação

```sh
npx playwright install chromium
npm test
```

Os testes cobrem cinco larguras de tela (320–1440px), âncoras, menu móvel, foco e fechamento dos diálogos, estado do contato e auditoria automatizada WCAG com axe. `npm run format` formata o código. Testes automatizados não substituem uma auditoria completa com tecnologias assistivas.

## Organização

```text
src/
  components/    # Navbar, botões, cards, previews, títulos e scroll reveal
    ui/          # Carousel, Avatar, Card e Button do shadcn/ui
  sections/      # Hero, Services, Work, Process, About, Contact e Footer
  data/site.ts   # Navegação, portfólio e configuração de contato
  data/team.ts   # Perfis individuais de Bruno e Joao
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
- SEO: title, description e tags Open Graph estão em `index.html`. Ao publicar em um domínio definitivo, acrescente canonical, `og:url` e uma imagem social com URL absoluta.
- Cores e fonte: tokens em `@theme`, no início de `src/styles.css`.

## Decisões

- Tailwind integrado pelo plugin oficial do Vite: https://tailwindcss.com/docs/installation/using-vite
- Componentes oficiais shadcn/ui em `src/components/ui`, instalados manualmente do registro new-york-v4: [Carousel](https://ui.shadcn.com/docs/components/carousel), Card, Avatar e Button. Imports adaptados para `@/lib/utils` e pacotes Radix individuais. Paleta preservada nos tokens Tailwind.
- O carrossel da equipe usa Embla, sem reprodução automática, com setas, seleção por nome, teclado e gesto de arrastar. Respeita movimento reduzido e remove os slides inativos da navegação por teclado. Os testes verificam também a troca de perfil após redimensionar a tela.
- Previews de projetos, avatar e arte do hero criados com CSS e SVG de ícones; não dependem de imagens remotas.
- Scroll reveal usa IntersectionObserver e respeita `prefers-reduced-motion`. O conteúdo é visível por padrão.
- Menu móvel com controle por teclado e Escape. Diálogos nativos com foco contido, fechamento por Escape, botão e fundo.
- Navbar fixa com blur ao rolar, scroll suave e compensação para as âncoras.

Paleta: `#101211` (fundo), `#191C19` (superfícies), `#30352F` (bordas), `#F4F5EF` (texto), `#A6ADA3` (apoio), `#C8F56A` (destaque).

# landing-page
# la-lolla
