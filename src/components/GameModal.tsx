import { useEffect, useState } from 'react'

interface GameModalProps {
  title: string
  gameId: string
  photo: string
  onClose: () => void
}

export default function GameModal({ title, gameId, photo, onClose }: GameModalProps) {
  const [game, setGame] = useState<{ id: string; name: string; component: React.ComponentType<{ photo: string; onScore: (n: number) => void }> } | null>(null)
  const [score, setScore] = useState<number | null>(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    let mounted = true
    import('./games/GameManager').then((m) => {
      if (mounted) setGame(m.getGame(gameId) ?? null)
    })
    return () => { mounted = false }
  }, [gameId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const Game = game?.component

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex h-[70vh] w-[90vw] max-w-2xl flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a1513]/95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <div className="font-heading text-xl italic text-white">{title}</div>
            <div className="font-body text-[10px] uppercase tracking-wider text-[#d4a64a]">小游戏</div>
          </div>
          <div className="flex items-center gap-2">
            {score !== null && (
              <span className="rounded-full border border-[#d4a64a]/40 px-3 py-1 font-body text-xs text-[#d4a64a]">
                得分 {score}
              </span>
            )}
            <button
              onClick={onClose}
              className="press flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white"
              aria-label="关闭游戏"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Game ? (
            <Game key={key} photo={photo} onScore={(n) => setScore(n)} />
          ) : (
            <div className="flex h-full items-center justify-center font-body text-white/60">加载中…</div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-6 py-3">
          <button
            onClick={() => { setKey((k) => k + 1); setScore(null) }}
            className="press rounded-full border border-[#d4a64a]/40 px-4 py-1.5 font-body text-xs text-[#d4a64a] hover:bg-[#d4a64a]/10"
          >
            重新挑战
          </button>
          <button
            onClick={onClose}
            className="press rounded-full border border-white/15 px-4 py-1.5 font-body text-xs text-white/70 hover:bg-white/5"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
