import { FadedStarsBackground } from './FadedStarsBackground'
import { SponsorBox } from './SponsorBox'
import { siteConfig } from '../siteConfig'

export function SponsorsSection() {
  // Group sponsors by tier: tier1, tier2, tier3
  const tier1Sponsors = siteConfig.sponsors.filter(s => s.tier === 'tier1')
  const tier2Sponsors = siteConfig.sponsors.filter(s => s.tier === 'tier2')
  const tier3Sponsors = siteConfig.sponsors.filter(s => s.tier === 'tier3')
  const allSponsors = [...tier1Sponsors, ...tier2Sponsors, ...tier3Sponsors]

  return (
    <section id="sponsors" className="overflow-hidden relative py-12 sm:py-16 md:py-20 from-navy-dark via-navy-light to-navy">
      <FadedStarsBackground />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent"></div>
      <div className="container relative z-10 px-4 mx-auto sm:px-6">
        <div className="mx-auto space-y-8 max-w-6xl md:space-y-12">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white font-heading sm:text-5xl md:text-6xl">
              Our Sponsors
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base md:text-lg text-white/80">
              These incredible companies help bring UmmahHacks to life, uniting to support hundreds of students during this weekend of innovation.
            </p>
            <div className="mx-auto mt-6 w-24 h-1 bg-white/30"></div>
          </div>

          {/* Sponsors Grid */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {allSponsors.map((sponsor, index) => {
              return (
                <div
                  key={`${sponsor.name}-${index}`}
                  style={{ willChange: 'transform' }}
                >
                  <SponsorBox
                    name={sponsor.name}
                    logo={sponsor.logo}
                    tier={sponsor.tier as 'tier1' | 'tier2' | 'tier3'}
                    url={sponsor.url}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
