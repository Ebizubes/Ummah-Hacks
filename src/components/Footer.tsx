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
      
      <footer id="contact" className="bg-[hsl(222,47%,11%)] py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 items-start sm:items-center">
              
              {/* Email Section */}
              <div className="text-center sm:text-left space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Contact</h3>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${siteConfig.email}`} 
                    className="block text-sm sm:text-base text-white hover:text-[hsl(43,96%,56%)] transition-colors break-all"
                  >
                    {siteConfig.email}
                  </a>
                  <a 
                    href="mailto:afifasiddiqua24@gmail.com" 
                    className="block text-xs sm:text-sm text-white hover:text-[hsl(43,96%,56%)] transition-colors break-all"
                  >
                    afifasiddiqua24@gmail.com
                    <span className="ml-2 text-xs text-white/70">(for sisters)</span>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Follow Us</h3>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity"
                    >
                      <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      <span className="text-white text-xs">{social.label}</span>
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
                  className="inline-block bg-[hsl(43,96%,56%)] text-[hsl(222,47%,11%)] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold hover:bg-[hsl(43,96%,50%)] transition-colors w-full sm:w-auto"
                >
                  APPLY NOW
                </a>
              </div>

            </div>

            {/* Sponsor Button */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20 text-center">
              <a 
                href={siteConfig.sponsorLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block border-2 border-[hsl(43,96%,56%)] text-[hsl(43,96%,56%)] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold hover:bg-[hsl(43,96%,56%)] hover:text-[hsl(222,47%,11%)] transition-all duration-200"
              >
                SPONSOR US
              </a>
            </div>

            {/* Copyright */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20 text-center space-y-2">
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

