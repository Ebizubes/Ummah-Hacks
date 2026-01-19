import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import * as LucideIcons from 'lucide-react'

interface HackathonTrackCardProps {
  title: string
  purpose?: string
  challenge: string
  icon: string
  index: number
}

export function HackathonTrackCard({ title, purpose, challenge, icon, index }: HackathonTrackCardProps) {
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Code

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full hover:border-[hsl(43,96%,56%)]/50 transition-all group">
        <CardHeader>
          <div className="p-3 rounded-lg bg-[hsl(43,96%,56%)]/10 group-hover:bg-[hsl(43,96%,56%)]/20 transition-colors w-fit mb-4 border border-[hsl(43,96%,56%)]/20">
            <IconComponent className="h-6 w-6 text-[hsl(43,96%,56%)]" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {purpose && (
            <div>
              <h4 className="mb-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground">Purpose</h4>
              <p className="text-base">{purpose}</p>
            </div>
          )}
          <div>
            <h4 className="mb-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground">Challenge</h4>
            <p className="text-base">{challenge}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

