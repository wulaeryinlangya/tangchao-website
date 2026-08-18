import { useState } from 'react'
import SectionShell from '../components/SectionShell'
import Tabs from '../components/Tabs'
import Reveal from '../components/Reveal'
import GridLines from '../components/GridLines'
import VideoBackdrop from '../components/VideoBackdrop'
import TierStructureChart from '../components/charts/TierStructureChart'
import MediaMatrixChart from '../components/charts/MediaMatrixChart'
import TimelineChart from '../components/charts/TimelineChart'
import FormatChart from '../components/charts/FormatChart'
import DualityChart from '../components/charts/DualityChart'
import CoreChart from '../components/charts/CoreChart'

const metrics = [
  { value: '836', unit: '条', label: '全网抓取数据', note: '微信 · 小红书 · B站 · 微博' },
  { value: '142', unit: '条', label: '深度相关数据', note: '人工清洗与内容分类' },
  { value: '4', unit: '类', label: '传播主体', note: '官方媒体 · 用户 · 高校实践' },
  { value: '2023', unit: '–26', label: '传播周期', note: '开园至今持续发酵' },
]

interface ChartTab {
  id: string
  label: string
  caption: string
}

const tabs: ChartTab[] = [
  { id: 'structure', label: '传播结构', caption: '糖巢的三层传播结构：官方权威 × 用户口碑 × 高校实践' },
  { id: 'media', label: '媒体矩阵', caption: '央级 + 省级 + 本地媒体协同的传播矩阵' },
  { id: 'timeline', label: '传播时间线', caption: '2023–2026 热度沿里程碑节点起伏' },
  { id: 'format', label: '内容形态', caption: '内容主题与形态分布' },
  { id: 'duality', label: '双平台调性', caption: '微信官方叙事 vs 小红书用户实感' },
  { id: 'core', label: '核心数据', caption: '贯穿传播全程的关键数据卡' },
]

export default function Data() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0]

  const renderChart = () => {
    switch (active.id) {
      case 'media': return <MediaMatrixChart />
      case 'timeline': return <TimelineChart />
      case 'format': return <FormatChart />
      case 'duality': return <DualityChart />
      case 'core': return <CoreChart />
      default: return <TierStructureChart />
    }
  }

  return (
    <SectionShell
      id="data"
      chapter="调研数据"
      index="03"
      eyebrow="// Research 调研数据"
      title="数据里的糖巢传播"
      bg={
        <>
          <VideoBackdrop
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4"
            scrim="linear-gradient(180deg, rgba(236,244,234,0.84), rgba(236,244,234,0.6) 45%, rgba(236,244,234,0.88))"
          />
          <GridLines />
          <div className="console-glow" style={{ width: '30rem', height: '30rem', left: '-9rem', bottom: '-6rem' }} />
        </>
      }
    >
      <Reveal delay={250}>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={m.label} className="console-panel glass-hover rounded-[1.25rem] p-6">
              <span className="console-bracket console-bracket--tl" aria-hidden="true" />
              <span className="console-bracket console-bracket--br" aria-hidden="true" />
              <span className="console-tag">[ M{String(i + 1).padStart(2, '0')} ]</span>
              <div className="mt-2 font-heading text-4xl italic leading-none tracking-[-1px] text-ink md:text-5xl">
                {m.value}
                <span className="ml-1 text-2xl text-honey">{m.unit}</span>
              </div>
              <div className="mt-3 font-body text-sm font-medium text-ink/90">{m.label}</div>
              <div className="mt-1 font-body text-xs font-light leading-snug text-ink/60">{m.note}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 flex flex-1 flex-col">
        <Reveal delay={300}>
          <Tabs items={tabs.map(({ id, label }) => ({ id, label }))} activeId={activeTab} onChange={setActiveTab} />
        </Reveal>
        <Reveal delay={350} className="mt-6 flex-1">
          {renderChart()}
        </Reveal>
      </div>
    </SectionShell>
  )
}
