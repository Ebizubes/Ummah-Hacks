import { FadedStarsBackground } from './FadedStarsBackground'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { siteConfig } from '../siteConfig'

export function CTASection() {
  return (
    <section id="apply" className="flex overflow-hidden relative items-center py-12 min-h-screen bg-gradient-to-b sm:py-16 md:py-20 lg:py-32 from-navy-dark via-navy to-navy-light">
      <FadedStarsBackground />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent"></div>
      <div className="container relative z-10 px-4 mx-auto sm:px-6">
        <div className="mx-auto space-y-10 max-w-4xl text-center md:space-y-12">
          <div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white font-display sm:text-5xl md:text-6xl lg:text-7xl">
              Ready to Build?
            </h2>
            <p className="mx-auto max-w-2xl font-serif text-xl leading-relaxed md:text-2xl text-white/90">
              Join us for an unforgettable weekend of innovation, collaboration, and impact. Applications are open now!
            </p>
          </div>
          
          <div className="flex flex-col gap-4 justify-center items-center sm:flex-row">
            <Button 
              size="lg" 
              onClick={() => window.open(siteConfig.lumaLink, '_blank')}
              className="w-full sm:w-auto bg-gold text-navy hover:bg-gold-light active:bg-gold-dark font-display text-base sm:text-lg font-semibold px-6 sm:px-8 py-4 sm:py-6 shadow-xl hover:shadow-2xl hover:shadow-gold/30 transition-all touch-manipulation min-h-[44px]"
            >
              Register on Luma
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open(siteConfig.discordLink, '_blank')}
              className="w-full sm:w-auto border-2 border-gold text-white font-display text-base sm:text-lg font-semibold px-6 sm:px-8 py-4 sm:py-6 transition-all touch-manipulation min-h-[44px]"
            >
              Join Discord
            </Button>
          </div>
          
          <div className="flex flex-col gap-3 justify-center items-center pt-8 sm:flex-row">
            <Badge variant="outline" className="px-4 py-2 text-sm text-white border-gold/50 bg-gold/10 font-display">
              Prayer Space Available
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm text-white border-gold/50 bg-gold/10 font-display">
              Dietary Accommodations (Halal/Veg)
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
