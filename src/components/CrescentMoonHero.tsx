import { useEffect, useRef, useState, useMemo } from 'react'

export function CrescentMoonHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const scrollPositionRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Cloud positions
    const clouds = Array.from({ length: 6 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      size: 60 + Math.random() * 80,
      speed: 0.3 + Math.random() * 0.2,
    }))

    // Pre-calculate cloud circle positions to reduce calculations
    const cloudShapes = clouds.map(cloud => {
      const size = cloud.size
      return {
        circles: [
          { x: 0, y: 0, r: size * 0.4 },
          { x: size * 0.3, y: 0, r: size * 0.5 },
          { x: size * 0.6, y: 0, r: size * 0.4 },
          { x: size * 0.15, y: -size * 0.2, r: size * 0.35 },
          { x: size * 0.45, y: -size * 0.2, r: size * 0.35 },
        ]
      }
    })

    const drawCloud = (x: number, y: number, circles: typeof cloudShapes[0]['circles']) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
      
      // Batch all circles in a single path for better performance
      ctx.beginPath()
      circles.forEach(circle => {
        ctx.moveTo(x + circle.x + circle.r, y + circle.y)
        ctx.arc(x + circle.x, y + circle.y, circle.r, 0, Math.PI * 2)
      })
      ctx.fill()
    }

    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      clouds.forEach((cloud, index) => {
        cloud.x += cloud.speed
        if (cloud.x > width + cloud.size) {
          cloud.x = -cloud.size
        }
        drawCloud(cloud.x, cloud.y, cloudShapes[index].circles)
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY * 0.5
      scrollPositionRef.current = Math.max(0, Math.min(
        scrollPositionRef.current + delta,
        height
      ))
      
      // Throttle state updates using requestAnimationFrame
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          const progress = Math.min(1, scrollPositionRef.current / height)
          setScrollProgress(progress)

          if (progress >= 0.95) {
            setIsComplete(true)
            document.body.style.overflow = ''
            window.removeEventListener('wheel', handleWheel)
          }
          
          rafIdRef.current = null
        })
      }
    }

    let mobileTimeout: number | null = null

    // On mobile, allow immediate scrolling - auto-complete hero after short delay
    if (window.innerWidth < 1024) {
      // Mobile: auto-complete after 1.5 seconds to allow normal scrolling
      mobileTimeout = setTimeout(() => {
        setIsComplete(true)
        document.body.style.overflow = ''
      }, 1500)
    } else {
      // Desktop: use wheel-based scroll animation
      if (!isComplete) {
        document.body.style.overflow = 'hidden'
        window.addEventListener('wheel', handleWheel, { passive: false })
      }
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('wheel', handleWheel)
      cancelAnimationFrame(animationFrame)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      if (mobileTimeout) {
        clearTimeout(mobileTimeout)
      }
      document.body.style.overflow = ''
    }
  }, [isComplete])

  // Memoize expensive transform calculations
  const easeProgress = useMemo(() => 1 - Math.pow(1 - scrollProgress, 3), [scrollProgress])
  const scale = useMemo(() => 1 + easeProgress * 8, [easeProgress])
  const rotationY = useMemo(() => easeProgress * 90, [easeProgress])

  return (
    <>
      <section 
        ref={containerRef}
        id="hero" 
        className={`fixed inset-0 flex items-center justify-center bg-[#0a1628] z-50 transition-opacity duration-1000 ${
          isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ perspective: '1200px' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Moon and Star Container - Pakistani Flag Style */}
        <div
          className="flex absolute gap-4 justify-center items-center"
          style={{
            transform: `scale3d(${scale}, ${scale}, 1) rotateY(${rotationY}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out',
            willChange: 'transform',
          }}
        >
          {/* Crescent Moon - Large smooth SVG */}
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))',
            }}
          >
            <defs>
              <radialGradient id="moonGrad" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#FFF8DC" />
                <stop offset="40%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B8860B" />
              </radialGradient>
              <mask id="crescentMask">
                <rect width="180" height="180" fill="white" />
                <circle cx="115" cy="90" r="55" fill="black" />
              </mask>
            </defs>
            <circle
              cx="90"
              cy="90"
              r="70"
              fill="url(#moonGrad)"
              mask="url(#crescentMask)"
            />
          </svg>

          {/* Star - Large smooth SVG */}
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))',
              marginLeft: '-20px',
            }}
          >
            <defs>
              <radialGradient id="starGrad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FFFACD" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#DAA520" />
              </radialGradient>
            </defs>
            <polygon
              points="50,5 61,35 95,35 68,55 79,90 50,70 21,90 32,55 5,35 39,35"
              fill="url(#starGrad)"
            />
          </svg>
        </div>

        {/* Title */}
        <div className="container relative z-10 px-4 mx-auto sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-6xl font-bold tracking-tight leading-tight text-white font-display sm:text-7xl md:text-8xl lg:text-9xl">
              UMMAH HACKS
            </h1>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex absolute bottom-8 left-1/2 flex-col gap-2 items-center animate-bounce -translate-x-1/2 text-white/80">
          <span className="text-sm font-medium tracking-wide font-display">SCROLL DOWN</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    </>
  )
}
