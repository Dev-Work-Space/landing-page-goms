import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Brand } from './Brand'
import { ContactButton } from './ContactButton'
import { navigation } from '../data/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const resize = () => {
      if (window.innerWidth >= 900) setOpen(false)
    }
    window.addEventListener('keydown', close)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('keydown', close)
      window.removeEventListener('resize', resize)
    }
  }, [open])
  return (
    <header className={`navbar ${scrolled || open ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Brand />
        <nav aria-label="Navegação principal" className="desktop-nav">
          {navigation.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ContactButton className="nav-cta" />
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav container"
        aria-label="Navegação móvel"
        hidden={!open}
      >
        {navigation.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contato" onClick={() => setOpen(false)}>
          Contato <span>↗</span>
        </a>
      </nav>
    </header>
  )
}
