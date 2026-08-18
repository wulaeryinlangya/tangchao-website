import SectionShell from '../components/SectionShell'
import FadingImage from '../components/FadingImage'
import Reveal from '../components/Reveal'
import CrossfadeBackground from '../components/CrossfadeBackground'
import SectionGeometry from '../components/SectionGeometry'
import { useParallax } from '../components/useParallax'

export default function About() {
  const parallaxRef = useParallax<HTMLDivElement>(-0.08)

  return (
    <SectionShell
      id="about"
      chapter="关于糖巢"
      index="01"
      eyebrow="// About 关于糖巢"
      title="老圩镇的重生"
      ghost="ABOUT"
      bg={
        <>
          <CrossfadeBackground
            images={[
              'photos/about-center.jpg',
              'photos/gal-center-1.jpg',
              'photos/about-food.jpg',
            ]}
            dim={0.7}
            interval={8000}
            intensity={0.2}
            filter="blur(2px)"
          />
          <SectionGeometry type="waves" theme="gold" />
        </>
      }
    >
      <div className="mt-10 grid flex-1 items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <Reveal>
            <p className="font-body text-base font-light leading-relaxed text-white/85 md:text-lg">
              糖巢创客社区位于河源市东源县仙塘镇，占地约{' '}
              <span className="font-heading text-xl italic text-white">12 万平方米</span>。
              在原有的老圩镇肌理之上，2023 年 12 月起，这里被打造成河源首个乡村创客社区。
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-base font-light leading-relaxed text-white/85 md:text-lg">
              从东江边的老圩场，到广东「百千万工程」先进案例；从入驻企业的第一盏灯，到 350 多位创客在此逐梦——
              糖巢把旧空间的活力重新唤醒，让青年、文化、产业与乡村在同一个屋檐下生长。
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3">
              {['东江畔 · 创客之乡', '老圩镇活化', '青年 × 乡村', '文化 × 产业'].map((tag) => (
                <span
                  key={tag}
                  className="liquid-glass press whitespace-nowrap rounded-full px-4 py-1.5 font-body text-xs font-light text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-6xl italic leading-none text-[#d4a64a]">12万㎡</span>
              <span className="font-body text-sm font-light text-white/70">
                从老圩场到创客社区的空间尺度
              </span>
            </div>
          </Reveal>
        </div>

        <div ref={parallaxRef} className="grid grid-cols-2 gap-4 will-change-transform">
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-[1.25rem]">
              <FadingImage
                src="photos/about-center.jpg"
                alt="糖巢创客中心"
                className="h-64 w-full object-cover md:h-80"
              />
            </div>
          </Reveal>
          <Reveal delay={250} className="mt-10">
            <div className="overflow-hidden rounded-[1.25rem]">
              <FadingImage
                src="photos/about-food.jpg"
                alt="客家美食"
                className="h-64 w-full object-cover md:h-80"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}
