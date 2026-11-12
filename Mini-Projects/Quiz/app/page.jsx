'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import questions from '@/data/questions'
import QuizStart from '@/components/QuizStart'
import QuestionCard from '@/components/QuestionCard'
import QuizResult from '@/components/QuizResult'

const PHASES = { START: 'start', QUIZ: 'quiz', RESULT: 'result' }

export default function Home() {
  const [phase, setPhase] = useState(PHASES.START)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [answers, setAnswers] = useState([])

  const startQuiz = useCallback(() => {
    setPhase(PHASES.QUIZ); setCurrentIndex(0); setSelectedOption(null); setIsAnswered(false); setAnswers([])
  }, [])

  const handleSelect = useCallback((optionIndex) => {
    if (isAnswered) return
    setSelectedOption(optionIndex); setIsAnswered(true)
    setAnswers(prev => [...prev, { questionId: questions[currentIndex].id, selected: optionIndex, correct: questions[currentIndex].correct, isCorrect: optionIndex === questions[currentIndex].correct }])
  }, [isAnswered, currentIndex])

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) { setCurrentIndex(p => p + 1); setSelectedOption(null); setIsAnswered(false) }
    else setPhase(PHASES.RESULT)
  }, [currentIndex])

  const score = answers.filter(a => a.isCorrect).length

  return (
    <main className="w-full max-w-2xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {phase === PHASES.START && <QuizStart key="start" onStart={startQuiz} totalQuestions={questions.length} />}
        {phase === PHASES.QUIZ && <QuestionCard key={`q-${currentIndex}`} question={questions[currentIndex]} questionNumber={currentIndex + 1} totalQuestions={questions.length} selectedOption={selectedOption} isAnswered={isAnswered} onSelect={handleSelect} onNext={handleNext} isLast={currentIndex === questions.length - 1} />}
        {phase === PHASES.RESULT && <QuizResult key="result" score={score} totalQuestions={questions.length} answers={answers} questions={questions} onRestart={startQuiz} />}
      </AnimatePresence>
    </main>
  )
}
