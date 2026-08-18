interface SectionGeometryProps {
  type: 'waves' | 'dots' | 'network' | 'orbit' | 'horizon' | 'rays' | 'vertical'
  theme?: 'white' | 'gold' | 'amber' | 'teal' | 'orange'
  className?: string
}

const THEME: Record<string, string> = {
  white: '#ffffff',
  gold: 'rgba(212, 166, 74, 1)',
  amber: 'rgba(216, 140, 64, 1)',
  teal: 'rgba(40, 132, 130, 1)',
  orange: 'rgba(214, 104, 58, 1)',
}

function Waves() {
  return (
    <>
      {[260, 420, 600, 800].map((r) => (
        <circle
          key={r}
          cx="80"
          cy="1010"
          r={r}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.06"
        />
      ))}
      <path
        d="M -200 780 A 480 480 0 0 1 620 300"
        fill="none"
        stroke="rgba(212,166,74,0.10)"
        strokeWidth="1.5"
      />
    </>
  )
}

function Dots({ theme }: { theme: string }) {
  return (
    <>
      <defs>
        <pattern id="geo-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="1.3" fill={theme} fillOpacity="0.13" />
        </pattern>
      </defs>
      <rect width="1440" height="900" fill="url(#geo-dots)" />
    </>
  )
}

function Network() {
  const nodes = [
    { x: 1150, y: 140 }, { x: 1000, y: 320 }, { x: 1280, y: 470 }, { x: 900, y: 600 },
    { x: 1100, y: 720 }, { x: 640, y: 180 }, { x: 700, y: 380 }, { x: 1380, y: 260 },
    { x: 1330, y: 640 }, { x: 520, y: 500 }, { x: 1450, y: 780 }, { x: 830, y: 520 },
  ]
  const gold = new Set([1, 4, 8, 10])
  return (
    <>
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((m, j) => {
          if (Math.abs(n.x - m.x) > 500 || Math.abs(n.y - m.y) > 420) return null
          return (
            <line
              key={`${i}-${j}`}
              x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke="#ffffff" strokeOpacity="0.05"
            />
          )
        }),
      )}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y} r="2.5"
          fill={gold.has(i) ? 'rgba(212,166,74,0.7)' : '#ffffff'}
          opacity={gold.has(i) ? 0.55 : 0.35}
        />
      ))}
    </>
  )
}

function Orbit({ theme }: { theme: string }) {
  const angle = (i: number) => (i * Math.PI) / 4
  return (
    <>
      <ellipse
        cx="760" cy="470" rx="580" ry="320"
        fill="none" stroke="#ffffff" strokeOpacity="0.06"
        strokeDasharray="6 10"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = angle(i)
        const x = 760 + 580 * Math.cos(a)
        const y = 470 + 320 * Math.sin(a)
        const isGold = i === 1 || i === 4
        return (
          <g key={i}>
            <line x1="760" y1="470" x2={x} y2={y} stroke="#ffffff" strokeOpacity="0.03" />
            <circle
              cx={x} cy={y} r={isGold ? 6 : 4}
              fill={isGold ? 'rgba(216,140,64,0.7)' : '#ffffff'}
              opacity={isGold ? 0.5 : 0.25}
            />
          </g>
        )
      })}
      <circle cx="760" cy="470" r="3" fill={theme} opacity="0.4" />
    </>
  )
}

function Horizon() {
  return (
    <>
      {[600, 680, 760, 830, 900].map((y) => (
        <line key={y} x1="0" y1={y} x2="1440" y2={y} stroke="#ffffff" strokeOpacity="0.05" />
      ))}
      {[
        { x: 120, y: 700, w: 180, h: 200 },
        { x: 360, y: 760, w: 220, h: 140 },
        { x: 980, y: 660, w: 160, h: 240 },
        { x: 1200, y: 780, w: 200, h: 120 },
      ].map((r, i) => (
        <rect
          key={i}
          x={r.x} y={r.y} width={r.w} height={r.h}
          fill="none" stroke="#ffffff" strokeOpacity="0.05"
        />
      ))}
    </>
  )
}

function Rays({ theme }: { theme: string }) {
  const lines = []
  for (let i = 0; i < 48; i++) {
    const a = (i * 7.5 * Math.PI) / 180
    lines.push(
      <line
        key={i}
        x1="1250" y1="120"
        x2={1250 + 600 * Math.cos(a)} y2={120 + 600 * Math.sin(a)}
        stroke="#ffffff" strokeOpacity="0.04"
      />,
    )
  }
  return (
    <>
      {lines}
      <circle cx="1250" cy="120" r="220" fill="none" stroke={theme} strokeOpacity="0.06" />
      <circle cx="1250" cy="120" r="340" fill="none" stroke={theme} strokeOpacity="0.04" />
    </>
  )
}

function Vertical() {
  const nodes = [240, 420, 600, 780]
  return (
    <>
      <line x1="1320" y1="120" x2="1320" y2="860" stroke="#ffffff" strokeOpacity="0.07" strokeDasharray="4 10" />
      {nodes.map((y) => (
        <g key={y}>
          <circle cx="1320" cy={y} r="4" fill="rgba(212,166,74,0.5)" />
          <path
            d={`M ${1320 + 14} ${y - 9} l 9 9 l -9 9`}
            fill="none" stroke="rgba(212,166,74,0.35)" strokeWidth="1.5"
          />
        </g>
      ))}
    </>
  )
}

export default function SectionGeometry({ type, theme = 'white', className = '' }: SectionGeometryProps) {
  const color = THEME[theme] ?? '#ffffff'

  const patterns: Record<string, React.ReactNode> = {
    waves: <Waves />,
    dots: <Dots theme={color} />,
    network: <Network />,
    orbit: <Orbit theme={color} />,
    horizon: <Horizon />,
    rays: <Rays theme={color} />,
    vertical: <Vertical />,
  }

  return (
    <div className={`geo-bg ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {patterns[type]}
      </svg>
    </div>
  )
}
