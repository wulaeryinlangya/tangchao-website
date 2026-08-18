import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

/** 3D tilt on pointermove; resets on leave. Inert in no-pointer environments. */
export default function TiltCard({ children, className = '', maxTilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<CSSProperties>({})

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rotateY = (px - 0.5) * 2 * maxTilt
      const rotateX = (0.5 - py) * 2 * maxTilt
      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
      })
    },
    [maxTilt],
  )

  const reset = useCallback(() => setStyle({}), [])

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`.trim()}
      style={style}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </div>
  )
}
