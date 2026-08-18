import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionShell from '../components/SectionShell'
import SectionGeometry from '../components/SectionGeometry'
import BackgroundFx from '../components/BackgroundFx'
import VideoBackdrop from '../components/VideoBackdrop'
import TiltCard from '../components/TiltCard'

interface Space {
  photo: string
  name: string
  tagline: string
  alt: string
  detail: string
  hue: number
  kicker: string
}

const spaces: Space[] = [
  {
    photo: 'photos/space-art.jpg',
    name: '嫑艺术空间',
    tagline: '一座把「不要」变成「要」的艺术场域，央美背景创客主理',
    alt: '嫑艺术空间',
    detail: '吴文波把「嫑」字拆成「不要」，让艺术与乡村在这里相遇——糖巢的公共客厅。',
    hue: 190,
    kicker: '艺术空间',
  },
  {
    photo: 'photos/space-food.jpg',
    name: '客家李记',
    tagline: '三十年传承手艺，被重新看见的客家味道',
    alt: '客家李记美食',
    detail: '从家族传承的客家味道出发，一份经得起时间检验的手艺在糖巢长出新的品牌溢价。',
    hue: 70,
    kicker: '客家美食',
  },
  {
    photo: 'photos/night.jpg',
    name: '南园古村',
    tagline: '一街之隔的古村肌理，与糖巢遥遥相望',
    alt: '南园古村',
    detail: '夜色里的古村与创客社区互为映照，老圩场的新旧在此对话。',
    hue: 270,
    kicker: '古村夜景',
  },
]

function SpaceStackCard({ space, index, total }: { space: Space; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  const targetScale = 1 - (total - 1 - index) * 0.06
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={ref} className="flex h-[55vh] flex-col items-center justify-start">
      <motion.div
        style={{
          scale,
          top: `calc(0.5rem + ${index * 1}rem)`,
          ['--card-hue' as string]: space.hue,
        }}
        className="stack-card sticky top-24 w-full max-w-5xl"
      >
        <TiltCard maxTilt={5}>
          <img src={space.photo} alt={space.alt} className="h-[45vh] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1513]/90 via-transparent to-transparent" />
          <div className="stack-caption absolute bottom-0 left-0 right-0 p-6">
            <div className="liquid-glass rounded-2xl px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-heading text-2xl italic leading-none tracking-[-1px] text-ink md:text-3xl">
                  {space.name}
                </h3>
                <span className="shrink-0 font-body text-[10px] uppercase tracking-wider text-honey">
                  {space.kicker}
                </span>
              </div>
              <p className="mt-2 font-body text-sm font-light leading-snug text-ink/80">
                {space.tagline}
              </p>
              <p className="stack-detail mt-2 font-body text-sm font-light leading-snug text-ink/70">
                {space.detail}
              </p>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  )
}

export default function Spaces() {
  return (
    <SectionShell
      id="spaces"
      chapter="特色空间"
      index="05"
      eyebrow="// Spaces 特色空间"
      title="值得停留的地方"
      hue={165}
      bg={
        <>
          <VideoBackdrop
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4"
            scrim="linear-gradient(180deg, rgba(238,244,238,0.84), rgba(238,244,238,0.6) 45%, rgba(238,244,238,0.88))"
          />
          <BackgroundFx type="orbs" dim />
          <SectionGeometry type="horizon" />
        </>
      }
    >
      <div className="mt-6 flex flex-1 flex-col gap-0">
        {spaces.map((s, i) => (
          <SpaceStackCard key={s.name} space={s} index={i} total={spaces.length} />
        ))}
      </div>
    </SectionShell>
  )
}
