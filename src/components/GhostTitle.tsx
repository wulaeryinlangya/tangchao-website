interface GhostTitleProps {
  text: string
  position?: 'top-right' | 'top-left' | 'center'
}

export default function GhostTitle({ text, position = 'top-right' }: GhostTitleProps) {
  const posClass =
    position === 'top-left'
      ? 'left-0 top-16 origin-top-left'
      : position === 'center'
        ? 'left-1/2 top-10 -translate-x-1/2'
        : 'right-0 top-12 origin-top-right'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${posClass}`}
      style={{
        zIndex: 0,
      }}
    >
      <span className="font-heading text-[6rem] italic leading-none tracking-[-2px] text-white/[0.05] md:text-[11rem]">
        {text}
      </span>
    </div>
  )
}
