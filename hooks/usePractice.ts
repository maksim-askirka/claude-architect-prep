// hooks/usePractice.ts
'use client'
import { useState, useMemo, useCallback } from 'react'
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

  const handleAnswer = useCallback(
    (questionId: string, correct: boolean) => {
      setAnswers((prev) => {
        const updated = { ...prev, [questionId]: correct }

        // If a single domain is selected and all filtered questions answered → save result
        if (filter !== 'all') {
          const filteredQuestions = getQuestionsByDomain(filter)
          const allAnswered = filteredQuestions.every((q) => q.id in updated)
          if (allAnswered) {
            const domainCorrect = filteredQuestions.filter((q) => updated[q.id]).length
            setQuizResult(filter, domainCorrect, filteredQuestions.length)
          }
        }

        return updated
      })
    },
    [filter]
  )

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
