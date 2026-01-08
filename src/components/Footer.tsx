import { Instagram } from 'lucide-react'
import { siteConfig } from '@/siteConfig'

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: siteConfig.socials.instagram, label: 'Instagram' },
  ]

  return (
    <>
      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>
      
      <footer id="contact" className="bg-[hsl(222,47%,11%)] py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start sm:items-center">
              
              {/* Email Section */}
              <div className="text-center sm:text-left space-y-1.5 sm:space-y-2">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 sm:mb-2 md:mb-3">Contact</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <a 
                    href={`mailto:${siteConfig.email}`} 
                    className="block text-xs sm:text-sm md:text-base text-white hover:text-[hsl(43,96%,56%)] transition-colors break-all"
                  >
                    {siteConfig.email}
                  </a>
                  <a 
                    href="mailto:afifasiddiqua24@gmail.com" 
                    className="block text-xs sm:text-sm text-white hover:text-[hsl(43,96%,56%)] transition-colors break-all"
                  >
                    afifasiddiqua24@gmail.com
                    <span className="ml-1 sm:ml-2 text-xs text-white/70">(for sisters)</span>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-center">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 sm:mb-2 md:mb-3">Follow Us</h3>
                <div className="flex justify-center sm:justify-start md:justify-center space-x-4 sm:space-x-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity"
                    >
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                      <span className="text-white text-xs">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Register Button */}
              <div className="text-center sm:text-left md:text-right">
                <a 
                  href={siteConfig.lumaLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[hsl(43,96%,56%)] text-[hsl(222,47%,11%)] px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-bold hover:bg-[hsl(43,96%,50%)] transition-colors w-full sm:w-auto"
                >
                  APPLY NOW
                </a>
              </div>

            </div>

            {/* Sponsor Button */}
            <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-white/20 text-center">
              <a 
                href={siteConfig.sponsorLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block border-2 border-[hsl(43,96%,56%)] text-[hsl(43,96%,56%)] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base font-bold hover:bg-[hsl(43,96%,56%)] hover:text-[hsl(222,47%,11%)] transition-all duration-200"
              >
                SPONSOR US
              </a>
            </div>

            {/* Copyright */}
            <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-white/20 text-center space-y-1 sm:space-y-2">
              <p className="text-white/60 text-xs sm:text-sm">
                © {new Date().getFullYear()} {siteConfig.eventName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

