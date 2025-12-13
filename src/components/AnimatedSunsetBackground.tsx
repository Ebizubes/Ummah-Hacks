import { useEffect, useRef } from 'react'

export function AnimatedSunsetBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationFrame: number
    let time = 0

    // Helper function to draw an 8-pointed star (Islamic star)
    const drawStar = (x: number, y: number, outerRadius: number, innerRadius: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * i) / 4
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const px = Math.cos(angle) * radius
        const py = Math.sin(angle) * radius
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.restore()
    }

    // Helper function to draw a hexagon
    const drawHexagon = (x: number, y: number, radius: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * i) / 3
        const px = Math.cos(angle) * radius
        const py = Math.sin(angle) * radius
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.restore()
    }

    const draw = () => {
      time += 0.008
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Dark night sky gradient (Islamic art often uses deep blues and purples)
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height)
      skyGradient.addColorStop(0, '#0a0e27') // Deep navy
      skyGradient.addColorStop(0.5, '#1a1f3a') // Dark purple-blue
      skyGradient.addColorStop(1, '#2d1b3d') // Deep purple
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, width, height)

      // Animated stars in the background
      for (let i = 0; i < 80; i++) {
        const x = (i * 137.5) % width
        const y = (i * 197.3) % height
        const twinkle = Math.sin(time * 2 + i) * 0.5 + 0.5
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.8})`
        ctx.fillRect(x, y, 2, 2)
      }

      // Large rotating geometric pattern in center (8-pointed star)
      const starSize = 200 + Math.sin(time * 0.3) * 30
      const starRotation = time * 0.1
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)' // Gold - more visible
      ctx.lineWidth = 3
      drawStar(centerX, centerY, starSize, starSize * 0.4, starRotation)
      ctx.stroke()

      // Multiple rotating hexagons (Islamic geometric pattern)
      const hexCount = 8
      for (let i = 0; i < hexCount; i++) {
        const angle = (Math.PI * 2 * i) / hexCount + time * 0.15
        const radius = 150
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        const hexRotation = time * 0.2 + i
        const hexSize = 40 + Math.sin(time + i) * 10

        ctx.strokeStyle = `rgba(212, 175, 55, ${0.5 + Math.sin(time + i) * 0.2})` // Gold - more visible
        ctx.lineWidth = 2
        drawHexagon(x, y, hexSize, hexRotation)
        ctx.stroke()
      }

      // Interlocking geometric pattern (tessellation)
      const patternSize = 80
      const patternOffset = time * 5
      for (let x = -patternSize; x < width + patternSize; x += patternSize * 2) {
        for (let y = -patternSize; y < height + patternSize; y += patternSize * 2) {
          const offsetX = x + (Math.sin(time + y * 0.01) * 10)
          const offsetY = y + patternOffset

          ctx.strokeStyle = 'rgba(34, 139, 34, 0.2)' // Green (Islamic color)
          ctx.lineWidth = 1
          drawHexagon(offsetX, offsetY, patternSize * 0.4, time * 0.1)
          ctx.stroke()
        }
      }

      // Crescent moon (subtle, decorative)
      const moonX = width * 0.15
      const moonY = height * 0.2
      const moonSize = 40 + Math.sin(time * 0.5) * 5
      
      // Moon glow
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonSize * 2)
      moonGlow.addColorStop(0, 'rgba(212, 175, 55, 0.3)')
      moonGlow.addColorStop(1, 'rgba(212, 175, 55, 0)')
      ctx.fillStyle = moonGlow
      ctx.fillRect(moonX - moonSize * 2, moonY - moonSize * 2, moonSize * 4, moonSize * 4)

      // Crescent shape
      ctx.fillStyle = 'rgba(212, 175, 55, 0.6)'
      ctx.beginPath()
      ctx.arc(moonX, moonY, moonSize, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = skyGradient
      ctx.beginPath()
      ctx.arc(moonX + moonSize * 0.3, moonY, moonSize * 0.9, 0, Math.PI * 2)
      ctx.fill()

      // Flowing geometric lines (arabesque-inspired)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)'
      ctx.lineWidth = 1.5
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        const startY = height * 0.3 + i * 100
        ctx.moveTo(0, startY)
        for (let x = 0; x < width; x += 5) {
          const y = startY + Math.sin((x / 50) + time + i) * 20
          ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Architectural silhouette (mosque dome shape, abstract)
      const domeX = centerX
      const domeY = height * 0.7
      const domeWidth = 300 + Math.sin(time * 0.2) * 20
      const domeHeight = 150

      // Dome arch
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(domeX, domeY, domeWidth / 2, Math.PI, 0, false)
      ctx.stroke()

      // Minaret-like vertical lines
      for (let i = 0; i < 3; i++) {
        const x = domeX - domeWidth / 2 + (i * domeWidth / 2)
        ctx.beginPath()
        ctx.moveTo(x, domeY)
        ctx.lineTo(x, domeY - 100 - Math.sin(time + i) * 10)
        ctx.stroke()
      }

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

