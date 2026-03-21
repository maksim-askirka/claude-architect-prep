// components/WeekSummary.tsx
interface WeekSummaryProps {
  studyPlan: Record<string, boolean>
}

export function WeekSummary({ studyPlan }: WeekSummaryProps) {
  const weeks = Object.entries(studyPlan)
  const completedCount = weeks.filter(([, v]) => v).length
  const currentWeekIndex = weeks.findIndex(([, v]) => !v)
  const currentWeek = currentWeekIndex === -1 ? 12 : currentWeekIndex + 1

  return (
    <div className="border border-[var(--border)] p-4">
      <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">
        12-week study plan
      </div>
      <div className="text-sm font-semibold">
        week_{String(currentWeek).padStart(2, '0')}
        <span className="text-[var(--muted)] font-normal ml-2">
          ({completedCount}/12 weeks complete)
        </span>
      </div>
    </div>
  )
}
