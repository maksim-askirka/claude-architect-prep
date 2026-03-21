// app/page.tsx
'use client'
import { useProgress } from '@/hooks/useProgress'
import { DOMAINS } from '@/lib/domains'
import { DomainRow } from '@/components/DomainRow'
import { ContinueCard } from '@/components/ContinueCard'
import { WeekSummary } from '@/components/WeekSummary'
import { ResetButton } from '@/components/ResetButton'

export default function DashboardPage() {
  const { data, reset } = useProgress()

  const totalSubtopics = DOMAINS.reduce((sum, d) => sum + d.subtopics.length, 0)
  const completedSubtopics = DOMAINS.reduce(
    (sum, d) => sum + data.progress[d.key].subtopics.filter(Boolean).length,
    0
  )
  const overallPercent = Math.round((completedSubtopics / totalSubtopics) * 100)

  return (
    <div>
      {/* Hero */}
      <h1 className="text-[52px] md:text-[52px] text-[36px] font-bold tracking-[-0.03em] leading-none mb-2">
        claude_architect/
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        certified architect exam prep · {overallPercent}% complete
      </p>

      {/* Top cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <ContinueCard lastVisited={data.lastVisited} />
        <WeekSummary studyPlan={data.studyPlan} />
      </div>

      {/* Domain rows */}
      <div className="flex flex-col gap-3 mb-8">
        {DOMAINS.map((domain) => (
          <DomainRow
            key={domain.key}
            domain={domain}
            progress={data.progress[domain.key]}
          />
        ))}
      </div>

      {/* Reset */}
      <div className="pt-4 border-t border-[var(--border)]">
        <ResetButton onReset={reset} />
      </div>
    </div>
  )
}
