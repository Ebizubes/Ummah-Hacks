import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { AnimatedBackground } from './AnimatedBackground'
import { siteConfig } from '@/siteConfig'
import { Users, Clock, Trophy } from 'lucide-react'

export function Hero() {
  const stats = [
    { icon: Users, value: siteConfig.stats.hackers, label: 'Hackers' },
    { icon: Clock, value: siteConfig.stats.duration, label: 'Duration' },
    { icon: Trophy, value: siteConfig.stats.prizes, label: 'Prizes' },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Build for the{' '}
              <span className="bg-gradient-to-r from-[hsl(43,96%,56%)] via-[hsl(43,96%,70%)] to-[hsl(43,96%,56%)] bg-clip-text text-transparent">
                Ummah
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Join us for a hackathon focused on community impact, entrepreneurship, and building solutions
              that matter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" onClick={() => window.open(siteConfig.lumaLink, '_blank')} className="w-full sm:w-auto">
              Register on Luma
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open(siteConfig.discordLink, '_blank')}
              className="w-full sm:w-auto"
            >
              Join Discord
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center space-y-2"
              >
                <stat.icon className="h-8 w-8 text-[hsl(43,96%,56%)] mb-2" />
                {stat.label === 'Prizes' ? (
                  <motion.div
                    className="text-2xl font-bold animate-shimmer"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {stat.value}
                  </motion.div>
                ) : (
                  <div className="text-3xl font-bold">{stat.value}</div>
                )}
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

