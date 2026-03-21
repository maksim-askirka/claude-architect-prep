// components/InlinePracticeQ.tsx
'use client'
import { useState } from 'react'

interface InlinePracticeQProps {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export function InlinePracticeQ({ question, options, correct, explanation }: InlinePracticeQProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null

  return (
    <div className="border border-[var(--border)] bg-[var(--bg2)] p-4 my-6">
      <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-3">
        practice question
      </div>
      <p className="text-sm font-semibold mb-4">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          let style = 'border-[var(--border)] text-[var(--text)]'
          if (answered) {
            if (i === correct) style = 'border-[var(--teal)] bg-[var(--teal-bg)] text-[var(--teal)]'
            else if (i === selected) style = 'border-red-400 text-red-600'
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`text-xs text-left px-3 py-2 border transition-colors disabled:cursor-default ${style}`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <p className="text-xs text-[var(--muted)] mt-4 border-t border-[var(--border)] pt-3">
          {explanation}
        </p>
      )}
    </div>
  )
}
