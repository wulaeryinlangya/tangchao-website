import { useState } from 'react'

interface FoodGameProps {
  photo: string
  onScore: (score: number) => void
}

const foods = [
  { name: '客家李记', good: true, emoji: '🍚' },
  { name: '文创雪糕', good: true, emoji: '🍦' },
  { name: '到吉窑鸡', good: true, emoji: '🍗' },
  { name: '沙糖桔', good: true, emoji: '🍊' },
  { name: '柠檬', good: false, emoji: '🍋' },
  { name: '潮玩积木', good: false, emoji: '🧱' },
  { name: '贡柑', good: false, emoji: '🍊' },
  { name: '窑鸡套餐', good: true, emoji: '🍽️' },
]

export default function FoodGame({ onScore }: FoodGameProps) {
  const [pool, setPool] = useState(() => [...foods].sort(() => Math.random() - 0.5))
  const [picked, setPicked] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)

  const click = (i: number, good: boolean) => {
    if (picked.includes(i)) return
    const next = [...picked, i]
    setPicked(next)
    if (good) {
      const s = score + 1
      setScore(s)
      if (next.length === foods.length) {
        setDone(true)
        onScore(s)
      }
    } else {
      if (next.length === foods.length) {
        setDone(true)
        onScore(score)
      }
    }
  }

  const goodCount = foods.filter((f) => f.good).length

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="font-heading text-5xl italic text-white">{score}</div>
        <p className="font-body text-white/70">{score === goodCount ? '全对！这些才是糖巢的客家美味～' : `挑对了 ${score} 样客家美味`}</p>
        <button className="press rounded-full border border-[#d4a64a]/50 px-5 py-2 text-[#d4a64a] hover:bg-[#d4a64a]/10" onClick={() => { setPool([...foods].sort(() => Math.random() - 0.5)); setPicked([]); setDone(false); setScore(0) }}>
          再玩一次
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <p className="font-body text-sm text-white/60">点出糖巢的客家美食（找出全部 {goodCount} 样）</p>
      <div className="grid grid-cols-4 gap-3">
        {pool.map((f, i) => (
          <button
            key={f.name}
            onClick={() => click(i, f.good)}
            className={`press flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border text-2xl transition ${
              picked.includes(i)
                ? f.good
                  ? 'border-green-400/50 bg-green-400/10'
                  : 'border-red-400/50 bg-red-400/10'
                : 'border-white/15 bg-white/5 hover:border-white/40'
            }`}
          >
            <span>{f.emoji}</span>
            <span className="text-[10px] text-white/70">{f.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
