import CardFlip from './CardFlip'

interface SponsorBoxProps {
  name: string
  logo: string
  tier: 'tier1' | 'tier2' | 'tier3'
  url?: string
  className?: string
  description?: string
}

export function SponsorBox({ name, logo, tier, url, className = '', description }: SponsorBoxProps) {
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
  
  // Tier-specific height adjustments
  const heightClass = isTier1 
    ? 'h-[400px] max-w-[320px]' 
    : isTier2 
    ? 'h-[360px] max-w-[300px]' 
    : 'h-[320px] max-w-[280px]'
  
  // Additional tier-specific styling
  const tierStyles = isTier1 
    ? 'shadow-2xl' // Tier 1: Strongest shadow
    : isTier2 
    ? 'shadow-xl' // Tier 2: Medium shadow
    : 'shadow-lg' // Tier 3: Lighter shadow

  // Default description based on tier if not provided
  const sponsorDescription = description || 
    (isTier1 ? 'Our premier sponsor supporting this event.' :
     isTier2 ? 'A valued sponsor contributing to this event.' :
     'A sponsor supporting this event.')

  // Features can show tier information
  const features = isTier1 
    ? ['Premier Sponsor', 'Gold Tier', 'Major Supporter']
    : isTier2
    ? ['Silver Tier', 'Valued Partner']
    : ['Bronze Tier', 'Community Supporter']

  return (
    <CardFlip
      title={name}
      subtitle={isTier1 ? 'Premier Sponsor' : isTier2 ? 'Silver Sponsor' : 'Bronze Sponsor'}
      description={sponsorDescription}
      features={features}
      logo={logo}
      logoAlt={name}
      url={url}
      className={`${tierStyles} ${heightClass} ${className}`}
      borderClassName={borderClass}
      backgroundClassName={backgroundClass}
    />
  )
}
