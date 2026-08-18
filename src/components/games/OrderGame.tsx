import { useState } from 'react'

interface OrderGameProps {
  photo: string
  onScore: (score: number) => void
}

const target = '祝福糖巢 喜结良缘'
const pieces = target.split(' ')

export default function OrderGame({ onScore }: OrderGameProps) {
  const [shuffled] = useState<string[]>(() => {
    const s = [...pieces]
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[s[i], s[j]] = [s[j], s[i]]
    }
    return s
  })
  const [built, setBuilt] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const add = (w: string, fromBuilt: boolean) => {
    if (done) return
    let nb: string[]
    if (fromBuilt) {
      nb = built.filter((x) => x !== w)
    } else {
      nb = [...built, w]
    }
    setBuilt(nb)
    if (nb.join(' ') === target) {
      setDone(true)
      onScore(100)
    }
  }

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="font-heading text-4xl italic text-[#d4a64a]">「祝福糖巢 喜结良缘」</div>
        <p className="font-body text-white/70">你拼出了最美好的祝福！</p>
        <button className="press rounded-full border border-[#d4a64a]/50 px-5 py-2 text-[#d4a64a] hover:bg-[#d4a64a]/10" onClick={() => { setBuilt([]); setDone(false) }}>
          再拼一次
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-4">
      <p className="font-body text-sm text-white/60">把词块排成一句祝福（点击词块放入/取出）</p>

      <div className="flex min-h-16 w-full max-w-md flex-wrap items-center justify-center gap-2 rounded-xl border border-dashed border-[#d4a64a]/40 p-3">
        {built.length === 0 && <span className="font-body text-xs text-white/40">把词放这里</span>}
        {built.map((w) => (
          <button key={w} onClick={() => add(w, true)} className="press rounded-lg border border-[#d4a64a]/50 bg-[#d4a64a]/10 px-3 py-1.5 font-body text-lg text-white">
            {w}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {shuffled.filter((w) => !built.includes(w)).map((w) => (
          <button key={w} onClick={() => add(w, false)} className="press rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 font-body text-lg text-white/80 hover:border-white/40">
            {w}
          </button>
        ))}
      </div>
    </div>
  )
}
