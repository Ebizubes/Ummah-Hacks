import { useEffect, useRef } from 'react'

export function AuroraBackground() {
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

    // Aurora animation
    let animationFrame: number
    let time = 0

    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create aurora bands with blue and gold
      const numBands = 4
      
      for (let i = 0; i < numBands; i++) {
        const bandHeight = canvas.height / numBands
        const y = (i * bandHeight) + Math.sin(time * 0.3 + i) * 30
        
        // Create gradient for aurora band
        const gradient = ctx.createLinearGradient(0, y, 0, y + bandHeight * 2)
        
        // Blue to gold gradient based on band
        if (i % 2 === 0) {
          // Blue aurora bands
          gradient.addColorStop(0, `rgba(29, 78, 216, ${0.3 + Math.sin(time + i) * 0.2})`)
          gradient.addColorStop(0.5, `rgba(37, 99, 235, ${0.4 + Math.sin(time + i * 0.7) * 0.2})`)
          gradient.addColorStop(1, `rgba(59, 130, 246, ${0.2 + Math.sin(time + i * 1.2) * 0.15})`)
        } else {
          // Gold aurora bands (using theme gold: hsl(43,96%,56%))
          gradient.addColorStop(0, `hsla(43, 96%, 56%, ${0.2 + Math.sin(time + i) * 0.15})`)
          gradient.addColorStop(0.5, `hsla(43, 96%, 65%, ${0.3 + Math.sin(time + i * 0.7) * 0.2})`)
          gradient.addColorStop(1, `hsla(43, 96%, 70%, ${0.15 + Math.sin(time + i * 1.2) * 0.1})`)
        }

        ctx.fillStyle = gradient
        
        // Create wavy aurora shape
        ctx.beginPath()
        ctx.moveTo(0, y)
        
        for (let x = 0; x < canvas.width; x += 10) {
          const waveY = y + Math.sin((x * 0.01) + (time * 0.5) + i) * 40
          ctx.lineTo(x, waveY)
        }
        
        ctx.lineTo(canvas.width, y + bandHeight * 2)
        ctx.lineTo(0, y + bandHeight * 2)
        ctx.closePath()
        ctx.fill()
      }

      // Add flowing particles for aurora effect
      for (let i = 0; i < 20; i++) {
        const x = (canvas.width / 20) * i + Math.sin(time * 0.3 + i) * 50
        const y = canvas.height * 0.3 + Math.sin(time * 0.2 + i * 0.5) * 100
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30)
        const isGold = i % 3 === 0
        if (isGold) {
          gradient.addColorStop(0, `hsla(43, 96%, 56%, 0.4)`)
          gradient.addColorStop(1, 'hsla(43, 96%, 56%, 0)')
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${0.3})`)
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        }
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, 30, 0, Math.PI * 2)
        ctx.fill()
      }

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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

