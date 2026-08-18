import { useCallback, useRef, useState, type ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  className?: string
  radius?: number
}

/** Translates slightly toward the cursor within a radius; springs back on leave. */
export default function MagneticButton({
  children,
  href,
  className = '',
  radius = 60,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius) {
        setStyle({ x: 0, y: 0 })
        return
      }
      const strength = (radius - dist) / radius
      setStyle({ x: dx * 0.25 * strength, y: dy * 0.25 * strength })
    },
    [radius],
  )

  const reset = useCallback(() => setStyle({ x: 0, y: 0 }), [])

  const inner = (
    <span
      className="inline-flex items-center gap-2"
      style={{
        transform: `translate(${style.x}px, ${style.y}px)`,
        transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </span>
  )

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block' }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {href ? (
        <a href={href} className="flex items-center gap-2">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  )
}
