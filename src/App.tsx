import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { CrescentMoonHero } from './components/CrescentMoonHero'
import { FAQAccordion } from './components/FAQAccordion'
import { Footer } from './components/Footer'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { siteConfig } from './siteConfig'
import { FadedStarsBackground } from './components/FadedStarsBackground'
import { StarsBackground } from './components/StarsBackground'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SponsorBox } from './components/SponsorBox'

function App() {
  const [clickedIcons, setClickedIcons] = useState<Set<string>>(new Set())
  const [showSecretMessage, setShowSecretMessage] = useState(false)
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0)

  // Calculate how many speakers to show at once (responsive)
  const getSpeakersPerView = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth >= 1024) return 4 // lg screens: 4 speakers
    if (window.innerWidth >= 768) return 3  // md screens: 3 speakers
    return 2 // sm screens: 2 speakers
  }

  const [speakersPerView, setSpeakersPerView] = useState(getSpeakersPerView())

  useEffect(() => {
    const handleResize = () => {
      setSpeakersPerView(getSpeakersPerView())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeakerIndex((prev) => (prev === siteConfig.speakers.length - 1 ? 0 : prev + 1))
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleIconClick = (iconId: string) => {
    const newClicked = new Set(clickedIcons)
    newClicked.add(iconId)
    setClickedIcons(newClicked)
    
    // Show secret message when first icon is clicked
    if (newClicked.size === 1) {
      setShowSecretMessage(true)
    }
    
    // Check if all 4 icons are clicked
    if (newClicked.size === 4) {
      setShowSecretMessage(false)
      // Small delay for visual feedback, then redirect
      setTimeout(() => {
        window.open(siteConfig.socials.instagram, '_blank')
      }, 500)
    }
  }

  return (
    <div className="min-h-screen text-white bg-navy">
      <Navbar />

      {/* Secret Message - Comic Book Style Text Bubble */}
      {showSecretMessage && (
        <div 
          className="fixed top-16 sm:top-20 md:top-24 right-2 sm:right-4 z-50 max-w-[calc(100vw-1rem)]"
          style={{ animation: 'slideInFromTopRight 0.5s ease-out' }}
        >
          <div 
            className="relative bg-white shadow-2xl p-3 sm:p-4 md:p-6 max-w-[280px] sm:max-w-xs md:max-w-sm"
            style={{
              border: '3px solid black',
              borderRadius: '20px',
              fontFamily: '"Comic Sans MS", "Comic Sans", cursive, sans-serif',
              boxShadow: '4px 4px 0px 0px black, 8px 8px 0px 0px rgba(0,0,0,0.2)'
            }}
          >
            {/* Classic comic speech bubble tail pointing down-right */}
            <div 
              className="absolute"
              style={{
                bottom: '-12px',
                right: '30px',
                width: '0',
                height: '0',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '20px solid black',
                transform: 'rotate(-20deg)'
              }}
            ></div>
            <div 
              className="absolute"
              style={{
                bottom: '-9px',
                right: '30px',
                width: '0',
                height: '0',
                borderLeft: '13px solid transparent',
                borderRight: '13px solid transparent',
                borderTop: '17px solid white',
                transform: 'rotate(-20deg)'
              }}
            ></div>
            
            {/* Message text - classic comic style */}
            <p 
              className="pr-6 m-0 text-xs font-bold leading-relaxed text-black sm:text-sm md:text-base"
              style={{ 
                fontFamily: '"Comic Sans MS", "Comic Sans", cursive, sans-serif',
                color: '#000000',
                textShadow: 'none'
              }}
            >
              You've discovered our secret! Click all icons for the surprise!
            </p>
            
            {/* Close button - touch friendly */}
            <button
              onClick={() => setShowSecretMessage(false)}
              className="absolute top-1 right-1 text-lg font-bold leading-none text-black bg-transparent border-none cursor-pointer sm:top-2 sm:right-2 active:text-gray-600 sm:text-xl touch-manipulation"
              aria-label="Close message"
              style={{ 
                fontFamily: 'Arial, sans-serif',
                padding: '8px',
                minWidth: '32px',
                minHeight: '32px',
                lineHeight: '1',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <CrescentMoonHero />

      {/* Decorative separator with icon between Hero and About */}
      <div className="overflow-visible relative w-full h-px bg-gradient-to-r from-transparent to-transparent via-gold/50">
        <div className="absolute bottom-0 -left-6 z-20 translate-y-1/2 cursor-pointer sm:-left-8 md:-left-10 lg:-left-14 touch-manipulation" style={{ transform: 'translateY(50%) rotate(-20deg)' }}>
          <img 
            src="/give_me_a_pixelated_laptop_icon__make_it_gold_and_black-removebg-preview.png" 
            alt="Laptop Icon" 
            onClick={() => handleIconClick('laptop')}
            onTouchStart={(e) => {
              e.currentTarget.style.opacity = '0.8'
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.opacity = ''
              handleIconClick('laptop')
            }}
            className={`h-32 sm:h-40 md:h-56 lg:h-72 xl:h-80 w-auto transition-all duration-300 ${
              clickedIcons.has('laptop') 
                ? 'opacity-100 scale-110 filter brightness-125' 
                : 'opacity-50 active:opacity-80 active:scale-105'
            }`}
          />
        </div>
      </div>

      {/* About Section - Elegant serif theme with banner background */}
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

      {/* Decorative separator with icon between About and Tracks */}
      <div className="overflow-visible relative w-full h-px bg-gradient-to-r from-transparent to-transparent via-gold/50">
        <div className="absolute bottom-0 -right-6 z-20 translate-y-1/2 cursor-pointer sm:-right-8 md:-right-10 lg:-right-14 touch-manipulation" style={{ transform: 'translateY(50%) rotate(20deg)' }}>
          <img 
            src="/now_give_me_a_pixelated_controller_that_is_black_and_gold-removebg-preview.png" 
            alt="Controller Icon" 
            onClick={() => handleIconClick('controller')}
            onTouchStart={(e) => {
              e.currentTarget.style.opacity = '0.8'
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.opacity = ''
              handleIconClick('controller')
            }}
            className={`h-32 sm:h-40 md:h-56 lg:h-72 xl:h-80 w-auto transition-all duration-300 ${
              clickedIcons.has('controller') 
                ? 'opacity-100 scale-110 filter brightness-125' 
                : 'opacity-50 active:opacity-80 active:scale-105'
            }`}
          />
        </div>
      </div>

      {/* Tracks Section - Modern display font theme with card grid */}
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
                    className={`group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-gold/30 p-5 sm:p-6 md:p-8 transition-all duration-300 ${
                      shouldCenter ? 'lg:col-span-2 lg:max-w-2xl lg:mx-auto' : ''}`}
                  >
                    <h3 className="mb-3 text-xl font-bold text-white font-display sm:text-2xl md:text-3xl sm:mb-4">
                      {track.title}
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
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

      {/* Decorative separator with icon between Tracks and Schedule */}
      <div className="overflow-visible relative w-full h-px bg-gradient-to-r from-transparent to-transparent via-gold/50">
        <div className="absolute bottom-0 -left-6 z-20 translate-y-full cursor-pointer sm:-left-8 md:-left-10 lg:-left-14 touch-manipulation" style={{ transform: 'translateY(100%) rotate(18deg)' }}>
          <img 
            src="/ChatGPT_Image_Jan_9__2026__12_46_33_AM-removebg-preview.png" 
            alt="Icon" 
            onClick={() => handleIconClick('chatgpt')}
            onTouchStart={(e) => {
              e.currentTarget.style.opacity = '0.8'
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.opacity = ''
              handleIconClick('chatgpt')
            }}
            className={`h-32 sm:h-40 md:h-56 lg:h-72 xl:h-80 w-auto transition-all duration-300 ${
              clickedIcons.has('chatgpt') 
                ? 'opacity-100 scale-110 filter brightness-125' 
                : 'opacity-50 active:opacity-80 active:scale-105'
            }`}
          />
        </div>
      </div>

      {/* Schedule Section - Clean minimal theme */}
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

      {/* Decorative separator with icon between Schedule and Speakers */}
      <div className="overflow-visible relative w-full h-px bg-gradient-to-r from-transparent to-transparent via-gold/50">
        <div className="absolute bottom-0 -right-6 z-20 translate-y-1/2 cursor-pointer sm:-right-8 md:-right-10 lg:-right-14 touch-manipulation" style={{ transform: 'translateY(50%) rotate(22deg)' }}>
          <img 
            src="/4840046.png" 
            alt="Icon" 
            onClick={() => handleIconClick('4840046')}
            onTouchStart={(e) => {
              e.currentTarget.style.opacity = '0.8'
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.opacity = ''
              handleIconClick('4840046')
            }}
            className={`h-32 sm:h-40 md:h-56 lg:h-72 xl:h-80 w-auto transition-all duration-300 ${
              clickedIcons.has('4840046') 
                ? 'opacity-100 scale-110 filter brightness-125' 
                : 'opacity-50 active:opacity-80 active:scale-105'
            }`}
          />
        </div>
      </div>

      {/* Speakers/Judges Section - Carousel */}
      <section id="speakers" className="overflow-hidden relative py-12 bg-gradient-to-b sm:py-16 md:py-20 from-navy-dark via-navy-light to-navy">
        <FadedStarsBackground />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent"></div>
        <div className="container relative z-10 px-4 mx-auto sm:px-6">
          <div className="mx-auto space-y-8 max-w-4xl md:space-y-12">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white font-heading sm:text-5xl md:text-6xl">
                Speakers & Judges
              </h1>
              <p className="mb-6 font-sans text-base md:text-lg text-white/80">
                Learn from industry leaders and get feedback from expert judges
              </p>
              <div className="mx-auto w-24 h-1 bg-white/30"></div>
            </div>

            {/* Carousel */}
            <div className="relative px-4 mx-auto max-w-6xl">
              <div className="overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSpeakerIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 sm:gap-6"
                  >
                    {Array.from({ length: speakersPerView }).map((_, index) => {
                      const speakerIndex = (currentSpeakerIndex + index) % siteConfig.speakers.length
                      const speaker = siteConfig.speakers[speakerIndex]
                      return (
                        <div
                          key={`${currentSpeakerIndex}-${index}`}                          className="p-4 text-center bg-gradient-to-br border backdrop-blur-sm transition-all duration-300 from-white/10 to-white/5 border-gold/30 sm:p-6"

                        >
                          <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="overflow-hidden relative rounded-full">
                              <div className="absolute inset-0 rounded-full blur-xl transition-all bg-white/10"></div>
                              <img 
                                src={speaker.avatar} 
                                alt={speaker.name}
                                className="object-cover object-center relative w-24 h-24 rounded-full border-4 shadow-xl transition-all sm:w-28 sm:h-28 md:w-32 md:h-32 border-gold/40"
                                loading="lazy"
                                onError={() => {
                                  console.error('Failed to load image:', speaker.avatar);
                                  console.error('Speaker:', speaker.name);
                                }}
                              />
                            </div>
                          </div>
                          <h3 className="mb-1 text-lg font-bold text-white font-display sm:text-xl md:text-2xl sm:mb-2">
                            {speaker.name}
                          </h3>
                          <p className="font-sans text-sm sm:text-base text-white/90">{speaker.role}</p>
                        </div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => {
                  setCurrentSpeakerIndex((prev) => (prev === 0 ? siteConfig.speakers.length - 1 : prev - 1))
                }}
                className="absolute left-2 top-1/2 z-10 p-2 text-white rounded-full border backdrop-blur-sm transition-all -translate-y-1/2 sm:-left-12 bg-white/10 hover:bg-white/20 border-gold/30 sm:p-3"
                aria-label="Previous speakers"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => {
                  setCurrentSpeakerIndex((prev) => (prev === siteConfig.speakers.length - 1 ? 0 : prev + 1))
                }}
                className="absolute right-0 top-1/2 z-10 p-2 text-white rounded-full border backdrop-blur-sm transition-all -translate-y-1/2 sm:-right-12 bg-white/10 hover:bg-white/20 border-gold/30 sm:p-3"
                aria-label="Next speakers"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2 justify-center mt-6">
                {siteConfig.speakers.map((_, index) => {
                  // Check if this speaker is currently visible
                  const isVisible = Array.from({ length: speakersPerView }).some((_, i) => {
                    const speakerIndex = (currentSpeakerIndex + i) % siteConfig.speakers.length
                    return speakerIndex === index
                  })
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentSpeakerIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        isVisible ? 'w-3 bg-gold' : 'w-2 bg-white/30'
                      }`}
                      aria-label={`Go to speaker ${index + 1}`}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator */}
      <div className="w-full h-px from-transparent to-transparent via-gold/50"></div>
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
              {(() => {
                // Group sponsors by tier: tier1, tier2, tier3
                const tier1Sponsors = siteConfig.sponsors.filter(s => s.tier === 'tier1')
                const tier2Sponsors = siteConfig.sponsors.filter(s => s.tier === 'tier2')
                const tier3Sponsors = siteConfig.sponsors.filter(s => s.tier === 'tier3')
                const allSponsors = [...tier1Sponsors, ...tier2Sponsors, ...tier3Sponsors]
                
                return allSponsors.map((sponsor, index) => {
                  return (
                    <div
                      key={`${sponsor.name}-${index}`}
                    >
                      <SponsorBox
                        name={sponsor.name}
                        logo={sponsor.logo}
                        tier={sponsor.tier as 'tier1' | 'tier2' | 'tier3'}
                        url={sponsor.url}
                      />
                    </div>
                  )
                })
              })()}
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section - Clean readable theme */}
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

      {/* Decorative separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent to-transparent via-gold/50"></div>

      {/* CTA Section - Bold energetic theme */}
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

      <Footer />
    </div>
  )
}

export default App
