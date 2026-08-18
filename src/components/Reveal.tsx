import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { useReveal } from './useReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Optional per-element stagger delay (ms). */
  delay?: number
  style?: CSSProperties
}

export default function Reveal({ children, className = '', delay = 0, style }: RevealProps) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  const [finalized, setFinalized] = useState(false)

  // CSS transition path: add .reveal-show when in view.
  // Fallback path: once the transition window has passed, force final styles
  // inline. Where CSS transitions work this is a no-op; where they never advance
  // (no rAF / broken compositor) it guarantees content is never stuck invisible.
  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => setFinalized(true), 700 + delay)
    return () => window.clearTimeout(t)
  }, [inView, delay])

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'reveal-show' : ''} ${className}`.trim()}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
        ...(finalized ? { opacity: 1, transform: 'none', filter: 'none' } : null),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
