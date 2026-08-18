interface MarqueeProps {
  items: string[]
  className?: string
  separator?: string
}

export default function Marquee({ items, className = '', separator = '·' }: MarqueeProps) {
  const row = items.join(` ${separator} `)

  return (
    <div className={`marquee-mask overflow-hidden ${className}`.trim()}>
      <div className="marquee-track flex w-max">
        <div className="flex items-center whitespace-nowrap px-4">
          <span className="font-heading text-xl italic tracking-tight text-ink/60 md:text-2xl">
            {row}
          </span>
        </div>
        <div className="flex items-center whitespace-nowrap px-4" aria-hidden="true">
          <span className="font-heading text-xl italic tracking-tight text-ink/60 md:text-2xl">
            {row}
          </span>
        </div>
      </div>
    </div>
  )
}
