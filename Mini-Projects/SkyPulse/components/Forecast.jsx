'use client'

import { motion } from 'framer-motion'
import { Droplets } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { getWeatherInfo, getDayName } from '@/lib/weather'

export default function Forecast({ weather }) {
  const d = weather.daily
  const days = Array.from({ length: 5 }, (_, i) => {
    const idx = i + 1
    const info = getWeatherInfo(d.weather_code[idx], 1)
    return { date: d.time[idx], dayName: getDayName(d.time[idx]), max: Math.round(d.temperature_2m_max[idx]), min: Math.round(d.temperature_2m_min[idx]), precip: d.precipitation_probability_max[idx], icon: info.icon, label: info.label }
  })

  return (
    <div className="glass-strong rounded-3xl p-5 sm:p-6">
      <h3 className="text-sm font-bold text-glass-muted uppercase tracking-wider mb-4">5-Day Forecast</h3>
      <div className="space-y-2">
        {days.map((day, i) => (
          <motion.div key={day.date} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.07 }} className="flex items-center justify-between py-2.5 px-2 rounded-xl hover:bg-white/5 transition-colors">
            <span className="text-sm font-semibold text-white w-16 sm:w-20">{day.dayName}</span>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <WeatherIcon name={day.icon} size="sm" className="text-white/70" />
              <span className="text-xs text-glass-muted hidden sm:block">{day.label}</span>
            </div>
            <div className="flex items-center gap-1 w-14 justify-end">
              {day.precip > 0 && <><Droplets className="w-3 h-3 text-blue-300" /><span className="text-xs text-blue-300">{day.precip}%</span></>}
            </div>
            <div className="flex items-center gap-2 w-20 justify-end">
              <span className="text-sm font-bold text-white">{day.max}°</span>
              <span className="text-sm text-glass-dim">{day.min}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
