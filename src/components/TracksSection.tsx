import { FadedStarsBackground } from './FadedStarsBackground'
import { siteConfig } from '../siteConfig'
import { Spotlight } from './spotlight'

export function TracksSection() {
  return (
    <section id="tracks" className="flex overflow-hidden relative items-center py-12 min-h-screen bg-gradient-to-b sm:py-16 md:py-20 lg:py-32 from-navy-dark via-navy to-navy-light">
      <FadedStarsBackground />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-transparent via-gold/5"></div>
      <div className="container relative z-10 px-4 mx-auto sm:px-6">
        <div className="mx-auto space-y-12 max-w-6xl md:space-y-16">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-white font-display sm:text-6xl md:text-7xl lg:text-8xl">
              Tracks
            </h1>
            <p className="mx-auto max-w-2xl font-sans text-lg md:text-xl text-white/80">
              Choose your track and build solutions that create meaningful impact
            </p>
            <div className="mx-auto mt-6 w-24 h-1 bg-white/30"></div>
          </div>

          <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-1 lg:grid-cols-2">
            {siteConfig.hackathonTracks.map((track, index) => {
              const isLast = index === siteConfig.hackathonTracks.length - 1
              const isOddTotal = siteConfig.hackathonTracks.length % 2 !== 0
              const shouldCenter = isLast && isOddTotal
              
              return (
                <div 
                  key={track.id} 
                  className={`group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-gold/30 p-5 sm:p-6 md:p-8 transition-all duration-300 ${
                    shouldCenter ? 'lg:col-span-2 lg:max-w-2xl lg:mx-auto' : ''}`}
                >
                  <Spotlight
                    className="via-blue-900 to-black blur-xl from-blue-950"
                    size={150}
                  />
                  <h3 className="relative z-10 mb-3 text-xl font-bold text-white font-display sm:text-2xl md:text-3xl sm:mb-4">
                    {track.title}
                  </h3>
                  <div className="relative z-10 space-y-2 sm:space-y-3">
                    <div>
                      <span className="text-xs font-semibold tracking-wide text-white uppercase font-display sm:text-sm">Purpose:</span>
                      <p className="mt-1 font-sans text-sm leading-relaxed sm:text-base text-white/90">{track.purpose}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold tracking-wide text-white uppercase font-display sm:text-sm">Challenge:</span>
                      <p className="mt-1 font-sans text-sm leading-relaxed sm:text-base text-white/80">{track.challenge}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
