// components/SubtopicSection.tsx
'use client'
import { useState, useEffect } from 'react'
import { setSubtopicComplete, getProgress } from '@/lib/progress'
import { DomainKey } from '@/types'

interface SubtopicSectionProps {
  domainKey: DomainKey
  index: number
  title: string
  children: React.ReactNode
}

export function SubtopicSection({ domainKey, index, title, children }: SubtopicSectionProps) {
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const data = getProgress()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setComplete(data.progress[domainKey].subtopics[index] ?? false)
  }, [domainKey, index])

  function handleMarkComplete() {
    setSubtopicComplete(domainKey, index)
    setComplete(true)
  }

  return (
    <section className="mb-12" id={`subtopic-${index}`}>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border)]">
        <h2 className="text-sm font-semibold uppercase tracking-wide">{title}</h2>
        {complete ? (
          <span className="text-[11px] uppercase tracking-widest text-[var(--teal)]">✓ complete</span>
        ) : (
          <button
            onClick={handleMarkComplete}
            className="text-[11px] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--teal)] transition-colors"
          >
            mark_complete
          </button>
        )}
      </div>
      <div>{children}</div>
    </section>
  )
}
