import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { MOCK_TREND_DATA } from '../data/aqi-levels'

function TrendChart() {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-sm mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">
          7-Day PM2.5 Concentration Trends
        </h3>
        <p className="text-sm text-stone-400">
          Comparative regional rolling timeline analysis (µg/m³)
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={MOCK_TREND_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorKtm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorLumbini" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
              vertical={false}
            />

            <XAxis
              dataKey="day"
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
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg, #1c1917)',
                borderColor: '#2e2a24',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#a8a29e', fontWeight: 'bold' }}
            />

            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px' }}
            />

            <Area
              type="monotone"
              dataKey="Kathmandu"
              stroke="#f43f5e"
              fillOpacity={1}
              fill="url(#colorKtm)"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="Lumbini"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorLumbini)"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="Pokhara"
              stroke="#10b981"
              fillOpacity={0}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TrendChart
