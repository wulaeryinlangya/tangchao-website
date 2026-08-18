import SectionShell from '../components/SectionShell'
import FadingImage from '../components/FadingImage'
import Reveal from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import CrossfadeBackground from '../components/CrossfadeBackground'
import SectionGeometry from '../components/SectionGeometry'
interface Creator {
  photo: string
  name: string
  role: string
  line: string
  story: string
}

const creators: Creator[] = [
  {
    photo: 'photos/creator-li.jpg',
    name: '李渊',
    role: '客家李记 · 主理人',
    line: '三十年客家手艺，在糖巢被重新看见。',
    story: '从家族传承的客家味道出发，李渊把「客家李记」带进糖巢。一份经得起时间检验的手艺，在乡村创客社区的土壤里长出了新的品牌溢价。',
  },
  {
    photo: 'photos/creator-wu.jpg',
    name: '吴文波',
    role: '嫑艺术空间 · 主理人',
    line: '把「不要」变成「要」的艺术场域。',
    story: '「嫑」字拆开是「不要」——吴文波用一座艺术空间，让更多人愿意留下来。这里是糖巢的公共客厅，也是艺术与乡村相遇的地方。',
  },
  {
    photo: 'photos/creator-xu.jpg',
    name: '徐晨喻',
    role: '源·艺术空间 · 文创',
    line: '央美背景，把河源放进文创。',
    story: '河源地标积木、五县一区地图冰箱贴——徐晨喻用设计语言重新讲述河源。文创产品让游客把一座城的记忆带回家。',
  },
]

export default function Creators() {
  return (
    <SectionShell
      id="creators"
      chapter="创客风采"
      index="06"
      eyebrow="// Creators 创客风采"
      title="乡村里的手艺人"
      ghost="MAKERS"
      hue={30}
      bg={
        <>
          <SectionGeometry type="rays" theme="orange" />
          <CrossfadeBackground
            images={[
              'photos/creator-wu.jpg',
              'photos/creator-li.jpg',
              'photos/creator-xu.jpg',
            ]}
            dim={0.7}
            interval={8000}
            intensity={0.16}
            filter="blur(8px)"
          />
        </>
      }
    >
      <div className="mt-12 grid flex-1 grid-cols-1 content-center gap-6 md:grid-cols-3">
        {creators.map((c, i) => (
          <Reveal key={c.name} delay={i * 120}>
            <TiltCard>
              <div className="group glass-hover overflow-hidden rounded-[1.25rem]">
                <div className="aspect-[4/5] overflow-hidden">
                  <FadingImage
                    src={c.photo}
                    alt={c.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="liquid-glass p-6">
                  <div className="font-body text-xs uppercase tracking-[0.2em] text-white/50">
                    {c.role}
                  </div>
                  <h3 className="mt-2 font-heading text-2xl italic leading-none tracking-[-1px] text-white md:text-3xl">
                    {c.name}
                  </h3>
                  <p className="mt-3 font-body text-sm font-light leading-snug text-white/85">
                    {c.line}
                  </p>
                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-48 group-hover:opacity-100">
                    <p className="mt-3 border-t border-white/10 pt-3 font-body text-sm font-light leading-snug text-white/70">
                      {c.story}
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
