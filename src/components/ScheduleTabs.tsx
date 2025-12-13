import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent } from './ui/card'
import { Circle, UtensilsCrossed, GraduationCap, Rocket } from 'lucide-react'

interface ScheduleItem {
  day: string
  time: string
  title: string
  description: string
  type: 'prayer' | 'meal' | 'main' | 'workshop'
}

interface ScheduleTabsProps {
  day1: ScheduleItem[]
  day2: ScheduleItem[]
}

export function ScheduleTabs({ day1, day2 }: ScheduleTabsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'prayer':
        return Circle
      case 'meal':
        return UtensilsCrossed
      case 'workshop':
        return GraduationCap
      default:
        return Rocket
    }
  }

  const ScheduleList = ({ items }: { items: ScheduleItem[] }) => (
    <div className="space-y-4 mt-6">
      {items.map((item, index) => {
        const IconComponent = getIcon(item.type)
        const isPrayer = item.type === 'prayer'
        const isFinal = index === items.length - 1 && item.title.includes('Closing Ceremony')

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card
              className={`
                ${isPrayer ? 'bg-muted/50 border-primary/20' : ''}
                ${isFinal ? 'border-primary border-2' : ''}
              `}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`flex items-center gap-2 min-w-[110px] ${isPrayer ? 'text-primary' : 'text-muted-foreground'}`}>
                    <IconComponent className={`h-4 w-4 ${isPrayer ? 'text-primary' : ''}`} />
                    <span className="font-semibold text-sm">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1 ${isPrayer ? 'text-primary' : ''} ${isFinal ? 'text-primary text-lg' : ''}`}>
                      {item.title}
                      {isFinal && <span className="ml-2 text-sm font-normal text-muted-foreground">(36 hours complete)</span>}
                    </h4>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <Tabs defaultValue="day1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="day1">Day 1</TabsTrigger>
        <TabsTrigger value="day2">Day 2</TabsTrigger>
      </TabsList>
      <TabsContent value="day1">
        <ScheduleList items={day1} />
      </TabsContent>
      <TabsContent value="day2">
        <ScheduleList items={day2} />
      </TabsContent>
    </Tabs>
  )
}

