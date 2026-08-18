import type { ReactNode } from 'react'
import ChapterMarker from './ChapterMarker'
import Reveal from './Reveal'
import SectionFade from './SectionFade'

interface SectionShellProps {
  id: string
  chapter: string
  index: string
  eyebrow: string
  title: string
  children: ReactNode
  bg?: ReactNode
  hue?: number
}

export default function SectionShell({
  id,
  chapter,
  index,
  eyebrow,
  title,
  children,
  bg,
  hue,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className="surface-light relative min-h-screen overflow-hidden"
      style={hue ? ({ '--hue': hue } as React.CSSProperties) : undefined}
    >
      {bg}
      <div className="grain" />
      <SectionFade className="relative z-10 flex min-h-screen flex-col px-8 pb-16 pt-24 md:px-16 lg:px-20">
        <Reveal>
          <ChapterMarker index={index} label={chapter} />
        </Reveal>
        <Reveal delay={100}>
          <p className="mb-6 font-body text-sm uppercase tracking-[0.2em] opacity-70">{eyebrow}</p>
        </Reveal>
        <Reveal delay={200}>
          <h2 className="font-heading text-5xl italic leading-[1.05] tracking-[-2px] md:text-6xl lg:text-[4.5rem]">
            {title}
          </h2>
        </Reveal>
        {children}
      </SectionFade>
    </section>
  )
}
