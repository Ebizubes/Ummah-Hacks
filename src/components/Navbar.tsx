import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { siteConfig } from '@/siteConfig'
import { motion, AnimatePresence } from 'framer-motion'

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
        scrolled ? 'border-b border-gold/30 shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#hero')
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/ummah hacks logo.jpg" 
                alt="UmmahHacks Logo" 
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
              <span className="font-display text-white font-bold text-lg sm:text-xl md:text-2xl hover:text-gold transition-colors tracking-tight hidden sm:inline">
                {siteConfig.eventName.toUpperCase()}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center flex-1">
            <div className="flex justify-center space-x-8 lg:space-x-12 text-sm font-display font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.href)
                  }}
                  className="text-white/90 hover:text-gold transition-colors tracking-wide"
                >
                  {link.label.toUpperCase()}
                </a>
              ))}
            </div>
          </nav>

          {/* Desktop Apply Button */}
          <div className="hidden md:flex justify-end">
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
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="md:hidden bg-navy/98 backdrop-blur-md border-t border-gold/30"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-sm font-display font-medium text-white/90 active:text-gold hover:text-gold transition-colors py-3 tracking-wide touch-manipulation min-h-[44px]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {link.label.toUpperCase()}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gold/20">
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

