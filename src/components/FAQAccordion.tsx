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
    <Accordion className="w-full space-y-3 sm:space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-white/20 transition-colors duration-200">
          <AccordionTrigger value={`item-${index}`} className="text-left text-sm sm:text-base md:text-lg font-bold text-white hover:text-[hsl(43,96%,56%)] transition-colors duration-200 px-2 sm:px-4">
            {item.question}
          </AccordionTrigger>
          <AccordionContent value={`item-${index}`} className="text-xs sm:text-sm md:text-base text-white leading-relaxed px-2 sm:px-4">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

