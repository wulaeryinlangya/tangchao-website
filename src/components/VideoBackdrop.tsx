import { useCallback, useRef } from 'react'

interface VideoBackdropProps {
  src: string
  /** scrim CSS 背景，淡色暖调保证深色视频上文字可读 */
  scrim?: string
  className?: string
}

const DEFAULT_SCRIM =
  'linear-gradient(180deg, rgba(250,242,228,0.82), rgba(250,242,228,0.55) 45%, rgba(250,242,228,0.86))'

/**
 * 全屏视频背景层（借鉴 404 页的 video 处理）：语义化 <video> cover 铺满 +
 * 一层淡色 scrim 让上方文字可读。视频自身运动即唯一动效，不加 CSS 动画。
 * 数据就绪后主动 play() 兜底，避免浏览器多视频 autoplay 限制导致不播放。
 */
export default function VideoBackdrop({ src, scrim = DEFAULT_SCRIM, className = '' }: VideoBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleLoadedData = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    const p = v.play()
    if (p) p.catch(() => {})
  }, [])

  return (
    <div className={`video-backdrop ${className}`.trim()} aria-hidden="true">
      <video ref={videoRef} autoPlay loop muted playsInline preload="auto" onLoadedData={handleLoadedData}>
        <source src={src} type="video/mp4" />
      </video>
      <div className="scrim" style={{ background: scrim }} />
    </div>
  )
}
