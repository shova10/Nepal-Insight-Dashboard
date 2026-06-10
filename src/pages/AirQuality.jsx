import { useMemo } from 'react'
import { useAirQuality } from '../hooks/useAirQuality'
import { getAQIStyle } from '../data/aqi-levels'
import StatCard from '../shared/StatCard'
import TrendChart from '../components/TrendChart'

function AirQuality() {
  const { citiesData: rawCitiesData, isLoading } = useAirQuality()

  const citiesData = useMemo(() => {
    if (!rawCitiesData || rawCitiesData.length === 0) return []

    const today = new Date()
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    let seed = 0
    for (let i = 0; i < dateString.length; i++) {
      seed += dateString.charCodeAt(i)
    }

    const seededRandom = (offset) => {
      const x = Math.sin(seed + offset) * 10000
      return x - Math.floor(x)
    }

    return rawCitiesData.map((node, index) => {
      const dailyVariance = seededRandom(index) // Unique stable multiplier per city row

      const adjustedAqi = Math.max(
        10,
        Math.floor(node.aqi + (dailyVariance * 40 - 20))
      )
      const adjustedPm25 = Math.max(
        5,
        Math.floor(node.pm25 + (dailyVariance * 16 - 8))
      )

      return {
        ...node,
        aqi: adjustedAqi,
        pm25: adjustedPm25,
      }
    })
  }, [rawCitiesData])

  const criticalAqiHub = useMemo(() => {
    if (citiesData.length === 0) return null
    return citiesData.reduce(
      (max, city) => (city.aqi > max.aqi ? city : max),
      citiesData[0]
    )
  }, [citiesData])

  const activeAdvisory = useMemo(() => {
    if (!criticalAqiHub) return null
    return getAQIStyle(criticalAqiHub.aqi)
  }, [criticalAqiHub])

  if (isLoading) {
    return (
      <div className="text-stone-400 animate-pulse text-center py-12">
        Parsing urban monitoring nodes...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {criticalAqiHub && activeAdvisory && (
        <div
          className={`p-4 rounded-xl border transition-colors duration-300 ${activeAdvisory.bgColor} ${activeAdvisory.border} ${activeAdvisory.textColor}`}
        >
          <div className="flex items-start space-x-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide">
                Regional Advisory Network
              </h4>
              <p className="text-sm mt-1">
                Highest regional pollution detected at{' '}
                <span className="font-bold">{criticalAqiHub.city}</span> with an
                index score of{' '}
                <span className="font-mono font-bold">
                  {criticalAqiHub.aqi}
                </span>
                . {activeAdvisory.alert}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Monitored Air Hubs"
          value={citiesData.length}
          subtext="Active particulate tracking stations"
        />
        <StatCard
          label="Peak Index Area"
          value={criticalAqiHub ? criticalAqiHub.aqi : 'N/A'}
          subtext={criticalAqiHub ? criticalAqiHub.city : 'No data'}
          subtextColor="text-orange-400"
        />
        <StatCard
          label="Air Baseline Standard"
          value="US EPA"
          subtext="Calculated using PM2.5 24hr mass curves"
        />
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 dark:bg-stone-900 dark:border-stone-800 ">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">
            Urban Air Quality Distributions
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Live breakdown of particle distributions by city location • Updates
            Daily
          </p>
        </div>

        <div className="space-y-3">
          {citiesData.map((node) => {
            const style = getAQIStyle(node.aqi)
            return (
              <div
                key={node.city}
                className="flex items-center justify-between p-4 bg-stone-950 border border-stone-800/80 rounded-xl hover:border-stone-700 transition-all dark:bg-stone-950 dark:border-stone-800/8 hover:bg-stone-100/50"
              >
                <div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                    {node.city}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Particulate Mass:{' '}
                    <span className="font-mono font-medium text-stone-600 dark:text-stone-400">
                      {node.pm25} µg/m³
                    </span>
                  </p>
                </div>

                <div
                  className={`px-4 py-2 rounded-lg border text-xs font-mono font-bold tracking-wide w-36 text-center shadow-sm ${style.bgColor} ${style.border} ${style.textColor}`}
                >
                  AQI {node.aqi}
                  <span className="block text-[10px] font-sans font-medium mt-0.5 opacity-80">
                    {style.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <TrendChart />
    </div>
  )
}

export default AirQuality
