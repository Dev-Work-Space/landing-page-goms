import { ArrowUpRight } from 'lucide-react'
import { whatsappUrl } from '../data/site'

export function ContactButton({
  className = '',
  final = false,
}: {
  className?: string
  final?: boolean
}) {
  if (final && !whatsappUrl)
    return (
      <button className={`button button-primary ${className}`} disabled>
        Falar comigo <ArrowUpRight size={18} aria-hidden="true" />
      </button>
    )
  return (
    <a
      className={`button button-primary ${className}`}
      href={whatsappUrl ?? '#contato'}
      {...(whatsappUrl
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'Falar comigo pelo WhatsApp (abre em nova aba)',
          }
        : {})}
    >
      Falar comigo <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  )
}
