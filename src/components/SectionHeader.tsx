import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">{title}</h2>
      {subtitle && <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}

