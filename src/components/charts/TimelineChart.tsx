import { useState } from 'react'

const milestones = [
  { year: '2023.12', title: '开园启幕', desc: '原老圩镇肌理上开园，河源首个乡村创客社区亮相。', x: 60 },
  { year: '2024.06–11', title: '首届创客大赛', desc: '一等奖最高 8 万元奖金 + 200 万元银行授信，热度第一个高峰。', x: 360 },
  { year: '2025.05–12', title: '媒体+工作室 · 夜集市', desc: '全省首个「媒体+」乡村创客工作室落户，夜集市出圈。', x: 660 },
  { year: '2026.01–08', title: '走向全国视野', desc: '央级媒体密集报道，《乡村创客社区要素建设指南》发布。', x: 960 },
]

export default function TimelineChart() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="console-panel glass-hover rounded-[1.25rem] p-6">
      <div className="overflow-x-auto">
        <svg viewBox="0 0 1020 220" className="h-44 w-full min-w-[620px]">
          <line x1="40" y1="150" x2="1000" y2="150" stroke="rgba(67,42,22,0.25)" strokeWidth="1.5" />
          <line x1="40" y1="150" x2="1000" y2="150" stroke="rgba(212,166,74,0.4)" strokeWidth="1.5" strokeDasharray="6 6" />

          {milestones.map((m, i) => {
            const isActive = active === i
            return (
              <g
                key={m.year}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                <line x1={m.x} y1="150" x2={m.x} y2="128" stroke={isActive ? '#b9821f' : 'rgba(67,42,22,0.4)'} strokeWidth={isActive ? 2 : 1.5} />
                <circle cx={m.x} cy="150" r={isActive ? 8 : 5} fill={isActive ? '#b9821f' : 'rgba(185,130,31,0.6)'} style={{ transition: 'all 0.3s ease' }} />
                <text x={m.x} y="118" textAnchor="middle" fontSize="14" fill={isActive ? '#b9821f' : 'rgba(67,42,22,0.8)'} style={{ fontWeight: 600 }}>
                  {m.year}
                </text>
                <text x={m.x} y="96" textAnchor="middle" fontSize="15" fill={isActive ? '#b9821f' : 'rgba(67,42,22,0.6)'} style={{ fontWeight: 500 }}>
                  {m.title}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-4 flex min-h-[3.5rem] items-center justify-between gap-4 border-t border-rule pt-4">
        {active !== null ? (
          <p className="font-body text-sm font-light leading-snug text-ink/80">
            {milestones[active].desc}
          </p>
        ) : (
          <p className="font-body text-sm font-light text-ink/85">
            悬停节点查看里程碑详情
          </p>
        )}
        <span className="shrink-0 font-body text-xs uppercase tracking-[0.15em] text-honey">
          Timeline
        </span>
      </div>
    </div>
  )
}
