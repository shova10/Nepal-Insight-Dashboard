import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function EarthquakeMap({ earthquakes }) {
  const NEPAL_CENTER = [28.3949, 84.124]

  const [mapTheme, setMapTheme] = useState(() => {
    return document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')

      setMapTheme(isDark ? 'dark' : 'light')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])
  const tileUrl =
    mapTheme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

  const getMarkerColor = (magnitude) => {
    if (magnitude >= 4.0) return '#ef4444'
    if (magnitude >= 2.5) return '#f59e0b'
    return '#10b981'
  }

  return (
    <div className="w-full h-full min-h-100 rounded-xl overflow-hidden shadow-inner relative border border-stone-200 dark:border-stone-800 z-10">
      <MapContainer
        center={NEPAL_CENTER}
        zoom={6.5}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
          key={mapTheme}
        />

        {earthquakes.map((quake) => (
          <CircleMarker
            key={quake.id}
            center={[quake.lat, quake.lng]}
            radius={quake.magnitude * 2.5}
            fillColor={getMarkerColor(quake.magnitude)}
            color={getMarkerColor(quake.magnitude)}
            weight={1}
            opacity={0.8}
            fillOpacity={0.4}
          >
            <Popup>
              <div className="p-1 font-sans">
                <h4 className="font-bold text-sm border-b border-stone-300 dark:border-stone-700 pb-1 mb-1">
                  Magnitude {quake.magnitude.toFixed(1)}
                </h4>
                <p className="text-xs opacity-90">
                  <span className="font-semibold">Location:</span> {quake.place}
                </p>
                <p className="text-xs opacity-90">
                  <span className="font-semibold">Depth:</span> {quake.depth} km
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {quake.time}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-300 space-y-1 z-1000 pointer-events-auto shadow-sm">
        <div className="font-medium text-stone-500 dark:text-stone-400 mb-1">
          Legend
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 block" />
          <span>M 4.0+ Critical</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
          <span>M 2.5 - 4.0 Moderate</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
          <span>M &lt; 2.5 Minor</span>
        </div>
      </div>
    </div>
  )
}

export default EarthquakeMap
