import { useState } from 'react'

const tiers = [
  { key: 'official', label: '官方权威层', sub: '权威背书', desc: '央级 / 省级 / 本地媒体，以「百千万工程」为框架，提供公信力。', r: 150 },
  { key: 'user', label: '用户口碑层', sub: '真实感', desc: '小红书、抖音上的「打卡」「探店」分享，把流量转化为到访。', r: 100 },
  { key: 'youth', label: '高校实践层', sub: '青年联动', desc: '「三下乡」「百千万突击队」在 B站 发布实践记录，连接高校青年。', r: 52 },
]

export default function TierStructureChart() {
  const [active, setActive] = useState<string | null>(null)
  const hit = tiers.find((t) => t.key === active)

  return (
    <div className="console-panel glass-hover rounded-[1.25rem] p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <svg viewBox="0 0 320 320" className="h-64 w-64 shrink-0">
          {tiers.map((t) => (
            <g
              key={t.key}
              className="cursor-pointer"
              onMouseEnter={() => setActive(t.key)}
              onMouseLeave={() => setActive(null)}
            >
              <circle
                cx="160" cy="160" r={t.r}
                fill="none"
                stroke={active === t.key ? '#e0952f' : 'rgba(212,166,74,0.4)'}
                strokeWidth={active === t.key ? 3 : 1.5}
                strokeDasharray={active === t.key ? 'none' : '2 4'}
                opacity={active === null || active === t.key ? 1 : 0.35}
                style={{ transition: 'all 0.3s ease' }}
              />
              <circle cx="160" cy="160" r={t.r - 3} fill="transparent" />
              {active === t.key && (
                <circle cx="160" cy={160 - t.r} r="5" fill="#e0952f" />
              )}
            </g>
          ))}
          <circle cx="160" cy="160" r="26" fill="none" stroke="rgba(185,130,31,0.3)" strokeWidth="1" />
        </svg>

        <div className="flex-1 space-y-3">
          {tiers.map((t) => (
            <button
              key={t.key}
              type="button"
              onMouseEnter={() => setActive(t.key)}
              onMouseLeave={() => setActive(null)}
              className={`block w-full rounded-xl border px-4 py-3 text-left transition ${
                active === t.key
                  ? 'border-honey/50 bg-honey/10'
                  : 'border-rule hover:border-[rgba(67,42,22,0.3)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-body text-sm font-medium text-ink">
                  {t.label}
                </span>
                <span className="font-body text-xs uppercase tracking-wider text-honey">
                  {t.sub}
                </span>
              </div>
              {active === t.key && (
                <p className="mt-2 font-body text-xs font-light leading-snug text-ink/70">
                  {t.desc}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-rule pt-4">
        <p className="font-body text-sm font-light text-ink/85">
          三层结构互相支撑：官方权威 × 用户真实 × 高校联动
        </p>
        {hit && (
          <span className="shrink-0 font-body text-xs uppercase tracking-[0.15em] text-honey">
            {hit.label}
          </span>
        )}
      </div>
    </div>
  )
}
