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

function App() {
  const [clickedIcons, setClickedIcons] = useState<Set<string>>(new Set())
  const [showSecretMessage, setShowSecretMessage] = useState(false)
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0)

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeakerIndex((prev) => (prev === siteConfig.speakers.length - 1 ? 0 : prev + 1))
    }, 5000) // Change speaker every 5 seconds

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
    <div className="min-h-screen bg-navy text-white">
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
              className="text-black font-bold text-xs sm:text-sm md:text-base leading-relaxed m-0 pr-6"
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
              className="absolute top-1 right-1 sm:top-2 sm:right-2 text-black active:text-gray-600 font-bold text-lg sm:text-xl leading-none bg-transparent border-none cursor-pointer touch-manipulation"
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
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent overflow-visible">
        <div className="absolute -left-6 sm:-left-8 md:-left-10 lg:-left-14 bottom-0 translate-y-1/2 z-20 cursor-pointer touch-manipulation" style={{ transform: 'translateY(50%) rotate(-20deg)' }}>
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
      <section id="about" className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden" style={{ backgroundImage: 'url(/better banner.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <StarsBackground />
        <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
            <div className="text-center">
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                About
              </h1>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            <div className="space-y-12 md:space-y-16">
              <div className="bg-white/5 backdrop-blur-sm border border-gold/20 p-6 sm:p-8 md:p-12 shadow-2xl">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 sm:mb-6">The Problem</h2>
                <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-4xl">
                  Muslim students and professionals face barriers in tech: lack of representation, limited networking opportunities, and few spaces that align with their values. Traditional hackathons often miss the unique perspectives and ethical frameworks that Muslim talent brings to innovation.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-gold/20 p-6 sm:p-8 md:p-12 shadow-2xl">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 sm:mb-6">The Solution</h2>
                <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-4xl">
                  UmmahHacks bridges this gap by creating North America's premier Muslim-led hackathon. We provide a platform where faith meets innovation, where students showcase value-driven talent, where founders discover exceptional hires, and where bold ideas transform into real-world impact—all rooted in Islamic principles and open to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator with icon between About and Tracks */}
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent overflow-visible">
        <div className="absolute -right-6 sm:-right-8 md:-right-10 lg:-right-14 bottom-0 translate-y-1/2 z-20 cursor-pointer touch-manipulation" style={{ transform: 'translateY(50%) rotate(20deg)' }}>
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
      <section id="tracks" className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-navy-dark via-navy to-navy-light relative overflow-hidden">
        <FadedStarsBackground />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/5 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
            <div className="text-center">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
                Tracks
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Choose your track and build solutions that create meaningful impact
              </p>
              <div className="w-24 h-1 bg-white/30 mx-auto mt-6"></div>
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
                      shouldCenter ? 'lg:col-span-2 lg:max-w-2xl lg:mx-auto' : ''
                    }`}
                  >
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                      {track.title}
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <span className="font-display text-xs sm:text-sm font-semibold text-white uppercase tracking-wide">Purpose:</span>
                        <p className="font-sans text-sm sm:text-base text-white/90 mt-1 leading-relaxed">{track.purpose}</p>
                      </div>
                      <div>
                        <span className="font-display text-xs sm:text-sm font-semibold text-white uppercase tracking-wide">Challenge:</span>
                        <p className="font-sans text-sm sm:text-base text-white/80 mt-1 leading-relaxed">{track.challenge}</p>
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
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent overflow-visible">
        <div className="absolute -left-6 sm:-left-8 md:-left-10 lg:-left-14 bottom-0 translate-y-full z-20 cursor-pointer touch-manipulation" style={{ transform: 'translateY(100%) rotate(18deg)' }}>
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
      <section id="schedule" className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-navy-light via-navy to-navy-dark relative overflow-hidden">
        <FadedStarsBackground />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
            <div className="text-center">
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
                Schedule
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/80 mb-6">
                Saturday, January 24 - Sunday, January 25 • 36 hours of innovation
              </p>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            <div className="mt-8 sm:mt-12 md:mt-16 text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Coming Soon
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator with icon between Schedule and Speakers */}
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent overflow-visible">
        <div className="absolute -right-6 sm:-right-8 md:-right-10 lg:-right-14 bottom-0 translate-y-1/2 z-20 cursor-pointer touch-manipulation" style={{ transform: 'translateY(50%) rotate(22deg)' }}>
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
      <section id="speakers" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-navy-dark via-navy-light to-navy relative overflow-hidden">
        <FadedStarsBackground />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <div className="text-center">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Speakers & Judges
              </h1>
              <p className="font-sans text-base md:text-lg text-white/80 mb-6">
                Learn from industry leaders and get feedback from expert judges
              </p>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            {/* Carousel */}
            <div className="relative max-w-md mx-auto">
              <div className="relative overflow-hidden rounded-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSpeakerIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-gold/30 p-6 sm:p-8 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="relative overflow-hidden rounded-full">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl transition-all"></div>
                        <img 
                          src={siteConfig.speakers[currentSpeakerIndex].avatar} 
                          alt={siteConfig.speakers[currentSpeakerIndex].name}
                          className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover object-center border-4 border-gold/40 transition-all shadow-xl"
                          loading="lazy"
                          onError={() => {
                            console.error('Failed to load image:', siteConfig.speakers[currentSpeakerIndex].avatar);
                            console.error('Speaker:', siteConfig.speakers[currentSpeakerIndex].name);
                          }}
                        />
                      </div>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                      {siteConfig.speakers[currentSpeakerIndex].name}
                    </h3>
                    <p className="font-sans text-base sm:text-lg text-white/90">{siteConfig.speakers[currentSpeakerIndex].role}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSpeakerIndex((prev) => (prev === 0 ? siteConfig.speakers.length - 1 : prev - 1))}
                className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-gold/30 rounded-full p-2 sm:p-3 transition-all text-white"
                aria-label="Previous speaker"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => setCurrentSpeakerIndex((prev) => (prev === siteConfig.speakers.length - 1 ? 0 : prev + 1))}
                className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-gold/30 rounded-full p-2 sm:p-3 transition-all text-white"
                aria-label="Next speaker"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {siteConfig.speakers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSpeakerIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSpeakerIndex ? 'bg-gold w-8' : 'bg-white/30'
                    }`}
                    aria-label={`Go to speaker ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>

      {/* FAQ Section - Clean readable theme */}
      <section id="faq" className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-navy-light via-navy to-navy-dark relative overflow-hidden">
        <FadedStarsBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
            <div className="text-center">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
                FAQ
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/80 mb-6">
                Everything you need to know about UmmahHacks
              </p>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 p-8 md:p-12 shadow-xl">
              <FAQAccordion items={siteConfig.faq} />
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>

      {/* CTA Section - Bold energetic theme */}
      <section id="apply" className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-navy-dark via-navy to-navy-light relative overflow-hidden">
        <FadedStarsBackground />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-12">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                Ready to Build?
              </h2>
              <p className="font-serif text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Join us for an unforgettable weekend of innovation, collaboration, and impact. Applications are open now!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
            
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Badge variant="outline" className="border-gold/50 text-white bg-gold/10 font-display px-4 py-2 text-sm">
                Prayer Space Available
              </Badge>
              <Badge variant="outline" className="border-gold/50 text-white bg-gold/10 font-display px-4 py-2 text-sm">
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
