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
            className={`press rounded-full px-4 py-2 font-body text-sm font-medium transition ${
              isActive
                ? 'bg-white text-black'
                : 'liquid-glass text-white/80 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
