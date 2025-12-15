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
      className="min-h-screen flex items-center relative bg-[#0a1628] overflow-hidden"
    >
      {/* Pixel art desert scene background */}
      <PixelArtDesertBackground />
      
      {/* Overlay for better text readability - darker */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Main heading */}
          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight px-2">
              <div>BUILD FOR THE</div>
              <div>UMMAH</div>
            </h1>
          </div>

          {/* Date and location */}
          <div className="py-1 sm:py-2">
            <p className="text-base sm:text-lg text-white font-medium px-2">
              {siteConfig.date} | {siteConfig.location}
            </p>
          </div>

          {/* Description */}
          <div className="py-1 sm:py-2 px-2">
            <p className="text-base sm:text-lg text-white max-w-2xl mx-auto leading-relaxed">
              Join us for a hackathon focused on community impact, entrepreneurship, and building solutions
              that matter.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-3 sm:py-4 px-2">
            <Button 
              size="lg" 
              onClick={() => window.open(siteConfig.lumaLink, '_blank')} 
              className="w-full sm:w-auto bg-blue-900 text-white hover:bg-blue-800 text-base"
            >
              Register on Luma
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open(siteConfig.discordLink, '_blank')}
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black text-base"
            >
              Join Discord
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16 max-w-2xl mx-auto pt-4 sm:pt-8 px-2">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-1 sm:space-y-2">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white text-center leading-tight">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/70 text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

