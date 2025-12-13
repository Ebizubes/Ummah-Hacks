import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

interface AccordionContextValue {
  openItems: Set<string>
  toggleItem: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

const Accordion = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set())

  const toggleItem = React.useCallback((value: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        next.add(value)
      }
      return next
    })
  }, [])

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('space-y-2', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    if (!context) throw new Error('AccordionItem must be used within Accordion')
    const isOpen = context.openItems.has(value)

    return (
      <div ref={ref} className={cn('border rounded-lg', className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { value, isOpen } as any)
          }
          return child
        })}
      </div>
    )
  }
)
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  isOpen?: boolean
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, value, isOpen, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    if (!context) throw new Error('AccordionTrigger must be used within Accordion')

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'flex w-full items-center justify-between p-4 text-left font-medium transition-all duration-200 ease-in-out hover:bg-accent [&[data-state=open]>svg]:rotate-180',
          className
        )}
        onClick={() => context.toggleItem(value)}
        {...props}
      >
        {children}
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out', isOpen && 'rotate-180')} />
      </button>
    )
  }
)
AccordionTrigger.displayName = 'AccordionTrigger'

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  isOpen?: boolean
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, value, isOpen, children, ...props }, ref) => {
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [height, setHeight] = React.useState<number>(0)

    React.useEffect(() => {
      if (contentRef.current) {
        if (isOpen) {
          const scrollHeight = contentRef.current.scrollHeight
          setHeight(scrollHeight)
        } else {
          setHeight(0)
        }
      }
    }, [isOpen, children])

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden text-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          maxHeight: `${height}px`,
          transition: 'max-height 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms ease-in-out',
        }}
        {...props}
      >
        <div ref={contentRef} className={cn('p-4 pt-0', className)}>{children}</div>
      </div>
    )
  }
)
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

