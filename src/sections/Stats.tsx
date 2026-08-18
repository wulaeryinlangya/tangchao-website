import { useEffect, useState } from 'react'
import SectionShell from '../components/SectionShell'
import Reveal from '../components/Reveal'
import GridLines from '../components/GridLines'
import VideoBackdrop from '../components/VideoBackdrop'
import { useReveal } from '../components/useReveal'

type ChartType = 'ring' | 'bar' | 'line' | 'gauge'

interface Stat {
  value: number
  suffix: string
  label: string
  note: string
  chart: ChartType
  badge: string
}

const stats: Stat[] = [
  { value: 12, suffix: '万㎡', label: '社区占地', note: '老圩镇肌理之上活化生长', chart: 'ring', badge: 'Land' },
  { value: 8, suffix: '大业态', label: '业态版图', note: '创客 · 研学 · 文创 · 体验', chart: 'bar', badge: 'Forms' },
  { value: 3, suffix: '万人次', label: '2025 五一假期到访', note: '单假期超 3 万人次', chart: 'line', badge: 'May Day' },
  { value: 2500, suffix: '人次/日', label: '2026 春节日均接待', note: '节庆期间日均约 2500 人次', chart: 'gauge', badge: 'Spring' },
]

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const { ref, inView } = useReveal<HTMLSpanElement>()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) {
        setTimeout(() => tick(performance.now()), 16)
      }
    }
    const id = setTimeout(() => tick(performance.now()), 50)
    return () => clearTimeout(id)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

function useChartProgress() {
  const { ref, inView } = useReveal<HTMLDivElement>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(1 - Math.pow(1 - t, 3))
      if (t < 1) {
        setTimeout(() => tick(performance.now()), 16)
      }
    }
    const id = setTimeout(() => tick(performance.now()), 100)
    return () => clearTimeout(id)
  }, [inView])

  return { ref, progress }
}

function RingChart({ p }: { p: number }) {
  const r = 30
  const c = 2 * Math.PI * r
  const pct = 0.72
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20">
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(67,42,22,0.12)" strokeWidth="5" />
      <circle
        cx="40" cy="40" r={r} fill="none" stroke="#e0952f" strokeWidth="5"
        strokeDasharray={`${c * pct * p} ${c}`} strokeLinecap="round"
        transform="rotate(-90 40 40)"
      />
      <text x="40" y="46" textAnchor="middle" fontSize="13" fill="rgba(67,42,22,0.8)">{Math.round(72 * p)}%</text>
    </svg>
  )
}

function BarChart({ p }: { p: number }) {
  const bars = [0.5, 0.7, 0.9, 0.6, 0.8, 1, 0.55, 0.75]
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20">
      {bars.map((b, i) => {
        const h = b * 70 * p
        return (
          <rect
            key={i}
            x={i * 10 + 1} y={80 - h} width="8" height={h} rx="1.5"
            fill={i === 5 ? '#e0952f' : 'rgba(185,130,31,0.35)'}
          />
        )
      })}
    </svg>
  )
}

function LineChart({ p }: { p: number }) {
  const pts = [[0, 70], [14, 52], [28, 60], [42, 34], [56, 44], [70, 22], [80, 12]]
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const area = `${line} L80,80 L0,80 Z`
  const len = 200
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20">
      <path d={area} fill="rgba(212,166,74,0.15)" opacity={p} />
      <path
        d={line} fill="none" stroke="#d4a64a" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <circle cx="80" cy="12" r="3" fill="#d4a64a" opacity={p} />
    </svg>
  )
}

function GaugeChart({ p }: { p: number }) {
  const pct = 0.62
  const start = -135
  const sweep = pct * 270 * p
  const needleAngle = start + sweep * (270 / (pct * 270))
  const nx = 40 + 18 * Math.cos(((needleAngle + 45) * Math.PI) / 180)
  const ny = 50 + 18 * Math.sin(((needleAngle + 45) * Math.PI) / 180)
  return (
    <svg viewBox="0 0 80 60" className="h-15 w-20">
      <path
        d="M 10 50 A 30 30 0 1 1 70 50" fill="none"
        stroke="rgba(67,42,22,0.12)" strokeWidth="6" strokeLinecap="round"
      />
      <path
        d="M 10 50 A 30 30 0 1 1 70 50" fill="none"
        stroke="#d4a64a" strokeWidth="6" strokeLinecap="round"
        strokeDasharray={`${sweep} 999`}
        transform={`rotate(${start} 40 50)`}
      />
      <line x1="40" y1="50" x2={nx} y2={ny} stroke="#d4a64a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function AnimatedChart({ type }: { type: ChartType }) {
  const { ref, progress } = useChartProgress()
  return (
    <div ref={ref}>
      {type === 'ring' && <RingChart p={progress} />}
      {type === 'bar' && <BarChart p={progress} />}
      {type === 'line' && <LineChart p={progress} />}
      {type === 'gauge' && <GaugeChart p={progress} />}
    </div>
  )
}

export default function Stats() {
  return (
    <SectionShell
      id="stats"
      chapter="核心数据"
      index="02"
      eyebrow="// Stats 核心数据"
      title="一座社区的成绩单"
      bg={
        <>
          <VideoBackdrop
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4"
            scrim="linear-gradient(180deg, rgba(238,243,232,0.84), rgba(238,243,232,0.6) 45%, rgba(238,243,232,0.88))"
          />
          <GridLines />
          <div className="console-glow" style={{ width: '34rem', height: '34rem', right: '-10rem', top: '-8rem' }} />
        </>
      }
    >
      <div className="mt-12 grid flex-1 grid-cols-1 content-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) * 90}>
            <div className="console-panel glass-hover rounded-[1.25rem] p-6">
              <span className="console-bracket console-bracket--tl" aria-hidden="true" />
              <span className="console-bracket console-bracket--br" aria-hidden="true" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="console-tag">[ {s.badge.toUpperCase()} ]</span>
                  <div className="mt-2 font-heading text-4xl italic leading-none tracking-[-1px] text-ink md:text-5xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                    <span className="ml-1 align-middle text-sm text-honey">↑</span>
                  </div>
                </div>
                <div className="shrink-0 opacity-80">
                  <AnimatedChart type={s.chart} />
                </div>
              </div>
              <div className="mt-3 font-body text-sm font-medium text-ink/90">{s.label}</div>
              <div className="mt-1 font-body text-xs font-light leading-snug text-ink/60">
                {s.note}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
