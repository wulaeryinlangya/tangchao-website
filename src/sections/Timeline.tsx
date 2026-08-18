import SectionShell from '../components/SectionShell'
import Reveal from '../components/Reveal'
import CrossfadeBackground from '../components/CrossfadeBackground'
import SectionGeometry from '../components/SectionGeometry'

interface Milestone {
  period: string
  phase: string
  title: string
  desc: string
  photo: string
  honor: string
  stat: string
}

const milestones: Milestone[] = [
  {
    period: '2023.12',
    phase: '起步',
    title: '开园启幕',
    desc: '在原老圩镇肌理上开园，河源首个乡村创客社区正式亮相。',
    photo: 'photos/about-center.jpg',
    honor: '河源首个',
    stat: '12万㎡ 启动',
  },
  {
    period: '2024.06 – 11',
    phase: '破圈',
    title: '首届创客大赛',
    desc: '创客大赛一等奖最高 8 万元奖金 + 最高 200 万元银行授信，热度迎来第一个高峰。',
    photo: 'photos/gal-center-2.jpg',
    honor: '热度高峰',
    stat: '8万奖金 · 200万授信',
  },
  {
    period: '2025.05 – 12',
    phase: '标杆',
    title: '「媒体+」工作室 · 夜集市',
    desc: '全省首个「媒体+」乡村创客工作室落户，夜集市与打卡热带动持续出圈。',
    photo: 'photos/gal-drone.jpg',
    honor: '全省首个工作室',
    stat: '五一 3万+ 人次',
  },
  {
    period: '2026.01 – 08',
    phase: '全国',
    title: '走向全国视野',
    desc: '央级媒体密集报道，国内首个《乡村创客社区要素建设指南》发布。',
    photo: 'photos/gal-village-1.jpg',
    honor: '央级报道',
    stat: '首个要素建设指南',
  },
]

export default function Timeline() {
  return (
    <SectionShell
      id="timeline"
      chapter="发展历程"
      index="07"
      eyebrow="// Timeline 发展历程"
      title="两年，从圩镇到标杆"
      ghost="TIMELINE"
      ghostPosition="top-left"
      hue={190}
      bg={
        <>
          <div
            className="geo-ring"
            style={{ width: '34rem', height: '34rem', right: '-10rem', top: '30%' }}
          />
          <SectionGeometry type="vertical" theme="gold" />
          <CrossfadeBackground
            images={[
              'photos/gal-village-1.jpg',
              'photos/gal-village-2.jpg',
              'photos/gal-drone.jpg',
            ]}
            dim={0.7}
            interval={8000}
            intensity={0.17}
            filter="blur(5px)"
          />
        </>
      }
    >
      <div className="mt-12 flex flex-1 flex-col justify-center">
        <div className="relative ml-8 border-l border-white/15 lg:mx-auto lg:w-full lg:max-w-5xl lg:border-l-0">
          {/* center line with ruler ticks on desktop */}
          <div className="absolute left-0 top-0 hidden h-full w-px lg:left-1/2 lg:block lg:-translate-x-1/2 timeline-ruler" />

          {milestones.map((m, i) => (
            <Reveal
              key={m.period}
              delay={i * 120}
              className={`relative pb-12 pl-8 last:pb-0 lg:w-1/2 lg:pl-0 ${
                i % 2 === 1 ? 'lg:ml-auto lg:pl-8' : 'lg:pr-8 lg:text-right'
              }`}
            >
              {/* node marker */}
              <span
                className={`absolute top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#d4a64a]/60 bg-[#0a1513] ${
                  i % 2 === 1 ? 'left-[-16px] lg:left-[-14px]' : 'left-[-16px] lg:left-auto lg:right-[-14px]'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4a64a]" />
              </span>

              <div
                className={`liquid-glass glass-hover flex flex-col gap-4 rounded-[1.25rem] p-5 md:flex-row ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="h-36 w-full shrink-0 overflow-hidden rounded-xl md:w-44">
                  <img src={m.photo} alt={m.title} className="h-full w-full object-cover" />
                </div>
                <div className={`flex-1 ${i % 2 === 1 ? '' : 'lg:text-right'}`}>
                  <div className={`flex flex-wrap items-center gap-2 ${i % 2 === 1 ? '' : 'lg:justify-end'}`}>
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-[#d4a64a]">
                      {m.period}
                    </span>
                    <span className="rounded-full border border-[#d4a64a]/40 px-2 py-0.5 font-body text-[10px] text-[#d4a64a]">
                      {m.honor}
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 font-body text-[10px] uppercase tracking-wider text-white/50">
                      {m.phase}
                    </span>
                  </div>
                  <h3 className="mt-2 font-heading text-2xl italic leading-none tracking-[-1px] text-white md:text-3xl">
                    {m.title}
                  </h3>
                  <p className="mt-3 font-body text-sm font-light leading-snug text-white/80">
                    {m.desc}
                  </p>
                  <div className="mt-3 font-body text-sm font-medium text-[#d4a64a]/80">
                    {m.stat}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
