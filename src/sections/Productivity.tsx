import { useState, type CSSProperties } from 'react'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { formatNumber, minutesPerOperation, productivityTasks } from '../data/productivity'

const savedRatio = 1 - minutesPerOperation.system / minutesPerOperation.spreadsheet
const chartMaximum = Math.max(...productivityTasks.map((task) => task.spreadsheet))

export function Productivity() {
  const [volume, setVolume] = useState(100)
  const spreadsheetHours = (volume * minutesPerOperation.spreadsheet) / 60
  const systemHours = (volume * minutesPerOperation.system) / 60
  const savedHours = spreadsheetHours - systemHours

  return (
    <section id="produtividade" className="section productivity-section">
      <div className="container">
        <Reveal>
          <SectionHeading
            number="03"
            label="TEMPO QUE VOLTA PARA O NEGÓCIO"
            title={
              <>
                Menos trabalho repetitivo.
                <br />
                <span className="text-muted">Mais capacidade para crescer.</span>
              </>
            }
            description="Veja como pequenas economias em cada etapa se acumulam no mês. Ajuste o volume e explore um cenário de operação integrada."
          />
        </Reveal>
        <Reveal>
          <div className="productivity-simulator">
            <div className="productivity-toolbar">
              <div>
                <span className="simulation-badge">SIMULAÇÃO ILUSTRATIVA</span>
                <p>O mesmo trabalho. Dois jeitos de executar.</p>
              </div>
              <div className="volume-control">
                <div>
                  <label htmlFor="operation-volume">Operações por mês</label>
                  <span>{volume}</span>
                </div>
                <input
                  id="operation-volume"
                  type="range"
                  min="20"
                  max="300"
                  step="20"
                  value={volume}
                  aria-describedby="productivity-assumptions"
                  aria-valuetext={`${volume} operações por mês`}
                  onChange={(event) => setVolume(Number(event.target.value))}
                />
                <div className="volume-limits" aria-hidden="true">
                  <span>20</span>
                  <span>300</span>
                </div>
              </div>
            </div>
            <div className="productivity-metrics" aria-live="polite" aria-atomic="true">
              <div>
                <span className="metric-label">TEMPO LIBERADO / MÊS</span>
                <strong>
                  {formatNumber(savedHours)}
                  <span>h</span>
                </strong>
                <p>para atendimento, análise e novas entregas</p>
              </div>
              <div>
                <span className="metric-label">TEMPO OPERACIONAL</span>
                <strong>
                  −{formatNumber(savedRatio * 100)}
                  <span>%</span>
                </strong>
                <p>nas quatro atividades deste cenário</p>
              </div>
              <div>
                <span className="metric-label">CAPACIDADE POTENCIAL</span>
                <strong>
                  {formatNumber(minutesPerOperation.spreadsheet / minutesPerOperation.system)}
                  <span>×</span>
                </strong>
                <p>mais operações no mesmo tempo dedicado</p>
              </div>
            </div>
            <div className="productivity-charts">
              <figure className="task-chart" aria-labelledby="task-chart-title">
                <figcaption id="task-chart-title">
                  <h3>Onde o tempo muda</h3>
                  <p>Minutos por operação · menor é melhor</p>
                </figcaption>
                <div className="chart-legend">
                  <span>
                    <i className="legend-spreadsheet" /> Planilhas
                  </span>
                  <span>
                    <i className="legend-system" /> Sistema integrado
                  </span>
                </div>
                <div className="task-chart-rows">
                  {productivityTasks.map((task) => (
                    <div className="task-chart-row" key={task.name}>
                      <h4>{task.name}</h4>
                      <div className="task-bar-line">
                        <div className="task-bar-track">
                          <div
                            className="task-bar task-bar-spreadsheet"
                            style={{ width: `${(task.spreadsheet / chartMaximum) * 100}%` }}
                          />
                        </div>
                        <span>
                          <span className="sr-only">Planilhas: </span>
                          {task.spreadsheet} min
                        </span>
                      </div>
                      <div className="task-bar-line">
                        <div className="task-bar-track">
                          <div
                            className="task-bar task-bar-system"
                            style={{ width: `${(task.system / chartMaximum) * 100}%` }}
                          />
                        </div>
                        <span>
                          <span className="sr-only">Sistema integrado: </span>
                          {task.system} min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </figure>
              <figure className="time-chart" aria-labelledby="time-chart-title">
                <figcaption id="time-chart-title">
                  <h3>Seu mês com mais espaço</h3>
                  <p>Distribuição das {formatNumber(spreadsheetHours)}h do cenário manual</p>
                </figcaption>
                <div
                  className="time-donut"
                  style={{ '--saved-share': `${savedRatio * 100}%` } as CSSProperties}
                  role="img"
                  aria-label={`${formatNumber(savedHours)} horas liberadas e ${formatNumber(systemHours)} horas de operação com sistema, de um total de ${formatNumber(spreadsheetHours)} horas com planilhas.`}
                >
                  <div>
                    <Clock3 size={20} aria-hidden="true" />
                    <strong>
                      {formatNumber(savedHours)}
                      <span>h</span>
                    </strong>
                    <span>liberadas no mês</span>
                  </div>
                </div>
                <div className="time-breakdown">
                  <p>
                    <span>
                      <i className="legend-system" /> Tempo liberado
                    </span>
                    <strong>{formatNumber(savedHours)}h</strong>
                  </p>
                  <p>
                    <span>
                      <i className="legend-spreadsheet" /> Operação com sistema
                    </span>
                    <strong>{formatNumber(systemHours)}h</strong>
                  </p>
                </div>
                <p className="time-chart-note">
                  Automatizar a rotina abre espaço para o trabalho que precisa de você.
                </p>
              </figure>
            </div>
            <div className="productivity-method" id="productivity-assumptions">
              <strong>Como chegamos aos números</strong>
              <p>
                Cenário hipotético: cada operação passa pelas quatro atividades acima, somando{' '}
                {minutesPerOperation.spreadsheet} min em planilhas e {minutesPerOperation.system}{' '}
                min em um sistema integrado. Horas mensais = minutos × volume ÷ 60. A capacidade
                considera apenas o tempo dessas atividades. Não inclui implantação, treinamento ou
                exceções. Os valores não são resultados medidos nem garantia de ganho; variam
                conforme o processo e as integrações.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="productivity-cta">
            <p>
              E na sua operação? <span>A gente mapeia o que faz sentido automatizar.</span>
            </p>
            <a className="text-link" href="#contato">
              Vamos entender seu processo <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
