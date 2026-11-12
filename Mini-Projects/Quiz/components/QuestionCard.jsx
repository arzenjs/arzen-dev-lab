'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuestionCard({ question, questionNumber, totalQuestions, selectedOption, isAnswered, onSelect, onNext, isLast }) {
  const progress = (questionNumber / totalQuestions) * 100

  const getStyle = (i) => {
    if (!isAnswered) return 'bg-quiz-surface border-quiz-border hover:border-quiz-accent/50 hover:bg-quiz-surface/80 cursor-pointer'
    if (i === selectedOption) return 'bg-quiz-accent/10 border-quiz-accent text-quiz-text'
    return 'bg-quiz-surface/50 border-quiz-border/50 text-quiz-dim cursor-default'
  }

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-quiz-muted">Question {questionNumber} of {totalQuestions}</span>
          <span className="text-xs font-medium text-quiz-accent">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-quiz-surface rounded-full overflow-hidden"><div className="progress-fill h-full bg-quiz-accent rounded-full" style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-quiz-accent/10 text-quiz-accent text-[11px] font-semibold rounded-full border border-quiz-accent/20"><Sparkles className="w-3 h-3" />{question.category}</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-8">{question.question}</h2>
      <div className="space-y-3 mb-8">
        {question.options.map((opt, i) => (
          <motion.button key={i} onClick={() => onSelect(i)} disabled={isAnswered} whileHover={!isAnswered ? { x: 4 } : {}} whileTap={!isAnswered ? { scale: 0.98 } : {}} className={`option-btn ${getStyle(i)}`}>
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${isAnswered && i === selectedOption ? 'bg-quiz-accent/20 text-quiz-accent' : 'bg-quiz-border/50 text-quiz-muted'}`}>{LETTERS[i]}</span>
            <span className="flex-1 text-sm sm:text-base font-medium">{opt}</span>
          </motion.button>
        ))}
      </div>
      {isAnswered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onNext} className="inline-flex items-center gap-2 px-6 py-3 bg-quiz-accent hover:bg-quiz-accentHover text-white font-bold rounded-xl transition-colors shadow-md shadow-quiz-accent/20">
            {isLast ? 'See Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
