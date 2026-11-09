'use client'

import { motion } from 'framer-motion'
import { Trophy, RotateCcw, CheckCircle2, XCircle, Target } from 'lucide-react'

function getGrade(p) {
  if (p >= 90) return { label: 'Outstanding!', emoji: '🏆', color: 'text-yellow-400' }
  if (p >= 70) return { label: 'Great Job!', emoji: '🌟', color: 'text-quiz-correct' }
  if (p >= 50) return { label: 'Not Bad!', emoji: '👍', color: 'text-quiz-accent' }
  if (p >= 30) return { label: 'Keep Trying!', emoji: '💪', color: 'text-orange-400' }
  return { label: 'Better Luck Next Time', emoji: '📚', color: 'text-quiz-incorrect' }
}

export default function QuizResult({ score, totalQuestions, answers, questions, onRestart }) {
  const pct = Math.round((score / totalQuestions) * 100)
  const grade = getGrade(pct)
  const circ = 2 * Math.PI * 52

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
      <div className="text-center mb-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="text-5xl mb-4">{grade.emoji}</motion.div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${grade.color}`}>{grade.label}</h2>
        <p className="text-quiz-muted text-sm mb-6">You answered {score} out of {totalQuestions} correctly.</p>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" className="text-quiz-surface" strokeWidth="8" />
            <motion.circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" className={pct >= 50 ? 'text-quiz-correct' : 'text-quiz-incorrect'} strokeWidth="8" strokeLinecap="round" strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: circ * (1 - pct / 100) }} transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-black">{pct}%</span><span className="text-[11px] text-quiz-muted">Score</span></div>
        </motion.div>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-quiz-correct"><CheckCircle2 className="w-4 h-4" /><span className="font-semibold">{score} Correct</span></div>
          <div className="flex items-center gap-2 text-quiz-incorrect"><XCircle className="w-4 h-4" /><span className="font-semibold">{totalQuestions - score} Wrong</span></div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-sm font-bold text-quiz-muted uppercase tracking-wider mb-4 flex items-center gap-2"><Target className="w-4 h-4" />Answer Breakdown</h3>
        <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
          {answers.map((a, i) => {
            const q = questions.find(x => x.id === a.questionId)
            return (
              <motion.div key={a.questionId} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.05 }} className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${a.isCorrect ? 'bg-quiz-correctBg/50 border-quiz-correct/20' : 'bg-quiz-incorrectBg/50 border-quiz-incorrect/20'}`}>
                <div className="flex-shrink-0 mt-0.5">{a.isCorrect ? <CheckCircle2 className="w-4 h-4 text-quiz-correct" /> : <XCircle className="w-4 h-4 text-quiz-incorrect" />}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-quiz-text leading-snug mb-1">{i + 1}. {q.question}</p>
                  {!a.isCorrect && <p className="text-xs text-quiz-muted">Your answer: <span className="text-quiz-incorrect line-through">{q.options[a.selected]}</span> {' → '} <span className="text-quiz-correct font-semibold">{q.options[a.correct]}</span></p>}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      <div className="text-center">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onRestart} className="inline-flex items-center gap-2 px-8 py-4 bg-quiz-accent hover:bg-quiz-accentHover text-white font-bold rounded-xl transition-colors shadow-lg shadow-quiz-accent/25">
          <RotateCcw className="w-5 h-5" /> Play Again
        </motion.button>
      </div>
    </motion.div>
  )
}