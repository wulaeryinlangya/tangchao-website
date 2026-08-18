import Reveal from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  className?: string
}

export default function SectionHeading({ eyebrow, title, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal>
        <p className="mb-6 font-body text-sm uppercase tracking-[0.2em] text-ink/80">{eyebrow}</p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="font-heading text-5xl italic leading-[1.05] tracking-[-2px] text-ink md:text-6xl lg:text-[4.5rem]">
          {title}
        </h2>
      </Reveal>
    </div>
  )
}
