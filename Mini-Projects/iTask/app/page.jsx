'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ListTodo, ClipboardList } from 'lucide-react'
import TaskInput from '@/components/TaskInput'
import TaskItem from '@/components/TaskItem'

const STORAGE_KEY = 'itask-tasks'
function loadTasks() {
  if (typeof window === 'undefined') return []
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : [] } catch { return [] }
}
function saveTasks(tasks) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) } catch {}
}

const FILTERS = ['all', 'active', 'completed']

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setTasks(loadTasks()); setMounted(true) }, [])
  useEffect(() => { if (mounted) saveTasks(tasks) }, [tasks, mounted])

  const addTask = useCallback((text) => {
    const t = text.trim(); if (!t) return
    setTasks(p => [{ id: Date.now().toString(36) + Math.random().toString(36).slice(2,7), text: t, completed: false, createdAt: Date.now() }, ...p])
  }, [])
  const toggleTask = useCallback((id) => { setTasks(p => p.map(t => t.id === id ? { ...t, completed: !t.completed } : t)) }, [])
  const editTask = useCallback((id, text) => { const t = text.trim(); if (!t) return; setTasks(p => p.map(x => x.id === id ? { ...x, text: t } : x)) }, [])
  const deleteTask = useCallback((id) => { setTasks(p => p.filter(t => t.id !== id)) }, [])
  const clearCompleted = useCallback(() => { setTasks(p => p.filter(t => !t.completed)) }, [])

  const filtered = tasks.filter(t => filter === 'active' ? !t.completed : filter === 'completed' ? t.completed : true)
  const activeCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length

  if (!mounted) return (<main className="flex-1 flex items-center justify-center"><div className="w-8 h-8 border-2 border-task-accent border-t-transparent rounded-full animate-spin" /></main>)

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ClipboardList className="w-7 h-7 text-task-accent" />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">iTask</h1>
        </div>
        <p className="text-sm text-task-muted">
          {activeCount === 0 && tasks.length > 0 ? 'All tasks completed! 🎉' : activeCount === 0 ? 'Add your first task to get started.' : `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`}
        </p>
      </motion.div>
      <div className="w-full max-w-lg">
        <TaskInput onAdd={addTask} />
        {tasks.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mt-6 mb-3 px-1">
            <div className="flex items-center gap-1 bg-task-surface rounded-xl border border-task-border p-1">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === f ? 'text-white' : 'text-task-muted hover:text-task-text'}`}>
                  {filter === f && <motion.div layoutId="filter-bg" className="absolute inset-0 bg-task-accent rounded-lg" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                  <span className="relative z-10">{f}</span>
                </button>
              ))}
            </div>
            {completedCount > 0 && <button onClick={clearCompleted} className="text-xs text-task-muted hover:text-task-danger font-medium transition-colors px-2 py-1">Clear done ({completedCount})</button>}
          </motion.div>
        )}
        <div className="task-scroll max-h-[60vh] overflow-y-auto space-y-2 mt-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map(task => <TaskItem key={task.id} task={task} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />)}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && tasks.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <CheckCircle2 className="w-10 h-10 text-task-completed mx-auto mb-3" />
            <p className="text-sm text-task-muted">No {filter} tasks.</p>
          </motion.div>
        )}
        {tasks.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <ListTodo className="w-12 h-12 text-task-border mx-auto mb-4" />
            <p className="text-task-muted font-medium">No tasks yet</p>
            <p className="text-xs text-task-muted/60 mt-1">Type a task above and press Enter</p>
          </motion.div>
        )}
        {tasks.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-4 mt-6 text-[11px] text-task-muted">
            <span>{tasks.length} total</span><span className="w-1 h-1 rounded-full bg-task-border" />
            <span>{activeCount} active</span><span className="w-1 h-1 rounded-full bg-task-border" />
            <span>{completedCount} done</span>
          </motion.div>
        )}
      </div>
    </main>
  )
}