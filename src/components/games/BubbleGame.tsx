import { useState } from 'react'

interface BubbleGameProps {
  photo: string
  onScore: (score: number) => void
}

const bubbles = [
  { id: 1, x: 15, y: 20 },
  { id: 2, x: 55, y: 15 },
  { id: 3, x: 80, y: 35 },
  { id: 4, x: 30, y: 55 },
  { id: 5, x: 65, y: 65 },
  { id: 6, x: 20, y: 80 },
  { id: 7, x: 48, y: 40 },
  { id: 8, x: 85, y: 78 },
]

export default function BubbleGame({ photo, onScore }: BubbleGameProps) {
  const [remaining, setRemaining] = useState(() => [...bubbles].sort(() => Math.random() - 0.5))
  const [popped, setPopped] = useState(0)
  const [done, setDone] = useState(false)

  const pop = (id: number) => {
    if (done) return
    const n = popped + 1
    setPopped(n)
    setRemaining((r) => r.filter((b) => b.id !== id))
    if (n === bubbles.length) {
      setDone(true)
      onScore(100)
    }
  }

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="font-heading text-4xl italic text-[#d4a64a]">全点光了！</div>
        <p className="font-body text-white/70">8 个体验泡泡全部点亮，来糖巢亲自体验吧</p>
        <button className="press rounded-full border border-[#d4a64a]/50 px-5 py-2 text-[#d4a64a] hover:bg-[#d4a64a]/10" onClick={() => { setRemaining([...bubbles].sort(() => Math.random() - 0.5)); setPopped(0); setDone(false) }}>
          再来一轮
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <p className="font-body text-sm text-white/60">点击所有体验泡泡 · 剩 {remaining.length} 个</p>
      <div className="relative h-64 w-80 overflow-hidden rounded-xl border border-white/10 bg-[#0a1513]">
        <img src={photo} alt="体验主题" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        {remaining.map((b) => (
          <button
            key={b.id}
            onClick={() => pop(b.id)}
            className="press absolute flex h-12 w-12 items-center justify-center rounded-full border border-[#d4a64a]/50 bg-[#d4a64a]/20 text-lg backdrop-blur-sm transition hover:scale-110 hover:bg-[#d4a64a]/40"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            aria-label="点击泡泡"
          >
            ✦
          </button>
        ))}
      </div>
      <p className="font-body text-xs text-white/40">已点亮 {popped}/{bubbles.length}</p>
    </div>
  )
}
