interface ChartPanelProps {
  src: string
  caption: string
  alt?: string
}

export default function ChartPanel({ src, caption, alt = caption }: ChartPanelProps) {
  return (
    <div className="liquid-glass glass-hover rounded-[1.25rem] p-4 md:p-6">
      <div className="overflow-hidden rounded-[0.75rem] bg-white p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
        <img
          src={src}
          alt={alt}
          className="h-auto w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="font-body text-sm font-light text-white/85">{caption}</p>
        <span className="shrink-0 font-body text-xs uppercase tracking-[0.15em] text-[#d4a64a]">
          数据 · 2023–2026
        </span>
      </div>
    </div>
  )
}
