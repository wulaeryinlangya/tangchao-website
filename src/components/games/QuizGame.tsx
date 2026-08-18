import { useState } from 'react'

interface QuizGameProps {
  photo: string
  onScore: (score: number) => void
}

const questions = [
  { q: '糖巢创客社区位于哪个市？', options: ['河源市', '广州市', '梅州市'], answer: 0 },
  { q: '糖巢重点打造几大业态？', options: ['六大', '八大', '十大'], answer: 1 },
  { q: '社区占地约多少万平方米？', options: ['8 万㎡', '12 万㎡', '20 万㎡'], answer: 1 },
  { q: '河源首个乡村创客社区建于哪年？', options: ['2022 年', '2023 年', '2024 年'], answer: 1 },
  { q: '社区培育了多少创客？', options: ['150+', '250+', '350+'], answer: 2 },
]

export default function QuizGame({ onScore }: QuizGameProps) {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const q = questions[idx]

  const pick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answer) setScore((s) => s + 1)
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setIdx((v) => v + 1)
        setPicked(null)
      } else {
        setDone(true)
        onScore(score + (i === q.answer ? 1 : 0))
      }
    }, 700)
  }

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="font-heading text-5xl italic text-white">{score}/{questions.length}</div>
        <p className="font-body text-white/70">{score === questions.length ? '满分！你对糖巢了如指掌！' : '答对 ' + score + ' 题，再试试～'}</p>
        <button className="press rounded-full border border-[#d4a64a]/50 px-5 py-2 text-[#d4a64a] hover:bg-[#d4a64a]/10" onClick={() => { setIdx(0); setScore(0); setPicked(null); setDone(false) }}>
          重新挑战
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center gap-6 p-4">
      <div className="text-center">
        <span className="font-body text-xs text-white/50">第 {idx + 1}/{questions.length} 题</span>
        <h4 className="mt-1 font-heading text-2xl italic text-white">{q.q}</h4>
      </div>
      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => pick(i)}
            className={`press rounded-xl border px-4 py-3 text-left font-body transition ${
              picked === null
                ? 'border-white/15 hover:border-[#d4a64a]/50'
                : picked === i
                  ? i === q.answer
                    ? 'border-green-400/60 bg-green-400/10'
                    : 'border-red-400/60 bg-red-400/10'
                  : i === q.answer
                    ? 'border-green-400/60 bg-green-400/10'
                    : 'border-white/10 opacity-50'
            }`}
          >
            <span className="text-white/90">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
