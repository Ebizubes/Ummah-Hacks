import { motion } from 'motion/react'

export function AnimatedBackground() {
  return (
    <div className="overflow-hidden absolute inset-0 pointer-events-none">
      {/* Golden gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-[hsl(43,96%,56%)]/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(43,96%,56%)]/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-[hsl(43,96%,56%)]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Islamic geometric shapes - Hexagons and Stars */}
      {/* Hexagon 1 */}
      <motion.div
        className="absolute top-32 right-20 w-24 h-24 border-2 border-[hsl(43,96%,56%)]/20"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Hexagon 2 */}
      <motion.div
        className="absolute bottom-40 left-32 w-20 h-20 border-2 border-[hsl(43,96%,56%)]/15"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* 6-pointed star (Islamic style) */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-28 h-28 border-2 border-[hsl(43,96%,56%)]/20"
        style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* 8-pointed star (Islamic style) */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-[hsl(43,96%,56%)]/15"
        style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 100% 35%, 61% 35%, 75% 75%, 50% 100%, 25% 75%, 39% 35%, 0% 35%, 39% 35%, 50% 0%)',
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Small hexagon pattern */}
      <motion.div
        className="absolute top-1/2 right-1/5 w-12 h-12 border border-[hsl(43,96%,56%)]/10"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
        animate={{
          rotate: [0, 360],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Interlocking hexagon pattern */}
      <motion.div
        className="absolute bottom-1/3 right-1/2 w-18 h-18 border border-[hsl(43,96%,56%)]/12"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

