interface PhotoMarqueeProps {
  rows: string[][]
}

const TILE =
  'film-strip relative w-[260px] sm:w-[340px] md:w-[420px] shrink-0 overflow-hidden'

export default function PhotoMarquee({ rows }: PhotoMarqueeProps) {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3 py-4">
      {rows.map((row, rowIndex) => {
        const tripled = [...row, ...row, ...row]
        const animClass = rowIndex % 2 === 0 ? 'marquee-row-r' : 'marquee-row-l'
        return (
          <div
            key={rowIndex}
            className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          >
            <div className={`flex w-max gap-3 will-change-transform ${animClass}`}>
              {tripled.map((src, i) => (
                <div key={`${src}-${i}`} className={TILE}>
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-[170px] w-full object-cover sm:h-[220px] md:h-[270px]"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
