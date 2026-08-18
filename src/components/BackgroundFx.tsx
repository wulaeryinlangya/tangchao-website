interface BackgroundFxProps {
  /** 氛围类型：orbs=漂移光球 · geo=3D 悬浮几何 · dots=点阵微光 */
  type: 'orbs' | 'geo' | 'dots'
  /** 减弱强度（内容多的板块用） */
  dim?: boolean
  /** 额外样式（如半透明叠层） */
  className?: string
}

interface GeoItem {
  kind: 'ring' | 'orb' | 'float'
  size: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  color: string
  anim?: string
  delay?: string
  duration?: string
  style?: React.CSSProperties
}

/**
 * 暖色背景氛围动效：启用 index.css 里预留的 bg-orbs / geo3d / dots 基建，
 * 纯 transform+opacity 动画（GPU 合成），prefers-reduced-motion 下自动静止。
 */
export default function BackgroundFx({ type, dim = false, className = '' }: BackgroundFxProps) {
  const dimClass = dim ? ' bg-orbs--dim' : ''

  if (type === 'orbs') {
    return <div className={`bg-orbs${dimClass} ${className}`.trim()} aria-hidden="true" />
  }

  if (type === 'dots') {
    return (
      <div className={className} aria-hidden="true">
        <div className="bg-dots-texture" />
        <div className="bg-vignette" />
      </div>
    )
  }

  // type === 'geo'
  const geoItems: GeoItem[] = [
    { kind: 'ring', size: 560, top: '-12rem', left: '-10rem', color: 'rgba(212,166,74,0.5)', anim: 'g3d-r', duration: '40s' },
    { kind: 'ring', size: 420, right: '-8rem', bottom: '-10rem', color: 'rgba(40,132,130,0.4)', duration: '34s' },
    { kind: 'orb', size: 14, top: '18%', left: '16%', color: '#e0952f', anim: 'g3d-p' },
    { kind: 'orb', size: 10, top: '68%', left: '78%', color: '#288482', anim: 'g3d-p', delay: '1.2s' },
    { kind: 'float', size: 90, top: '22%', right: '18%', color: 'rgba(224,149,47,0.22)', anim: 'g3d-a' },
    { kind: 'float', size: 64, bottom: '16%', left: '30%', color: 'rgba(40,132,130,0.18)', anim: 'g3d-b' },
  ]

  return (
    <div className={`geo3d ${className}`.trim()} aria-hidden="true">
      {geoItems.map((g, i) => {
        const base: React.CSSProperties = {
          width: g.size,
          height: g.size,
          top: g.top,
          left: g.left,
          right: g.right,
          bottom: g.bottom,
          animationDelay: g.delay,
          ['--d' as string]: g.duration,
        }
        if (g.kind === 'ring') {
          return (
            <span
              key={i}
              className={`geo3d-ring ${g.anim ?? ''}`.trim()}
              style={{
                ...base,
                border: `1.5px solid ${g.color}`,
                boxShadow: `0 0 60px rgba(224,149,47,0.12) inset`,
              }}
            />
          )
        }
        if (g.kind === 'orb') {
          return (
            <span
              key={i}
              className={`geo3d-orb ${g.anim ?? ''}`.trim()}
              style={{ ...base, background: `radial-gradient(circle, ${g.color}, transparent 70%)`, opacity: 0.5 }}
            />
          )
        }
        return (
          <span
            key={i}
            className={`geo3d-float ${g.anim ?? ''}`.trim()}
            style={{ ...base, background: g.color, borderRadius: 22 }}
          />
        )
      })}
    </div>
  )
}
