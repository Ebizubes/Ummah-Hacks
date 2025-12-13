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
      
      <footer id="contact" className="bg-[hsl(222,47%,11%)] py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              {/* Email Section */}
              <div className="text-center md:text-left space-y-2">
                <h3 className="text-lg font-bold text-white mb-3">Contact</h3>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${siteConfig.email}`} 
                    className="block text-white hover:text-[hsl(43,96%,56%)] transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                  <a 
                    href="mailto:afifasiddiqua24@gmail.com" 
                    className="block text-white hover:text-blue-400 transition-colors text-sm"
                  >
                    afifasiddiqua24@gmail.com
                    <span className="ml-2 text-xs text-white/70">(for sisters)</span>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-3">Follow Us</h3>
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
                      <social.icon className="w-6 h-6 text-white" />
                      <span className="text-white text-xs">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Register Button */}
              <div className="text-center md:text-right">
                <a 
                  href={siteConfig.lumaLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[hsl(43,96%,56%)] text-[hsl(222,47%,11%)] px-6 py-3 font-bold hover:bg-[hsl(43,96%,50%)] transition-colors"
                >
                  APPLY NOW
                </a>
              </div>

            </div>

            {/* Copyright */}
            <div className="mt-8 pt-6 border-t border-white/20 text-center space-y-2">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} {siteConfig.eventName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

