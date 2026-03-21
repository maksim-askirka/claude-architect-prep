// hooks/useStudyPlan.ts
import { useState, useEffect, useCallback } from 'react'
import { getProgress, setWeekComplete } from '@/lib/progress'

export function useStudyPlan() {
  const [completedWeeks, setCompletedWeeks] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setCompletedWeeks(getProgress().studyPlan)
  }, [])

  const toggleWeek = useCallback((weekKey: string, complete: boolean) => {
    setWeekComplete(weekKey, complete)
    setCompletedWeeks((prev) => ({ ...prev, [weekKey]: complete }))
  }, [])

  return { completedWeeks, toggleWeek }
}
