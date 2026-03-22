// hooks/usePractice.ts
'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { DomainKey } from '@/types'
import { getQuestionsByDomain } from '@/lib/questions'
import { setQuizResult } from '@/lib/progress'

export function usePractice() {
  const [filter, setFilter] = useState<DomainKey | 'all'>('all')
  // Map of question id → correct (true/false); absence = not yet answered
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const questions = useMemo(() => getQuestionsByDomain(filter), [filter])

  const answeredCount = Object.keys(answers).length
  const correctCount = Object.values(answers).filter(Boolean).length

  const handleAnswer = useCallback((questionId: string, correct: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: correct }))
  }, [])

  // Persist quiz result when all questions in a domain filter are answered
  useEffect(() => {
    if (filter === 'all' || questions.length === 0) return
    const allAnswered = questions.every((q) => q.id in answers)
    if (!allAnswered) return
    const domainCorrect = questions.filter((q) => answers[q.id]).length
    setQuizResult(filter, domainCorrect, questions.length)
  }, [answers, filter, questions])

  const handleFilterChange = useCallback((newFilter: DomainKey | 'all') => {
    setFilter(newFilter)
    setAnswers({}) // Reset answers when filter changes
  }, [])

  return {
    filter,
    questions,
    answers,
    answeredCount,
    correctCount,
    handleAnswer,
    handleFilterChange,
  }
}
