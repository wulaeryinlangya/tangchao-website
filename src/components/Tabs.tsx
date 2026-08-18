import { useState } from 'react'

interface TabItem {
  id: string
  label: string
}

interface TabsProps {
  items: TabItem[]
  activeId?: string
  onChange: (id: string) => void
  className?: string
}

export default function Tabs({ items, activeId, onChange, className = '' }: TabsProps) {
  const [internal, setInternal] = useState(items[0]?.id ?? '')
  const active = activeId ?? internal

  return (
    <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {items.map((item) => {
        const isActive = item.id === active
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setInternal(item.id)
              onChange(item.id)
            }}
            className={`press rounded-full border px-4 py-2 font-body text-sm font-medium transition ${
              isActive
                ? 'border-honey bg-honey text-[#0d2e24]'
                : 'border-[rgba(67,42,22,0.16)] text-ink/70 hover:border-[rgba(67,42,22,0.4)] hover:text-ink'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
