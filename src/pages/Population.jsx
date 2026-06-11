import { useMemo } from 'react'
import { usePopulation } from '../hooks/usePopulation'
import StatCard from '../shared/StatCard'
import ProvinceChart from '../components/ProvinceChart'

function Population() {
  const { data, totalNationalPopulation, averageLiteracyRate, isLoading } =
    usePopulation()

  const peakProvince = useMemo(() => {
    if (data.length === 0) return null
    return data.reduce(
      (max, item) => (item.population > max.population ? item : max),
      data[0]
    )
  }, [data])

  if (isLoading) {
    return (
      <div className="text-stone-400 animate-pulse text-center py-12">
        Compiling census records...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Total National Population"
          value={totalNationalPopulation.toLocaleString('en-IN')}
          subtext="Official modern census baseline metrics"
        />
        <StatCard
          label="Avg National Literacy"
          value={`${averageLiteracyRate}%`}
          subtext="Mean baseline score calculated across provinces"
          subtextColor="text-teal-400"
        />
        <StatCard
          label="Highest Density Region"
          value={peakProvince ? peakProvince.province.split(' ')[0] : 'N/A'}
          subtext={
            peakProvince
              ? `${peakProvince.percentage}% of total country footprint`
              : ''
          }
          subtextColor="text-amber-500"
        />
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white">
            Provincial Breakdown & Literacy Ratios
          </h3>
          <p className="text-sm text-stone-400">
            Comparative demographic metrics across the seven administrative
            provinces
          </p>
        </div>

        <div className="space-y-6">
          {data.map((item) => (
            <div key={item.province} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-stone-200">
                    {item.province}
                  </span>
                  <span className="text-xs bg-stone-800 px-2 py-0.5 rounded text-stone-400 font-mono">
                    Lit: {item.literacy}%
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-stone-400">
                  <span className="text-white font-bold">
                    {item.population.toLocaleString('en-IN')}
                  </span>{' '}
                  ({item.percentage}%)
                </div>
              </div>

              <div className="w-full h-2.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800/60">
                <div
                  className="h-full bg-linear-to-r from-emerald-600 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage * 4}%` }} // Proportional scale for visualization impact
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 ">
        <ProvinceChart />
      </div>
    </div>
  )
}

export default Population
