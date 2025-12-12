import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import * as LucideIcons from 'lucide-react'

interface TrackCardProps {
  name: string
  icon: string
  description: string
  beginnerFriendly?: boolean
  index: number
}

export function TrackCard({ name, icon, description, beginnerFriendly, index }: TrackCardProps) {
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Code

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:border-primary/50 transition-colors group">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            {beginnerFriendly && (
              <Badge variant="secondary" className="ml-auto">
                Beginner-friendly
              </Badge>
            )}
          </div>
          <CardTitle className="mt-4">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

