// app/study-plan/page.tsx
'use client'
import { STUDY_PLAN, TOTAL_HOURS } from '@/lib/study-plan'
import { WeekRow } from '@/components/WeekRow'
import { useStudyPlan } from '@/hooks/useStudyPlan'

export default function StudyPlanPage() {
  const { completedWeeks, toggleWeek } = useStudyPlan()
  const completedCount = Object.values(completedWeeks).filter(Boolean).length

  return (
    <div>
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">study_plan/</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        12 weeks · ~{TOTAL_HOURS} hours total · {completedCount}/12 complete
      </p>

      <div className="flex flex-col gap-2">
        {STUDY_PLAN.map((week) => (
          <WeekRow
            key={week.key}
            week={week}
            complete={completedWeeks[week.key] ?? false}
            onToggle={toggleWeek}
          />
        ))}
      </div>
    </div>
  )
}
