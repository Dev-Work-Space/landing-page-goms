// Cenário ilustrativo, não um benchmark ou resultado medido de clientes.
// Minutos por operação: cada operação passa pelas quatro atividades.
export const productivityTasks = [
  { name: 'Cadastrar informações', spreadsheet: 8, system: 2 },
  { name: 'Conferir e corrigir dados', spreadsheet: 6, system: 1 },
  { name: 'Atualizar o andamento', spreadsheet: 4, system: 1 },
  { name: 'Consolidar o relatório', spreadsheet: 6, system: 2 },
]

export const minutesPerOperation = productivityTasks.reduce(
  (total, task) => ({
    spreadsheet: total.spreadsheet + task.spreadsheet,
    system: total.system + task.system,
  }),
  { spreadsheet: 0, system: 0 },
)

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(value)
