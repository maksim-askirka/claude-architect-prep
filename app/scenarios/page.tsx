// app/scenarios/page.tsx
import type { Metadata } from 'next'
import { SCENARIOS } from '@/lib/scenarios'
import { pad2 } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Exam Scenarios',
  description: 'All 6 Claude Certified Architect exam scenario walkthroughs with step-by-step analysis and exam tips.',
}

export default function ScenariosPage() {
  return (
    <div>
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">scenarios/</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        all 6 exam scenarios · 4 of 6 randomly selected on exam day
      </p>

      <div className="flex flex-col gap-8">
        {SCENARIOS.map((s) => (
          <div key={s.id} className="border border-[var(--border)] p-6">
            {/* Header */}
            <div className="mb-4">
              <div className="text-[11px] uppercase tracking-widest text-[var(--teal)] mb-1">
                scenario_{pad2(s.number)} · {s.domain}
              </div>
              <h2 className="text-base font-semibold">{s.title}</h2>
            </div>

            {/* Problem */}
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">problem</div>
              <p className="text-sm text-[var(--text)] leading-7">{s.problem}</p>
            </div>

            {/* Steps */}
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-3">walkthrough</div>
              <div className="space-y-4">
                {s.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-xs font-semibold text-[var(--teal)] flex-shrink-0 mt-0.5">
                      {step.stepNumber}
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-1">{step.title}</div>
                      <p className="text-xs text-[var(--text)] leading-6">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam tips */}
            <div className="bg-[var(--bg2)] border border-[var(--border)] p-4">
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">exam tips</div>
              <ul className="space-y-1">
                {s.examTips.map((tip, i) => (
                  <li key={i} className="text-xs text-[var(--text)] flex gap-2">
                    <span className="text-[var(--teal)] flex-shrink-0">→</span>
                    {tip}
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
