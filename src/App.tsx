import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ScheduleTabs } from './components/ScheduleTabs'
import { FAQAccordion } from './components/FAQAccordion'
import { Footer } from './components/Footer'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { siteConfig } from './siteConfig'
import { Trophy, Users, Sparkles } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
              ABOUT
            </h1>

            <div className="text-center space-y-6 text-white">
              <p className="text-lg leading-relaxed">
                A hackathon focused on building solutions that create positive impact in our communities
              </p>
            </div>

            <div className="mt-16 space-y-8">
              {[
                {
                  icon: Users,
                  title: 'Community Impact',
                  description: 'Build solutions that address real challenges facing our communities and create lasting positive change.',
                },
                {
                  icon: Sparkles,
                  title: 'Innovation & Entrepreneurship',
                  description: 'Turn your ideas into reality with mentorship from industry leaders and access to cutting-edge tools.',
                },
                {
                  icon: Trophy,
                  title: 'Ethical Technology',
                  description: 'Create technology that serves humanity, respects privacy, and promotes social good.',
                },
              ].map((feature, index) => (
                <div key={index} className="text-left space-y-2">
                  <div className="flex items-center gap-3">
                    <feature.icon className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-white/80 pl-9">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>

      {/* Tracks Section */}
      <section id="tracks" className="min-h-screen flex items-center py-16 bg-black">
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
      <section id="schedule" className="min-h-screen flex items-center py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
              SCHEDULE
            </h1>

            <div className="text-center space-y-6 text-white mb-12">
              <p className="text-lg leading-relaxed">
                Friday, January 24 - Saturday, January 25 • 36 hours of innovation
              </p>
            </div>

            <div className="mt-16 max-w-4xl mx-auto">
              <ScheduleTabs day1={siteConfig.schedule.day1} day2={siteConfig.schedule.day2} />
            </div>
          </div>
        </div>
      </section>

      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>

      {/* FAQ Section */}
      <section id="faq" className="min-h-screen flex items-center py-16 bg-black">
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
      <section id="apply" className="min-h-screen flex items-center py-16 bg-black">
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
                className="bg-blue-900 text-white hover:bg-blue-800"
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

