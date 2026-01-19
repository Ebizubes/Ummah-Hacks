import { FadedStarsBackground } from './FadedStarsBackground'

export function ScheduleSection() {
  return (
    <section id="schedule" className="flex overflow-hidden relative items-center py-12 min-h-screen bg-gradient-to-b sm:py-16 md:py-20 lg:py-32 from-navy-light via-navy to-navy-dark">
      <FadedStarsBackground />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-transparent"></div>
      <div className="container relative z-10 px-4 mx-auto sm:px-6">
        <div className="mx-auto space-y-12 max-w-5xl md:space-y-16">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-white font-heading sm:text-6xl md:text-7xl lg:text-8xl">
              Schedule
            </h1>
            <p className="mb-6 font-sans text-lg md:text-xl text-white/80">
              Saturday, January 24 - Sunday, January 25 • 36 hours of innovation
            </p>
            <div className="mx-auto w-24 h-1 bg-white/30"></div>
          </div>

          <div className="mt-8 text-center sm:mt-12 md:mt-16">
            <h2 className="text-3xl font-bold text-white font-display md:text-4xl lg:text-5xl">
              Coming Soon
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
