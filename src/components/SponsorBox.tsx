import { motion } from 'framer-motion'

interface SponsorBoxProps {
  name: string
  logo: string
  tier: 'tier1' | 'tier2' | 'tier3'
  url?: string
  className?: string
}

export function SponsorBox({ name, logo, tier, url, className = '' }: SponsorBoxProps) {
  

  const isTier1 = tier === 'tier1'
  const isTier2 = tier === 'tier2'
  
  // Tier-specific styling
  const tierStyles = isTier1 
    ? 'border-2 border-gold shadow-2xl from-white/12 to-white/7 bg-gradient-to-br hover:scale-110' // Tier 1: Thickest border, strongest shadow
    : isTier2 
    ? 'border-2 border-gold/60 shadow-xl from-white/15 to-white/10 bg-gradient-to-br hover:scale-105' // Tier 2: Medium border, medium shadow, brighter background
    : 'border border-gold/40 shadow-lg from-white/10 to-white/5 bg-gradient-to-br hover:scale-105' // Tier 3: Thinner border, lighter shadow
  
  const boxClasses = `
    relative ${tierStyles} backdrop-blur-sm transition-all duration-300
    hover:shadow-2xl
    ${url ? 'cursor-pointer' : ''}
    ${isTier1 ? 'p-8 sm:p-10 md:p-12' : isTier2 ? 'p-6 sm:p-8 md:p-10' : 'p-4 sm:p-6 md:p-8'}
    ${className}
  `

  return (
    <div
    className={boxClasses} 
    
    >
      
      
      {/* Logo container */}
      <div className={`flex items-center justify-center ${isTier1 ? 'h-36 sm:h-44 md:h-52' : isTier2 ? 'h-28 sm:h-36 md:h-40' : 'h-20 sm:h-24 md:h-28'}`}>
        <img
          src={logo}
          alt={name}
          className="object-contain max-w-full max-h-full"
          loading="lazy"
          onError={(e) => {
            console.error('Failed to load sponsor logo:', logo)
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
      </div>

      {/* Optional: Sponsor name text (hidden by default, can be shown if needed) */}
      {/* <p className="mt-2 text-xs font-semibold text-center text-white sm:text-sm">{name}</p> */}
    </div>
  )
}
