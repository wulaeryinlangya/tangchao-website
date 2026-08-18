interface ChapterMarkerProps {
  index: string
  label: string
}

export default function ChapterMarker({ index, label }: ChapterMarkerProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="font-body text-xs uppercase tracking-[0.25em] text-honey">{index}</span>
      <span className="h-px w-10 bg-honey/50" />
      <span className="font-body text-xs uppercase tracking-[0.2em] opacity-60">{label}</span>
    </div>
  )
}
