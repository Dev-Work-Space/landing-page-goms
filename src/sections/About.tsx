import { useEffect, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { TeamMemberCard } from '../components/TeamMemberCard'
import { Button } from '../components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../components/ui/carousel'
import { team } from '../data/team'

export function About() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const updateCurrent = () => setCurrent(api.selectedScrollSnap())
    updateCurrent()
    api.on('select', updateCurrent)
    api.on('reInit', updateCurrent)
    return () => {
      api.off('select', updateCurrent)
      api.off('reInit', updateCurrent)
    }
  }, [api])

  return (
    <section id="quem" className="section container">
      <Reveal>
        <SectionHeading
          number="06"
          label="QUEM FAZ"
          title={
            <>
              Conheça quem faz<span className="text-accent">.</span>
            </>
          }
          description="Duas pessoas, a mesma vontade de construir algo bom com você."
        />
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: false,
            watchFocus: false,
            breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } },
          }}
          aria-label="Pessoas da Goms"
          tabIndex={0}
          className="team-carousel"
        >
          <CarouselContent className="ml-0 items-stretch">
            {team.map((member, index) => (
              <CarouselItem
                className="pl-0"
                key={member.id}
                id={`profile-${member.id}`}
                aria-label={`${member.name}, ${index + 1} de ${team.length}`}
                aria-hidden={current !== index}
                inert={current !== index}
              >
                <TeamMemberCard member={member} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="team-controls">
            <div className="flex gap-2" aria-label="Selecionar pessoa">
              {team.map((member, index) => (
                <Button
                  key={member.id}
                  variant="outline"
                  aria-label={`Ver perfil de ${member.name}`}
                  aria-controls={`profile-${member.id}`}
                  aria-pressed={current === index}
                  onClick={() => api?.scrollTo(index)}
                  className="team-person-button"
                >
                  <span className="team-person-dot" aria-hidden="true" />
                  {member.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="team-counter" aria-live="polite" aria-atomic="true">
                <span aria-hidden="true">
                  0{current + 1} <span className="text-muted">/ 0{team.length}</span>
                </span>
                <span className="sr-only">
                  {team[current].name}, pessoa {current + 1} de {team.length}
                </span>
              </span>
              <CarouselPrevious className="team-arrow" aria-label="Pessoa anterior" />
              <CarouselNext className="team-arrow" aria-label="Próxima pessoa" />
            </div>
          </div>
        </Carousel>
      </Reveal>
    </section>
  )
}
