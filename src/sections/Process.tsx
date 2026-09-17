import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const steps = [
  [
    'A gente conversa',
    'Entendo sua ideia, seu momento e o problema que você quer resolver. Tudo começa ouvindo.',
  ],
  [
    'O caminho fica claro',
    'Definimos o escopo, as prioridades e os prazos. Você sabe o que vai receber e como vamos chegar lá.',
  ],
  [
    'A ideia ganha forma',
    'Design e código caminham juntos. Você acompanha as entregas e participa de cada decisão importante.',
  ],
  [
    'Pronto para o mundo',
    'Testamos, ajustamos e colocamos no ar. E você recebe a orientação para dar os próximos passos.',
  ],
]

export function Process() {
  return (
    <section id="como" className="section container">
      <Reveal>
        <SectionHeading
          number="03"
          label="COMO TRABALHO"
          title={
            <>
              Um processo simples.
              <br />
              <span className="text-muted">Você por dentro de tudo.</span>
            </>
          }
          description="Sem caixa-preta, sem surpresas. Comunicação próxima, do primeiro rascunho ao produto final."
        />
      </Reveal>
      <div className="process-grid">
        {steps.map(([title, text], index) => (
          <Reveal key={title}>
            <div className="process-step">
              <span className="step-number">
                0{index + 1}
                <span className="step-dot" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
