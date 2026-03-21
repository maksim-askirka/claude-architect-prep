// components/WeekRow.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

interface WeekRowProps {
  number: number
  weekKey: string
  title: string
  hours: number
  tasks: string[]
  resources: { label: string; href: string }[]
  complete: boolean
  onToggle: (key: string, complete: boolean) => void
}

export function WeekRow({ number, weekKey, title, hours, tasks, resources, complete, onToggle }: WeekRowProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`border border-[var(--border)] ${complete ? 'bg-[var(--teal-bg)]' : 'bg-[var(--bg)]'}`}>
      {/* Row header */}
      <div className="flex items-center gap-4 p-4">
        <input
          type="checkbox"
          checked={complete}
          onChange={(e) => onToggle(weekKey, e.target.checked)}
          className="accent-[var(--teal)] w-4 h-4 flex-shrink-0"
          aria-label={`Mark week ${number} complete`}
        />
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={`Toggle details for week ${number}`}
          className="flex-1 text-left flex items-center justify-between gap-4"
        >
          <span className={`text-[11px] uppercase tracking-widest flex-shrink-0 ${complete ? 'text-[var(--teal)]' : 'text-[var(--muted)]'}`}>
            week_{String(number).padStart(2, '0')}
          </span>
          <span className={`text-sm font-semibold flex-1 ${complete ? 'line-through text-[var(--muted)]' : ''}`}>
            {title}
          </span>
          <span className="text-[11px] text-[var(--muted)] flex-shrink-0">{hours}h</span>
          <span className="text-[var(--muted)] text-xs flex-shrink-0">{expanded ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-[var(--border)]">
          <ul className="mt-3 space-y-2 mb-4">
            {tasks.map((task, i) => (
              <li key={i} className="text-xs text-[var(--text)] flex gap-2">
                <span className="text-[var(--teal)] flex-shrink-0">→</span>
                {task}
              </li>
            ))}
          </ul>
          {resources.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {resources.map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  target={r.href.startsWith('http') ? '_blank' : undefined}
                  rel={r.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-[11px] uppercase tracking-wide text-[var(--teal)] hover:underline"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
