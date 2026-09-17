import { ArrowUpRight, X } from 'lucide-react'
import { useRef } from 'react'
import type { Project } from '../data/site'
import { ProjectPreview } from './ProjectPreview'

export function ProjectCard({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const open = () => {
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    dialog.current?.close()
    document.body.style.overflow = ''
  }
  return (
    <>
      <button
        className="project-card"
        onClick={open}
        aria-label={`Conhecer ${project.name}, projeto conceitual`}
      >
        <div className="project-image-wrap">
          <ProjectPreview variant={project.variant} />
          <span className="preview-label">CONCEITO</span>
          <span className="project-open">
            <ArrowUpRight size={22} aria-hidden="true" />
          </span>
        </div>
        <div className="project-meta">
          <p>{project.category}</p>
          <h3>{project.name}</h3>
          <span>{project.description}</span>
        </div>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </button>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby={`${project.id}-title`}
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return
          const focusable = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]')
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }}
        onClose={() => {
          document.body.style.overflow = ''
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
      >
        <div className="dialog-inner">
          <button className="dialog-close" onClick={close} aria-label="Fechar projeto" autoFocus>
            <X size={22} />
          </button>
          <ProjectPreview variant={project.variant} />
          <div className="dialog-copy">
            <p className="eyebrow">PROJETO CONCEITUAL · {project.category}</p>
            <h2 id={`${project.id}-title`}>{project.name}</h2>
            <p>{project.detail}</p>
            <p className="concept-note">
              Estudo visual demonstrativo, sem vínculo com um cliente real.
            </p>
            <a href="#contato" className="button button-primary" onClick={close}>
              Quero algo assim <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </dialog>
    </>
  )
}
