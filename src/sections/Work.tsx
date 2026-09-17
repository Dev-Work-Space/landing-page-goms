import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/site'

export function Work() {
  return (
    <section id="trabalhos" className="section work-section">
      <div className="container">
        <Reveal>
          <SectionHeading
            number="02"
            label="NO AR"
            title={
              <>
                Ideias que ganham tela<span className="text-accent">.</span>
              </>
            }
            description="Um pouco do que podemos construir juntos. Explore os conceitos abaixo."
          />
        </Reveal>
        <div className="grid gap-7 md:grid-cols-3">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <p className="portfolio-note">
          Seleção demonstrativa · Os projetos acima são estudos de interface.
        </p>
      </div>
    </section>
  )
}
