'use client'

import { motion } from 'framer-motion'

export default function Cell({ value, onClick, isWinning, isGameOver, index }) {
  const isEmpty = value === null
  const canClick = isEmpty && !isGameOver

  return (
    <motion.button
      onClick={onClick}
      disabled={!canClick}
      // Hover tint moved to a CSS variable: 'var(--cell-hover)' equals the
      // original rgba(30,41,59,0.8) in dark mode and a slate-300 tint in
      // light mode. The existing `transition-colors` class animates it.
      whileHover={canClick ? { scale: 1.04, backgroundColor: 'var(--cell-hover)' } : {}}
      whileTap={canClick ? { scale: 0.96 } : {}}
      className={`relative w-[min(24vw,16dvh,max(2rem,calc((100dvh-17rem)/3)),7rem)] h-[min(24vw,16dvh,max(2rem,calc((100dvh-17rem)/3)),7rem)] rounded-xl flex items-center justify-center text-[clamp(1.5rem,7dvh,3rem)] font-black transition-colors duration-200 ${isEmpty && !isGameOver ? 'bg-board-cell hover:bg-board-hover cursor-pointer border border-transparent hover:border-slate-600/50' : 'bg-board-cell border border-transparent'} ${isWinning ? 'border-win/50 bg-win/5' : ''} ${!canClick && isEmpty ? 'cursor-default' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500`}
      aria-label={`Cell ${Math.floor(index / 3) + 1}-${(index % 3) + 1}${value ? ', ' + value : ', empty'}`}
    >
      {value && (
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`select-none ${value === 'X' ? 'text-x' : 'text-o'} ${isWinning ? 'drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] text-win' : ''}`}
        >
          {value}
        </motion.span>
      )}
      {isWinning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 rounded-xl bg-win/20" />
      )}
    </motion.button>
  )
}
