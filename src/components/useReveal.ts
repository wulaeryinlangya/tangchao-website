import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-view hook, resilient to environments where IntersectionObserver,
 * scroll events and requestAnimationFrame are unreliable. Detection uses
 * getBoundingClientRect polling via setInterval (which works everywhere);
 * once revealed, the value stays true.
 */
export function useReveal<T extends HTMLElement>(pollMs = 400) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let done = false
    let observer: IntersectionObserver | null = null
    let interval: number | undefined

    const isNearViewport = () => {
      const rect = el.getBoundingClientRect()
      const vh =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        0
      return rect.top < vh * 1.1 && rect.bottom > -40
    }

    const reveal = () => {
      if (done) return
      done = true
      setInView(true)
      if (interval !== undefined) window.clearInterval(interval)
    }

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) reveal()
        },
        { threshold: 0.1 },
      )
      observer.observe(el)
    }

    if (isNearViewport()) reveal()
    // Keep polling until revealed: scroll/IO may be unreliable, but layout
    // changes and scroll still move the element into view. Polling is cheap.
    interval = window.setInterval(() => {
      if (isNearViewport()) reveal()
    }, pollMs)

    return () => {
      observer?.disconnect()
      if (interval !== undefined) window.clearInterval(interval)
    }
  }, [pollMs])

  return { ref, inView }
}
