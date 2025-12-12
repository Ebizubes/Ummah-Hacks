import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent } from './ui/card'
import { Clock } from 'lucide-react'

interface ScheduleItem {
  time: string
  event: string
}

interface ScheduleTabsProps {
  day1: ScheduleItem[]
  day2: ScheduleItem[]
}

export function ScheduleTabs({ day1, day2 }: ScheduleTabsProps) {
  const ScheduleList = ({ items }: { items: ScheduleItem[] }) => (
    <div className="space-y-4 mt-6">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex items-center gap-2 text-primary min-w-[100px]">
                <Clock className="h-4 w-4" />
                <span className="font-semibold">{item.time}</span>
              </div>
              <div className="flex-1">{item.event}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
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

