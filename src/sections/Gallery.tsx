import { useCallback, useState } from 'react'
import SectionShell from '../components/SectionShell'
import PhotoMarquee from '../components/PhotoMarquee'
import Lightbox from '../components/Lightbox'
import Reveal from '../components/Reveal'
import BackgroundFx from '../components/BackgroundFx'
import VideoBackdrop from '../components/VideoBackdrop'

interface GalleryItem {
  src: string
  caption: string
}

const photos = [
  'gal-art-1',
  'gal-center-1',
  'gal-food-1',
  'gal-village-1',
  'gal-drone',
  'gal-maker-1',
  'gal-art-2',
  'gal-food-2',
  'gal-maker-2',
  'gal-center-2',
  'gal-village-2',
  'about-center',
  'about-food',
  'center-extra',
  'creator-li',
  'creator-wu',
  'creator-xu',
  'hero-drone',
  'maker-space',
  'space-art',
  'space-food',
  'space-village',
]

const items: GalleryItem[] = [
  { src: './photos/gal-art-1.jpg', caption: '嫑艺术空间 · 公共客厅' },
  { src: './photos/gal-center-1.jpg', caption: '糖巢创客中心 · 街景' },
  { src: './photos/gal-food-1.jpg', caption: '客家李记 · 三十年手艺' },
  { src: './photos/gal-village-1.jpg', caption: '南园古村 · 老圩场记忆' },
  { src: './photos/gal-drone.jpg', caption: '东江河畔 · 空中视角' },
  { src: './photos/gal-maker-1.jpg', caption: '糖巢创客空间 · 工作室' },
  { src: './photos/gal-art-2.jpg', caption: '嫑艺术空间 · 细节' },
  { src: './photos/gal-food-2.jpg', caption: '客家味道 · 餐桌' },
  { src: './photos/gal-maker-2.jpg', caption: '创客日常 · 灵感发生地' },
  { src: './photos/gal-center-2.jpg', caption: '创客中心 · 夜色' },
  { src: './photos/gal-village-2.jpg', caption: '南园古村 · 街角' },
]

const row1 = photos.slice(0, 11).map((p) => `./photos/${p}.jpg`)
const row2 = photos.slice(11).map((p) => `./photos/${p}.jpg`)

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const open = useCallback(() => setOpenIndex(0), [])
  const close = useCallback(() => setOpenIndex(null), [])
  const navigate = useCallback((i: number) => setOpenIndex(i), [])

  return (
    <SectionShell
      id="gallery"
      chapter="影像糖巢"
      index="08"
      eyebrow="// Gallery 影像糖巢"
      title="光影里的糖巢"
      hue={165}
      bg={
        <>
          <div className="bg-wash" />
          <VideoBackdrop
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4"
            scrim="linear-gradient(180deg, rgba(250,244,233,0.8), rgba(250,244,233,0.55) 45%, rgba(250,244,233,0.85))"
          />
          <BackgroundFx type="orbs" dim />
        </>
      }
    >
      <Reveal className="mt-12 flex-1">
        <PhotoMarquee rows={[row1, row2]} />
      </Reveal>

      <Reveal delay={150} className="mt-4 flex flex-col items-center gap-4 pb-4">
        <p className="font-body text-sm font-light text-ink/70">
          东江岸边 · 22 个光影瞬间
        </p>
        <button
          type="button"
          onClick={open}
          className="press liquid-glass rounded-full px-6 py-3 font-body text-sm font-medium text-ink/90 transition hover:text-ink"
        >
          查看全部照片
        </button>
      </Reveal>

      {openIndex !== null && (
        <Lightbox items={items} index={openIndex} onClose={close} onNavigate={navigate} />
      )}
    </SectionShell>
  )
}
