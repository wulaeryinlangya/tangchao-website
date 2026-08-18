import { useEffect, useRef } from 'react'

/** Subtle scroll parallax: translates the referenced layer by scrollY * factor. */
export function useParallax<T extends HTMLElement>(factor = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const el = ref.current
      if (!el) return
      el.style.transform = `translateY(${window.scrollY * factor}px)`
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => window.removeEventListener('scroll', onScroll)
  }, [factor])

  return ref
}
