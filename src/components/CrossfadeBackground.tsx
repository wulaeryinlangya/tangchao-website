import { useEffect, useState } from 'react'

interface CrossfadeBackgroundProps {
  images: string[]
  className?: string
  /** Auto-advance interval in ms; omit to disable auto-advance. */
  interval?: number
  /** Dark-overlay alpha 0–1. */
  dim?: number
  /** Max layer opacity 0–1. */
  intensity?: number
  switcher?: boolean
  switcherLabel?: string[]
  filter?: string
}

export default function CrossfadeBackground({
  images,
  className = '',
  interval,
  dim = 0.6,
  intensity = 1,
  switcher = false,
  switcherLabel,
  filter,
}: CrossfadeBackgroundProps) {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (!interval || images.length < 2) return
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % images.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [interval, images.length, active])

  return (
    <div className={`absolute inset-0 ${className}`.trim()}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          onLoad={() => setLoaded((prev) => ({ ...prev, [i]: true }))}
          className="crossfade-layer absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: loaded[i] ? (active === i ? intensity : 0) : 0,
            filter,
          }}
        />
      ))}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(9,17,15,${dim}), rgba(9,17,15,${Math.min(1, dim + 0.12)}))`,
        }}
      />

      {switcher && (
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-3 py-1 font-body text-xs transition ${
                active === i
                  ? 'bg-white/20 text-white underline decoration-white underline-offset-4'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {switcherLabel?.[i] ?? String(i + 1)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
