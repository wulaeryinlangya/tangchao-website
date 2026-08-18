import { useState } from 'react'

const formats = [
  { key: 'policy', label: '政策 · 建设', pct: 46, desc: '「百千万工程」「开业揭牌」等权威叙事' },
  { key: 'business', label: '企业 · 人物', pct: 89, desc: '企业开业、创客人物故事，最密集的内容' },
  { key: 'event', label: '活动 · 节日', pct: 36, desc: '创客大赛、夜集市等节点性活动' },
  { key: 'checkin', label: '打卡 · 体验', pct: 13, desc: '打卡、探店、遛娃等生活化体验' },
]

export default function FormatChart() {
  const [active, setActive] = useState<string | null>(null)
  const total = formats.reduce((s, f) => s + f.pct, 0)

  return (
    <div className="liquid-glass glass-hover rounded-[1.25rem] p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <svg viewBox="0 0 200 200" className="h-52 w-52 shrink-0">
          {(() => {
            const r = 80
            let acc = 0
            return formats.map((f) => {
              const frac = f.pct / total
              const a0 = acc * 2 * Math.PI - Math.PI / 2
              const a1 = (acc + frac) * 2 * Math.PI - Math.PI / 2
              acc += frac
              const large = frac > 0.5 ? 1 : 0
              const x0 = 100 + r * Math.cos(a0)
              const y0 = 100 + r * Math.sin(a0)
              const x1 = 100 + r * Math.cos(a1)
              const y1 = 100 + r * Math.sin(a1)
              const isActive = active === null || active === f.key
              return (
                <path
                  key={f.key}
                  d={`M100,100 L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`}
                  fill={f.key === 'business' ? 'rgba(212,166,74,0.55)' : 'rgba(255,255,255,0.14)'}
                  opacity={isActive ? 1 : 0.3}
                  onMouseEnter={() => setActive(f.key)}
                  onMouseLeave={() => setActive(null)}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
              )
            })
          })()}
          <text x="100" y="104" textAnchor="middle" fontSize="15" fill="rgba(255,255,255,0.9)">
            内容形态
          </text>
          <text x="100" y="122" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">
            标签覆盖占比
          </text>
        </svg>

        <div className="flex-1 space-y-3">
          {formats.map((f) => (
            <button
              key={f.key}
              type="button"
              onMouseEnter={() => setActive(f.key)}
              onMouseLeave={() => setActive(null)}
              className={`block w-full rounded-xl border px-4 py-3 text-left transition ${
                active === f.key ? 'border-[#d4a64a]/50 bg-[#d4a64a]/10' : 'border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-body text-sm font-medium text-white">{f.label}</span>
                <span className="font-body text-lg font-semibold text-[#d4a64a]">{f.pct}%</span>
              </div>
              {active === f.key && (
                <p className="mt-1 font-body text-xs font-light text-white/60">{f.desc}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <p className="font-body text-sm font-light text-white/85">
          企业人物内容最密集 · 标签可覆盖
        </p>
        <span className="font-body text-xs uppercase tracking-[0.15em] text-[#d4a64a]">Format</span>
      </div>
    </div>
  )
}
