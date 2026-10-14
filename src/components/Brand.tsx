export function Brand({ className = '' }: { className?: string }) {
  return (
    <a href="#inicio" aria-label="Goms.tech, início" className={`brand ${className}`}>
      <span className="brand-name">goms</span>
      <span className="brand-tech">tech</span>
    </a>
  )
}
