import { Button } from './ui/button'
import { siteConfig } from '@/siteConfig'
import { PixelArtDesertBackground } from './PixelArtDesertBackground'

export function Hero() {
  const stats = [
    { value: siteConfig.stats.hackers, label: 'Hackers' },
    { value: siteConfig.stats.duration, label: 'Duration' },
    { value: siteConfig.stats.prizes, label: 'Prizes' },
  ]

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center relative bg-black overflow-hidden"
    >
      {/* Pixel art desert scene background */}
      <PixelArtDesertBackground />
      
      {/* Overlay for better text readability - darker */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              <div>BUILD FOR THE</div>
              <div>UMMAH</div>
            </h1>
          </div>

          {/* Date and location */}
          <div className="py-2">
            <p className="text-lg text-white font-medium">
              {siteConfig.date} | {siteConfig.location}
            </p>
          </div>

          {/* Description */}
          <div className="py-2">
            <p className="text-lg text-white max-w-2xl mx-auto">
              Join us for a hackathon focused on community impact, entrepreneurship, and building solutions
              that matter.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
            <Button 
              size="lg" 
              onClick={() => window.open(siteConfig.lumaLink, '_blank')} 
              className="w-full sm:w-auto bg-blue-900 text-white hover:bg-blue-800"
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

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

