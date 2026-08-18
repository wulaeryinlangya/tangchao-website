import { useState } from 'react'

const media = [
  { name: '河源广播电视台', count: 15, tier: '本地媒体', gold: true },
  { name: '河源日报', count: 6, tier: '本地媒体', gold: true },
  { name: '河源发布', count: 5, tier: '本地媒体', gold: true },
  { name: '羊城晚报系', count: 5, tier: '省级媒体', gold: false },
  { name: '今日头条 / 澎湃', count: 3, tier: '跨平台扩散', gold: false },
]

const MAX = 15

export default function MediaMatrixChart() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="liquid-glass glass-hover rounded-[1.25rem] p-6">
      <div className="space-y-4">
        {media.map((m, i) => (
          <div
            key={m.name}
            className="group cursor-pointer"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="mb-1 flex items-baseline justify-between gap-4">
              <span className="font-body text-sm font-medium text-white/90">{m.name}</span>
              <span className="font-body text-xs text-[#d4a64a]">{m.tier}</span>
            </div>
            <div className="relative h-6 w-full overflow-hidden rounded-md border border-white/10">
              <div
                className={`h-full rounded-md transition-all duration-500 ${
                  m.gold
                    ? 'bg-gradient-to-r from-[#d4a64a]/70 to-[#8a6a2e]/60'
                    : 'bg-gradient-to-r from-white/30 to-white/10'
                }`}
                style={{ width: `${(m.count / MAX) * 100}%` }}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 font-body text-xs font-medium text-white">
                {m.count} 条
              </span>
            </div>
            {active === i && (
              <p className="mt-1 font-body text-xs font-light leading-snug text-white/60">
                报道篇数 · {m.name}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <p className="font-body text-sm font-light text-white/85">
          本地媒体为主 · 省级媒体辐射
        </p>
        <span className="font-body text-xs uppercase tracking-[0.15em] text-[#d4a64a]">
          Media Matrix
        </span>
      </div>
    </div>
  )
}
