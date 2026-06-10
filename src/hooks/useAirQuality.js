import { useState, useEffect } from 'react'
import { MOCK_NEPAL_AQI } from '../data/aqi-levels'

export function useAirQuality() {
  const [citiesData, setCitiesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCitiesData(MOCK_NEPAL_AQI)
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  return { citiesData, isLoading }
}
