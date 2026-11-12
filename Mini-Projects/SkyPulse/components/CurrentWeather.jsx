'use client'

import { motion } from 'framer-motion'
import { MapPin, Droplets, Wind, Gauge, Thermometer, Sunrise, Sunset } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { getWeatherInfo, getWindDirection } from '@/lib/weather'

export default function CurrentWeather({ weather, cityName }) {
  const c = weather.current
  const d = weather.daily
  const info = getWeatherInfo(c.weather_code, c.is_day)
  const sunrise = d.sunrise[0] ? new Date(d.sunrise[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '--'
  const sunset = d.sunset[0] ? new Date(d.sunset[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '--'

  const details = [
    { icon: Thermometer, label: 'Feels Like', value: `${Math.round(c.apparent_temperature)}°` },
    { icon: Droplets, label: 'Humidity', value: `${c.relative_humidity_2m}%` },
    { icon: Wind, label: 'Wind', value: `${Math.round(c.wind_speed_10m)} km/h ${getWindDirection(c.wind_direction_10m)}` },
    { icon: Gauge, label: 'Pressure', value: `${Math.round(c.pressure_msl)} hPa` },
    { icon: Sunrise, label: 'Sunrise', value: sunrise },
    { icon: Sunset, label: 'Sunset', value: sunset },
  ]

  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-glass-muted text-sm mb-1"><MapPin className="w-3.5 h-3.5" /><span className="truncate max-w-[200px] sm:max-w-none">{cityName}</span></div>
          <p className="text-glass-muted text-sm">{info.label}</p>
        </div>
        <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
          <WeatherIcon name={info.icon} size="xl" className="text-white/90 drop-shadow-lg" />
        </motion.div>
      </div>
      <div className="mb-6">
        <span className="text-7xl sm:text-8xl font-black text-white tracking-tighter leading-none">{Math.round(c.temperature_2m)}°</span>
        <span className="text-glass-muted text-sm ml-2">C</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {details.map((d, i) => (
          <motion.div key={d.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="glass rounded-xl p-3 text-center">
            <d.icon className="w-4 h-4 text-glass-muted mx-auto mb-1.5" />
            <div className="text-xs text-white font-semibold">{d.value}</div>
            <div className="text-[10px] text-glass-dim mt-0.5">{d.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
