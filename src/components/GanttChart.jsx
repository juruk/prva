import { useMemo } from 'react'

const GanttChart = ({ phases, contractors }) => {
  const chartData = useMemo(() => {
    if (!phases || phases.length === 0) return null

    // Find min and max dates
    let minDate = new Date(phases[0].startDate)
    let maxDate = new Date(phases[0].endDate)

    phases.forEach(phase => {
      const start = new Date(phase.startDate)
      const end = new Date(phase.endDate)
      if (start < minDate) minDate = start
      if (end > maxDate) maxDate = end
    })

    // Add padding
    minDate.setDate(minDate.getDate() - 7)
    maxDate.setDate(maxDate.getDate() + 7)

    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24))

    return {
      minDate,
      maxDate,
      totalDays,
      phases: phases.map(phase => {
        const start = new Date(phase.startDate)
        const end = new Date(phase.endDate)
        const startOffset = Math.ceil((start - minDate) / (1000 * 60 * 60 * 24))
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        
        return {
          ...phase,
          startOffset,
          duration,
          startPercent: (startOffset / totalDays) * 100,
          widthPercent: (duration / totalDays) * 100
        }
      })
    }
  }, [phases])

  if (!chartData) return null

  const { minDate, maxDate, totalDays, phases: chartPhases } = chartData

  // Generate month markers with better positioning
  const months = []
  const current = new Date(minDate)
  current.setDate(1) // Start from first day of month
  
  while (current <= maxDate) {
    const monthStart = new Date(current)
    const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0)
    
    const startOffset = Math.max(0, Math.ceil((monthStart - minDate) / (1000 * 60 * 60 * 24)))
    const endOffset = Math.min(totalDays, Math.ceil((monthEnd - minDate) / (1000 * 60 * 60 * 24)))
    
    const startPercent = (startOffset / totalDays) * 100
    const widthPercent = ((endOffset - startOffset) / totalDays) * 100
    
    if (widthPercent > 0) {
      months.push({
        label: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        year: monthStart.getFullYear(),
        startPercent,
        widthPercent
      })
    }
    
    current.setMonth(current.getMonth() + 1)
  }

  // Generate week markers
  const weeks = []
  const weekStart = new Date(minDate)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Start from Sunday
  
  while (weekStart <= maxDate) {
    const offset = Math.ceil((weekStart - minDate) / (1000 * 60 * 60 * 24))
    const percent = (offset / totalDays) * 100
    
    if (percent >= 0 && percent <= 100) {
      weeks.push({
        date: new Date(weekStart),
        percent
      })
    }
    
    weekStart.setDate(weekStart.getDate() + 7)
  }

  // Check if today is within range
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayOffset = Math.ceil((today - minDate) / (1000 * 60 * 60 * 24))
  const todayPercent = (todayOffset / totalDays) * 100
  const showToday = todayPercent >= 0 && todayPercent <= 100

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-yellow-500',
    'bg-red-500'
  ]

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border">
      {/* Timeline header with months */}
      <div className="relative h-16 border-b-2 border-gray-300">
        {/* Month labels */}
        <div className="flex h-8 border-b">
          {months.map((month, idx) => (
            <div
              key={idx}
              className="border-r border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700"
              style={{
                marginLeft: idx === 0 ? `${month.startPercent}%` : '0',
                width: `${month.widthPercent}%`
              }}
            >
              {month.label} {month.year}
            </div>
          ))}
        </div>
        
        {/* Week markers */}
        <div className="relative h-8">
          {weeks.map((week, idx) => (
            <div
              key={idx}
              className="absolute h-full border-l border-gray-200"
              style={{ left: `${week.percent}%` }}
            >
              <span className="text-[10px] text-gray-500 ml-1">
                {week.date.getDate()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gantt bars with grid */}
      <div className="relative">
        {/* Vertical grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          {weeks.map((week, idx) => (
            <div
              key={idx}
              className="absolute top-0 bottom-0 border-l border-gray-100"
              style={{ left: `${week.percent}%` }}
            />
          ))}
          
          {/* Today indicator */}
          {showToday && (
            <div
              className="absolute top-0 bottom-0 border-l-2 border-red-500 z-10"
              style={{ left: `${todayPercent}%` }}
            >
              <div className="absolute -top-6 left-0 transform -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                Today
              </div>
            </div>
          )}
        </div>

        {/* Phase bars */}
        <div className="space-y-4 relative">
          {chartPhases.map((phase, idx) => (
            <div key={idx} className="relative">
              <div className="text-sm font-medium mb-2 truncate">{phase.name}</div>
              <div className="relative h-12 bg-gray-50 rounded border border-gray-200">
                <div
                  className={`absolute h-full ${colors[idx % colors.length]} rounded flex items-center px-3 text-white text-xs font-medium transition-all hover:opacity-90 hover:shadow-lg cursor-pointer`}
                  style={{
                    left: `${phase.startPercent}%`,
                    width: `${phase.widthPercent}%`
                  }}
                  title={`${phase.name}\n${new Date(phase.startDate).toLocaleDateString()} - ${new Date(phase.endDate).toLocaleDateString()}\nDuration: ${phase.duration} days${phase.contractor ? `\nContractor: ${phase.contractor}` : ''}`}
                >
                  <span className="truncate">
                    {phase.duration} days
                    {phase.contractor && ` • ${phase.contractor}`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>{new Date(phase.startDate).toLocaleDateString()}</span>
                <span>{new Date(phase.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-4 border-t flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-700">
            Timeline: {minDate.toLocaleDateString()} - {maxDate.toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-500">
            Total duration: {totalDays} days ({Math.ceil(totalDays / 7)} weeks)
          </p>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-l-2 border-red-500"></div>
            <span className="text-gray-600">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-l border-gray-200"></div>
            <span className="text-gray-600">Week marker</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GanttChart

