import { Check, FileSpreadsheet, LayoutDashboard, MessageSquare, Workflow } from 'lucide-react'

export function OperationPreview({ connected = false }: { connected?: boolean }) {
  return (
    <div
      className={`operation-preview ${connected ? 'is-connected' : 'is-manual'}`}
      aria-hidden="true"
    >
      <div className="operation-preview-grid" />
      {connected ? (
        <>
          <div className="operation-dashboard">
            <div className="operation-window-bar">
              <span>
                <LayoutDashboard size={12} /> Visão da operação
              </span>
              <span className="operation-live">
                <i /> Sincronizado
              </span>
            </div>
            <div className="operation-dashboard-body">
              <div className="operation-sidebar">
                <LayoutDashboard />
                <Workflow />
                <FileSpreadsheet />
              </div>
              <div className="operation-dashboard-main">
                <div className="operation-mini-stats">
                  <div>
                    <span>Centralizado</span>
                    <strong>Dados</strong>
                  </div>
                  <div>
                    <span>Conectada</span>
                    <strong>Equipe</strong>
                  </div>
                  <div>
                    <span>Visível</span>
                    <strong>Progresso</strong>
                  </div>
                </div>
                <div className="operation-flow">
                  {['Entrada', 'Em andamento', 'Concluído'].map((label, index) => (
                    <div key={label}>
                      <span>{label}</span>
                      <i />
                      <i />
                      {index === 1 && <i />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <span className="operation-float operation-success">
            <Check size={13} /> Um fluxo. Todo mundo junto.
          </span>
        </>
      ) : (
        <>
          <div className="operation-sheet operation-sheet-back">
            <FileSpreadsheet size={14} /> controle_final_v3.xlsx
          </div>
          <div className="operation-sheet operation-sheet-front">
            <div className="operation-window-bar">
              <span>
                <FileSpreadsheet size={12} /> controle_final_v4.xlsx
              </span>
              <span>···</span>
            </div>
            <div className="operation-sheet-grid">
              {[
                '',
                'A',
                'B',
                'C',
                'D',
                '1',
                'Cliente',
                'Status',
                'Valor',
                'Prazo',
                '2',
                'Acme',
                'Revisar',
                '—',
                'Hoje',
                '3',
                'Norte',
                'Pendente',
                '#REF!',
                '—',
                '4',
                'Acme',
                'Duplicado',
                '—',
                'Ontem',
              ].map((cell, index) => (
                <span
                  key={index}
                  className={cell === '#REF!' || cell === 'Duplicado' ? 'sheet-error' : ''}
                >
                  {cell}
                </span>
              ))}
            </div>
          </div>
          <span className="operation-float operation-message">
            <MessageSquare size={13} /> Qual é a versão certa?
          </span>
        </>
      )}
      <span className="operation-preview-caption">
        {connected ? 'INFORMAÇÃO CONECTADA' : 'INFORMAÇÃO FRAGMENTADA'}
      </span>
    </div>
  )
}
