import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ContactButton } from '../components/ContactButton'
import { HeroArtwork } from '../components/HeroArtwork'

export function Hero() {
  return (
    <section id="inicio" className="hero container" aria-labelledby="hero-title">
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> SOFTWARE COM INTENÇÃO.
          </p>
          <h1 id="hero-title">
            Boas ideias
            <br />
            merecem um
            <br />
            <span>bom software.</span>
          </h1>
          <p className="hero-description">
            Transformo ideias em experiências digitais.
            <br className="hidden sm:block" /> Sites, sistemas e aplicações feitos para o seu
            negócio.
          </p>
          <div className="hero-actions">
            <ContactButton />
            <a href="#trabalhos" className="text-link">
              Ver trabalhos <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-note">
            <span className="tiny-line" /> Direto com quem cria. Do início ao deploy.
          </p>
        </div>
        <HeroArtwork />
      </div>
      <div className="hero-bottom">
        <p>
          Do primeiro <span>“e se?”</span> ao <span>“tá no ar.”</span>
        </p>
        <a href="#servicos" aria-label="Explore os serviços da Goms">
          EXPLORE <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
