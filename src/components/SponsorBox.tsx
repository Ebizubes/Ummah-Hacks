import CardFlip from './CardFlip'

interface SponsorBoxProps {
  name: string
  logo: string
  tier: 'tier1' | 'tier2' | 'tier3'
  url?: string
  className?: string
  description?: string
  founders?: string
}

export function SponsorBox({ name, logo, tier, url, className = '', description, founders }: SponsorBoxProps) {
  const isTier1 = tier === 'tier1'
  const isTier2 = tier === 'tier2'
  
  // Tier-specific border styling
  const borderClass = isTier1 
    ? 'border-2 border-gold' // Tier 1: Thickest border
    : isTier2 
    ? 'border-2 border-gold/60' // Tier 2: Medium border
    : 'border border-gold/40' // Tier 3: Thinner border
  
  // Tier-specific background styling
  const backgroundClass = isTier1 
    ? 'bg-gradient-to-br from-white/12 to-white/7 backdrop-blur-sm' // Tier 1: Brightest background
    : isTier2 
    ? 'bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-sm' // Tier 2: Medium background
    : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm' // Tier 3: Lighter background
  
  // Tier-specific height adjustments - larger on mobile to prevent text overflow
  const heightClass = isTier1 
    ? 'h-[420px] w-[320px] sm:h-[400px] sm:w-[320px]' 
    : 'h-[400px] w-[320px] sm:h-[360px] sm:w-[300px]'
  
  // Additional tier-specific styling
  const tierStyles = isTier1 
    ? 'shadow-2xl' // Tier 1: Strongest shadow
    : isTier2 
    ? 'shadow-xl' // Tier 2: Medium shadow
    : 'shadow-lg' // Tier 3: Lighter shadow
  
  // Subtitle color based on tier
  const subtitleColorClass = isTier1 
    ? 'text-gold' // Gold for tier 1
    : isTier2 
    ? 'text-slate-300' // Silver for tier 2
    : 'text-amber-500' // Bronze for tier 3

  // Default description based on tier if not provided
  const sponsorDescription = description || 
    (isTier1 ? 'Our gold sponsor supporting this event.' :
     isTier2 ? 'A valued sponsor contributing to this event.' :
     'A sponsor supporting this event.')

  // Features can show tier information
  const features = isTier1 
    ? ['Gold Sponsor', 'Gold Tier', 'Major Supporter']
    : isTier2
    ? ['Silver Tier', 'Valued Partner']
    : ['Bronze Tier', 'Community Supporter']

  return (
    <CardFlip
      title={name}
      subtitle={isTier1 ? 'Gold Sponsor' : isTier2 ? 'Silver Sponsor' : 'Bronze Sponsor'}
      description={sponsorDescription}
      founders={founders}
      features={features}
      logo={logo}
      logoAlt={name}
      url={url}
      className={`${tierStyles} ${heightClass} ${className}`}
      borderClassName={borderClass}
      backgroundClassName={backgroundClass}
      subtitleClassName={subtitleColorClass}
    />
  )
}
