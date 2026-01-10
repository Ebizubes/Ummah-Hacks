import { Instagram } from 'lucide-react'
import { siteConfig } from '@/siteConfig'
import { FadedStarsBackground } from './FadedStarsBackground'

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: siteConfig.socials.instagram, label: 'Instagram' },
  ]

  return (
    <>
      {/* Decorative separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      
      <footer id="contact" className="bg-navy-dark py-12 sm:py-16 relative overflow-hidden">
        <FadedStarsBackground />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 items-start">
              
              {/* Email Section */}
              <div className="text-center sm:text-left space-y-3">
                <h3 className="font-display text-lg font-bold text-gold mb-4">Contact</h3>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${siteConfig.email}`} 
                    className="block font-sans text-sm sm:text-base text-white/90 transition-colors break-all"
                  >
                    {siteConfig.email}
                  </a>
                  <a 
                    href="mailto:afifasiddiqua24@gmail.com" 
                    className="block font-sans text-xs sm:text-sm text-white/80 transition-colors break-all"
                  >
                    afifasiddiqua24@gmail.com
                    <span className="ml-2 text-xs text-white/60">(for sisters)</span>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-center">
                <h3 className="font-display text-lg font-bold text-gold mb-4">Follow Us</h3>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex flex-col items-center space-y-2 transition-colors group"
                    >
                      <social.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 transition-colors" />
                      <span className="font-display text-white/80 text-xs transition-colors">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Register Button */}
              <div className="text-center sm:text-right">
                <a 
                  href={siteConfig.lumaLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gold text-navy px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-display font-semibold active:bg-gold-dark hover:bg-gold-light transition-all shadow-lg hover:shadow-xl touch-manipulation min-h-[44px] flex items-center justify-center"
                >
                  APPLY NOW
                </a>
              </div>

            </div>

            {/* Sponsor Button */}
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gold/30 text-center">
              <a 
                href={siteConfig.sponsorLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block border-2 border-gold text-white px-8 sm:px-10 py-4 text-sm sm:text-base font-display font-semibold transition-all duration-200 touch-manipulation min-h-[44px] flex items-center justify-center"
              >
                SPONSOR US
              </a>
            </div>

            {/* Copyright */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gold/20 text-center">
              <p className="font-sans text-white/60 text-xs sm:text-sm">
                © {new Date().getFullYear()} {siteConfig.eventName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

