import { ArrowUpRight, ChartNoAxesCombined, Circle, Command, LayoutGrid } from 'lucide-react'
import type { Project } from '../data/site'

export function ProjectPreview({ variant }: { variant: Project['variant'] }) {
  if (variant === 'dashboard')
    return (
      <div className="project-preview preview-orbit" aria-hidden="true">
        <div className="mini-dashboard">
          <aside>
            <strong>
              <Command size={12} /> orbit
            </strong>
            <LayoutGrid size={13} />
            <ChartNoAxesCombined size={13} />
            <Circle size={13} />
            <div className="mini-avatar">V</div>
          </aside>
          <div className="dashboard-main">
            <div className="dash-nav">
              Visão geral <span>Seu negócio, em órbita. ↗</span>
            </div>
            <div className="dash-greeting">
              Tudo sob controle<span>Um novo olhar para os seus resultados.</span>
            </div>
            <div className="dash-stats">
              <div>
                Receita total
                <strong>
                  R$ 48.250<span>↗ 12,8%</span>
                </strong>
              </div>
              <div>
                Novos clientes
                <strong>
                  128<span>↗ 8,2%</span>
                </strong>
              </div>
            </div>
            <div className="chart-title">
              Visão de receitas <span>Últimos 6 meses⌄</span>
            </div>
            <div className="mini-chart">
              {[31, 42, 37, 56, 45, 64, 55, 75, 66, 84, 73, 96].map((value, i) => (
                <div key={i} style={{ height: `${value}%` }} />
              ))}
            </div>
            <div className="chart-axis">
              <span>Jan</span>
              <span>Fev</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>Mai</span>
              <span>Jun</span>
            </div>
          </div>
        </div>
      </div>
    )
  if (variant === 'architecture')
    return (
      <div className="project-preview preview-forma" aria-hidden="true">
        <div className="mini-architecture">
          <div className="forma-nav">
            <strong>
              forma<span>®</span>
            </strong>
            <span>
              ESPAÇOS PARA SENTIR. <span>☰</span>
            </span>
          </div>
          <div className="forma-title">
            O essencial
            <br />
            ganha forma.
            <ArrowUpRight size={25} />
          </div>
          <div className="architecture-scene">
            <div className="building-shadow" />
            <div className="building-main">
              <div className="building-window" />
            </div>
            <div className="building-wing" />
            <div className="building-door" />
            <div className="building-stairs" />
            <div className="building-tree" />
          </div>
          <div className="forma-caption">
            ARQUITETURA COM PROPÓSITO <span>01 — 03</span>
          </div>
        </div>
      </div>
    )
  return (
    <div className="project-preview preview-essencia" aria-hidden="true">
      <div className="mini-commerce">
        <div className="commerce-nav">
          <span>OBJETOS COM ALMA</span>
          <strong>essência.</strong>
          <span>SACOLA (0)</span>
        </div>
        <div className="commerce-content">
          <div>
            <span className="commerce-label">MENOS, MAS MELHOR.</span>
            <h4>
              O simples
              <br />é extraordinário.
            </h4>
            <p>
              Design para viver.
              <br />
              Feito para ficar.
            </p>
            <span className="commerce-cta">Explore a coleção ↗</span>
          </div>
          <div className="vase-scene">
            <div className="vase-shadow" />
            <div className="vase vase-back" />
            <div className="vase vase-front" />
            <div className="vase-base" />
          </div>
        </div>
        <div className="commerce-footer">
          DESIGN ATEMPORAL <span>FEITO COM CUIDADO</span>
        </div>
      </div>
    </div>
  )
}
