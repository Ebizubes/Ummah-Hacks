import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  twinkleSpeed: number
  baseOpacity: number
  vx?: number
  vy?: number
  gradient?: CanvasGradient
  needsGradient: boolean
}

export function FadedStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    
    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      generateStars()
    }
    
    let animationFrame: number
    let time = 0
    let stars: Star[] = []

    const generateStars = () => {
      // Fewer stars for faded effect, with maximum cap for performance
      const numStars = Math.min(Math.floor((width * height) / 15000), 150)
      stars = []
      
      for (let i = 0; i < numStars; i++) {
        const size = Math.random() * 1.2 + 0.3
        // Brighter stars: 0.4 to 0.8 opacity
        const baseOpacity = Math.random() * 0.4 + 0.4
        const needsGradient = size > 1.0
        const star: Star = {
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speed: Math.random() * 0.02 + 0.008,
          opacity: baseOpacity,
          twinkleSpeed: Math.random() * 0.015 + 0.008,
          baseOpacity,
          // Less movement for faded stars
          vx: Math.random() < 0.2 ? (Math.random() - 0.5) * 0.05 : 0,
          vy: Math.random() < 0.2 ? (Math.random() - 0.5) * 0.05 : 0,
          needsGradient,
        }
        
        // Pre-create gradient for stars that need it
        if (needsGradient) {
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2.5)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.baseOpacity * 0.5})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          star.gradient = gradient
        }
        
        stars.push(star)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Visibility observer to pause animation when off-screen
    let isVisible = true
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    // Frame limiting for performance
    let frameCount = 0
    const frameSkip = 1 // Render every frame on capable devices, adjust if needed

    const animate = () => {
      if (!isVisible) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      frameCount++
      if (frameCount % (frameSkip + 1) !== 0) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      time += 0.008
      ctx.clearRect(0, 0, width, height)

      stars.forEach((star, index) => {
        if (star.vx !== undefined && star.vy !== undefined) {
          star.x += star.vx
          star.y += star.vy
          
          if (star.x < 0) star.x = width
          if (star.x > width) star.x = 0
          if (star.y < 0) star.y = height
          if (star.y > height) star.y = 0
        }

        // Subtle twinkling
        const twinkle = Math.sin(time * star.twinkleSpeed + index * 0.1) * 0.3 + 0.7
        const pulse = Math.sin(time * star.speed * 1.5 + index) * 0.15 + 0.85
        star.opacity = star.baseOpacity * twinkle * pulse

        // Brighter glow for larger stars - use cached gradient
        if (star.needsGradient && star.gradient) {
          // Update gradient opacity if needed (only update color stops, not recreate gradient)
          // For better performance, we'll use the cached gradient and adjust fillStyle opacity
          ctx.fillStyle = star.gradient
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2)
          ctx.fill()
        }

        // Main star - more faded
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      observer.disconnect()
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ imageRendering: 'auto', zIndex: 0 }}
    />
  )
}

