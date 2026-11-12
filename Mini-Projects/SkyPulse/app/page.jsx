'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloudSun, Loader2, AlertTriangle } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import CurrentWeather from '@/components/CurrentWeather'
import Forecast from '@/components/Forecast'
import { getWeather, getWeatherInfo, getSkyClass } from '@/lib/weather'

export default function Home() {
  const [weather, setWeather] = useState(null)
  const [cityName, setCityName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [skyClass, setSkyClass] = useState('sky-default')

  const fetchWeather = useCallback(async (lat, lon, name) => {
    setLoading(true); setError(null)
    try {
      const data = await getWeather(lat, lon)
      setWeather(data); setCityName(name)
      const info = getWeatherInfo(data.current.weather_code, data.current.is_day)
      setSkyClass(getSkyClass(info.sky))
    } catch { setError('Failed to load weather data. Please try again.') }
    finally { setLoading(false) }
  }, [])

  return (
    <main className={`min-h-screen transition-all duration-1000 ease-in-out ${skyClass}`}>
      <div className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12 relative">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CloudSun className="w-7 h-7 text-white/90" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">SkyPulse</h1>
          </div>
          <p className="text-sm text-glass-muted">Real-time weather, anywhere on Earth</p>
        </motion.div>
        <SearchBar onSelectCity={fetchWeather} />
        <AnimatePresence>
          {loading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3 mt-16"><Loader2 className="w-8 h-8 text-white/70 animate-spin" /><p className="text-sm text-glass-muted">Fetching weather data...</p></motion.div>}
        </AnimatePresence>
        <AnimatePresence>
          {error && !loading && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 glass rounded-xl px-6 py-4 flex items-center gap-3 max-w-md"><AlertTriangle className="w-5 h-5 text-red-300 flex-shrink-0" /><p className="text-sm text-white/80">{error}</p></motion.div>}
        </AnimatePresence>
        <AnimatePresence>
          {weather && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg mt-6 space-y-4">
              <CurrentWeather weather={weather} cityName={cityName} />
              <Forecast weather={weather} />
            </motion.div>
          )}
        </AnimatePresence>
        {!weather && !loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mt-16">
            <CloudSun className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-glass-muted text-sm">Search for a city to see its weather</p>
          </motion.div>
        )}
        <p className="mt-auto pt-8 text-[11px] text-glass-dim">Powered by Open-Meteo • Free & Open Source API</p>
      </div>
    </main>
  )
}
