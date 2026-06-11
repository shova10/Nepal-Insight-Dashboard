import { useState, useMemo } from 'react'
import { useEarthquakes } from '../hooks/useEarthquakes'
import StatCard from '../shared/StatCard'
import EarthquakeMap from '../components/EarthquakeMap'
import QuakeChart from '../components/QuakeChart'

function Earthquakes() {
  const { quakes, isLoading, error } = useEarthquakes()
  const [minMagnitude, setMinMagnitude] = useState(0)

  const filteredQuakes = useMemo(() => {
    return quakes.filter((q) => q.magnitude >= minMagnitude)
  }, [quakes, minMagnitude])

  const strongestQuake = useMemo(() => {
    if (quakes.length === 0) return { magnitude: 'N/A', place: 'None recorded' }
    return quakes.reduce(
      (max, q) => (q.magnitude > max.magnitude ? q : max),
      quakes[0]
    )
  }, [quakes])

  if (isLoading) {
    return (
      <div className="text-stone-400 animate-pulse text-center py-12">
        Loading streaming seismic grids...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-center">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Earthquakes "
          value={quakes.length}
          subtext="Total captured within regional coordinates"
        />
        <StatCard
          label="Strongest Magnitude"
          value={strongestQuake.magnitude}
          subtext={`${strongestQuake.place} on ${strongestQuake.time || 'recent'}`}
          subtextColor="text-amber-500"
        />
        <StatCard
          label="Filtered Display Count"
          value={filteredQuakes.length}
          subtext={`Showing quakes above M ${minMagnitude}`}
          subtextColor="text-emerald-400"
        />
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">
              Magnitude Intensity Filter
            </h3>
            <p className="text-sm text-stone-400">
              Isolate micro-seismic events from major movements
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-stone-950 p-3 rounded-lg border border-stone-800">
            <input
              type="range"
              min="0"
              max="7"
              step="0.5"
              value={minMagnitude}
              onChange={(e) => setMinMagnitude(parseFloat(e.target.value))}
              className="accent-emerald-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg appearance-none"
            />
            <span className="text-sm font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              M {minMagnitude.toFixed(1)}+
            </span>
          </div>
        </div>

        <div className="h-113 w-full">
          <EarthquakeMap earthquakes={filteredQuakes} />
        </div>
      </div>
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 h-96 w-full">
        <QuakeChart earthquakes={quakes} />
      </div>
    </div>
  )
}

export default Earthquakes
