'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Pencil, Check, X } from 'lucide-react'

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.text)
  const inputRef = useRef(null)

  useEffect(() => { if (isEditing && inputRef.current) { inputRef.current.focus(); inputRef.current.select() } }, [isEditing])

  const handleSave = () => { const t = editValue.trim(); if (t && t !== task.text) onEdit(task.id, t); else setEditValue(task.text); setIsEditing(false) }
  const handleCancel = () => { setEditValue(task.text); setIsEditing(false) }
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel() }

  return (
    <motion.div layout initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 30, scale: 0.95 }} transition={{ duration: 0.2 }} className={`group flex items-center gap-3 px-4 py-3 bg-task-surface rounded-xl border transition-all duration-200 ${task.completed ? 'border-transparent bg-task-bg/50' : 'border-task-border hover:border-task-accent/30 hover:shadow-sm'}`}>
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} className="task-checkbox" aria-label={`Mark as ${task.completed ? 'incomplete' : 'complete'}`} />
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input ref={inputRef} type="text" value={editValue} onChange={e => setEditValue(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleSave} className="flex-1 px-2 py-1 text-sm bg-task-bg border border-task-accent rounded-lg outline-none focus:ring-2 focus:ring-task-accent/20" maxLength={200} />
          <button onClick={handleSave} className="p-1 text-task-success hover:bg-task-success/10 rounded-lg transition-colors" aria-label="Save"><Check className="w-4 h-4" /></button>
          <button onClick={handleCancel} className="p-1 text-task-muted hover:bg-task-bg rounded-lg transition-colors" aria-label="Cancel"><X className="w-4 h-4" /></button>
        </div>
      ) : (
        <span onDoubleClick={() => { if (!task.completed) { setIsEditing(true); setEditValue(task.text) } }} className={`flex-1 text-sm sm:text-base transition-all duration-200 cursor-default ${task.completed ? 'line-through text-task-completed' : 'text-task-text'}`} title={task.completed ? '' : 'Double-click to edit'}>{task.text}</span>
      )}
      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {!task.completed && <button onClick={() => { setIsEditing(true); setEditValue(task.text) }} className="p-1.5 text-task-muted hover:text-task-accent hover:bg-task-accentLight rounded-lg transition-colors" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>}
          {/* Only change in this file: added `dark:hover:bg-red-500/10` so the
              delete hover stays a soft red tint in dark mode instead of
              blinding near-white red-50. Light mode is unchanged. */}
          <button onClick={() => onDelete(task.id)} className="p-1.5 text-task-muted hover:text-task-danger hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      )}
    </motion.div>
  )
}
