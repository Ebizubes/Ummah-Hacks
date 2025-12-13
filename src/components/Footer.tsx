import { Twitter, Instagram, Linkedin } from 'lucide-react'
import { siteConfig } from '@/siteConfig'

export function Footer() {
  const socialLinks = [
    { icon: Twitter, href: siteConfig.socials.twitter, label: 'Twitter' },
    { icon: Instagram, href: siteConfig.socials.instagram, label: 'Instagram' },
    { icon: Linkedin, href: siteConfig.socials.linkedin, label: 'LinkedIn' },
  ]

  return (
    <>
      {/* White separator line */}
      <div className="w-full h-px bg-white"></div>
      
      <footer id="contact" className="bg-black py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              {/* Email Section */}
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-white mb-3">Contact</h3>
                <a 
                  href={`mailto:${siteConfig.email}`} 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {siteConfig.email}
                </a>
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
                  className="inline-block bg-blue-900 text-white px-6 py-3 font-bold hover:bg-blue-800 transition-colors"
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

