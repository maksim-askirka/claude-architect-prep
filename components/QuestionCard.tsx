'use client'
import { useState } from 'react'
import { Question } from '@/lib/questions'
import { DOMAINS } from '@/lib/domains'

interface QuestionCardProps {
  question: Question
  onAnswer: (correct: boolean) => void
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const domain = DOMAINS.find((d) => d.key === question.domain)

  function handleSelect(i: number) {
    if (answered) return
    setSelected(i)
    onAnswer(i === question.correct)
  }

  return (
    <div className="border border-[var(--border)] p-5 bg-[var(--bg)]">
      <div className="flex items-center gap-2 mb-3">
        {domain && (
          <span className="text-[11px] uppercase tracking-widest px-2 py-0.5 bg-[var(--bg2)] text-[var(--muted)]">
            {domain.number}
          </span>
        )}
      </div>
      <p className="text-sm font-semibold mb-4 leading-6">{question.question}</p>
      <div className="flex flex-col gap-2 mb-4">
        {question.options.map((opt, i) => {
          let style = 'border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg2)]'
          if (answered) {
            if (i === question.correct)
              style = 'border-[var(--teal)] bg-[var(--teal-bg)] text-[var(--teal)]'
            else if (i === selected)
              style = 'border-red-400 bg-red-50 text-red-600'
            else
              style = 'border-[var(--border)] text-[var(--muted)]'
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => handleSelect(i)}
              className={`text-xs text-left px-3 py-2 border transition-colors disabled:cursor-default ${style}`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="text-xs text-[var(--muted)] border-t border-[var(--border)] pt-3 leading-6">
          {question.explanation}
        </div>
      )}
    </div>
  )
}
