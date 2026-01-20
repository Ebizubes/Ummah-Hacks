import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { siteConfig } from '@/siteConfig'
import { motion, AnimatePresence } from 'motion/react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 bg-navy/95 backdrop-blur-md py-4 sm:py-5 md:py-6 px-4 sm:px-6 w-full ${
        scrolled ? 'border-b shadow-lg border-gold/30' : ''}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#hero')
              }}
              className="flex gap-2 items-center transition-opacity hover:opacity-80"
            >
              <img 
                src="/ummah hacks logo.jpg" 
                alt="UmmahHacks Logo" 
                className="object-contain w-auto h-8 sm:h-10 md:h-12"
              />
              <span className="hidden text-lg font-bold tracking-tight text-white font-display sm:text-xl md:text-2xl sm:inline">
                {siteConfig.eventName.toUpperCase()}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 justify-center md:flex">
            <div className="flex justify-center space-x-8 text-sm font-medium lg:space-x-12 font-display">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.href)
                  }}
                  className="tracking-wide transition-colors text-white/90"
                >
                  {link.label.toUpperCase()}
                </a>
              ))}
            </div>
          </nav>

          {/* Desktop Apply Button */}
          <div className="hidden justify-end md:flex">
            <Button 
              size="sm" 
              onClick={() => scrollTo('#apply')}
              className="bg-gold text-navy hover:bg-gold-light active:bg-gold-dark font-display font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all touch-manipulation min-h-[44px]"
            >
              Apply
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

          {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t backdrop-blur-md md:hidden bg-navy/98 border-gold/30"
          >
            <div className="container px-4 py-4 mx-auto space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-sm font-display font-medium text-white/90 transition-colors py-3 tracking-wide touch-manipulation min-h-[44px]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {link.label.toUpperCase()}
                </button>
              ))}
              <div className="flex flex-col pt-4 space-y-2 border-t border-gold/20">
                <Button 
                  size="sm" 
                  onClick={() => scrollTo('#apply')}
                  className="w-full bg-gold text-navy hover:bg-gold-light active:bg-gold-dark font-display font-semibold touch-manipulation min-h-[44px]"
                >
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

