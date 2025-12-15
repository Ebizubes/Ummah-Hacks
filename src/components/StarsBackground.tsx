import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  twinkleSpeed: number
  baseOpacity: number
  vx?: number // velocity for movement
  vy?: number
}

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    let width = window.innerWidth
    let height = window.innerHeight
    
    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      // Regenerate stars on resize to maintain density
      generateStars()
    }
    
    // Star animation
    let animationFrame: number
    let time = 0
    let stars: Star[] = []

    // Generate random star positions with movement
    const generateStars = () => {
      const numStars = Math.floor((width * height) / 8000) // Density based on screen size
      stars = []
      
      for (let i = 0; i < numStars; i++) {
        const size = Math.random() * 1.5 + 0.5
        const baseOpacity = Math.random() * 0.4 + 0.2 // Faded: 0.2 to 0.6
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speed: Math.random() * 0.03 + 0.01, // Twinkle speed
          opacity: baseOpacity,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          baseOpacity,
          // Slow drift movement for some stars
          vx: Math.random() < 0.3 ? (Math.random() - 0.5) * 0.1 : 0,
          vy: Math.random() < 0.3 ? (Math.random() - 0.5) * 0.1 : 0,
        })
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, width, height)

      // Draw stars with dynamic effects
      stars.forEach((star, index) => {
        // Update position for moving stars
        if (star.vx !== undefined && star.vy !== undefined) {
          star.x += star.vx
          star.y += star.vy
          
          // Wrap around edges
          if (star.x < 0) star.x = width
          if (star.x > width) star.x = 0
          if (star.y < 0) star.y = height
          if (star.y > height) star.y = 0
        }

        // Dynamic twinkling effect - more varied
        const twinkle = Math.sin(time * star.twinkleSpeed + index * 0.1) * 0.4 + 0.6
        const pulse = Math.sin(time * star.speed * 2 + index) * 0.2 + 0.8
        star.opacity = star.baseOpacity * twinkle * pulse

        // Draw star with glow effect for larger stars
        if (star.size > 1.2) {
          // Outer glow
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.3})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // Main star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Cross pattern for larger stars (more visible)
        if (star.size > 1.5 && star.opacity > 0.3) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * 0.5})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(star.x - star.size * 2, star.y)
          ctx.lineTo(star.x + star.size * 2, star.y)
          ctx.moveTo(star.x, star.y - star.size * 2)
          ctx.lineTo(star.x, star.y + star.size * 2)
          ctx.stroke()
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

