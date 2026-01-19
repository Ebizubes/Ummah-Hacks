interface DecorativeSeparatorProps {
  iconSrc: string
  iconAlt: string
  iconId: string
  position: 'left' | 'right'
  rotation: string
  onClick: (iconId: string) => void
  isClicked: boolean
}

export function DecorativeSeparator({
  iconSrc,
  iconAlt,
  iconId,
  position,
  rotation,
  onClick,
  isClicked
}: DecorativeSeparatorProps) {
  const positionClasses = position === 'left' 
    ? '-left-6 sm:-left-8 md:-left-10 lg:-left-14'
    : '-right-6 sm:-right-8 md:-right-10 lg:-right-14'

  const translateY = position === 'left' && iconId === 'chatgpt' ? 'translate-y-full' : 'translate-y-1/2'

  return (
    <div className="overflow-visible relative w-full h-px bg-gradient-to-r from-transparent to-transparent via-gold/50">
      <div 
        className={`absolute bottom-0 z-20 cursor-pointer ${positionClasses} ${translateY} touch-manipulation`}
        style={{ transform: `${translateY === 'translate-y-full' ? 'translateY(100%)' : 'translateY(50%)'} ${rotation}` }}
      >
        <img 
          src={iconSrc}
          alt={iconAlt}
          onClick={() => onClick(iconId)}
          onTouchStart={(e) => {
            e.currentTarget.style.opacity = '0.8'
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.opacity = ''
            onClick(iconId)
          }}
          className={`h-32 sm:h-40 md:h-56 lg:h-72 xl:h-80 w-auto transition-all duration-300 ${
            isClicked 
              ? 'opacity-100 filter brightness-125 scale-110' 
              : 'opacity-50 active:opacity-80 active:scale-105'
          }`}
        />
      </div>
    </div>
  )
}
