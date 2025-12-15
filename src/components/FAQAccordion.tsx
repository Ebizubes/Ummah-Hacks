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
        <AccordionItem key={index} value={`item-${index}`} className="border-white/20">
          <AccordionTrigger value={`item-${index}`} className="text-left text-base sm:text-lg font-bold text-white hover:text-blue-400 py-3 sm:py-4">
            {item.question}
          </AccordionTrigger>
          <AccordionContent value={`item-${index}`} className="text-white text-sm sm:text-base leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

