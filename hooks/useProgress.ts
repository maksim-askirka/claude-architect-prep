// hooks/useProgress.ts
'use client'
import { useState, useEffect, useCallback } from 'react'
import { getProgress, getDefaultProgress, resetProgress as resetLib } from '@/lib/progress'
import { ProgressData } from '@/types'

export function useProgress() {
  const [data, setData] = useState<ProgressData>(getDefaultProgress)

  const reload = useCallback(() => {
    setData(getProgress())
  }, [])

  const reset = useCallback(() => {
    resetLib()
    setData(getProgress())
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload()
  }, [reload])

  return { data, reload, reset }
}
