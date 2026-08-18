import { useEffect, useState } from 'react'

/** Returns the id of the section currently in the upper part of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const probe = window.innerHeight * 0.4
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= probe) current = id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
