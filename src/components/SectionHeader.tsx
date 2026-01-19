import { motion } from 'motion/react'

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
      <h2 className="mb-4 text-4xl font-bold text-center md:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto max-w-2xl text-xl text-center text-muted-foreground">{subtitle}</p>}
    </motion.div>
  )
}

