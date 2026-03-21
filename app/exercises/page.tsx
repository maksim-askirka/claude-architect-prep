// app/exercises/page.tsx
import type { Metadata } from 'next'
import { EXERCISES } from '@/lib/exercises'

export const metadata: Metadata = {
  title: 'Build Exercises',
  description: '4 capstone build exercises from the Claude Certified Architect exam guide.',
}

export default function ExercisesPage() {
  return (
    <div>
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">exercises/</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        4 capstone projects · hands-on practice for the exam
      </p>

      <div className="flex flex-col gap-8">
        {EXERCISES.map((ex) => (
          <div key={ex.id} className="border border-[var(--border)] p-6">
            {/* Header */}
            <div className="mb-4">
              <div className="text-[11px] uppercase tracking-widest text-[var(--teal)] mb-1">
                exercise_{ex.number.toString().padStart(2, '0')} · {ex.domain} · ~{ex.estimatedTime}
              </div>
              <h2 className="text-base font-semibold">{ex.title}</h2>
            </div>

            {/* Goal */}
            <p className="text-sm text-[var(--text)] leading-7 mb-6">{ex.goal}</p>

            {/* Starter code */}
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">starter_code/</div>
              <pre className="text-xs bg-[var(--bg2)] border border-[var(--border)] p-4 overflow-x-auto leading-6">
                <code>{ex.starter}</code>
              </pre>
            </div>

            {/* Completion criteria */}
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">completion_criteria/</div>
              <ul className="space-y-1">
                {ex.criteria.map((c, i) => (
                  <li key={i} className="text-xs text-[var(--text)] flex gap-2">
                    <span className="text-[var(--teal)] flex-shrink-0">[ ]</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
