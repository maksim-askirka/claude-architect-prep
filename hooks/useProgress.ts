// hooks/useProgress.ts
'use client'
import { useState, useEffect, useCallback } from 'react'
import { getProgress, resetProgress as resetLib } from '@/lib/progress'
import { ProgressData } from '@/types'

export function useProgress() {
  const [data, setData] = useState<ProgressData>(() => getProgress())

  const reload = useCallback(() => {
    setData(getProgress())
  }, [])

  const reset = useCallback(() => {
    resetLib()
    setData(getProgress())
  }, [])

  // Re-read on mount (handles SSR/hydration)
  useEffect(() => {
    reload()
  }, [reload])

  return { data, reload, reset }
}
