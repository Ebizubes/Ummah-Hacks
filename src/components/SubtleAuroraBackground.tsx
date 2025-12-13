import { useEffect, useRef } from 'react'

interface SubtleAuroraBackgroundProps {
  intensity?: number // 0-1, controls opacity
  variant?: 'default' | 'about' | 'tracks' | 'schedule' | 'speakers' | 'faq' | 'cta' // Different variations for each section
}

export function SubtleAuroraBackground({ intensity = 0.3, variant = 'default' }: SubtleAuroraBackgroundProps) {
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

    // Variant-specific configurations
    const variantConfig = {
      default: { speed: 0.003, waveAmplitude: 20, particleCount: 15, phaseOffset: 0 },
      about: { speed: 0.0025, waveAmplitude: 25, particleCount: 12, phaseOffset: Math.PI / 4 },
      tracks: { speed: 0.0035, waveAmplitude: 18, particleCount: 18, phaseOffset: Math.PI / 2 },
      schedule: { speed: 0.002, waveAmplitude: 22, particleCount: 14, phaseOffset: Math.PI * 0.75 },
      speakers: { speed: 0.0032, waveAmplitude: 24, particleCount: 16, phaseOffset: Math.PI / 3 },
      faq: { speed: 0.0028, waveAmplitude: 19, particleCount: 13, phaseOffset: Math.PI / 6 },
      cta: { speed: 0.0033, waveAmplitude: 21, particleCount: 17, phaseOffset: Math.PI / 5 },
    }

    const config = variantConfig[variant] || variantConfig.default

    const animate = () => {
      time += config.speed
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create subtle aurora bands
      const numBands = 3
      
      for (let i = 0; i < numBands; i++) {
        const bandHeight = canvas.height / numBands
        const y = (i * bandHeight) + Math.sin(time * 0.2 + i + config.phaseOffset) * config.waveAmplitude
        
        // Create gradient for aurora band
        const gradient = ctx.createLinearGradient(0, y, 0, y + bandHeight * 1.5)
        
        // Variant-specific color shifts
        const blueShift = variant === 'about' ? 0.05 : variant === 'tracks' ? -0.05 : 0
        const goldShift = variant === 'speakers' ? 0.1 : variant === 'faq' ? -0.05 : 0
        
        // Blue to gold gradient based on band (more subtle)
        if (i % 2 === 0) {
          // Blue aurora bands with variant-specific intensity
          const blueIntensity = intensity * (1 + blueShift)
          gradient.addColorStop(0, `rgba(29, 78, 216, ${blueIntensity * 0.15 + Math.sin(time + i + config.phaseOffset) * 0.1})`)
          gradient.addColorStop(0.5, `rgba(37, 99, 235, ${blueIntensity * 0.2 + Math.sin(time + i * 0.7 + config.phaseOffset) * 0.1})`)
          gradient.addColorStop(1, `rgba(59, 130, 246, ${blueIntensity * 0.1 + Math.sin(time + i * 1.2 + config.phaseOffset) * 0.08})`)
        } else {
          // Gold aurora bands with variant-specific intensity
          const goldIntensity = intensity * (1 + goldShift)
          gradient.addColorStop(0, `hsla(43, 96%, 56%, ${goldIntensity * 0.1 + Math.sin(time + i + config.phaseOffset) * 0.08})`)
          gradient.addColorStop(0.5, `hsla(43, 96%, 65%, ${goldIntensity * 0.15 + Math.sin(time + i * 0.7 + config.phaseOffset) * 0.1})`)
          gradient.addColorStop(1, `hsla(43, 96%, 70%, ${goldIntensity * 0.08 + Math.sin(time + i * 1.2 + config.phaseOffset) * 0.06})`)
        }

        ctx.fillStyle = gradient
        
        // Create subtle wavy aurora shape
        ctx.beginPath()
        ctx.moveTo(0, y)
        
        for (let x = 0; x < canvas.width; x += 10) {
          const waveY = y + Math.sin((x * 0.008) + (time * 0.3) + i + config.phaseOffset) * (config.waveAmplitude * 1.2)
          ctx.lineTo(x, waveY)
        }
        
        ctx.lineTo(canvas.width, y + bandHeight * 1.5)
        ctx.lineTo(0, y + bandHeight * 1.5)
        ctx.closePath()
        ctx.fill()
      }

      // Add subtle flowing particles
      for (let i = 0; i < config.particleCount; i++) {
        const x = (canvas.width / config.particleCount) * i + Math.sin(time * 0.2 + i + config.phaseOffset) * 30
        const y = canvas.height * 0.3 + Math.sin(time * 0.15 + i * 0.5 + config.phaseOffset) * 80
        
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
  }, [intensity, variant])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

