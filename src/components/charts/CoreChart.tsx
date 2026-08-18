import { useState } from 'react'

const cores = [
  { value: '836', unit: '条', label: '全网抓取', desc: '微信 · 小红书 · B站 · 微博四渠道' },
  { value: '142', unit: '条', label: '深度相关', desc: '人工清洗后进行传播结构分析' },
  { value: '4', unit: '类', label: '传播主体', desc: '官方媒体 · 用户 · 高校实践' },
  { value: '2023', unit: '–26', label: '传播周期', desc: '开园至今持续发酵' },
]

export default function CoreChart() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="console-panel glass-hover rounded-[1.25rem] p-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cores.map((c, i) => (
          <button
            key={c.label}
            type="button"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={`rounded-xl border p-5 text-left transition ${
              active === i ? 'border-honey/50 bg-honey/10' : 'border-rule hover:border-[rgba(67,42,22,0.3)]'
            }`}
          >
            <div className="font-heading text-3xl italic leading-none tracking-[-1px] text-ink md:text-4xl">
              {c.value}
              <span className="ml-1 text-lg text-honey">{c.unit}</span>
            </div>
            <div className="mt-2 font-body text-sm font-medium text-ink/90">{c.label}</div>
            {active === i && (
              <p className="mt-1 font-body text-xs font-light text-ink/60">{c.desc}</p>
            )}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-rule pt-4">
        <p className="font-body text-sm font-light text-ink/85">
          传播热度与项目事件高度耦合，每个关键节点都带来一轮高峰
        </p>
        <span className="shrink-0 font-body text-xs uppercase tracking-[0.15em] text-honey">Core Data</span>
      </div>
    </div>
  )
}
