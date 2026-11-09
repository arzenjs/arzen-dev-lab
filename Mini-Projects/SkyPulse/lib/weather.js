const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

export async function searchCity(query) {
  if (!query || query.trim().length < 2) return []
  const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`)
  if (!res.ok) return []
  const data = await res.json()
  return data.results || []
}

export async function getWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat, longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: 'auto', forecast_days: '6',
  })
  const res = await fetch(`${WEATHER_URL}?${params}`)
  if (!res.ok) throw new Error('Failed to fetch weather data')
  return res.json()
}

const WEATHER_MAP = {
  0: { label: 'Clear Sky', icon: 'sun', sky: 'clear' },
  1: { label: 'Mainly Clear', icon: 'sun', sky: 'clear' },
  2: { label: 'Partly Cloudy', icon: 'cloud-sun', sky: 'clear' },
  3: { label: 'Overcast', icon: 'cloud', sky: 'cloudy' },
  45: { label: 'Foggy', icon: 'cloud-fog', sky: 'cloudy' },
  48: { label: 'Rime Fog', icon: 'cloud-fog', sky: 'cloudy' },
  51: { label: 'Light Drizzle', icon: 'cloud-drizzle', sky: 'rainy' },
  53: { label: 'Drizzle', icon: 'cloud-drizzle', sky: 'rainy' },
  55: { label: 'Heavy Drizzle', icon: 'cloud-drizzle', sky: 'rainy' },
  61: { label: 'Light Rain', icon: 'cloud-rain', sky: 'rainy' },
  63: { label: 'Rain', icon: 'cloud-rain', sky: 'rainy' },
  65: { label: 'Heavy Rain', icon: 'cloud-rain', sky: 'rainy' },
  66: { label: 'Freezing Rain', icon: 'cloud-rain', sky: 'rainy' },
  67: { label: 'Heavy Freezing Rain', icon: 'cloud-rain', sky: 'rainy' },
  71: { label: 'Light Snow', icon: 'snowflake', sky: 'snowy' },
  73: { label: 'Snow', icon: 'snowflake', sky: 'snowy' },
  75: { label: 'Heavy Snow', icon: 'snowflake', sky: 'snowy' },
  77: { label: 'Snow Grains', icon: 'snowflake', sky: 'snowy' },
  80: { label: 'Light Showers', icon: 'cloud-rain', sky: 'rainy' },
  81: { label: 'Showers', icon: 'cloud-rain', sky: 'rainy' },
  82: { label: 'Heavy Showers', icon: 'cloud-rain', sky: 'rainy' },
  85: { label: 'Snow Showers', icon: 'snowflake', sky: 'snowy' },
  86: { label: 'Heavy Snow Showers', icon: 'snowflake', sky: 'snowy' },
  95: { label: 'Thunderstorm', icon: 'cloud-lightning', sky: 'storm' },
  96: { label: 'Thunderstorm + Hail', icon: 'cloud-lightning', sky: 'storm' },
  99: { label: 'Severe Thunderstorm', icon: 'cloud-lightning', sky: 'storm' },
}

export function getWeatherInfo(code, isDay = 1) {
  const info = WEATHER_MAP[code] || { label: 'Unknown', icon: 'cloud', sky: 'default' }
  if (!isDay && info.sky === 'clear') return { ...info, icon: 'moon', sky: 'night' }
  if (!isDay) return { ...info, sky: 'night' }
  return info
}

export function getSkyClass(sky) {
  const map = { clear: 'sky-clear-day', night: 'sky-clear-night', cloudy: 'sky-cloudy', rainy: 'sky-rainy', snowy: 'sky-snowy', storm: 'sky-storm', default: 'sky-default' }
  return map[sky] || 'sky-default'
}

export function getWindDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

export function getDayName(dateStr) {
  const date = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1)
  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}