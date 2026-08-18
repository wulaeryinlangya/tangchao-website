import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionFadeProps {
  children: ReactNode
  className?: string
}

/**
 * Whole-section scroll choreography: content fades in as the section enters the
 * viewport and fades out as it leaves (motionsites-style). Until a real scroll
 * event fires, `engaged` is false and no inline opacity/transform is applied —
 * so the content renders at full opacity (never blank in static/no-scroll
 * environments).
 */
export default function SectionFade({ children, className = '' }: SectionFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [engaged, setEngaged] = useState(false)

  useEffect(() => {
    const onScroll = () => setEngaged(true)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [40, 0, 0, -40])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={engaged ? { opacity, y } : undefined}
    >
      {children}
    </motion.div>
  )
}
