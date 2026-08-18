import { useState } from 'react'

interface PuzzleGameProps {
  photo: string
  onScore: (score: number) => void
}

// 3x3 sliding puzzle; tiles hold index 0..8, 8 = blank.
function isSolvable(order: number[]) {
  const arr = order.filter((n) => n !== 8)
  let inv = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) inv++
    }
  }
  // 3x3 blank on row 0 (bottom in our 0-based top-down view): solvable iff even
  return inv % 2 === 0
}

function shuffled() {
  const order = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  do {
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }
  } while (isSolvable(order))
  return order
}

export default function PuzzleGame({ photo, onScore }: PuzzleGameProps) {
  const [order, setOrder] = useState<number[]>(shuffled)
  const [moves, setMoves] = useState(0)
  const [done, setDone] = useState(false)

  const click = (i: number) => {
    if (done) return
    const blank = order.indexOf(8)
    const row = Math.floor(i / 3)
    const brow = Math.floor(blank / 3)
    const col = i % 3
    const bcol = blank % 3
    const adjacent = (Math.abs(row - brow) + Math.abs(col - bcol)) === 1
    if (!adjacent) return
    const next = [...order]
    ;[next[i], next[blank]] = [next[blank], next[i]]
    setOrder(next)
    const m = moves + 1
    setMoves(m)
    if (next.every((v, k) => v === k)) {
      setDone(true)
      onScore(Math.max(0, 100 - m * 2))
    }
  }

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="font-heading text-4xl italic text-[#d4a64a]">拼好了！</div>
        <p className="font-body text-white/70">用了 {moves} 步</p>
        <button className="press rounded-full border border-[#d4a64a]/50 px-5 py-2 text-[#d4a64a] hover:bg-[#d4a64a]/10" onClick={() => { setOrder(shuffled()); setMoves(0); setDone(false) }}>
          再来一局
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <p className="font-body text-sm text-white/60">点击与空白相邻的格子，拼回创客园区 · 已走 {moves} 步</p>
      <div className="grid grid-cols-3 gap-1.5" style={{ width: 270, height: 270 }}>
        {order.map((v, i) => {
          const row = Math.floor(v / 3)
          const col = v % 3
          return (
            <button
              key={i}
              onClick={() => click(i)}
              className={`press overflow-hidden rounded-lg border border-white/10 ${v === 8 ? 'bg-white/5' : ''}`}
              style={{ width: 86, height: 86 }}
            >
              {v !== 8 && (
                <img
                  src={photo}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{
                    width: 258,
                    height: 258,
                    objectFit: 'cover',
                    transform: `translate(${-col * 86}px, ${-row * 86}px)`,
                    maxWidth: 'none',
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
