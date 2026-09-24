import { ArrowDown, Check, Minus } from 'lucide-react'
import { OperationPreview } from '../components/OperationPreview'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const comparisons = [
  {
    before: 'Arquivos diferentes, versões conflitantes e dúvidas sobre qual dado vale.',
    after: 'Uma base compartilhada, com acesso organizado para cada pessoa.',
  },
  {
    before: 'O contexto fica nas conversas e depende de quem lembra da história.',
    after: 'Informações e conversas ligadas ao registro certo, fáceis de encontrar.',
  },
  {
    before: 'Copiar, colar e conferir vira parte da rotina a cada nova demanda.',
    after: 'Um cadastro alimenta as etapas seguintes, com validações e integrações.',
  },
  {
    before: 'Mudanças sem contexto: é difícil saber quem alterou o quê e por quê.',
    after: 'Histórico de alterações, responsáveis e próximos passos definidos.',
  },
  {
    before: 'O relatório exige juntar arquivos e já nasce com informações atrasadas.',
    after: 'Indicadores acompanham os registros da operação em um painel único.',
  },
  {
    before: 'Mais volume significa mais controles manuais e mais pontos de falha.',
    after: 'Fluxos automatizados ajudam a absorver volume com menos repetição.',
  },
]

export function Comparison() {
  return (
    <section id="comparativo" className="section container comparison-section">
      <Reveal>
        <SectionHeading
          number="02"
          label="DA PLANILHA AO SISTEMA"
          title={
            <>
              Sua operação cresceu.
              <br />
              <span className="text-accent">Seu jeito de trabalhar também pode.</span>
            </>
          }
          description="Planilhas ajudam a começar. Quando o processo exige colaboração, rastreabilidade e escala, um sistema sob medida conecta as pontas."
        />
      </Reveal>
      <div className="comparison-grid">
        {[false, true].map((connected) => (
          <Reveal key={String(connected)}>
            <article className={`comparison-card ${connected ? 'comparison-card-connected' : ''}`}>
              <OperationPreview connected={connected} />
              <div className="comparison-card-copy">
                <p className="comparison-kicker">
                  {connected ? 'DEPOIS / PROCESSOS CONECTADOS' : 'ANTES / CONTROLES MANUAIS'}
                </p>
                <h3>
                  {connected ? 'O sistema trabalha com você.' : 'Você mantém tudo funcionando.'}
                </h3>
                <p>
                  {connected
                    ? 'Com uma solução desenhada pela Goms, a informação circula e o trabalho avança.'
                    : 'Entre arquivos e mensagens, a equipe gasta energia para manter a operação em dia.'}
                </p>
                <ul>
                  {comparisons.map((item) => (
                    <li key={item.before}>
                      {connected ? (
                        <Check size={15} aria-hidden="true" />
                      ) : (
                        <Minus size={15} aria-hidden="true" />
                      )}
                      <span>{connected ? item.after : item.before}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="comparison-footer">
          <p>
            Menos energia organizando o trabalho. <span>Mais espaço para fazer acontecer.</span>
          </p>
          <a href="#produtividade" className="text-link">
            Veja a diferença em números <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
