import { ArrowUpRight, Code2, MousePointer2 } from 'lucide-react'

export function HeroArtwork() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="art-grid" />
      <span className="art-cross cross-one">+</span>
      <span className="art-cross cross-two">+</span>
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="art-tag tag-top">
        <span className="status-dot" /> ideias em movimento
      </div>
      <div className="stack-scene">
        <div className="stack-layer layer-bottom">
          <span>ESTRUTURA</span>
        </div>
        <div className="stack-layer layer-middle">
          <span>EXPERIÊNCIA</span>
        </div>
        <div className="stack-layer layer-top">
          <div className="stack-topbar">
            <Code2 size={20} />
            <span>goms / build</span>
            <span className="ml-auto">•••</span>
          </div>
          <div className="stack-logo">
            g<span>.</span>
          </div>
          <div className="stack-bottom">
            <span>DA IDEIA AO REAL.</span>
            <ArrowUpRight size={29} />
          </div>
        </div>
      </div>
      <div className="art-tag tag-bottom">
        <span className="code-brackets">&lt;/&gt;</span> feito para o seu próximo passo
      </div>
      <div className="art-cursor">
        <MousePointer2 size={23} fill="currentColor" />
        <span>seu próximo projeto</span>
      </div>
      <div className="art-coordinates">
        <span>DESIGN + CÓDIGO + PROPÓSITO</span>
        <span>001 — ∞</span>
      </div>
    </div>
  )
}
