// hooks/useStudyPlan.ts
'use client'
import { useState, useEffect, useCallback } from 'react'
import { getProgress, setWeekComplete } from '@/lib/progress'

export function useStudyPlan() {
  const [completedWeeks, setCompletedWeeks] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompletedWeeks(getProgress().studyPlan)
  }, [])

  const toggleWeek = useCallback((weekKey: string, complete: boolean) => {
    setWeekComplete(weekKey, complete)
    setCompletedWeeks((prev) => ({ ...prev, [weekKey]: complete }))
  }, [])

  return { completedWeeks, toggleWeek }
}
