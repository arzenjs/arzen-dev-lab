'use client'

import Cell from './Cell'

export default function Board({ board, onCellClick, winningLine, isGameOver }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 bg-board-bg rounded-2xl border border-board-line shadow-2xl shadow-black/40">
        {board.map((value, index) => (
          <Cell key={index} value={value} onClick={() => onCellClick(index)} isWinning={winningLine?.includes(index) || false} isGameOver={isGameOver} index={index} />
        ))}
      </div>
      {winningLine && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_40px_rgba(245,158,11,0.1)]" />
      )}
    </div>
  )
}