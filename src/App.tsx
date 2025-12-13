import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { FAQAccordion } from './components/FAQAccordion'
import { Footer } from './components/Footer'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { siteConfig } from './siteConfig'

function App() {
  return (
    <div className="min-h-screen bg-[hsl(222,47%,11%)] text-white">
      <Navbar />

      <Hero />

      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-16 bg-[hsl(222,47%,11%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
              ABOUT
            </h1>

            <div className="text-center space-y-8 text-white">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4">The Problem</h2>
                  <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                    Muslim students and professionals face barriers in tech: lack of representation, limited networking opportunities, and few spaces that align with their values. Traditional hackathons often miss the unique perspectives and ethical frameworks that Muslim talent brings to innovation.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                  <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                    UmmahHacks bridges this gap by creating North America's premier Muslim-led hackathon. We provide a platform where faith meets innovation, where students showcase value-driven talent, where founders discover exceptional hires, and where bold ideas transform into real-world impact—all rooted in Islamic principles and open to everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>

      {/* Tracks Section */}
      <section id="tracks" className="min-h-screen flex items-center py-16 bg-[hsl(222,47%,11%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
              TRACKS
            </h1>

            <div className="text-center space-y-6 text-white mb-12">
              <p className="text-lg leading-relaxed">
                Choose your track and build solutions that create meaningful impact
              </p>
            </div>

            <div className="mt-16 space-y-8">
              {siteConfig.hackathonTracks.map((track) => (
                <div key={track.id} className="text-left space-y-3 border-b border-white/20 pb-8 last:border-0">
                  <h3 className="text-2xl font-bold text-white">{track.title}</h3>
                  <p className="text-white/90"><strong>Purpose:</strong> {track.purpose}</p>
                  <p className="text-white/80"><strong>Challenge:</strong> {track.challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>

      {/* Schedule Section */}
      <section id="schedule" className="min-h-screen flex items-center py-16 bg-[hsl(222,47%,11%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
              SCHEDULE
            </h1>

            <div className="text-center space-y-6 text-white mb-12">
              <p className="text-lg leading-relaxed">
                Saturday, January 24 - Sunday, January 25 • 36 hours of innovation
              </p>
            </div>

            <div className="mt-16 max-w-4xl mx-auto">
              <div className="relative">
                {/* Modern card design */}
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 md:p-16">
                  <div className="text-center space-y-6">
                    {/* Animated icon or visual element */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[hsl(43,96%,56%)]/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="relative bg-[hsl(43,96%,56%)]/10 border-2 border-[hsl(43,96%,56%)]/30 rounded-full p-8">
                          <svg className="w-16 h-16 text-[hsl(43,96%,56%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Schedule Coming Soon
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                      We're finalizing workshops, activities, and speaker sessions. Check back soon for the complete schedule!
                    </p>
                    
                    {/* Decorative elements */}
                    <div className="flex justify-center gap-2 mt-8">
                      <div className="w-2 h-2 bg-[hsl(43,96%,56%)] rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-[hsl(43,96%,56%)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[hsl(43,96%,56%)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>

      {/* Speakers/Judges Section */}
      <section id="speakers" className="min-h-screen flex items-center py-16 bg-[hsl(222,47%,11%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
              SPEAKERS & JUDGES
            </h1>

            <div className="text-center space-y-6 text-white mb-12">
              <p className="text-lg leading-relaxed">
                Learn from industry leaders and get feedback from expert judges
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {siteConfig.speakers.map((speaker, index) => (
                <div key={index} className="text-center space-y-4 p-6 border border-white/20 rounded-lg hover:border-[hsl(43,96%,56%)]/50 transition-colors">
                  <div className="text-6xl mb-4">{speaker.avatar}</div>
                  <h3 className="text-2xl font-bold text-white">{speaker.name}</h3>
                  <p className="text-white/80">{speaker.role}</p>
                  {speaker.company && (
                    <p className="text-white/60 text-sm">{speaker.company}</p>
                  )}
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[hsl(43,96%,56%)] hover:text-[hsl(43,96%,70%)] transition-colors text-sm font-medium"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>

      {/* FAQ Section */}
      <section id="faq" className="min-h-screen flex items-center py-16 bg-[hsl(222,47%,11%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
              FAQ
            </h1>

            <div className="text-center space-y-6 text-white mb-12">
              <p className="text-lg leading-relaxed">
                Everything you need to know about UmmahHacks
              </p>
            </div>

            <div className="mt-16 text-left">
              <FAQAccordion items={siteConfig.faq} />
            </div>
          </div>
        </div>
      </section>

      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>

      {/* CTA Section */}
      <section id="apply" className="min-h-screen flex items-center py-16 bg-[hsl(222,47%,11%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Build?</h2>
            <p className="text-xl text-white/80">
              Join us for an unforgettable weekend of innovation, collaboration, and impact. Applications
              are open now!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => window.open(siteConfig.lumaLink, '_blank')}
                className="bg-[hsl(43,96%,56%)] text-[hsl(222,47%,11%)] hover:bg-[hsl(43,96%,50%)] font-bold"
              >
                Register on Luma
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open(siteConfig.discordLink, '_blank')}
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Join Discord
              </Button>
            </div>
            <div className="pt-8 text-sm text-white/70">
              <p className="space-x-2">
                <Badge variant="outline" className="border-white/50 text-white/70">
                  Prayer Space Available
                </Badge>
                <Badge variant="outline" className="border-white/50 text-white/70">
                  Dietary Accommodations (Halal/Veg)
                </Badge>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App

