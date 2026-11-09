'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Trophy, Handshake } from 'lucide-react'
import Board from '@/components/Board'
import ScoreBoard from '@/components/ScoreBoard'

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function checkWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: 'draw', line: null }
  }
  return null
}

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)
  const [gameResult, setGameResult] = useState(null)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })

  const handleCellClick = useCallback(
    (index) => {
      if (board[index] || gameResult) return
      const newBoard = [...board]
      newBoard[index] = isXTurn ? 'X' : 'O'
      setBoard(newBoard)
      const result = checkWinner(newBoard)
      if (result) {
        setGameResult(result)
        setScores((prev) => {
          if (result.winner === 'draw') return { ...prev, draws: prev.draws + 1 }
          return { ...prev, [result.winner]: prev[result.winner] + 1 }
        })
      } else {
        setIsXTurn(!isXTurn)
      }
    },
    [board, isXTurn, gameResult]
  )

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setIsXTurn(true)
    setGameResult(null)
  }, [])

  const resetAll = useCallback(() => {
    resetGame()
    setScores({ X: 0, O: 0, draws: 0 })
  }, [resetGame])

  const currentPlayer = isXTurn ? 'X' : 'O'
  const isGameOver = gameResult !== null

  return (
    <main className="relative z-10 h-full max-h-full w-full max-w-md mx-auto px-4 py-[clamp(0.125rem,0.75dvh,0.75rem)] flex flex-col items-center justify-evenly overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className="text-x">Tic</span>
          <span className="text-slate-500 mx-2">•</span>
          <span className="text-o">Tac</span>
          <span className="text-slate-500 mx-2">•</span>
          <span className="text-slate-300">Toe</span>
        </h1>
      </motion.div>

      <ScoreBoard scores={scores} currentPlayer={currentPlayer} isGameOver={isGameOver} />

      <AnimatePresence mode="wait">
        {isGameOver ? (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
            {gameResult.winner === 'draw' ? (
              <><Handshake className="w-5 h-5 text-slate-400" /><span className="font-bold text-slate-300">It&apos;s a Draw!</span></>
            ) : (
              <><Trophy className="w-5 h-5 text-win" /><span className="font-bold">Player <span className={gameResult.winner === 'X' ? 'text-x' : 'text-o'}>{gameResult.winner}</span> Wins!</span></>
            )}
          </motion.div>
        ) : (
          <motion.div key="turn" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-2 text-sm font-medium text-slate-400">
            <span className={`w-3 h-3 rounded-full ${currentPlayer === 'X' ? 'bg-x shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-o shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
            Player <span className={currentPlayer === 'X' ? 'text-x font-bold' : 'text-o font-bold'}>{currentPlayer}</span>&apos;s turn
          </motion.div>
        )}
      </AnimatePresence>

      <Board board={board} onCellClick={handleCellClick} winningLine={gameResult?.line || null} isGameOver={isGameOver} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3">
        {isGameOver && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} onClick={resetGame} className="px-6 py-2.5 bg-x/10 hover:bg-x/20 text-x font-semibold rounded-xl border border-x/20 hover:border-x/40 transition-all duration-200 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />Play Again
          </motion.button>
        )}
        <button onClick={resetAll} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-medium rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 text-sm">
          Reset Scores
        </button>
      </motion.div>
    </main>
  )
}