import { useEffect, useState } from 'react'

export default function CursorGlow() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(pointer: coarse)')
    if (mq) {
      setCoarse(mq.matches)
      const onChange = () => setCoarse(mq.matches)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }
    return undefined
  }, [])

  useEffect(() => {
    if (coarse) return
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [coarse])

  if (coarse || !pos) return null

  return (
    <div
      className="pointer-events-none fixed z-[5] hidden md:block"
      aria-hidden="true"
      style={{
        width: 480,
        height: 480,
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 60%)',
      }}
    />
  )
}
