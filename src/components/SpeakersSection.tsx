import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FadedStarsBackground } from './FadedStarsBackground'
import { siteConfig } from '../siteConfig'

export function SpeakersSection() {
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Calculate how many speakers to show at once (responsive)
  const getSpeakersPerView = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth >= 1024) return 4 // lg screens: 4 speakers
    if (window.innerWidth >= 768) return 3  // md screens: 3 speakers
    return 2 // sm screens: 2 speakers
  }

  const [speakersPerView, setSpeakersPerView] = useState(getSpeakersPerView())

  useEffect(() => {
    // Throttle resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(() => {
        setSpeakersPerView(getSpeakersPerView())
      }, 150) // Throttle to 150ms
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [])

  // Auto-rotate carousel - pause on hover/interaction
  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setCurrentSpeakerIndex((prev) => (prev === siteConfig.speakers.length - 1 ? 0 : prev + 1))
    }, 5000) // Change every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered])

  return (
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
          <div 
            className="relative px-4 mx-auto max-w-6xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpeakerIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 sm:gap-6"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {Array.from({ length: speakersPerView }).map((_, index) => {
                    const speakerIndex = (currentSpeakerIndex + index) % siteConfig.speakers.length
                    const speaker = siteConfig.speakers[speakerIndex]
                    return (
                      <div
                        key={`${currentSpeakerIndex}-${index}`}
                        className="p-4 text-center bg-gradient-to-br border backdrop-blur-sm transition-all duration-300 from-white/10 to-white/5 border-gold/30 sm:p-6"
                        style={{ willChange: 'transform' }}
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
  )
}
