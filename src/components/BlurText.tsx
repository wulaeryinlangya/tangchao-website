import { useEffect, useState } from 'react'
import { useReveal } from './useReveal'

interface BlurTextProps {
  text?: string
  className?: string
  split?: ' ' | 'chars'
}

export default function BlurText({ text = '', className = '', split = ' ' }: BlurTextProps) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  const [finalized, setFinalized] = useState(false)

  // Fallback: once the stagger window has passed, force the chars visible
  // inline. Where CSS transitions work this is a no-op; in broken environments
  // it guarantees the text is never stuck blurred/hidden.
  const lastIndex = (split === 'chars' ? Array.from(text) : text.split(' ')).length - 1
  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => setFinalized(true), 700 + lastIndex * 100)
    return () => window.clearTimeout(t)
  }, [inView, lastIndex])

  const parts = split === 'chars' ? Array.from(text) : text.split(' ')

  return (
    <div ref={ref} className={`blurtext ${inView ? 'reveal-show' : ''} ${className}`.trim()}>
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className="blur-char"
          style={{
            transitionDelay: `${i * 100}ms`,
            ...(split === 'chars' ? { marginRight: '0.05em' } : { marginRight: '0.28em' }),
            ...(finalized ? { opacity: 1, filter: 'none', transform: 'none' } : null),
          }}
        >
          {part}
        </span>
      ))}
    </div>
  )
}
