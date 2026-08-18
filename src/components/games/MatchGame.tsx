import { useState } from 'react'

interface MatchGameProps {
  photo: string
  onScore: (score: number) => void
}

const pairs = [
  { a: '河源地标积木', b: '文创', icon: '🧱' },
  { a: '客家李记', b: '美食', icon: '🍚' },
  { a: '嫑艺术空间', b: '艺术', icon: '🎨' },
  { a: '南园古村', b: '夜景', icon: '🌙' },
]

interface Card {
  id: number
  pairId: number
  label: string
  icon: string
}

export default function MatchGame({ onScore }: MatchGameProps) {
  const [deck] = useState<Card[]>(() => {
    const d: Card[] = []
    pairs.forEach((p, i) => {
      d.push({ id: i * 2, pairId: i, label: p.a, icon: p.icon })
      d.push({ id: i * 2 + 1, pairId: i, label: p.b, icon: p.icon })
    })
    return d.sort(() => Math.random() - 0.5)
  })
  const [open, setOpen] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [tries, setTries] = useState(0)
  const [done, setDone] = useState(false)

  const clickCard = (card: Card) => {
    if (open.length === 2 || open.includes(card.id) || matched.includes(card.id)) return
    const next = [...open, card.id]
    setOpen(next)
    if (next.length === 2) {
      setTries((t) => t + 1)
      const [a, b] = next
      const ca = deck.find((c) => c.id === a)!
      const cb = deck.find((c) => c.id === b)!
      if (ca.pairId === cb.pairId) {
        const newMatched = [...matched, a, b]
        setMatched(newMatched)
        setOpen([])
        if (newMatched.length === deck.length) {
          setDone(true)
          onScore(Math.max(0, 100 - (tries + 1) * 5))
        }
      } else {
        setTimeout(() => setOpen([]), 600)
      }
    }
  }

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="font-heading text-5xl italic text-honey">✓</div>
        <p className="font-body text-ink/80">全部配对成功！用了 {tries} 次尝试</p>
        <button className="press rounded-full border border-honey/50 px-5 py-2 text-honey hover:bg-honey/10" onClick={() => location.reload()}>
          再来一次
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <p className="font-body text-sm text-ink/60">翻开两张卡，找到同一业态的配对 · 已配对 {matched.length / 2}/{pairs.length}</p>
      <div className="grid grid-cols-4 gap-3">
        {deck.map((c) => {
          const isOpen = open.includes(c.id) || matched.includes(c.id)
          return (
            <button
              key={c.id}
              onClick={() => clickCard(c)}
              className={`press h-20 w-16 rounded-xl border text-2xl transition ${
                isOpen
                  ? matched.includes(c.id)
                    ? 'border-green-400/50 bg-green-400/10'
                    : 'border-honey/50 bg-paper-2'
                  : 'border-rule bg-paper-2 hover:border-honey/60'
              }`}
            >
              {isOpen ? c.icon : '?'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
