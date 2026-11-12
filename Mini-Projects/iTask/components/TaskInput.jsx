'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('')
  const handleSubmit = (e) => { e.preventDefault(); if (!value.trim()) return; onAdd(value); setValue('') }

  return (
    <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="relative">
      <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="What needs to be done?" className="w-full px-5 py-4 pr-14 bg-task-surface border border-task-border rounded-2xl text-sm sm:text-base text-task-text placeholder-task-muted/60 outline-none focus:border-task-accent focus:ring-2 focus:ring-task-accent/20 transition-all duration-200 shadow-sm" maxLength={200} autoFocus aria-label="Add a new task" />
      <button type="submit" disabled={!value.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-task-accent hover:bg-task-accentHover disabled:bg-task-border disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md active:scale-95" aria-label="Add task">
        <Plus className="w-5 h-5" />
      </button>
    </motion.form>
  )
}
