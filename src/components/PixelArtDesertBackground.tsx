import { useEffect, useRef } from 'react'

export function PixelArtDesertBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { 
      imageSmoothingEnabled: false,
      antialias: false 
    })
    if (!ctx) return
    // Type assertion for TypeScript
    const ctx2d = ctx as CanvasRenderingContext2D

    let animationFrame: number
    let time = 0
    let camelX = 100 // Start position
    let walkCycle = 0
    let width = 0
    let height = 0

    const resizeCanvas = () => {
      // Higher resolution for more detailed pixel art
      const scale = 3 // Increased from 2 to 3 for more detail
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * scale
      canvas.height = height * scale
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx2d.scale(scale, scale)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Colors - darker/more faded for text readability
    const lightGreen = '#6B8E6B' // Darker, muted green sky
    const darkGreen = '#2D5016' // Darker green for silhouettes
    const white = '#E0E0E0' // Slightly muted white for stars and moon

    // Helper to draw pixel (proper pixel art, no scaling issues)
    const drawPixel = (x: number, y: number, color: string) => {
      ctx2d.fillStyle = color
      ctx2d.fillRect(Math.floor(x), Math.floor(y), 1, 1)
    }
    
    // Helper to draw block (for larger elements)
    const drawBlock = (x: number, y: number, width: number, height: number, color: string) => {
      ctx2d.fillStyle = color
      ctx2d.fillRect(Math.floor(x), Math.floor(y), width, height)
    }

    // Helper to get dune height at x position (for proper positioning)
    const getDuneHeight = (x: number, _width: number, height: number) => {
      const duneHeight = height * 0.25
      const duneY = height - duneHeight
      const waveY = Math.sin(x / 50) * 12 + Math.cos(x / 80) * 6
      return Math.floor(duneY + waveY)
    }

    // Draw star
    const drawStar = (x: number, y: number, starType: 'plus' | 'square' = 'square') => {
      // starType parameter used in condition below
      if (starType === 'plus') {
        drawPixel(x, y, white)
        drawPixel(x - 1, y, white)
        drawPixel(x + 1, y, white)
        drawPixel(x, y - 1, white)
        drawPixel(x, y + 1, white)
      } else {
        drawPixel(x, y, white)
      }
    }

    // Draw crescent moon (rotated/diagonal)
    const drawCrescent = (x: number, y: number, size: number, rotation: number = 0) => {
      ctx2d.save()
      ctx2d.translate(x, y)
      ctx2d.rotate(rotation) // Rotate for diagonal orientation
      
      ctx2d.fillStyle = white
      // Main circle
      ctx2d.beginPath()
      ctx2d.arc(0, 0, size, 0, Math.PI * 2)
      ctx2d.fill()
      // Overlay to create crescent
      ctx2d.fillStyle = lightGreen
      ctx2d.beginPath()
      ctx2d.arc(size * 0.3, 0, size * 0.8, 0, Math.PI * 2)
      ctx2d.fill()
      
      ctx2d.restore()
    }

    // Draw minaret (bigger, solid, detailed, touches ground)
    const drawMinaret = (x: number, groundY: number, height: number, hasCrescent: boolean = true) => {
      const px = Math.floor(x)
      const py = Math.floor(groundY) // This is the ground level
      const baseWidth = 20
      const topWidth = 10
      const topY = py - height // Top of the minaret
      
      // Base starts AT ground level (not floating)
      drawBlock(px, py - (height - 40), baseWidth, height - 40, darkGreen)
      
      // Make sure base touches ground - extend to groundY
      drawBlock(px, py, baseWidth, 2, darkGreen)
      
      // Tapered top (more detailed, no floating lines)
      for (let i = 0; i < topWidth; i++) {
        for (let j = 0; j < 35; j++) { // Reduced from 40 to avoid floating
          const offset = Math.floor(j / 7)
          if (i >= offset && i < topWidth - offset) {
            drawPixel(px + baseWidth / 2 - topWidth / 2 + i, py - height + j, darkGreen)
          }
        }
      }
      
      // Decorative bands (only on the shaft, not at top)
      for (let band = 0; band < 3; band++) {
        const bandY = py - (height - 60) - (band * 50) // Positioned lower on shaft
        if (bandY > py - height + 30) { // Only draw if not too close to top
          drawBlock(px - 2, bandY, baseWidth + 4, 3, darkGreen)
        }
      }
      
      // Vertical line connecting minaret to crescent
      if (hasCrescent) {
        const centerX = px + baseWidth / 2
        const lineTopY = topY + 5 // Start line just above tapered top
        const lineHeight = 8 // Height of connecting line
        
        // Draw vertical connecting line
        drawBlock(centerX - 1, lineTopY, 2, lineHeight, darkGreen)
        
        // Crescent on top (at the very top, rotated diagonal)
        const crescentY = lineTopY - 5 // Position at top of connecting line
        drawCrescent(centerX, crescentY, 7, -Math.PI / 4) // Rotated -45 degrees (diagonal the other way)
      }
    }

    // Draw mosque dome (pixel art style, bigger, SOLID, detailed, touches ground)
    const drawDome = (x: number, groundY: number, width: number) => {
      const radius = width / 2
      const px = Math.floor(x)
      const py = Math.floor(groundY) // This is the ground level
      
      // Draw dome as filled semi-circle using pixel art (solid fill, detailed)
      for (let fillX = 0; fillX < width; fillX++) {
        const distFromCenter = Math.abs(fillX - radius)
        if (distFromCenter <= radius) {
          const domeHeight = Math.sqrt(radius * radius - distFromCenter * distFromCenter)
          for (let fillY = 0; fillY <= domeHeight; fillY++) {
            drawPixel(px + fillX, py - fillY, darkGreen)
          }
        }
      }
      
      // Base structure (wider base, touches ground properly)
      drawBlock(px, py, width, 5, darkGreen) // Thicker base to ensure it touches
      
      // Decorative elements on dome (not floating)
      for (let i = 0; i < 3; i++) {
        const decX = px + radius - 15 + (i * 15)
        const decY = py - radius + 25 // Lowered slightly
        drawBlock(decX, decY, 4, 2, darkGreen)
      }
    }

    // Draw person silhouette (detailed, recognizable, proper proportions)
    const drawPerson = (x: number, baseY: number, walkCycle: number, facingRight: boolean = true) => {
      const px = Math.floor(x)
      const py = Math.floor(baseY)
      
      // Head with head covering (more detailed, proper size)
      // Head shape (circular)
      for (let i = 3; i < 9; i++) {
        for (let j = 0; j < 7; j++) {
          const distX = Math.abs(i - 6)
          const distY = Math.abs(j - 3.5)
          if ((distX * distX) / (3 * 3) + (distY * distY) / (3.5 * 3.5) < 1) {
            drawPixel(px + i, py - 48 + j, darkGreen)
          }
        }
      }
      
      // Head covering/turban (wrapped around head)
      drawBlock(px + 2, py - 50, 8, 3, darkGreen)
      drawBlock(px + 3, py - 51, 6, 2, darkGreen)
      
      // Body/robe (flowing, more detailed)
      // Torso (wider at top, narrower at bottom)
      for (let i = 2; i < 12; i++) {
        for (let j = 0; j < 28; j++) {
          const widthAtJ = j < 20 ? 10 : 8 - Math.floor((j - 20) / 2)
          if (i >= (10 - widthAtJ) / 2 && i < (10 + widthAtJ) / 2) {
            drawPixel(px + i, py - 41 + j, darkGreen)
          }
        }
      }
      
      // Legs (walking - positioned at baseY, not floating)
      const legPhase = Math.floor(walkCycle) % 2
      if (legPhase === 0) {
        // Left leg forward
        drawBlock(px + 4, py - 13, 3, 13, darkGreen)
        drawBlock(px + 9, py - 8, 3, 8, darkGreen)
      } else {
        // Right leg forward
        drawBlock(px + 4, py - 8, 3, 8, darkGreen)
        drawBlock(px + 9, py - 13, 3, 13, darkGreen)
      }
      
      // Arm holding rope (extended forward)
      if (facingRight) {
        for (let i = 0; i < 14; i++) {
          const armY = py - 18 + Math.floor(i * 0.3)
          drawBlock(px + 14 + i, armY, 2, 3, darkGreen)
        }
      }
    }

    // Draw rope between person and camel (thicker, more visible)
    const drawRope = (personX: number, personY: number, camelX: number, camelY: number) => {
      const startX = personX + 14
      const startY = personY - 10
      const endX = camelX
      const endY = camelY - 16
      
      const steps = Math.abs(endX - startX)
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const x = Math.floor(startX + (endX - startX) * t)
        const y = Math.floor(startY + (endY - startY) * t)
        // Make rope thicker
        drawPixel(x, y, darkGreen)
        drawPixel(x, y + 1, darkGreen)
        drawPixel(x - 1, y, darkGreen)
        drawPixel(x + 1, y, darkGreen)
      }
    }

    // Draw camel silhouette with walking animation (ACTUALLY looks like a camel)
    const drawCamel = (x: number, baseY: number, walkCycle: number) => {
      const px = Math.floor(x)
      const py = Math.floor(baseY)
      const legPhase = Math.floor(walkCycle) % 2
      
      // Body (rectangular, camel-like torso)
      drawBlock(px + 5, py - 25, 28, 18, darkGreen)
      
      // Hump (prominent, rounded top - the defining camel feature)
      // Hump base
      drawBlock(px + 12, py - 38, 14, 8, darkGreen)
      // Hump rounded top
      for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 10; j++) {
          const distX = Math.abs(i - 7)
          const distY = j
          if ((distX * distX) / (7 * 7) + (distY * distY) / (8 * 8) < 1) {
            drawPixel(px + 12 + i, py - 46 + j, darkGreen)
          }
        }
      }
      
      // Neck (long, curved upward - camel characteristic)
      // Neck curves up and forward
      for (let i = 0; i < 20; i++) {
        const neckY = py - 20 - Math.floor(i * 0.4) // Curves upward
        const neckWidth = 7 - Math.floor(i / 7)
        for (let j = 0; j < neckWidth; j++) {
          drawPixel(px + 33 + i, neckY + j, darkGreen)
        }
      }
      
      // Head (distinctive camel head - elongated)
      // Head body (elongated shape)
      drawBlock(px + 53, py - 28, 12, 10, darkGreen)
      
      // Snout (camel's long snout)
      drawBlock(px + 65, py - 25, 6, 6, darkGreen)
      
      // Ears (small, on top of head)
      drawBlock(px + 55, py - 30, 2, 3, darkGreen)
      drawBlock(px + 59, py - 30, 2, 3, darkGreen)
      
      // Tail (small, camel tail)
      drawBlock(px + 2, py - 20, 3, 4, darkGreen)
      
      // Legs (walking animation - long, thin camel legs)
      const legConfigs = [
        // Phase 0: front left and back right down
        [[10, 0], [22, 1], [26, 0], [30, 1]],
        // Phase 1: front right and back left down
        [[10, 1], [22, 0], [26, 1], [30, 0]]
      ]
      
      const currentConfig = legConfigs[legPhase]
      currentConfig.forEach(([offset, shouldDraw]) => {
        if (shouldDraw) {
          // Long, thin camel legs
          drawBlock(px + offset, py, 4, 24, darkGreen)
        }
      })
    }

    // Draw sand dunes (STATIC - no animation, LOWER, smoother)
    const drawSandDunes = (duneWidth: number, duneHeight: number) => {
      const duneHeightPercent = duneHeight * 0.25 // Slightly higher for better composition
      const duneY = duneHeight - duneHeightPercent
      
      // Draw smooth dunes
      for (let x = 0; x < duneWidth; x++) {
        const waveY = Math.sin(x / 50) * 12 + Math.cos(x / 80) * 6
        const currentY = Math.floor(duneY + waveY)
        const duneBottom = duneHeight
        
        // Fill from current Y to bottom with smooth gradient
        for (let y = currentY; y < duneBottom; y++) {
          drawPixel(x, y, darkGreen)
        }
      }
    }

    const draw = () => {
      time += 0.03

      // Clear canvas
      ctx2d.fillStyle = lightGreen
      ctx2d.fillRect(0, 0, width, height)

      // Draw stars (twinkling) - more scattered across sky
      const starPositions = [
        [50, 30], [120, 50], [200, 40], [280, 60], [350, 35],
        [450, 55], [520, 45], [600, 50], [680, 40], [750, 55],
        [100, 80], [180, 70], [260, 90], [340, 75], [420, 85],
        [500, 70], [580, 80], [660, 90], [740, 75], [820, 85],
        [150, 110], [230, 100], [310, 120], [390, 105], [470, 115],
        [550, 100], [630, 110], [710, 120], [790, 105],
        [70, 130], [250, 140], [430, 125], [610, 135], [790, 130]
      ]

      starPositions.forEach(([x, y], i) => {
        const twinkle = Math.sin(time * 2 + i * 0.5) > -0.3 // Most stars visible
        if (twinkle) {
          const type = i % 3 === 0 ? 'plus' : 'square'
          drawStar(x, y, type)
        }
      })

      // Draw moon (upper left, larger)
      drawCrescent(60, 50, 18)

      // Draw sand dunes first (STATIC background)
      drawSandDunes(width, height)

      // Calculate ground level (top of dunes) - account for dune height
      // duneHeightPercent is used in getDuneHeight function

      // Draw mosque complex FIRST (so it's behind camel/person) - positioned on ground
      const mosqueX = width * 0.68
      // Get actual dune height at mosque position
      const mosqueDuneY = getDuneHeight(mosqueX, width, height)
      const mosqueY = mosqueDuneY // Position on actual dune surface
      
      // Main dome (LARGER and more detailed, touches ground)
      drawDome(mosqueX - 50, mosqueY, 120)
      
      // Minarets around dome (taller, positioned correctly on dune, touch ground)
      const minaret1Y = getDuneHeight(mosqueX - 110, width, height)
      const minaret2Y = getDuneHeight(mosqueX - 25, width, height)
      const minaret3Y = getDuneHeight(mosqueX + 70, width, height)
      
      drawMinaret(mosqueX - 110, minaret1Y, 180, true)
      drawMinaret(mosqueX - 25, minaret2Y, 170, true)
      drawMinaret(mosqueX + 70, minaret3Y, 175, true)

      // Draw left minaret (far left) - positioned on actual dune, touches ground
      const leftMinaretY = getDuneHeight(50, width, height)
      drawMinaret(50, leftMinaretY, 160, true)

      // Animate camel and person walking (ON TOP of everything)
      const walkSpeed = 0.4
      walkCycle += 0.15
      camelX += walkSpeed
      
      // Loop around when off screen
      if (camelX > width + 120) {
        camelX = -120
      }
      
      const personX = camelX - 70

      // Draw person and camel (moving across screen) - positioned ON dunes
      // Account for CURVED dune height at their x position
      if (personX > -120 && personX < width + 120) {
        // Get actual dune height at person's x position
        const personDuneY = getDuneHeight(personX, width, height)
        const personY = personDuneY - 2 // Slightly above dune surface
        
        // Get actual dune height at camel's x position
        const camelDuneY = getDuneHeight(camelX, width, height)
        const camelY = camelDuneY - 2 // Slightly above dune surface
        
        // Draw person and camel at correct heights
        drawPerson(personX, personY, walkCycle, true)
        drawCamel(camelX, camelY, walkCycle)
        
        // Draw rope connecting them (accounting for different heights)
        if (camelX > personX && camelX - personX < 90) {
          drawRope(personX, personY, camelX, camelY)
        }
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
      style={{ 
        imageRendering: 'crisp-edges'
      }}
    />
  )
}

