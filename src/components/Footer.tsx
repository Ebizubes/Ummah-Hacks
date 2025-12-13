import { Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react'
import { siteConfig } from '@/siteConfig'
import { motion } from 'framer-motion'

export function Footer() {
  const socialLinks = [
    { icon: Twitter, href: siteConfig.socials.twitter, label: 'Twitter' },
    { icon: Instagram, href: siteConfig.socials.instagram, label: 'Instagram' },
    { icon: Linkedin, href: siteConfig.socials.linkedin, label: 'LinkedIn' },
  ]

  return (
    <footer id="contact" className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">{siteConfig.eventName}</h3>
            <p className="text-muted-foreground">
              Building for community impact, entrepreneurship, and social good.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-foreground transition-colors">
                  Tracks
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-foreground transition-colors">
                  Schedule
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#code-of-conduct" className="hover:text-foreground transition-colors">
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{siteConfig.location}</span>
              </li>
              <li>
                <a 
                  href={siteConfig.lumaLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors text-[hsl(43,96%,56%)] hover:underline"
                >
                  Register on Luma →
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-background hover:bg-accent transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} {siteConfig.eventName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

