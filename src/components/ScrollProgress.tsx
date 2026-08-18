import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      setProgress(p)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    const onResize = () => {
      ticking = true
      window.setTimeout(update, 50)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[80] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-white/70 via-white/40 to-white/10"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
