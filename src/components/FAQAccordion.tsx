import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion className="w-full space-y-2 sm:space-y-3">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-gold/30 bg-white/5 px-4 sm:px-6 py-3 sm:py-2 transition-all duration-200 active:bg-white/10 hover:bg-white/10">
          <AccordionTrigger value={`item-${index}`} className="text-left font-display text-base sm:text-lg font-semibold text-white active:text-gold hover:text-gold transition-colors duration-200 touch-manipulation min-h-[44px]">
            {item.question}
          </AccordionTrigger>
          <AccordionContent value={`item-${index}`} className="font-serif text-sm sm:text-base text-white/90 leading-relaxed pt-2">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

