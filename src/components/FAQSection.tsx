import { FadedStarsBackground } from './FadedStarsBackground'
import { FAQAccordion } from './FAQAccordion'
import { siteConfig } from '../siteConfig'

export function FAQSection() {
  return (
    <section id="faq" className="flex overflow-hidden relative items-center py-12 min-h-screen bg-gradient-to-b sm:py-16 md:py-20 lg:py-32 from-navy-light via-navy to-navy-dark">
      <FadedStarsBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent"></div>
      <div className="container relative z-10 px-4 mx-auto sm:px-6">
        <div className="mx-auto space-y-12 max-w-4xl md:space-y-16">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-white font-display sm:text-6xl md:text-7xl lg:text-8xl">
              FAQ
            </h1>
            <p className="mb-6 font-sans text-lg md:text-xl text-white/80">
              Everything you need to know about UmmahHacks
            </p>
            <div className="mx-auto w-24 h-1 bg-white/30"></div>
          </div>

          <div className="p-8 border shadow-xl backdrop-blur-sm bg-white/5 border-gold/20 md:p-12">
            <FAQAccordion items={siteConfig.faq} />
          </div>
        </div>
      </div>
    </section>
  )
}
