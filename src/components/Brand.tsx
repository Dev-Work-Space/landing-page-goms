export function Brand({ className = '' }: { className?: string }) {
  return (
    <a href="#inicio" aria-label="Goms, início" className={`brand ${className}`}>
      goms<span>.</span>
    </a>
  )
}
