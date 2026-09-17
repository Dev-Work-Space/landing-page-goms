import { ArrowUpRight } from 'lucide-react'
import { ContactButton } from '../components/ContactButton'
import { Reveal } from '../components/Reveal'
import { whatsappUrl } from '../data/site'

export function Contact() {
  return (
    <section id="contato" className="container contact-section">
      <Reveal>
        <div className="contact-card">
          <div className="contact-content">
            <p className="eyebrow">
              <span className="status-dot" /> VAMOS CONSTRUIR ALGO BOM?
            </p>
            <h2>
              Sua próxima grande ideia
              <br />
              começa com um <span>oi.</span>
            </h2>
            <p>
              Me conta o que você tem em mente.
              <br />A gente encontra o melhor caminho, juntos.
            </p>
            <ContactButton final />
            {!whatsappUrl && (
              <p className="contact-unavailable" role="status">
                Contato pelo WhatsApp disponível em breve.
              </p>
            )}
          </div>
          <ArrowUpRight className="contact-arrow" strokeWidth={0.8} aria-hidden="true" />
          <span className="contact-corner">DA IDEIA AO PRÓXIMO PASSO.</span>
        </div>
      </Reveal>
    </section>
  )
}
