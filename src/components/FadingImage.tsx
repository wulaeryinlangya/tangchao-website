import { useCallback, useState } from 'react'

interface FadingImageProps {
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  kenBurns?: boolean
}

export default function FadingImage({ src, alt = '', className, style, kenBurns = false }: FadingImageProps) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = useCallback(() => setLoaded(true), [])

  // Images are always visible; the fade-in is a progressive enhancement. If the
  // transition never completes (broken environment), the image is still there.
  const fade = loaded ? { opacity: 1 } : {}

  if (kenBurns) {
    return (
      <div className={className} style={{ ...style, position: 'absolute', overflow: 'hidden' }}>
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className="h-full w-full object-cover"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 500ms ease-out',
            animation: 'ken-burns 30s linear infinite alternate',
          }}
        />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ ...fade, transition: 'opacity 500ms ease-out', ...style }}
      onLoad={handleLoad}
    />
  )
}
