import { useRef } from 'react'
import ChapterMarker from '../components/ChapterMarker'
import VideoBackdrop from '../components/VideoBackdrop'
import { useAboutScroll } from '../components/useAboutScroll'
import { useSightSlider } from '../components/useSightSlider'

interface SightCardData {
  kicker: string
  h3: string
  p: string
  pin: string
}

const sightCards: SightCardData[] = [
  { kicker: '东江', h3: '东江 · 创客之乡', p: '糖巢临江而建,从老圩镇到省级标杆的起点。', pin: 'photos/pin-dongjiang.png' },
  { kicker: '老圩镇', h3: '老圩镇的重生', p: '在原有圩镇肌理上活化,历史与新生在此对话。', pin: 'photos/pin-town.png' },
  { kicker: '夜集', h3: '东江夜集', p: '夜市的灯亮起,青年、文创与烟火气在东江畔汇合。', pin: 'photos/pin-night.png' },
  { kicker: '嫑艺术空间', h3: '把「不要」变成「要」', p: '央美背景创客主理,一座把艺术带给乡村的公共客厅。', pin: 'photos/pin-art.png' },
  { kicker: '客家李记', h3: '三十年客家手艺', p: '一份经得起时间检验的手艺,在糖巢长出新的品牌溢价。', pin: 'photos/pin-food.png' },
]

const facts = [
  { dt: '12', dd: '万㎡ 老圩镇肌理' },
  { dt: '40', dd: '入驻企业' },
  { dt: '350', dd: '培育创客' },
  { dt: '8', dd: '大业态' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  useAboutScroll(sectionRef)
  useSightSlider(rootRef, sightCards)

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="老圩镇的重生 · 糖巢故事"
      className="about-cinema"
    >
      <div ref={rootRef} className="about-stage">
        {/* Sky — 视频背景替代照片 */}
        <VideoBackdrop
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4"
        />

        <div className="about-header">
          <span className="about-chap">
            <span className="dot" />
            01 · 关于糖巢
          </span>
        </div>

        {/* Display word */}
        <h1 className="about-title">
          老圩镇的重生
        </h1>

        {/* Intro copy + tags */}
        <div className="about-copy">
          <p>
            从东江边的老圩场,到广东「百千万工程」先进案例——
            一座有温度、有故事、有未来的乡村创客社区,正在东江河畔生长。
          </p>
          <div className="about-tags">
            <span>东江畔 · 创客之乡</span>
            <span>老圩镇活化</span>
            <span>青年 × 乡村</span>
          </div>
        </div>

        {/* Aerial close-up (frame two) */}
        <img
          className="about-frame2"
          src="photos/gal-drone.jpg"
          alt=""
        />

        {/* Color-grade shade */}
        <div className="about-shade" />

        {/* Act 2 panel: bridge/landmark facts */}
        <div className="about-panel about-panel--bridge">
          <ChapterMarker index="01" label="关于糖巢" />
          <h2>东江畔的创客之乡</h2>
          <p>
            在原老圩镇肌理上,2023 年 12 月起,河源首个乡村创客社区在这里生长。
          </p>
          <dl className="about-facts">
            {facts.map((f) => (
              <div key={f.dd}>
                <dt>{f.dt}</dt>
                <dd>{f.dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Act 3 panel: old-town story */}
        <div className="about-panel about-panel--bazaar">
          <ChapterMarker index="01" label="关于糖巢" />
          <h2>老圩镇的重生</h2>
          <p>
            从入驻企业的第一盏灯,到 350 多位创客在此逐梦——
            青年、文化、产业与乡村在同一个屋檐下生长。
          </p>
        </div>

        {/* Sights slider */}
        <div className="about-slider" aria-label="糖巢印象">
          <div className="about-track" />
        </div>

        <div className="about-controls" aria-label="糖巢印象导航">
          <button type="button" className="about-prev" aria-label="上一个">←</button>
          <button type="button" className="about-next" aria-label="下一个">→</button>
        </div>
      </div>
    </section>
  )
}
