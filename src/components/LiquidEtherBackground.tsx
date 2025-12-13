import { useEffect, useRef, useState } from 'react'

export function LiquidEtherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Fluid ether animation
    let animationFrame: number
    let time = 0

    const animate = () => {
      time += 0.008
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create fluid effect using multiple overlapping gradients
      const numWaves = 5
      const baseOpacity = 0.15

      for (let i = 0; i < numWaves; i++) {
        const phase = (time * (0.5 + i * 0.2)) + (i * Math.PI * 2 / numWaves)
        const x = canvas.width * 0.5 + Math.sin(phase) * (canvas.width * 0.3)
        const y = canvas.height * 0.5 + Math.cos(phase * 0.7) * (canvas.height * 0.3)
        
        // Mouse influence
        const mouseDx = mousePos.x - x
        const mouseDy = mousePos.y - y
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)
        const mouseInfluence = Math.max(0, 1 - mouseDist / 400)
        
        const finalX = x + mouseDx * mouseInfluence * 0.2
        const finalY = y + mouseDy * mouseInfluence * 0.2
        const radius = 300 + Math.sin(phase * 2) * 100 + mouseInfluence * 150

        // Create radial gradient for fluid effect
        const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, radius)
        const opacity = baseOpacity + Math.sin(phase) * 0.1 + mouseInfluence * 0.15
        
        gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
        gradient.addColorStop(0.3, `rgba(37, 99, 235, ${opacity * 0.8})`)
        gradient.addColorStop(0.6, `rgba(29, 78, 216, ${opacity * 0.4})`)
        gradient.addColorStop(1, 'rgba(29, 78, 216, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Add mouse interaction blob
      if (mousePos.x > 0 && mousePos.y > 0) {
        const mouseGradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 200)
        mouseGradient.addColorStop(0, 'rgba(59, 130, 246, 0.25)')
        mouseGradient.addColorStop(0.4, 'rgba(37, 99, 235, 0.15)')
        mouseGradient.addColorStop(1, 'rgba(29, 78, 216, 0)')
        
        ctx.fillStyle = mouseGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [mousePos])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

