import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import POPULATION_DATA from '../data/nepal-population.json'

function ProvinceChart() {
  const sortedData = [...POPULATION_DATA].sort(
    (a, b) => b.population - a.population
  )

  const formatXAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    return value.toLocaleString()
  }

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-sm mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">
          Population Scaling by Province
        </h3>
        <p className="text-sm text-stone-400">
          Horizontal census record density metrics visualization
        </p>
      </div>

      <div className="h-80 w-full min-h-80">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 15, left: 30, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
              horizontal={false}
            />

            <XAxis
              type="number"
              tickFormatter={formatXAxis}
              stroke="#a8a29e"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              dataKey="province"
              type="category"
              stroke="#a8a29e"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.split(' ')[0]}
            />

            <Tooltip
              formatter={(value) => [
                value.toLocaleString('en-IN'),
                'Population',
              ]}
              contentStyle={{
                backgroundColor: '#1c1917',
                borderColor: '#2e2a24',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#a8a29e', fontWeight: 'bold' }}
              itemStyle={{ color: '#f5f5f4' }}
            />

            <Bar dataKey="population" radius={[0, 4, 4, 0]} barSize={16}>
              {sortedData.map((entry, index) => {
                const isPeak =
                  entry.province.includes('Bagmati') ||
                  entry.province.includes('Madhesh')
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isPeak ? '#14b8a6' : '#0f766e'}
                  />
                )
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProvinceChart
