import CrossfadeBackground from '../components/CrossfadeBackground'
import BlurText from '../components/BlurText'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'
import { useActiveSection } from '../components/useActiveSection'
import { useEffect, useState } from 'react'
import { ArrowUpRight, ClockIcon, PlayIcon, UsersIcon } from '../components/icons'

const navLinks = [
  { label: '关于糖巢', href: '#about' },
  { label: '核心数据', href: '#stats' },
  { label: '调研数据', href: '#data' },
  { label: '八大业态', href: '#business' },
  { label: '特色空间', href: '#spaces' },
  { label: '创客风采', href: '#creators' },
  { label: '发展历程', href: '#timeline' },
]

const sectionIds = ['about', 'stats', 'data', 'business', 'spaces', 'creators', 'timeline']

const honors = [
  '广东「百千万工程」先进案例',
  '省文旅消费新业态热门场景',
  '全省首个「媒体+」乡村创客工作室',
  '国内首个《乡村创客社区要素建设指南》',
]

export default function Hero() {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navText = scrolled ? 'text-ink hover:text-ink/80' : 'text-white/90 hover:text-white'
  const navActive = scrolled ? 'bg-ink/10 text-ink' : 'bg-white/10 text-white'
  const ctaText = scrolled ? 'text-ink' : 'text-white'

  return (
    <section className="surface-hero relative h-screen overflow-hidden">
      <CrossfadeBackground
        images={[
          'photos/about-center.jpg',
          'photos/night.jpg',
          'photos/space-village.jpg',
          'photos/river.jpg',
        ]}
        dim={0.5}
        interval={7000}
        switcher
        switcherLabel={['东江', '夜集', '古村', '中心']}
      />

      <div className="relative z-10 flex h-full flex-col">
        <nav className={`fixed left-0 right-0 top-4 z-50 flex items-center justify-between px-8 lg:px-16 ${scrolled ? '' : ''}`}>
          <div className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full">
            <span className={`font-heading text-2xl italic ${scrolled ? 'text-ink' : 'text-white'}`}>糖</span>
          </div>

          <div className="liquid-glass hidden items-center rounded-full px-1.5 py-1.5 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-2 font-body text-sm font-medium transition ${
                    isActive ? navActive : navText
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="#contact"
              className={`liquid-glass-strong flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ${ctaText}`}
            >
              联系我们
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="h-12 w-12" />
        </nav>

        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center">
          <Reveal delay={400}>
            <div className="liquid-glass flex items-center gap-3 rounded-full px-4 py-2">
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Est. 2023
              </span>
              <span className="font-body text-sm font-light text-white/90">
                广东「百千万工程」先进案例 · 东源仙塘
              </span>
            </div>
          </Reveal>

          <Reveal delay={550} className="mt-8 max-w-5xl">
            <BlurText
              text="东江畔的创客之乡"
              split="chars"
              className="font-heading text-6xl italic leading-[1.05] tracking-[-2px] text-white md:text-7xl lg:text-[5.5rem]"
            />
          </Reveal>

          <Reveal delay={800}>
            <p className="mt-6 max-w-2xl font-body text-sm font-light leading-relaxed text-white/90 md:text-base">
              河源市东源县仙塘镇糖巢创客社区——从老圩镇到省级标杆，一座有温度、有故事、有未来的乡村创客社区，
              正在东江河畔悄然生长。
            </p>
          </Reveal>

          <Reveal delay={1100}>
            <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row">
              <MagneticButton href="#contact" className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white">
                预约参访
                <ArrowUpRight size={16} />
              </MagneticButton>
              <a
                href="#business"
                className="flex items-center gap-2 font-body text-sm font-medium text-white"
              >
                <PlayIcon size={18} />
                云游糖巢
              </a>
            </div>
          </Reveal>

          <Reveal delay={1300}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <div className="liquid-glass w-[220px] rounded-[1.25rem] p-5 text-left">
                <ClockIcon size={22} className="text-white/80" />
                <div className="font-heading mt-4 text-4xl italic leading-none tracking-[-1px]">
                  40+
                </div>
                <div className="mt-2 font-body text-sm font-light text-white/80">
                  入驻企业 · 河源首个乡村创客社区
                </div>
              </div>
              <div className="liquid-glass w-[220px] rounded-[1.25rem] p-5 text-left">
                <UsersIcon size={22} className="text-white/80" />
                <div className="font-heading mt-4 text-4xl italic leading-none tracking-[-1px]">
                  350+
                </div>
                <div className="mt-2 font-body text-sm font-light text-white/80">
                  培育创客 · 在这里逐梦
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={1400}>
          <div className="flex flex-col items-center gap-4 pb-8">
            <div className="liquid-glass rounded-full px-5 py-2">
              <span className="font-body text-sm font-light text-white/80">
                从老圩镇到省级标杆，两年生长
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
              {honors.map((honor) => (
                <span
                  key={honor}
                  className="font-body text-xs font-light tracking-wide text-white/70 md:text-sm"
                >
                  {honor}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
