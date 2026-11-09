'use client'

import { motion } from 'framer-motion'
import { Brain, ArrowRight, Clock, Trophy, HelpCircle } from 'lucide-react'

export default function QuizStart({ onStart, totalQuestions }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-20 h-20 mx-auto mb-6 bg-quiz-accent/10 border border-quiz-accent/20 rounded-2xl flex items-center justify-center">
        <Brain className="w-10 h-10 text-quiz-accent" />
      </motion.div>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Knowledge Quiz</h1>
      <p className="text-quiz-muted text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed">Test your general knowledge across science, technology, geography, history, and more.</p>
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-10">
        <div className="bg-quiz-surface border border-quiz-border rounded-xl p-4"><HelpCircle className="w-5 h-5 text-quiz-accent mx-auto mb-2" /><div className="text-lg font-bold">{totalQuestions}</div><div className="text-[11px] text-quiz-muted">Questions</div></div>
        <div className="bg-quiz-surface border border-quiz-border rounded-xl p-4"><Clock className="w-5 h-5 text-quiz-accent mx-auto mb-2" /><div className="text-lg font-bold">~3</div><div className="text-[11px] text-quiz-muted">Minutes</div></div>
        <div className="bg-quiz-surface border border-quiz-border rounded-xl p-4"><Trophy className="w-5 h-5 text-quiz-accent mx-auto mb-2" /><div className="text-lg font-bold">100</div><div className="text-[11px] text-quiz-muted">Max Score</div></div>
      </div>
      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onStart} className="inline-flex items-center gap-2 px-8 py-4 bg-quiz-accent hover:bg-quiz-accentHover text-white font-bold rounded-xl transition-colors shadow-lg shadow-quiz-accent/25">
        Start Quiz <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}