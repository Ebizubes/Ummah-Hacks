

import { ArrowRight, Repeat2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  logo?: string;
  logoAlt?: string;
  url?: string;
  className?: string;
  customFrontContent?: React.ReactNode;
  borderClassName?: string;
  backgroundClassName?: string;
}

export default function CardFlip({
  title = "Design Systems",
  subtitle = "Explore the fundamentals",
  description = "Dive deep into the world of modern UI/UX design.",
  features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
  logo,
  logoAlt,
  url,
  className = "",
  customFrontContent,
  borderClassName,
  backgroundClassName,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardContent = (
    <div
      className={cn("relative w-full group h-[320px] max-w-[280px] [perspective:2000px]", className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative w-full h-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-500",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
        style={{ willChange: 'transform' }}
      >
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden ",
            borderClassName || "border border-zinc-200 dark:border-zinc-800/50",
            "shadow-xs dark:shadow-lg",
            "transition-all duration-500",
            "group-hover:shadow-lg dark:group-hover:shadow-xl",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
          style={{ willChange: 'transform, opacity' }}
        >
          <div className={cn(
            "overflow-hidden relative h-full",
            backgroundClassName || "bg-gradient-to-b to-white from-zinc-100 dark:from-zinc-900 dark:to-black"
          )}>
            {logo ? (
              <div className="flex absolute inset-0 justify-center items-start p-6 pt-8">
                <img
                  src={logo}
                  alt={logoAlt || title}
                  className="object-contain max-w-full max-h-full"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Failed to load logo:', logo)
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
            ) : customFrontContent ? (
              <div className="flex absolute inset-0 justify-center items-start p-6 pt-8">
                {customFrontContent}
              </div>
            ) : (
              <div className="flex absolute inset-0 justify-center items-start pt-24">
                <div className="relative flex h-[100px] w-[200px] items-center justify-center">
                  {[...Array(10)].map((_, i) => (
                    <div
                      className={cn(
                        "absolute h-[50px] w-[50px]",
                        "rounded-[140px]",
                        "animate-[scale_3s_linear_infinite]",
                        "opacity-0",
                        "shadow-[0_0_50px_rgba(0,0,0,0.1)]",
                        "group-hover:animate-[scale_2s_linear_infinite]"
                      )}
                      key={i}
                      style={{
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {(title || subtitle) && (
            <div className="absolute right-0 bottom-0 left-0 p-5">
              <div className="flex gap-3 justify-between items-center">
                <div className="space-y-1.5">
                  {title && (
                    <h3 className="font-semibold text-lg text-white leading-snug tracking-tighter transition-all duration-500 ease-out-expo group-hover:translate-y-[-4px]">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="line-clamp-2 text-sm text-white/80 tracking-tight transition-all delay-[50ms] duration-500 ease-out-expo group-hover:translate-y-[-4px]">
                      {subtitle}
                    </p>
                  )}
                </div>
                <div className="relative group/icon">
                  <div
                    className={cn(
                      "absolute rounded-lg transition-opacity duration-300 inset-[-8px]",
                      "bg-gradient-to-br to-transparent from-white/20 via-white/10"
                    )}
                  />
                  <Repeat2 className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/icon:-rotate-12 text-white/70 group-hover/icon:scale-110" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "p-6 rounded-2xl",
            borderClassName || "border border-zinc-200 dark:border-zinc-800",
            "shadow-xs dark:shadow-lg",
            "flex flex-col",
            "transition-all duration-500",
            "group-hover:shadow-lg dark:group-hover:shadow-xl",
            isFlipped ? "opacity-100" : "opacity-0"
          )}
          style={{ willChange: 'transform, opacity' }}
        >
          <div className={cn(
            "absolute inset-0 rounded-2xl",
            backgroundClassName || "bg-gradient-to-b to-white from-zinc-100 dark:from-zinc-900 dark:to-black"
          )} />
          <div className="flex relative z-10 flex-col h-full">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-white leading-snug tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm text-white/80 tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px]">
                  {description}
                </p>
              </div>

              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    className="flex gap-2 items-center text-sm transition-all duration-500 text-white/90"
                    key={feature}
                    style={{
                      transform: isFlipped
                        ? "translateX(0)"
                        : "translateX(-10px)",
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <ArrowRight className="w-3 h-3 text-white/70" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {url && (
              <div className="pt-6 mt-6 border-t border-white/20">
                <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group/start relative block",
                  "flex items-center justify-between",
                  "-m-3 rounded-xl p-3",
                  "transition-all duration-300",
                  "bg-white/10 backdrop-blur-[2px]",
                  "hover:bg-white/20",
                  "hover:scale-[1.02] cursor-pointer"
                )}
                style={{ willChange: 'transform' }}
              >
                <span className="text-sm font-medium text-white transition-colors duration-300 group-hover/start:text-white/90">
                  Visit website
                </span>
                <div className="relative group/icon">
                  <div
                    className={cn(
                      "absolute rounded-lg transition-all duration-300 inset-[-6px]",
                      "bg-gradient-to-br to-transparent from-white/20 via-white/10",
                      "opacity-0 scale-90 group-hover/start:scale-100 group-hover/start:opacity-100"
                    )}
                  />
                  <ArrowRight className="relative z-10 h-4 w-4 text-white/70 transition-all duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110" />
                </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
                @keyframes scale {
                    0% {
                        transform: scale(2);
                        opacity: 0;
                        box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
                    }
                    50% {
                        transform: translate(0px, -5px) scale(1);
                        opacity: 1;
                        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
                    }
                    100% {
                        transform: translate(0px, 5px) scale(0.1);
                        opacity: 0;
                        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0);
                    }
                }
            `}</style>
    </div>
  );

  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
      {cardContent}
    </a>
  ) : (
    cardContent
  );
}
