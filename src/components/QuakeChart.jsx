import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

function QuakeChart({ earthquakes }) {
  const chartData = useMemo(() => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const monthlyCounts = months.map((month) => ({ name: month, count: 0 }))

    earthquakes.forEach((quake) => {
      if (!quake.time) return

      const monthIndex = new Date(quake.time).getMonth()
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyCounts[monthIndex].count += 1
      }
    })

    return monthlyCounts
  }, [earthquakes])

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-sm mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">Quakes by Month (2026)</h3>
        <p className="text-sm text-stone-400">
          Monthly breakdown of seismic event distributions
        </p>
      </div>

      <div className="h-80 w-full min-h-80">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#a8a29e"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#a8a29e"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1c1917',
                borderColor: '#2e2a24',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#a8a29e', fontWeight: 'bold' }}
              itemStyle={{ color: '#10b981' }}
              cursor={{ fill: '#262626', opacity: 0.4 }}
            />
            <Bar
              dataKey="count"
              fill="#52b788"
              radius={[4, 4, 0, 0]}
              name="Earthquakes"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default QuakeChart
