'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Loader2, X } from 'lucide-react'
import { searchCity } from '@/lib/weather'

export default function SearchBar({ onSelectCity }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setIsOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearch = useCallback((value) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (value.trim().length < 2) { setResults([]); setIsOpen(false); return }
    setSearching(true)
    debounceRef.current = setTimeout(async () => {
      const cities = await searchCity(value)
      setResults(cities); setIsOpen(cities.length > 0); setSearching(false)
    }, 350)
  }, [])

  const handleSelect = (city) => {
    const name = [city.name, city.admin1, city.country].filter(Boolean).join(', ')
    setQuery(name); setIsOpen(false); setResults([])
    onSelectCity(city.latitude, city.longitude, name)
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="glass-strong rounded-2xl flex items-center px-4 py-3 gap-3">
        {searching ? <Loader2 className="w-5 h-5 text-glass-muted animate-spin flex-shrink-0" /> : <Search className="w-5 h-5 text-glass-muted flex-shrink-0" />}
        <input type="text" value={query} onChange={e => handleSearch(e.target.value)} onFocus={() => results.length > 0 && setIsOpen(true)} placeholder="Search any city..." className="flex-1 bg-transparent text-white placeholder-glass-dim outline-none text-sm sm:text-base" aria-label="Search city" />
        {query && <button onClick={() => { setQuery(''); setResults([]); setIsOpen(false) }} className="p-1 text-glass-dim hover:text-white transition-colors" aria-label="Clear"><X className="w-4 h-4" /></button>}
      </div>
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl overflow-hidden z-50">
            {results.map((city, i) => (
              <button key={`${city.id}-${i}`} onClick={() => handleSelect(city)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-0">
                <MapPin className="w-4 h-4 text-glass-dim flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-white truncate block">{city.name}</span>
                  <span className="text-xs text-glass-dim truncate block">{[city.admin1, city.country].filter(Boolean).join(', ')}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}