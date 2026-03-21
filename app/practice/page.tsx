// app/practice/page.tsx
'use client'
import { usePractice } from '@/hooks/usePractice'
import { QuestionCard } from '@/components/QuestionCard'
import { DomainFilter } from '@/components/DomainFilter'
import { ScoreDisplay } from '@/components/ScoreDisplay'

export default function PracticePage() {
  const { filter, questions, answeredCount, correctCount, handleAnswer, handleFilterChange } = usePractice()

  return (
    <div>
      {/* Header */}
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">
        practice/
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        {questions.length} questions · answer reveal on click
      </p>

      {/* Controls row */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <DomainFilter active={filter} onChange={handleFilterChange} />
        <ScoreDisplay correct={correctCount} total={answeredCount} />
      </div>

      {/* Questions */}
      {questions.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">// no questions match this filter</p>
      ) : (
        <div className="flex flex-col gap-4">
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onAnswer={(correct) => handleAnswer(q.id, correct)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
