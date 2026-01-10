import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { CrescentMoonHero } from './components/CrescentMoonHero'
import { FAQAccordion } from './components/FAQAccordion'
import { Footer } from './components/Footer'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { siteConfig } from './siteConfig'
import { FadedStarsBackground } from './components/FadedStarsBackground'
import { StarsBackground } from './components/StarsBackground'

function App() {
  const [clickedIcons, setClickedIcons] = useState<Set<string>>(new Set())
  const [showSecretMessage, setShowSecretMessage] = useState(false)

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
              {siteConfig.hackathonTracks.map((track) => (
                <div 
                  key={track.id} 
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-gold/30 p-5 sm:p-6 md:p-8 transition-all duration-300"
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
              ))}
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

      {/* Speakers/Judges Section - Elegant card theme */}
      <section id="speakers" className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-navy-dark via-navy-light to-navy relative overflow-hidden">
        <FadedStarsBackground />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
            <div className="text-center">
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
                Speakers & Judges
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/80 mb-6">
                Learn from industry leaders and get feedback from expert judges
              </p>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto">
              {siteConfig.speakers.map((speaker, index) => (
                <div 
                  key={index} 
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-gold/30 p-5 sm:p-6 md:p-8 text-center transition-all duration-300"
                >
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/10 rounded-full blur-xl transition-all"></div>
                      <img 
                        src={speaker.avatar} 
                        alt={speaker.name}
                        className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-gold/40 transition-all shadow-xl"
                        loading="lazy"
                        onError={() => {
                          console.error('Failed to load image:', speaker.avatar);
                          console.error('Speaker:', speaker.name);
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                    {speaker.name}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white/90 mb-1">{speaker.role}</p>
                  {speaker.company && (
                    <p className="font-serif text-xs sm:text-sm text-white/60 mb-3 sm:mb-4">{speaker.company}</p>
                  )}
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white transition-colors font-display text-xs sm:text-sm font-medium touch-manipulation min-h-[44px]"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
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
