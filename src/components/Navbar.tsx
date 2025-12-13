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
      className={`sticky top-0 z-50 bg-[hsl(222,47%,11%)] py-3 sm:py-4 md:py-6 px-4 sm:px-6 w-full ${
        scrolled ? 'border-b border-white' : ''
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
              className="text-white font-bold text-base sm:text-lg md:text-xl"
            >
              {siteConfig.eventName.toUpperCase()}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center flex-1">
            <div className="flex justify-center space-x-8 lg:space-x-12 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.href)
                  }}
                  className="text-white hover:text-[hsl(43,96%,56%)] transition-colors"
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
              className="bg-[hsl(43,96%,56%)] text-[hsl(222,47%,11%)] hover:bg-[hsl(43,96%,50%)] font-bold"
            >
              Apply
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
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
            className="md:hidden bg-[hsl(222,47%,11%)] border-t border-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-sm font-medium text-white hover:text-[hsl(43,96%,56%)] transition-colors py-2"
                >
                  {link.label.toUpperCase()}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                <Button 
                  size="sm" 
                  onClick={() => scrollTo('#apply')}
                  className="w-full bg-[hsl(43,96%,56%)] text-[hsl(222,47%,11%)] hover:bg-[hsl(43,96%,50%)] font-bold"
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

