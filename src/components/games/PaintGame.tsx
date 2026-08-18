import { useState } from 'react'

interface PaintGameProps {
  photo: string
  onScore: (score: number) => void
}

const palettes = [
  { name: '暖金街拍', from: '#d4a64a', to: '#8a5a2e' },
  { name: '青绿夜色', from: '#2a8a7a', to: '#0d2e24' },
  { name: '霓虹幻彩', from: '#c96fbf', to: '#4a3aa8' },
]

export default function PaintGame({ photo, onScore }: PaintGameProps) {
  const [sel, setSel] = useState(0)
  const [done, setDone] = useState(false)

  const apply = () => {
    setDone(true)
    onScore(100)
  }

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="font-heading text-4xl italic text-[#d4a64a]">完成！</div>
        <p className="font-body text-white/70">你为糖巢街景调出了一抹专属色彩</p>
        <button className="press rounded-full border border-[#d4a64a]/50 px-5 py-2 text-[#d4a64a] hover:bg-[#d4a64a]/10" onClick={() => { setDone(false); setSel(0) }}>
          换个配色
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-4">
      <p className="font-body text-sm text-white/60">为街拍照挑选一种光影配色，看看不同滤镜下的糖巢</p>
      <div className="relative h-56 w-80 overflow-hidden rounded-xl border border-white/10">
        <img
          src={photo}
          alt="街拍原图"
          className="h-full w-full object-cover"
          style={{ filter: `saturate(1.3) hue-rotate(${sel * 30}deg)` }}
        />
        <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-3 py-1 font-body text-xs text-white/80">
          {palettes[sel].name}
        </span>
      </div>
      <div className="flex gap-3">
        {palettes.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setSel(i)}
            className={`press h-10 w-10 rounded-full border-2 transition ${sel === i ? 'border-white' : 'border-white/30'}`}
            style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
            aria-label={p.name}
          />
        ))}
      </div>
      <button onClick={apply} className="press rounded-full border border-[#d4a64a]/50 px-6 py-2 text-[#d4a64a] hover:bg-[#d4a64a]/10">
        完成调色
      </button>
    </div>
  )
}
