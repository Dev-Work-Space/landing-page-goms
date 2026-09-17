import { ArrowUpRight, PanelsTopLeft, Blocks, Workflow } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const services = [
  {
    icon: PanelsTopLeft,
    name: 'Sites & landing pages',
    text: 'Seu negócio bem apresentado. Páginas rápidas, responsivas e pensadas para transformar visitas em conversas.',
    tags: 'PRESENÇA DIGITAL · CONVERSÃO',
  },
  {
    icon: Blocks,
    name: 'Sistemas & aplicações',
    text: 'Sua ideia ganhando vida. Produtos digitais e ferramentas sob medida para resolver os desafios do seu negócio.',
    tags: 'PLATAFORMAS · MVPs · WEB APPS',
  },
  {
    icon: Workflow,
    name: 'Integrações & automações',
    text: 'Menos tarefas repetitivas. Conecto suas ferramentas e simplifico processos para você focar no que importa.',
    tags: 'APIs · PROCESSOS · EFICIÊNCIA',
  },
]

export function Services() {
  return (
    <section id="servicos" className="section container">
      <Reveal>
        <SectionHeading
          number="01"
          label="O QUE A GENTE FAZ"
          title={
            <>
              Tecnologia que resolve.
              <br />
              <span className="text-muted">Sem complicar.</span>
            </>
          }
          description="Cada negócio tem um desafio. A solução precisa fazer sentido para o seu."
        />
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.name}>
            <a href="#contato" className="service-card group">
              <div className="flex items-start justify-between">
                <service.icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-accent"
                  aria-hidden="true"
                />
                <span className="card-number">0{index + 1}</span>
              </div>
              <h3>{service.name}</h3>
              <p>{service.text}</p>
              <div className="service-card-bottom">
                <span>{service.tags}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
