import { FadedStarsBackground } from './FadedStarsBackground'
import { siteConfig } from '../siteConfig'
import { Marquee } from './ui/Marquee'
import { cn } from '@/lib/utils'

const SpeakerCard = ({
  avatar,
  name,
  role,
  occupation,
  linkedin,
}: {
  avatar: string
  name: string
  role: string
  occupation: string
  linkedin: string
}) => {
  return (
    <a href={linkedin} target="_blank" rel="noopener noreferrer">
    <div
      className={cn(
        "overflow-hidden relative p-6 w-64 h-full text-center rounded-xl border transition-all duration-300 cursor-pointer",
        "bg-gradient-to-br backdrop-blur-sm from-white/10 to-white/5 border-gold/30",
        "hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 hover:border-gold/50"
      )}
    >
      <div className="flex justify-center mb-4">
        <div className="overflow-hidden relative rounded-full">
          <div className="absolute inset-0 rounded-full blur-xl transition-all bg-white/10"></div>
          <img 
            src={avatar} 
            alt={name}
            className="object-cover object-center relative w-24 h-24 rounded-full border-4 shadow-xl transition-all sm:w-28 sm:h-28 border-gold/40"
            loading="lazy"
            onError={() => {
              console.error('Failed to load image:', avatar);
              console.error('Speaker:', name);
            }}
          />
        </div>
      </div>
      <h3 className="mb-1 text-lg font-bold text-white font-display sm:text-xl md:text-2xl sm:mb-2">
        {name}
      </h3>
      <p className="font-sans text-sm sm:text-base text-white/90">{role}</p>
      <p className="mt-2 font-sans text-sm sm:text-base text-white/90">{occupation}</p>
    </div>
    </a>
  )
}

export function SpeakersSection() {
  return (
    <section id="speakers" className="overflow-hidden relative py-12 bg-gradient-to-b sm:py-16 md:py-20 from-navy-dark via-navy-light to-navy">
      <FadedStarsBackground />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent"></div>
      <div className="container relative z-10 px-4 mx-auto sm:px-6">
        <div className="mx-auto space-y-8 max-w-7xl md:space-y-12">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white font-heading sm:text-5xl md:text-6xl">
              Speakers & Judges
            </h1>
            <p className="mb-6 font-sans text-base md:text-lg text-white/80">
              Learn from industry leaders and get feedback from expert judges
            </p>
            <div className="mx-auto w-24 h-1 bg-white/30"></div>
          </div>

          {/* Marquee */}
          <div className="flex overflow-hidden relative flex-col justify-center items-center w-full">
            <Marquee>
              {siteConfig.speakers.map((speaker) => (
                <SpeakerCard 
                  key={speaker.name} 
                  avatar={speaker.avatar}
                  name={speaker.name}
                  role={speaker.role}
                  occupation={speaker.occupation}
                  linkedin={speaker.linkedin}
                  />
              ))}
            </Marquee>
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r via-transparent to-transparent pointer-events-none from-navy"></div>
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l via-transparent to-transparent pointer-events-none from-navy"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
