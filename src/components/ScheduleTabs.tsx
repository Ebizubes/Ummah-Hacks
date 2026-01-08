
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
  const ScheduleList = ({ items, dayLabel }: { items: ScheduleItem[], dayLabel: string }) => (
    <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6 w-full text-left">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">{dayLabel}:</h2>
      <div className="text-white space-y-2 sm:space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-x-1 gap-y-1 pb-2 sm:pb-0 border-b border-white/10 sm:border-0 last:border-0">
            <span className="font-bold text-base sm:text-lg md:text-xl min-w-[100px] sm:min-w-[120px]">{item.time}</span>
            <span className="text-base sm:text-lg md:text-xl hidden sm:inline min-w-[20px]"> → </span>
            <span className="text-base sm:text-lg flex-1">{item.title}</span>
            {item.description && (
              <span className="text-white/70 text-xs sm:text-sm sm:ml-2">({item.description})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6 sm:space-y-8 flex flex-col items-start w-full max-w-2xl">
      <ScheduleList items={day1} dayLabel="Saturday, January 24" />
      <div className="pt-6 sm:pt-8 w-full">
        <ScheduleList items={day2} dayLabel="Sunday, January 25" />
      </div>
    </div>
  )
}

