'use client'

import { motion } from 'framer-motion'

export default function ScoreBoard({ scores, currentPlayer, isGameOver }) {
  const players = [
    { key: 'X', label: 'Player X', color: 'text-x', dimBg: 'bg-x/10', border: 'border-x/30' },
    { key: 'draws', label: 'Draws', color: 'text-slate-400', dimBg: 'bg-slate-800', border: 'border-slate-600' },
    { key: 'O', label: 'Player O', color: 'text-o', dimBg: 'bg-o/10', border: 'border-o/30' },
  ]

  return (
    <div className="flex items-center gap-2 sm:gap-3 w-full">
      {players.map((player) => {
        const isActive = !isGameOver && player.key === currentPlayer
        return (
          <motion.div
            key={player.key}
            animate={isActive ? { borderColor: 'rgba(148,163,184,0.3)' } : { borderColor: 'rgba(51,65,85,0.3)' }}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl border transition-all duration-300 ${isActive ? player.dimBg + ' ' + player.border : 'bg-slate-900/50 border-slate-800/50'}`}
          >
            <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${isActive ? player.color : 'text-slate-500'}`}>{player.label}</span>
            <motion.span key={scores[player.key]} initial={{ scale: 1.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className={`text-2xl sm:text-3xl font-black ${isActive ? player.color : 'text-slate-300'}`}>{scores[player.key]}</motion.span>
          </motion.div>
        )
      })}
    </div>
  )
}