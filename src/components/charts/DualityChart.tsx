import { useState } from 'react'

const wechat = [
  { label: '权威报道', value: 38, note: '央级 · 省级 · 本地官方媒体' },
  { label: '叙事框架', value: 42, note: '「百千万工程」「乡村振兴」政策叙事' },
  { label: '内容偏好', value: 35, note: '开业 · 进展 · 荣誉为主' },
]

const xhs = [
  { label: '用户分享', value: 44, note: '普通用户自发内容为主' },
  { label: '叙事框架', value: 26, note: '打卡 · 探店 · 遛娃生活化' },
  { label: '内容偏好', value: 40, note: '「二次传播」实地体验扩散' },
]

const MAX = 50

export default function DualityChart() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="console-panel glass-hover rounded-[1.25rem] p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="font-heading text-xl italic text-ink">微信</span>
            <span className="font-body text-xs uppercase tracking-wider text-honey">官方叙事</span>
          </div>
          <div className="space-y-4">
            {wechat.map((w) => (
              <div key={w.label} className="cursor-pointer" onMouseEnter={() => setActive(`w-${w.label}`)} onMouseLeave={() => setActive(null)}>
                <div className="mb-1 flex justify-between">
                  <span className="font-body text-sm font-medium text-ink/90">{w.label}</span>
                  <span className="font-body text-xs text-honey">{w.value}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-md bg-paper-2">
                  <div
                    className="h-full rounded-md bg-gradient-to-r from-honey/80 to-gold/70 transition-all duration-500"
                    style={{ width: `${(w.value / MAX) * 100}%` }}
                  />
                </div>
                {active === `w-${w.label}` && (
                  <p className="mt-1 font-body text-xs font-light text-ink/60">{w.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-rule pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="font-heading text-xl italic text-ink">小红书</span>
            <span className="font-body text-xs uppercase tracking-wider text-honey">用户实感</span>
          </div>
          <div className="space-y-4">
            {xhs.map((x) => (
              <div key={x.label} className="cursor-pointer" onMouseEnter={() => setActive(`x-${x.label}`)} onMouseLeave={() => setActive(null)}>
                <div className="mb-1 flex justify-between">
                  <span className="font-body text-sm font-medium text-ink/90">{x.label}</span>
                  <span className="font-body text-xs text-honey">{x.value}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-md bg-paper-2">
                  <div
                    className="h-full rounded-md bg-gradient-to-r from-honey/55 to-honey/25 transition-all duration-500"
                    style={{ width: `${(x.value / MAX) * 100}%` }}
                  />
                </div>
                {active === `x-${x.label}` && (
                  <p className="mt-1 font-body text-xs font-light text-ink/60">{x.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-rule pt-4">
        <p className="font-body text-sm font-light text-ink/85">
          官方叙事 vs 用户实感 · 双平台互补
        </p>
        <span className="font-body text-xs uppercase tracking-[0.15em] text-honey">Duality</span>
      </div>
    </div>
  )
}
