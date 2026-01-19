import { StarsBackground } from './StarsBackground'

export function AboutSection() {
  return (
    <section id="about" className="flex overflow-hidden relative items-center py-12 min-h-screen sm:py-16 md:py-20 lg:py-32" style={{ backgroundImage: 'url(/better banner.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <StarsBackground />
      <div className="absolute inset-0 backdrop-blur-sm bg-navy/80"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent"></div>
      
      <div className="container relative z-10 px-4 mx-auto sm:px-6">
        <div className="mx-auto space-y-12 max-w-5xl md:space-y-16">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-lg font-heading sm:text-6xl md:text-7xl lg:text-8xl">
              About
            </h1>
            <div className="mx-auto w-24 h-1 bg-white/30"></div>
          </div>

          <div className="space-y-12 md:space-y-16">
            <div className="p-6 border shadow-2xl backdrop-blur-sm bg-white/5 border-gold/20 sm:p-8 md:p-12">
              <h2 className="mb-4 text-2xl font-semibold text-white font-display sm:text-3xl md:text-4xl sm:mb-6">The Problem</h2>
              <p className="max-w-4xl font-serif text-base leading-relaxed sm:text-lg md:text-xl text-white/90">
                Muslim students and professionals face barriers in tech: lack of representation, limited networking opportunities, and few spaces that align with their values. Traditional hackathons often miss the unique perspectives and ethical frameworks that Muslim talent brings to innovation.
              </p>
            </div>
            
            <div className="p-6 border shadow-2xl backdrop-blur-sm bg-white/5 border-gold/20 sm:p-8 md:p-12">
              <h2 className="mb-4 text-2xl font-semibold text-white font-display sm:text-3xl md:text-4xl sm:mb-6">The Solution</h2>
              <p className="max-w-4xl font-serif text-base leading-relaxed sm:text-lg md:text-xl text-white/90">
                UmmahHacks bridges this gap by creating North America's premier Muslim-led hackathon. We provide a platform where faith meets innovation, where students showcase value-driven talent, where founders discover exceptional hires, and where bold ideas transform into real-world impact—all rooted in Islamic principles and open to everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
