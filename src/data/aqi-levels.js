export const AQI_THRESHOLDS = [
  {
    max: 50,
    label: 'Good',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
    border: 'border-emerald-500/20',
    alert: 'Safe baseline. Minimal health risks detected.',
  },
  {
    max: 100,
    label: 'Moderate',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
    border: 'border-amber-500/20',
    alert: 'Acceptable quality; sensitive groups should consider masking.',
  },
  {
    max: 150,
    label: 'Unhealthy for Sensitive Groups',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-400',
    border: 'border-orange-500/20',
    alert:
      'General public may begin feeling irritation. Sensitive individuals stay alert.',
  },
  {
    max: 200,
    label: 'Unhealthy',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-400',
    border: 'border-red-500/20',
    alert: 'High pollution levels. Reduce heavy outdoor exertion loops.',
  },
  {
    max: 999,
    label: 'Hazardous',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-400',
    border: 'border-purple-500/20',
    alert: 'CRITICAL HEALTH ALERT. Avoid all outdoor exposures.',
  },
]

export const getAQIStyle = (value) => {
  return (
    AQI_THRESHOLDS.find((tier) => value <= tier.max) ||
    AQI_THRESHOLDS[AQI_THRESHOLDS.length - 1]
  )
}

export const MOCK_NEPAL_AQI = [
  { city: 'Kathmandu (Ratnapark)', aqi: 158, pm25: 68.4 },
  { city: 'Pokhara (Lakeside)', aqi: 42, pm25: 10.1 },
  { city: 'Lumbini (Sacred Garden)', aqi: 112, pm25: 40.2 },
  { city: 'Biratnagar Hub', aqi: 85, pm25: 28.3 },
  { city: 'Hetauda Industrial', aqi: 64, pm25: 18.2 },
]

export const MOCK_TREND_DATA = [
  { day: 'Mon', Kathmandu: 142, Pokhara: 38, Lumbini: 95 },
  { day: 'Tue', Kathmandu: 158, Pokhara: 42, Lumbini: 112 }, 
  { day: 'Wed', Kathmandu: 165, Pokhara: 45, Lumbini: 120 },
  { day: 'Thu', Kathmandu: 130, Pokhara: 35, Lumbini: 88 },
  { day: 'Fri', Kathmandu: 122, Pokhara: 30, Lumbini: 80 },
  { day: 'Sat', Kathmandu: 115, Pokhara: 28, Lumbini: 75 },
  { day: 'Sun', Kathmandu: 138, Pokhara: 34, Lumbini: 90 },
]
