interface SecretMessageProps {
  show: boolean
  onClose: () => void
}

export function SecretMessage({ show, onClose }: SecretMessageProps) {
  if (!show) return null

  return (
    <div 
      className="fixed top-16 sm:top-20 md:top-24 right-2 sm:right-4 z-50 max-w-[calc(100vw-1rem)]"
      style={{ animation: 'slideInFromTopRight 0.5s ease-out' }}
    >
      <div 
        className="relative bg-white shadow-2xl p-3 sm:p-4 md:p-6 max-w-[280px] sm:max-w-xs md:max-w-sm"
        style={{
          border: '3px solid black',
          borderRadius: '20px',
          fontFamily: '"Comic Sans MS", "Comic Sans", cursive, sans-serif',
          boxShadow: '4px 4px 0px 0px black, 8px 8px 0px 0px rgba(0,0,0,0.2)'
        }}
      >
        {/* Classic comic speech bubble tail pointing down-right */}
        <div 
          className="absolute"
          style={{
            bottom: '-12px',
            right: '30px',
            width: '0',
            height: '0',
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: '20px solid black',
            transform: 'rotate(-20deg)'
          }}
        ></div>
        <div 
          className="absolute"
          style={{
            bottom: '-9px',
            right: '30px',
            width: '0',
            height: '0',
            borderLeft: '13px solid transparent',
            borderRight: '13px solid transparent',
            borderTop: '17px solid white',
            transform: 'rotate(-20deg)'
          }}
        ></div>
        
        {/* Message text - classic comic style */}
        <p 
          className="pr-6 m-0 text-xs font-bold leading-relaxed text-black sm:text-sm md:text-base"
          style={{ 
            fontFamily: '"Comic Sans MS", "Comic Sans", cursive, sans-serif',
            color: '#000000',
            textShadow: 'none'
          }}
        >
          You've discovered our secret! Click all icons for the surprise!
        </p>
        
        {/* Close button - touch friendly */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-lg font-bold leading-none text-black bg-transparent border-none cursor-pointer sm:top-2 sm:right-2 active:text-gray-600 sm:text-xl touch-manipulation"
          aria-label="Close message"
          style={{ 
            fontFamily: 'Arial, sans-serif',
            padding: '8px',
            minWidth: '32px',
            minHeight: '32px',
            lineHeight: '1',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}
