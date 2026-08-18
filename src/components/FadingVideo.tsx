import { useCallback, useRef } from 'react'

interface FadingVideoProps {
  src: string | string[]
  className?: string
  style?: React.CSSProperties
}

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)
  const indexRef = useRef(0)
  const fadingOutRef = useRef(false)

  const sources = Array.isArray(src) ? src : [src]

  const fadeTo = useCallback((video: HTMLVideoElement, target: number, duration: number) => {
    cancelAnimationFrame(rafRef.current)
    const start = performance.now()
    const from = video.style.opacity === '' ? 0 : parseFloat(video.style.opacity) || 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      video.style.opacity = String(from + (target - from) * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const fadeIn = useCallback((video: HTMLVideoElement) => {
    fadingOutRef.current = false
    fadeTo(video, 1, 500)
  }, [fadeTo])

  const fadeOut = useCallback((video: HTMLVideoElement) => {
    fadingOutRef.current = true
    fadeTo(video, 0, 550)
  }, [fadeTo])

  const handleLoadedData = useCallback(() => {
    const video = videoRef.current
    if (video) fadeIn(video)
  }, [fadeIn])

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (video && !fadingOutRef.current && !video.ended && video.duration - video.currentTime <= 0.55) {
      fadeOut(video)
    }
  }, [fadeOut])

  const handleEnded = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (sources.length === 1) {
      video.currentTime = 0
      const tryPlay = () => video.play().catch(() => {})
      tryPlay()
      fadeIn(video)
    } else {
      indexRef.current = (indexRef.current + 1) % sources.length
      video.src = sources[indexRef.current]
      const tryPlay = () => {
        const p = video.play()
        if (p) p.catch(() => {})
      }
      tryPlay()
      fadeIn(video)
    }
  }, [fadeIn, sources])

  return (
    <video
      ref={videoRef}
      src={sources[0]}
      className={className}
      style={{ opacity: 0, ...style }}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  )
}
