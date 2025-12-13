import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SectionHeader } from './components/SectionHeader'
import { HackathonTrackCard } from './components/HackathonTrackCard'
import { ScheduleTabs } from './components/ScheduleTabs'
import { FAQAccordion } from './components/FAQAccordion'
import { Footer } from './components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { siteConfig } from './siteConfig'
import { motion } from 'framer-motion'
import { Trophy, Users, Sparkles } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <Hero />

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="About UmmahHacks"
            subtitle="A hackathon focused on building solutions that create positive impact in our communities"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Hackathon Tracks"
            subtitle="Choose your track and build solutions that create meaningful impact"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {siteConfig.hackathonTracks.map((track, index) => (
              <HackathonTrackCard
                key={track.id}
                title={track.title}
                purpose={track.purpose}
                challenge={track.challenge}
                icon={track.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Schedule"
            subtitle="Saturday, January 25 - Sunday, January 26 • 36 hours of innovation"
          />

          <div className="mt-16 max-w-4xl mx-auto">
            <ScheduleTabs day1={siteConfig.schedule.day1} day2={siteConfig.schedule.day2} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about UmmahHacks"
          />

          <div className="mt-16">
            <FAQAccordion items={siteConfig.faq} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Build?</h2>
            <p className="text-xl text-muted-foreground">
              Join us for an unforgettable weekend of innovation, collaboration, and impact. Applications
              are open now!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => window.open(siteConfig.applicationLink, '_blank')}>
                Apply Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open(siteConfig.discordLink, '_blank')}
              >
                Join Discord
              </Button>
            </div>
            <div className="pt-8 text-sm text-muted-foreground">
              <p>
                <Badge variant="outline" className="mr-2">
                  Prayer Space Available
                </Badge>
                <Badge variant="outline">
                  Dietary Accommodations (Halal/Veg)
                </Badge>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App

