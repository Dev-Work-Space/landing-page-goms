export const team = [
  {
    id: 'bruno',
    name: 'Bruno',
    initial: 'b',
    role: 'Fundador & desenvolvedor',
    intro: 'Ideias boas merecem sair do papel.',
    bio: 'Sou o Bruno, um dos fundadores da Goms. Gosto de entender o que você quer construir e transformar essa ideia em uma experiência simples, útil e bem pensada.',
    approach:
      'Do primeiro rascunho aos detalhes da interface, trabalho perto de você para dar forma a um produto que faça sentido para o seu negócio.',
    values: ['Escuta e colaboração', 'Cuidado com a experiência'],
  },
  {
    id: 'joao',
    name: 'Joao',
    initial: 'j',
    role: 'Fundador & desenvolvedor',
    intro: 'Cada detalhe faz parte da solução.',
    bio: 'Sou o Joao, um dos fundadores da Goms. Gosto de conectar ideias, organizar soluções e cuidar do que acontece por trás de uma boa experiência digital.',
    approach:
      'Da estrutura ao produto no ar, acompanho cada etapa para construir algo claro de usar, fácil de evoluir e alinhado ao que você precisa.',
    values: ['Clareza em cada etapa', 'Atenção ao que faz funcionar'],
  },
]

export type TeamMember = (typeof team)[number]
