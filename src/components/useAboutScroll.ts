import { useEffect, useRef } from 'react'

/** Scaled-down port of the Mostar scroll choreography, restyled for 糖巢. */
export function useAboutScroll<T extends HTMLElement>(sectionRef: React.RefObject<T | null>) {
  const stateRef = useRef({
    targetScroll: 0,
    smoothScroll: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    mouseX: 0,
    mouseY: 0,
    initialized: false,
    rafPending: false,
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const state = stateRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
    const smoothstep = (e0: number, e1: number, v: number) => {
      const x = clamp((v - e0) / (e1 - e0))
      return x * x * (3 - 2 * x)
    }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const segmentInOut = (s: number, a: number, b: number, c: number, d: number) => {
      const enter = smoothstep(a, b, s)
      const exit = smoothstep(c, d, s)
      return { enter, exit, active: enter * (1 - exit) }
    }
    const getScrollDistance = () =>
      clamp(
        -section.getBoundingClientRect().top,
        0,
        section.offsetHeight - window.innerHeight,
      )

    const update = () => {
      state.rafPending = false

      const targetScroll = getScrollDistance()
      if (!state.initialized || reduceMotion.matches) {
        state.smoothScroll = targetScroll
        state.initialized = true
      } else {
        state.smoothScroll = lerp(state.smoothScroll, targetScroll, 0.14)
      }
      if (Math.abs(state.smoothScroll - targetScroll) < 0.08) {
        state.smoothScroll = targetScroll
      }
      state.mouseX = lerp(state.mouseX, state.targetMouseX, 0.12)
      state.mouseY = lerp(state.mouseY, state.targetMouseY, 0.12)

      const scroll = state.smoothScroll
      const mouseX = state.mouseX
      const mouseY = state.mouseY

      const frame2 = segmentInOut(scroll, 560, 900, 1300, 1620)
      const frame3 = segmentInOut(scroll, 1760, 2140, 2540, 2700)
      const progress = clamp(scroll / 2700)
      const introExit = smoothstep(90, 650, scroll)
      const sightsEnterRaw = smoothstep(2760, 3560, scroll)
      const sightsEnter = Math.pow(sightsEnterRaw, 1.55)
      const sightsControlsEnter = smoothstep(3360, 3660, scroll)
      const blurActive = clamp(frame2.active + frame3.active)
      const frame2Opacity = frame2.active * (1 - frame3.enter)
      const panel2Opacity = frame2.active * (1 - frame2.exit)
      const panel3Opacity = frame3.active * (1 - frame3.exit)

      const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16
      const sightsScreenTop = Math.min(220, Math.max(112, window.innerHeight * 0.19)) - 50
      const sightsParentTop =
        window.innerHeight - (window.innerHeight - sightsScreenTop) / backScale

      const css = section.style
      const fmt = (v: number, p = 4) => v.toFixed(p)
      const mX = reduceMotion.matches ? 0 : mouseX
      const mY = reduceMotion.matches ? 0 : mouseY

      css.setProperty('--about-mx', fmt(mX))
      css.setProperty('--about-my', fmt(mY))
      css.setProperty('--about-back-opacity', (1 - frame2.active * 0.06).toFixed(3))
      css.setProperty('--about-back-x', `${mX * -12}px`)
      css.setProperty('--about-back-y', `${mY * -4}px`)
      css.setProperty('--about-back-scale', backScale.toFixed(4))
      css.setProperty('--about-blur-px', `${(blurActive * 10).toFixed(1)}px`)
      css.setProperty('--about-brightness', (1 - blurActive * 0.22).toFixed(3))
      css.setProperty('--about-shade-z', frame2.active > 0.02 ? '2' : '0')
      css.setProperty('--about-shade-top-alpha', (blurActive * 0.42).toFixed(3))
      css.setProperty('--about-shade-mid-alpha', (blurActive * 0.38).toFixed(3))
      css.setProperty('--about-shade-bottom-alpha', (blurActive * 0.48).toFixed(3))

      css.setProperty('--about-title-y', `${(introExit * -210).toFixed(1)}px`)
      css.setProperty('--about-title-scale', (1 - introExit * 0.08).toFixed(4))
      css.setProperty('--about-title-opacity', (1 - introExit).toFixed(3))
      css.setProperty('--about-copy-y', `${(introExit * 90).toFixed(1)}px`)
      css.setProperty('--about-copy-opacity', (1 - introExit).toFixed(3))

      css.setProperty('--about-frame2-opacity', frame2Opacity.toFixed(3))
      css.setProperty('--about-frame2-x', `calc(-50% + ${(mX * 10).toFixed(1)}px)`)
      css.setProperty('--about-frame2-y', `calc(-50% + ${(mY * 8 - frame2.exit * 150).toFixed(1)}px)`)
      css.setProperty('--about-frame2-scale', (1.06 + frame2.enter * 0.08 + frame2.exit * 0.08).toFixed(4))

      css.setProperty('--about-panel2-opacity', panel2Opacity.toFixed(3))
      css.setProperty('--about-panel2-y', `calc(-50% + ${(-frame2.exit * 86 + (1 - frame2.enter) * 58).toFixed(1)}px)`)
      css.setProperty('--about-panel3-opacity', panel3Opacity.toFixed(3))
      css.setProperty('--about-panel3-y', `calc(-50% + ${(-frame3.exit * 86 + (1 - frame3.enter) * 58).toFixed(1)}px)`)

      css.setProperty('--about-sights-visibility', sightsEnter > 0.01 ? 'visible' : 'hidden')
      css.setProperty('--about-sights-enter-x', `${((1 - sightsEnter) * 420).toFixed(2)}vw`)
      css.setProperty('--about-sights-scale', (1 / backScale).toFixed(4))
      css.setProperty('--about-sights-top', `${sightsParentTop.toFixed(1)}px`)
      css.setProperty('--about-sights-screen-top', `${sightsScreenTop.toFixed(1)}px`)
      css.setProperty('--about-sights-y', '0px')

      const controls = section.querySelector<HTMLElement>('.about-controls')
      if (controls) {
        controls.style.opacity = sightsControlsEnter.toFixed(3)
        controls.classList.toggle('is-ready', sightsControlsEnter > 0.98)
      }

      const keepTicking =
        Math.abs(state.smoothScroll - targetScroll) > 0.08 ||
        Math.abs(state.mouseX - state.targetMouseX) > 0.001 ||
        Math.abs(state.mouseY - state.targetMouseY) > 0.001
      if (keepTicking && !state.rafPending) {
        state.rafPending = true
        window.requestAnimationFrame(update)
      }
    }

    const requestTick = () => {
      if (!state.rafPending) {
        state.rafPending = true
        window.requestAnimationFrame(update)
      }
    }

    const onScroll = () => requestTick()
    const onResize = () => requestTick()
    const onPointerMove = (e: PointerEvent) => {
      state.targetMouseX = e.clientX / window.innerWidth - 0.5
      state.targetMouseY = e.clientY / window.innerHeight - 0.5
      requestTick()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    requestTick()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [sectionRef])
}
