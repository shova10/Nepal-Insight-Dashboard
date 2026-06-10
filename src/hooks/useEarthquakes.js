import { useState, useEffect } from 'react'
import { API_CONFIG } from '../data/api-config'
import { MOCK_NEPAL_QUAKES } from '../data/mock-quakes'

export function useEarthquakes() {
  const [quakes, setQuakes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEarthquakeData() {
      try {
        setIsLoading(true)
        const response = await fetch(API_CONFIG.USGS_EARTHQUAKES_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch seismic data from USGS source.')
        }

        const data = await response.json()

        let nepalQuakes = data.features
          .filter((feature) => {
            const [longitude, latitude] = feature.geometry.coordinates
            const { minLat, maxLat, minLng, maxLng } = API_CONFIG.NEPAL_BOUNDS

            return (
              latitude >= minLat &&
              latitude <= maxLat &&
              longitude >= minLng &&
              longitude <= maxLng
            )
          })
          .map((feature) => ({
            id: feature.id,
            magnitude: feature.properties.mag,
            place: feature.properties.place
              .replace('Nepal', '')
              .replace(', ', ''),
            time: new Date(feature.properties.time).toLocaleDateString(
              'en-US',
              {
                month: 'short',
                day: 'numeric',
              }
            ),
            lng: feature.geometry.coordinates[0],
            lat: feature.geometry.coordinates[1],
            depth: feature.geometry.coordinates[2],
          }))

        if (nepalQuakes.length === 0) {
          console.warn(
            'No real-time earthquakes detected in Nepal area during the last 30 days. Displaying historical mock dataset.'
          )
          nepalQuakes = MOCK_NEPAL_QUAKES
        }

        setQuakes(nepalQuakes)
        setError(null)
      } catch (err) {
        console.error(
          'API error encountered, spinning up historical dataset safely.',
          err
        )
        setQuakes(MOCK_NEPAL_QUAKES)
        setError(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEarthquakeData()
  }, [])

  return { quakes, isLoading, error }
}
