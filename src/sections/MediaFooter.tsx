import { useState } from 'react'
import SectionShell from '../components/SectionShell'
import Reveal from '../components/Reveal'
import CrossfadeBackground from '../components/CrossfadeBackground'
import { ImageIcon, GlobeIcon, UsersIcon } from '../components/icons'

interface Tier {
  icon: React.ReactNode
  title: string
  role: string
  summary: string
  detail: string
  evidence: string
}

const tiers: Tier[] = [
  {
    icon: <GlobeIcon size={20} />,
    title: '官方媒体 · 权威背书',
    role: '认可力',
    summary: '央级与省级媒体持续报道，为社区提供权威性与公信力。',
    detail: '媒体矩阵以「本地为主 + 省级辐射」：河源广播电视台 15 条、河源日报 6 条、河源发布 5 条，羊城晚报系 5 条持续关注。',
    evidence: '38 条官方报道 · 本地 15+ 条',
  },
  {
    icon: <UsersIcon size={20} />,
    title: '用户口碑 · 实地打卡',
    role: '真实感',
    summary: '小红书、抖音上的「打卡」「探店」真实分享，把流量转化为到访。',
    detail: '普通用户以打卡、探店、遛娃等生活化内容自发传播，真实体验形成「二次传播」，吸引更多潜在游客与创客。',
    evidence: '小红书 44 条用户分享',
  },
  {
    icon: <ImageIcon size={20} />,
    title: '高校实践 · 内容共创',
    role: '生命力',
    summary: '高校实践团与「媒体+」工作室持续产出影像，抵达年轻群体。',
    detail: '高校「三下乡」「百千万工程突击队」在 B站 发布实践记录视频，连接高校资源，放大项目在青年群体中的影响力。',
    evidence: 'B站 实践视频 · 青年联动',
  },
]

function MediaCard({ t, open, onToggle }: { t: Tier; open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`liquid-glass glass-hover press block w-full rounded-[1.25rem] p-6 text-left transition ${
        open ? 'ring-1 ring-[#d4a64a]/40' : ''
      }`}
    >
      <div className="liquid-glass flex h-11 w-11 items-center justify-center rounded-[0.75rem] text-white/90">
        {t.icon}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="font-body text-xs uppercase tracking-[0.2em] text-white/50">{t.role}</span>
        <span className="font-body text-xs text-[#d4a64a]">{open ? '收起 ∧' : '展开 ∨'}</span>
      </div>
      <h3 className="mt-2 font-heading text-2xl italic leading-none tracking-[-1px] text-white">
        {t.title}
      </h3>
      <p className="mt-3 font-body text-sm font-light leading-snug text-white/80">{t.summary}</p>

      {open && (
        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
          <p className="font-body text-sm font-light leading-relaxed text-white/75">{t.detail}</p>
          <div className="rounded-lg border border-[#d4a64a]/30 bg-[#d4a64a]/5 px-3 py-2 font-body text-xs font-medium text-[#d4a64a]">
            {t.evidence}
          </div>
        </div>
      )}
    </button>
  )
}

export default function MediaFooter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <SectionShell
      id="media"
      chapter="媒体传播"
      index="09"
      eyebrow="// Media 媒体传播"
      title="三层结构，互相成就"
      ghost="MEDIA"
      bg={
        <CrossfadeBackground
          images={[
            'photos/gal-drone.jpg',
            'photos/center-extra.jpg',
            'photos/gal-village-1.jpg',
          ]}
          dim={0.7}
          interval={8000}
          intensity={0.18}
          filter="blur(2px)"
        />
      }
    >
      <div className="mt-12 grid flex-1 grid-cols-1 content-center gap-6 md:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.role} delay={i * 120}>
            <MediaCard t={t} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          </Reveal>
        ))}
      </div>

      <footer id="contact" className="mt-16">
        <Reveal>
          <div className="liquid-glass-strong flex flex-col items-center gap-6 rounded-[1.5rem] p-10 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <div className="font-heading text-2xl italic text-white">欢迎来到糖巢</div>
              <p className="mt-2 font-body text-sm font-light text-white/70">
                东江畔的创客之乡 · 从老圩镇到省级标杆
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 font-body text-sm font-light text-white/70 md:items-end">
              <span>公众号：糖巢农文旅</span>
              <span>基地地址：河源市东源县仙塘镇红光村</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 font-body text-xs font-light text-white/50 md:flex-row">
          <span>© 2026 糖巢创客社区 · 三下乡技术组</span>
          <span>东江畔的创客之乡</span>
        </div>
      </footer>
    </SectionShell>
  )
}
