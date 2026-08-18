import { useCallback, useEffect, useRef } from 'react'

interface SightCardData {
  kicker: string
  h3: string
  p: string
  pin: string
}

/**
 * Infinite slider: 3 identical sets of cards cloned into the track, seamless
 * looping via instant-jump normalisation on transitionend.
 */
export function useSightSlider<T extends HTMLElement>(
  rootRef: React.RefObject<T | null>,
  originalCards: SightCardData[],
) {
  const active = useRef(originalCards.length)
  const state = useRef({
    root: null as T | null,
    track: null as HTMLElement | null,
    cardWidth: 0,
    gap: 0,
    originalCount: originalCards.length,
    cards: [] as HTMLElement[],
  })

  const update = useCallback(() => {
    const s = state.current
    if (!s.track || !s.cards.length) return
    s.cardWidth = s.cards[0].offsetWidth || 0
    const cs = getComputedStyle(s.track)
    s.gap = parseFloat(cs.columnGap || '0') || 0
    s.root?.style.setProperty(
      '--about-sights-shift',
      `${-(s.cardWidth + s.gap) * active.current}px`,
    )
    s.cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === active.current)
    })
  }, [])

  const jump = useCallback(
    (i: number) => {
      const s = state.current
      if (!s.track) return
      s.track.classList.add('is-jumping')
      active.current = i
      update()
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => s.track?.classList.remove('is-jumping'))
      })
    },
    [update],
  )

  const normalize = useCallback(() => {
    const s = state.current
    if (active.current >= s.originalCount * 2) {
      jump(active.current - s.originalCount)
    } else if (active.current < s.originalCount) {
      jump(active.current + s.originalCount)
    }
  }, [jump])

  const move = useCallback(
    (dir: number) => {
      active.current += dir
      update()
    },
    [update],
  )

  const select = useCallback(
    (card: HTMLElement) => {
      const idx = Number(card.dataset.sightIndex)
      if (Number.isFinite(idx)) {
        active.current = idx
        update()
      }
    },
    [update],
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const s = state.current
    s.root = root
    const track = root.querySelector<HTMLElement>('.about-track')
    s.track = track
    if (!track) return
    s.originalCount = originalCards.length

    const children = Array.from(track.children)
    children.forEach((c) => c.remove())

    for (let setIndex = 0; setIndex < 3; setIndex++) {
      originalCards.forEach((card, cardIndex) => {
        const clone = document.createElement('article')
        clone.className = 'about-card'
        clone.setAttribute('role', 'button')
        clone.setAttribute('tabindex', '0')
        clone.dataset.sightIndex = String(setIndex * originalCards.length + cardIndex)

        const kicker = document.createElement('span')
        kicker.className = 'kicker'
        kicker.textContent = card.kicker
        const pin = document.createElement('img')
        pin.className = 'pin'
        pin.src = card.pin
        pin.alt = ''
        const h3 = document.createElement('h3')
        h3.textContent = card.h3
        const p = document.createElement('p')
        p.textContent = card.p

        clone.append(kicker, pin, h3, p)
        track.appendChild(clone)
      })
    }

    s.cards = Array.from(track.querySelectorAll<HTMLElement>('.about-card'))
    active.current = originalCards.length

    const onClick = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.about-card')
      if (card) select(card)
    }
    const onKey = (e: KeyboardEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.about-card')
      if (!card) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        select(card)
      }
    }
    const onTransitionEnd = () => normalize()

    track.addEventListener('click', onClick)
    track.addEventListener('keydown', onKey)
    track.addEventListener('transitionend', onTransitionEnd)

    const prev = root.querySelector<HTMLElement>('.about-prev')
    const next = root.querySelector<HTMLElement>('.about-next')
    const onPrev = () => move(-1)
    const onNext = () => move(1)
    prev?.addEventListener('click', onPrev)
    next?.addEventListener('click', onNext)

    update()

    return () => {
      track.removeEventListener('click', onClick)
      track.removeEventListener('keydown', onKey)
      track.removeEventListener('transitionend', onTransitionEnd)
      prev?.removeEventListener('click', onPrev)
      next?.removeEventListener('click', onNext)
    }
  }, [rootRef, originalCards, update, move, select, normalize])

  return { move, select }
}
