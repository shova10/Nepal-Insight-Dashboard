import { useEffect, useRef, useState } from 'react'
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
  const containerRef = useRef(null)
  const [width, setWidth] = useState(600)

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    )
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const isNarrow = width < 400
  const isMid = width < 560

  const sortedData = [...POPULATION_DATA].sort(
    (a, b) => b.population - a.population
  )

  const formatX = (v) => {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`
    return v.toLocaleString()
  }

  const formatY = (value) => {
    if (isNarrow) return value.replace('Province', 'P.').split(' ')[0]
    if (isMid) return value.split(' ')[0]
    return value.length > 18 ? value.slice(0, 16) + '…' : value
  }

  return (
    <div
      ref={containerRef}
      className="bg-stone-900 border border-stone-800 rounded-xl p-4 sm:p-6 shadow-sm mt-6"
    >
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-bold text-white">
          Population by Province
        </h3>
        <p className="text-xs sm:text-sm text-stone-400">
          Census population density by province
        </p>
      </div>

      <div
        className="w-full"
        style={{ height: isNarrow ? sortedData.length * 36 : 320 }}
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{
              top: 4,
              right: isNarrow ? 8 : 16,
              left: isNarrow ? 16 : isMid ? 24 : 32,
              bottom: 4,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
              horizontal={false}
            />

            <XAxis
              type="number"
              tickFormatter={formatX}
              stroke="#a8a29e"
              fontSize={isNarrow ? 10 : 12}
              tickLine={false}
              axisLine={false}
              tickCount={isNarrow ? 3 : 5}
            />

            <YAxis
              dataKey="province"
              type="category"
              stroke="#a8a29e"
              fontSize={isNarrow ? 10 : 12}
              tickLine={false}
              axisLine={false}
              width={isNarrow ? 52 : isMid ? 68 : 88}
              tickFormatter={formatY}
            />

            <Tooltip
              formatter={(v) => [v.toLocaleString('en-IN'), 'Population']}
              contentStyle={{
                backgroundColor: '#1c1917',
                borderColor: '#2e2a24',
                borderRadius: '8px',
                fontSize: isNarrow ? 11 : 13,
              }}
              labelStyle={{ color: '#a8a29e', fontWeight: 'bold' }}
              itemStyle={{ color: '#f5f5f4' }}
            />

            <Bar
              dataKey="population"
              radius={[0, 4, 4, 0]}
              barSize={isNarrow ? 12 : 16}
            >
              {sortedData.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={
                    entry.province.includes('Bagmati') ||
                    entry.province.includes('Madhesh')
                      ? '#14b8a6'
                      : '#0f766e'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProvinceChart
