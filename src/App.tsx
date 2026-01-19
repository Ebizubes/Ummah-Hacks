import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { CrescentMoonHero } from './components/CrescentMoonHero'
import { Footer } from './components/Footer'
import { siteConfig } from './siteConfig'
import { SecretMessage } from './components/SecretMessage'
import { DecorativeSeparator } from './components/DecorativeSeparator'
import { AboutSection } from './components/AboutSection'
import { TracksSection } from './components/TracksSection'
import { ScheduleSection } from './components/ScheduleSection'
import { SpeakersSection } from './components/SpeakersSection'
import { SponsorsSection } from './components/SponsorsSection'
import { FAQSection } from './components/FAQSection'
import { CTASection } from './components/CTASection'

function App() {
  const [clickedIcons, setClickedIcons] = useState<Set<string>>(new Set())
  const [showSecretMessage, setShowSecretMessage] = useState(false)

  const handleIconClick = (iconId: string) => {
    const newClicked = new Set(clickedIcons)
    newClicked.add(iconId)
    setClickedIcons(newClicked)
    
    // Show secret message when first icon is clicked
    if (newClicked.size === 1) {
      setShowSecretMessage(true)
    }
    
    // Check if all 4 icons are clicked
    if (newClicked.size === 4) {
      setShowSecretMessage(false)
      // Small delay for visual feedback, then redirect
      setTimeout(() => {
        window.open(siteConfig.socials.instagram, '_blank')
      }, 500)
    }
  }

  return (
    <div className="min-h-screen text-white bg-navy">
      <Navbar />

      <SecretMessage 
        show={showSecretMessage} 
        onClose={() => setShowSecretMessage(false)} 
      />

      <CrescentMoonHero />

      <DecorativeSeparator
        iconSrc="/give_me_a_pixelated_laptop_icon__make_it_gold_and_black-removebg-preview.png"
        iconAlt="Laptop Icon"
        iconId="laptop"
        position="left"
        rotation="rotate(-20deg)"
        onClick={handleIconClick}
        isClicked={clickedIcons.has('laptop')}
      />

      <AboutSection />

      <DecorativeSeparator
        iconSrc="/now_give_me_a_pixelated_controller_that_is_black_and_gold-removebg-preview.png"
        iconAlt="Controller Icon"
        iconId="controller"
        position="right"
        rotation="rotate(20deg)"
        onClick={handleIconClick}
        isClicked={clickedIcons.has('controller')}
      />

      <TracksSection />

      <DecorativeSeparator
        iconSrc="/ChatGPT_Image_Jan_9__2026__12_46_33_AM-removebg-preview.png"
        iconAlt="Icon"
        iconId="chatgpt"
        position="left"
        rotation="rotate(18deg)"
        onClick={handleIconClick}
        isClicked={clickedIcons.has('chatgpt')}
      />

      <ScheduleSection />

      <DecorativeSeparator
        iconSrc="/4840046.png"
        iconAlt="Icon"
        iconId="4840046"
        position="right"
        rotation="rotate(22deg)"
        onClick={handleIconClick}
        isClicked={clickedIcons.has('4840046')}
      />

      <SpeakersSection />

      <div className="w-full h-px bg-gradient-to-r from-transparent to-transparent via-gold/50"></div>

      <SponsorsSection />

      <FAQSection />

      <div className="w-full h-px bg-gradient-to-r from-transparent to-transparent via-gold/50"></div>

      <CTASection />

      <Footer />
    </div>
  )
}

export default App
