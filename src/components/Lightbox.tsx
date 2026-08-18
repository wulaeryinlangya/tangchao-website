import { useCallback, useEffect } from 'react'

interface LightboxItem {
  src: string
  caption: string
}

interface LightboxProps {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const item = items[index]

  const prev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate],
  )
  const next = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xl text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
        onClick={onClose}
        aria-label="关闭"
      >
        ×
      </button>

      <button
        className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white md:left-8"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        aria-label="上一张"
      >
        ‹
      </button>

      <button
        className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white md:right-8"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        aria-label="下一张"
      >
        ›
      </button>

      <div className="relative z-10 flex max-h-[70vh] w-full flex-col items-center">
        <div
          className="absolute inset-0 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(213,166,74,0.14), rgba(13,46,36,0.25) 55%, transparent 80%)',
          }}
        />
        <img
          key={index}
          src={item.src}
          alt={item.caption}
          className="lightbox-fade relative max-h-[65vh] max-w-[80vw] rounded-2xl object-contain"
        />
        <p className="mt-4 text-center font-body text-sm font-light text-white/80">
          {item.caption} · {index + 1}/{items.length}
        </p>
      </div>

      <div
        className="mt-6 flex max-w-full items-center gap-2 overflow-x-auto pb-1"
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((t, i) => (
          <button
            key={t.src}
            type="button"
            onClick={() => onNavigate(i)}
            className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition ${
              i === index
                ? 'border-white/40 ring-1 ring-white/30'
                : 'border-white/10 opacity-60 hover:opacity-100'
            }`}
            aria-label={`跳到：${t.caption}`}
          >
            <img src={t.src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
