import { ArrowUp } from 'lucide-react'
import { Brand } from '../components/Brand'

export function Footer() {
  return (
    <footer className="container footer">
      <div>
        <Brand />
        <p>Software bem pensado. Feito por gente.</p>
      </div>
      <span>© {new Date().getFullYear()} Goms</span>
      <a href="#inicio" className="back-top">
        De volta ao topo <ArrowUp size={16} aria-hidden="true" />
      </a>
    </footer>
  )
}
