import { useState } from 'react'
import SectionShell from '../components/SectionShell'
import Reveal from '../components/Reveal'
import SectionGeometry from '../components/SectionGeometry'
import BackgroundFx from '../components/BackgroundFx'
import VideoBackdrop from '../components/VideoBackdrop'
import GameModal from '../components/GameModal'
import { ImageIcon, MovieIcon, LightbulbIcon, GlobeIcon, UsersIcon } from '../components/icons'

interface Business {
  icon: React.ReactNode
  name: string
  tagline: string
  detail: string
  photo: string
  gameId: string
}

const businesses: Business[] = [
  { icon: <LightbulbIcon size={20} />, name: '创客', tagline: '让想法在乡村落地生长', detail: '企业进驻、创客大赛，河源首个乡村创客社区的孵化土壤。', photo: './photos/biz-maker.jpg', gameId: 'maker' },
  { icon: <GlobeIcon size={20} />, name: '研学', tagline: '在地文化里的行走课堂', detail: '「三下乡」「百千万突击队」在此实践，青年与乡村深度连接。', photo: './photos/biz-study.jpg', gameId: 'study' },
  { icon: <ImageIcon size={20} />, name: '文创', tagline: '河源地标 · 五县一区文创', detail: '河源地标积木、五县一区地图冰箱贴，把一座城带回家。', photo: './photos/biz-craft.jpg', gameId: 'craft' },
  { icon: <MovieIcon size={20} />, name: '体验', tagline: '手工坊 · 夜集市 · 沉浸打卡', detail: '制作馒头体验、夜集市、沉浸式打卡，来了就停不下来。', photo: './photos/biz-exp.jpg', gameId: 'exp' },
  { icon: <UsersIcon size={20} />, name: '美食', tagline: '客家李记 · 到吉窑鸡 · 文创雪糕', detail: '三十年客家手艺、窑鸡、文创雪糕，味蕾与记忆一起被唤醒。', photo: './photos/biz-food.jpg', gameId: 'food' },
  { icon: <LightbulbIcon size={20} />, name: '婚庆', tagline: '老圩场里的仪式感', detail: '在老圩场的肌理里办一场婚礼，历史感与仪式感并存。', photo: './photos/biz-wedding.jpg', gameId: 'wedding' },
  { icon: <ImageIcon size={20} />, name: '度假', tagline: '东江畔的慢生活', detail: '沿东江而居，把日子过成度假，适合放空与停留。', photo: './photos/biz-holiday.jpg', gameId: 'holiday' },
  { icon: <MovieIcon size={20} />, name: '街拍', tagline: '光影可出片的新街景', detail: '老建筑 + 新业态，处处是镜头里的出片角落。', photo: './photos/biz-street.jpg', gameId: 'street' },
]

function FlipCard({ b, index, onPlay }: { b: Business; index: number; onPlay: () => void }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flip-card h-[24rem]" onClick={() => setFlipped((f) => !f)}>
      <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-face flip-front liquid-glass glass-hover rounded-[1.25rem] overflow-hidden">
          <div className="relative h-32 overflow-hidden">
            <img src={b.photo} alt={b.name} className="h-full w-full object-cover" />
            <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 font-heading text-xl italic text-white/80">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="p-6">
            <div className="liquid-glass flex h-11 w-11 items-center justify-center rounded-[0.75rem] text-ink/90">
              {b.icon}
            </div>
            <div className="mt-3 font-heading text-3xl italic leading-none tracking-[-1px] text-ink">
              {b.name}
            </div>
            <p className="mt-2 font-body text-sm font-light leading-snug text-ink/75">{b.tagline}</p>
            <p className="mt-3 font-body text-xs text-ink/40">点击翻转 ›</p>
          </div>
        </div>

        <div className="flip-face flip-back rounded-[1.25rem] border border-honey/30 bg-paper-2 p-6">
          <div className="flex items-center justify-between">
            <span className="font-heading text-2xl italic text-ink">{b.name}</span>
            <span className="font-body text-[10px] uppercase tracking-wider text-honey">
              业态 · {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <p className="mt-4 font-body text-sm font-light leading-relaxed text-ink/80">{b.detail}</p>
          <div className="mt-auto pt-6">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onPlay()
              }}
              className="press w-full rounded-full border border-honey/50 bg-honey/10 py-2.5 font-body text-sm text-honey hover:bg-honey/20"
            >
              🎮 玩个小游戏
            </button>
            <p className="mt-3 text-center font-body text-xs text-ink/40">点击返回 ›</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Business() {
  const [activeGame, setActiveGame] = useState<string | null>(null)

  const openGame = (gameId: string) => setActiveGame(gameId)

  return (
    <SectionShell
      id="business"
      chapter="八大业态"
      index="04"
      eyebrow="// Business 八大业态"
      title="一街，八种玩法"
      hue={45}
      bg={
        <>
          <VideoBackdrop
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4"
            scrim="linear-gradient(180deg, rgba(250,242,226,0.84), rgba(250,242,226,0.6) 45%, rgba(250,242,226,0.88))"
          />
          <BackgroundFx type="geo" />
          <div className="geo-ring" style={{ width: '46rem', height: '46rem', left: '-12rem', bottom: '-14rem' }} />
          <SectionGeometry type="orbit" theme="amber" />
        </>
      }
    >
      <div className="mt-12 grid flex-1 grid-cols-1 content-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {businesses.map((b, i) => (
          <Reveal key={b.name} delay={(i % 4) * 90}>
            <FlipCard b={b} index={i} onPlay={() => openGame(b.gameId)} />
          </Reveal>
        ))}
      </div>

      {activeGame && (
        <GameModal
          title={businesses.find((b) => b.gameId === activeGame)?.name ?? ''}
          gameId={activeGame}
          photo={businesses.find((b) => b.gameId === activeGame)?.photo ?? ''}
          onClose={() => setActiveGame(null)}
        />
      )}
    </SectionShell>
  )
}
