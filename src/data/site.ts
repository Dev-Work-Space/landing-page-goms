export const navigation = [
  { href: '#servicos', label: 'O que a gente faz' },
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#como', label: 'Como trabalhamos' },
  { href: '#quem', label: 'Time' },
]

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')
export const whatsappUrl = /^\d{10,15}$/.test(whatsappNumber)
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá, Bruno e Joao! Conheci a Goms e quero conversar sobre um projeto.')}`
  : null

export interface Project {
  id: string
  name: string
  category: string
  description: string
  detail: string
  tags: string[]
  variant: 'dashboard' | 'architecture' | 'commerce'
}

// Conceitos visuais: substitua pelos trabalhos reais antes de divulgar o portfólio.
export const projects: Project[] = [
  {
    id: 'orbit',
    name: 'Orbit',
    category: 'PLATAFORMA WEB',
    description: 'Menos planilhas. Mais clareza.',
    detail:
      'Conceito de uma plataforma que reúne indicadores, receitas e atividades em uma visão simples. A proposta explora hierarquia de informação e uma experiência de gestão sem ruído.',
    tags: ['Dashboard', 'UI/UX', 'React'],
    variant: 'dashboard',
  },
  {
    id: 'forma',
    name: 'Forma Studio',
    category: 'SITE INSTITUCIONAL',
    description: 'Uma presença à altura do projeto.',
    detail:
      'Conceito de site para um estúdio de arquitetura. Uma experiência editorial com foco em proporções, materiais e espaços, que valoriza o portfólio e aproxima novos clientes.',
    tags: ['Website', 'Design', 'Responsivo'],
    variant: 'architecture',
  },
  {
    id: 'essencia',
    name: 'Essência',
    category: 'E-COMMERCE',
    description: 'Do primeiro olhar ao carrinho.',
    detail:
      'Conceito de uma loja de objetos para a casa. Uma vitrine com navegação leve e informação bem organizada, pensada para tornar a descoberta de produtos natural.',
    tags: ['E-commerce', 'UI/UX', 'Front-end'],
    variant: 'commerce',
  },
]
