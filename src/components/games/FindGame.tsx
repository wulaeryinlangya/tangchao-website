import { useState } from 'react'

interface FindGameProps {
  photo: string
  onScore: (score: number) => void
}

// Differences simulated via CSS overlays on the right image.
const diffs = [
  { x: 22, y: 18, label: '太阳不见了' },
  { x: 68, y: 55, label: '小船消失了' },
  { x: 40, y: 78, label: '缺了一棵树' },
]

export default function FindGame({ photo, onScore }: FindGameProps) {
  const [found, setFound] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const click = (i: number) => {
    if (found.includes(i) || done) return
    const next = [...found, i]
    setFound(next)
    if (next.length === diffs.length) {
      setDone(true)
      onScore(100)
    }
  }

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="font-heading text-4xl italic text-[#d4a64a]">3 处都找到了！</div>
        <p className="font-body text-white/70">你的观察力很敏锐～</p>
        <button className="press rounded-full border border-[#d4a64a]/50 px-5 py-2 text-[#d4a64a] hover:bg-[#d4a64a]/10" onClick={() => { setFound([]); setDone(false) }}>
          再看一次
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <p className="font-body text-sm text-white/60">对比两幅度假风景，找出 {diffs.length} 处不同（点击右侧差异处）</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative h-56 w-64 overflow-hidden rounded-xl border border-white/10">
          <img src={photo} alt="原图" className="h-full w-full object-cover" />
        </div>
        <div className="relative h-56 w-64 overflow-hidden rounded-xl border border-white/15">
          <img src={photo} alt="变化后" className="h-full w-full object-cover" />
          {diffs.map((d, i) =>
            found.includes(i) ? null : (
              <button
                key={i}
                onClick={() => click(i)}
                className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#d4a64a]/70"
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
                aria-label={d.label}
              />
            ),
          )}
          {diffs.map((d, i) =>
            found.includes(i) ? (
              <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2 text-xl" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
                ✓
              </span>
            ) : null,
          )}
        </div>
      </div>
      <p className="font-body text-xs text-white/40">已找到 {found.length}/{diffs.length}</p>
    </div>
  )
}
