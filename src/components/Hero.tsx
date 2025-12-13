import { Button } from './ui/button'
import { siteConfig } from '@/siteConfig'
import { AuroraBackground } from './AuroraBackground'

export function Hero() {
  const stats = [
    { value: siteConfig.stats.hackers, label: 'Hackers' },
    { value: siteConfig.stats.duration, label: 'Duration' },
    { value: siteConfig.stats.prizes, label: 'Prizes' },
  ]

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center relative bg-[hsl(222,47%,11%)] overflow-hidden"
    >
      {/* Aurora background */}
      <AuroraBackground />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[hsl(222,47%,11%)]/70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Main heading */}
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
              <div>BUILD FOR THE</div>
              <div>UMMAH</div>
            </h1>
          </div>

          {/* Date and location */}
          <div className="py-2">
            <p className="text-base sm:text-lg text-white font-medium px-4">
              {siteConfig.date} | {siteConfig.location}
            </p>
          </div>

          {/* Description */}
          <div className="py-2">
            <p className="text-base sm:text-lg text-white max-w-3xl mx-auto leading-relaxed px-4">
              Join us for North America's biggest Muslim-led hackathon where faith meets innovation, and ambition turns into impact. Rooted in Islamic principles and open to everyone, this is where students get discovered for their value-driven talent, founders find their next hire, and bold ideas turn into real-world impact.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 px-4">
            <Button 
              size="lg" 
              onClick={() => window.open(siteConfig.lumaLink, '_blank')} 
              className="w-full sm:w-auto bg-[hsl(43,96%,56%)] text-black hover:bg-[hsl(43,96%,50%)] font-bold"
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

