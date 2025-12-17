import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { siteConfig } from '@/siteConfig'
import { Renderer, Camera, Geometry, Program, Mesh, Transform } from 'ogl'

export function MoonStarHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<Transform | null>(null)
  const moonRef = useRef<Mesh | null>(null)
  const starRef = useRef<Mesh | null>(null)
  const cloudsRef = useRef<Mesh[]>([])
  const cameraRef = useRef<Camera | null>(null)
  const rendererRef = useRef<Renderer | null>(null)
  const scrollProgressRef = useRef(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create renderer
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true })
    const gl = renderer.gl
    container.appendChild(gl.canvas)
    gl.clearColor(0.04, 0.09, 0.16, 1) // Dark blue background
    rendererRef.current = renderer

    // Create camera
    const camera = new Camera(gl, { fov: 45 })
    camera.position.set(0, 0, 5)
    cameraRef.current = camera

    // Create scene
    const scene = new Transform()
    sceneRef.current = scene

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height })
    }
    window.addEventListener('resize', resize)
    resize()

    // Moon shader
    const moonVertex = /* glsl */ `
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
      }
    `

    const moonFragment = /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vec2 center = vUv - 0.5;
        float dist = length(center);
        float moon = smoothstep(0.5, 0.48, dist);
        // Add some craters
        float craters = sin(vUv.x * 10.0 + uTime * 0.5) * sin(vUv.y * 8.0) * 0.1;
        vec3 color = vec3(0.9, 0.85, 0.7) + craters;
        gl_FragColor = vec4(color, moon);
      }
    `

    // Star shader
    const starVertex = /* glsl */ `
      attribute vec3 position;
      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      void main() {
        vec3 pos = position;
        pos.xy += sin(uTime * 2.0 + position.z) * 0.1;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
        gl_PointSize = 3.0;
      }
    `

    const starFragment = /* glsl */ `
      precision highp float;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        gl_FragColor = vec4(1.0, 0.85, 0.2, alpha);
      }
    `

    // Cloud shader
    const cloudVertex = /* glsl */ `
      attribute vec3 position;
      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      void main() {
        vec3 pos = position;
        pos.x += sin(uTime * 0.3 + position.y) * 0.2;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
      }
    `

    const cloudFragment = /* glsl */ `
      precision highp float;
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.3);
      }
    `

    // Create moon
    const moonGeometry = new Geometry(gl, {
      position: { size: 3, data: createSphere(1, 32, 32) },
      uv: { size: 2, data: createSphereUV(32, 32) }
    })

    const moonProgram = new Program(gl, {
      vertex: moonVertex,
      fragment: moonFragment,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthTest: true
    })

    const moon = new Mesh(gl, { geometry: moonGeometry, program: moonProgram })
    moon.position.set(-1.5, 1, 0)
    moon.setParent(scene)
    moonRef.current = moon

    // Create star (using points)
    const starCount = 1
    const starPositions = new Float32Array([0, 2, 0]) // Single star position
    const starGeometry = new Geometry(gl, {
      position: { size: 3, data: starPositions }
    })

    const starProgram = new Program(gl, {
      vertex: starVertex,
      fragment: starFragment,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthTest: false
    })

    const star = new Mesh(gl, { mode: gl.POINTS, geometry: starGeometry, program: starProgram })
    star.setParent(scene)
    starRef.current = star

    // Create clouds - using simple billboard quads
    const cloudPositions = [
      [-2, -0.5, -1],
      [2, 0, -1.5],
      [-1, -1, -0.5],
      [1.5, 0.5, -1.2]
    ]

    cloudPositions.forEach((pos, i) => {
      // Create a simple quad for cloud
      const cloudData = new Float32Array([
        -0.5, -0.3, 0,
        0.5, -0.3, 0,
        -0.5, 0.3, 0,
        0.5, 0.3, 0,
      ])
      
      const cloudGeometry = new Geometry(gl, {
        position: { size: 3, data: cloudData }
      })
      
      const cloudProgram = new Program(gl, {
        vertex: cloudVertex,
        fragment: cloudFragment,
        uniforms: { uTime: { value: 0 } },
        transparent: true,
        depthTest: true
      })
      
      const cloud = new Mesh(gl, { 
        mode: gl.TRIANGLE_STRIP,
        geometry: cloudGeometry, 
        program: cloudProgram 
      })
      cloud.position.set(pos[0], pos[1], pos[2])
      cloud.scale.set(1.5, 1, 1)
      cloud.setParent(scene)
      cloudsRef.current.push(cloud)
    })

    // Scroll handler
    let scrollProgress = 0
    const handleScroll = () => {
      const heroSection = container.closest('section')
      if (!heroSection) return

      const rect = heroSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress (0 to 1)
      if (rect.top < 0 && rect.bottom > 0) {
        scrollProgress = Math.min(1, Math.abs(rect.top) / windowHeight)
      } else if (rect.top >= 0) {
        scrollProgress = 0
      } else {
        scrollProgress = 1
      }

      scrollProgressRef.current = scrollProgress
      setIsScrolling(scrollProgress > 0.1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Animation loop
    let animationFrame: number
    let time = 0

    const update = () => {
      time += 0.016 // ~60fps

      const progress = scrollProgressRef.current
      const easeProgress = easeInOutCubic(progress)

      // Update moon rotation and zoom
      if (moonRef.current) {
        moonRef.current.rotation.y = easeProgress * Math.PI * 2
        moonRef.current.rotation.x = easeProgress * Math.PI * 0.5
        const scale = 1 + easeProgress * 10 // Zoom into moon
        moonRef.current.scale.set(scale, scale, scale)
      }

      // Update star rotation
      if (starRef.current) {
        starRef.current.rotation.z = easeProgress * Math.PI * 2
        starRef.current.rotation.y = easeProgress * Math.PI
        const starScale = 1 + easeProgress * 5
        starRef.current.scale.set(starScale, starScale, starScale)
      }

      // Update clouds
      cloudsRef.current.forEach((cloud, i) => {
        cloud.rotation.y = time * 0.1 + i
        cloud.rotation.x = Math.sin(time * 0.2 + i) * 0.2
      })

      // Camera zoom into moon
      if (cameraRef.current) {
        const baseZ = 5
        const targetZ = 0.5
        cameraRef.current.position.z = baseZ - (baseZ - targetZ) * easeProgress
        
        // Look at moon
        if (moonRef.current) {
          const moonPos = moonRef.current.position
          cameraRef.current.lookAt(moonPos)
        }
      }

      // Update uniforms
      if (moonRef.current) {
        moonRef.current.program.uniforms.uTime.value = time
      }
      if (starRef.current) {
        starRef.current.program.uniforms.uTime.value = time
      }
      cloudsRef.current.forEach(cloud => {
        cloud.program.uniforms.uTime.value = time
      })

      renderer.render({ scene, camera })
      animationFrame = requestAnimationFrame(update)
    }

    update()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
      if (gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas)
      }
    }
  }, [])

  const stats = [
    { value: siteConfig.stats.hackers, label: 'Hackers' },
    { value: siteConfig.stats.duration, label: 'Duration' },
    { value: siteConfig.stats.prizes, label: 'Prizes' },
  ]

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center relative bg-[#0a1628] overflow-hidden"
    >
      {/* 3D Scene */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity: isScrolling ? 0 : 1,
          transition: 'opacity 0.5s ease-out'
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
              <div>BUILD FOR THE</div>
              <div className="text-[#D4AF37]">UMMAH</div>
            </h1>
          </div>

          <div className="py-2">
            <p className="text-base sm:text-lg text-white font-medium px-4">
              {siteConfig.date} | {siteConfig.location}
            </p>
          </div>

          <div className="py-2">
            <p className="text-base sm:text-lg text-white max-w-3xl mx-auto leading-relaxed px-4">
              Join us for North America's biggest Muslim-led hackathon where faith meets innovation, and ambition turns into impact.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 px-4">
            <Button 
              size="lg" 
              onClick={() => window.open(siteConfig.lumaLink, '_blank')} 
              className="w-full sm:w-auto bg-[#D4AF37] text-[#0a1628] hover:bg-[#C9A030] font-bold"
            >
              Register on Luma
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open(siteConfig.discordLink, '_blank')}
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black"
            >
              Join Discord
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 max-w-2xl mx-auto pt-6 md:pt-8 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper functions
function createSphere(radius: number, segments: number, rings: number): Float32Array {
  const vertices: number[] = []
  for (let i = 0; i <= rings; i++) {
    const theta = (i * Math.PI) / rings
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)
    for (let j = 0; j <= segments; j++) {
      const phi = (j * 2 * Math.PI) / segments
      const sinPhi = Math.sin(phi)
      const cosPhi = Math.cos(phi)
      vertices.push(
        radius * cosPhi * sinTheta,
        radius * cosTheta,
        radius * sinPhi * sinTheta
      )
    }
  }
  return new Float32Array(vertices)
}

function createSphereUV(segments: number, rings: number): Float32Array {
  const uvs: number[] = []
  for (let i = 0; i <= rings; i++) {
    for (let j = 0; j <= segments; j++) {
      uvs.push(j / segments, i / rings)
    }
  }
  return new Float32Array(uvs)
}

function createCloudShape(): Float32Array {
  // Create a simple cloud using multiple overlapping spheres
  const vertices: number[] = []
  const segments = 8
  const rings = 4
  
  // Create multiple blob shapes for cloud
  for (let blob = 0; blob < 3; blob++) {
    const offsetX = (Math.random() - 0.5) * 0.3
    const offsetY = (Math.random() - 0.5) * 0.2
    const radius = 0.3 + Math.random() * 0.2
    
    for (let i = 0; i <= rings; i++) {
      const theta = (i * Math.PI) / rings
      const sinTheta = Math.sin(theta)
      const cosTheta = Math.cos(theta)
      for (let j = 0; j <= segments; j++) {
        const phi = (j * 2 * Math.PI) / segments
        const sinPhi = Math.sin(phi)
        const cosPhi = Math.cos(phi)
        vertices.push(
          offsetX + radius * cosPhi * sinTheta,
          offsetY + radius * cosTheta,
          radius * sinPhi * sinTheta * 0.2
        )
      }
    }
  }
  return new Float32Array(vertices)
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

