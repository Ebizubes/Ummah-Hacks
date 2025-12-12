import { motion } from 'framer-motion'
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
    <Accordion className="w-full max-w-3xl mx-auto">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger value={`item-${index}`}>{item.question}</AccordionTrigger>
            <AccordionContent value={`item-${index}`}>{item.answer}</AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  )
}

