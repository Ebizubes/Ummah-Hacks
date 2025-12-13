import { useEffect, useRef } from 'react'

interface SubtleAuroraBackgroundProps {
  intensity?: number // 0-1, controls opacity
}

export function SubtleAuroraBackground({ intensity = 0.3 }: SubtleAuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Aurora animation (slower and more subtle)
    let animationFrame: number
    let time = 0

    const animate = () => {
      time += 0.003 // Slower animation
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create subtle aurora bands
      const numBands = 3
      
      for (let i = 0; i < numBands; i++) {
        const bandHeight = canvas.height / numBands
        const y = (i * bandHeight) + Math.sin(time * 0.2 + i) * 20
        
        // Create gradient for aurora band
        const gradient = ctx.createLinearGradient(0, y, 0, y + bandHeight * 1.5)
        
        // Blue to gold gradient based on band (more subtle)
        if (i % 2 === 0) {
          // Blue aurora bands
          gradient.addColorStop(0, `rgba(29, 78, 216, ${intensity * 0.15 + Math.sin(time + i) * 0.1})`)
          gradient.addColorStop(0.5, `rgba(37, 99, 235, ${intensity * 0.2 + Math.sin(time + i * 0.7) * 0.1})`)
          gradient.addColorStop(1, `rgba(59, 130, 246, ${intensity * 0.1 + Math.sin(time + i * 1.2) * 0.08})`)
        } else {
          // Gold aurora bands
          gradient.addColorStop(0, `hsla(43, 96%, 56%, ${intensity * 0.1 + Math.sin(time + i) * 0.08})`)
          gradient.addColorStop(0.5, `hsla(43, 96%, 65%, ${intensity * 0.15 + Math.sin(time + i * 0.7) * 0.1})`)
          gradient.addColorStop(1, `hsla(43, 96%, 70%, ${intensity * 0.08 + Math.sin(time + i * 1.2) * 0.06})`)
        }

        ctx.fillStyle = gradient
        
        // Create subtle wavy aurora shape
        ctx.beginPath()
        ctx.moveTo(0, y)
        
        for (let x = 0; x < canvas.width; x += 10) {
          const waveY = y + Math.sin((x * 0.008) + (time * 0.3) + i) * 25
          ctx.lineTo(x, waveY)
        }
        
        ctx.lineTo(canvas.width, y + bandHeight * 1.5)
        ctx.lineTo(0, y + bandHeight * 1.5)
        ctx.closePath()
        ctx.fill()
      }

      // Add subtle flowing particles
      for (let i = 0; i < 15; i++) {
        const x = (canvas.width / 15) * i + Math.sin(time * 0.2 + i) * 30
        const y = canvas.height * 0.3 + Math.sin(time * 0.15 + i * 0.5) * 80
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 25)
        const isGold = i % 3 === 0
        if (isGold) {
          gradient.addColorStop(0, `hsla(43, 96%, 56%, ${intensity * 0.2})`)
          gradient.addColorStop(1, 'hsla(43, 96%, 56%, 0)')
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${intensity * 0.15})`)
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        }
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, 25, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

