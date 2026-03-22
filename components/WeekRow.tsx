// components/WeekRow.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Week } from '@/lib/study-plan'
import { pad2, isExternal } from '@/lib/utils'

interface WeekRowProps {
  week: Week
  complete: boolean
  onToggle: (key: string, complete: boolean) => void
}

export function WeekRow({ week, complete, onToggle }: WeekRowProps) {
  const [expanded, setExpanded] = useState(false)
  const weekNumber = parseInt(week.key.replace('week', ''), 10)

  return (
    <div className={`border border-[var(--border)] ${complete ? 'bg-[var(--teal-bg)]' : 'bg-[var(--bg)]'}`}>
      {/* Row header */}
      <div className="flex items-center gap-4 p-4">
        <input
          type="checkbox"
          checked={complete}
          onChange={(e) => onToggle(week.key, e.target.checked)}
          className="accent-[var(--teal)] w-4 h-4 flex-shrink-0"
          aria-label={`Mark week ${weekNumber} complete`}
        />
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={`Toggle details for week ${weekNumber}`}
          className="flex-1 text-left flex items-center justify-between gap-4"
        >
          <span className={`text-[11px] uppercase tracking-widest flex-shrink-0 ${complete ? 'text-[var(--teal)]' : 'text-[var(--muted)]'}`}>
            week_{pad2(weekNumber)}
          </span>
          <span className={`text-sm font-semibold flex-1 ${complete ? 'line-through text-[var(--muted)]' : ''}`}>
            {week.title}
          </span>
          <span className="text-[11px] text-[var(--muted)] flex-shrink-0">{week.hours}h</span>
          <span className="text-[var(--muted)] text-xs flex-shrink-0">{expanded ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-[var(--border)]">
          <ul className="mt-3 space-y-2 mb-4">
            {week.tasks.map((task, i) => (
              <li key={i} className="text-xs text-[var(--text)] flex gap-2">
                <span className="text-[var(--teal)] flex-shrink-0">→</span>
                {task}
              </li>
            ))}
          </ul>
          {week.resources.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {week.resources.map((r, i) => {
                const ext = isExternal(r.href)
                return (
                  <Link
                    key={i}
                    href={r.href}
                    target={ext ? '_blank' : undefined}
                    rel={ext ? 'noopener noreferrer' : undefined}
                    className="text-[11px] uppercase tracking-wide text-[var(--teal)] hover:underline"
                  >
                    {r.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
