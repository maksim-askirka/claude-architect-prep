// components/DomainRow.tsx
import Link from 'next/link'
import { Domain, DomainProgress } from '@/types'
import { ProgressBar } from './ProgressBar'

interface DomainRowProps {
  domain: Domain
  progress: DomainProgress
}

export function DomainRow({ domain, progress }: DomainRowProps) {
  const completed = progress.subtopics.filter(Boolean).length
  const total = progress.subtopics.length
  const percent = (completed / total) * 100

  return (
    <Link
      href={`/domains/${domain.slug}`}
      className="block border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg2)] transition-colors p-4"
    >
      <div className="flex gap-6">
        {/* Left meta */}
        <div className="shrink-0 w-14">
          <div className="text-[11px] uppercase tracking-widest text-[var(--muted)]">{domain.number}</div>
          <div className="text-[11px] uppercase tracking-widest text-[var(--teal)]">{domain.weight}%</div>
        </div>

        {/* Right content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold mb-2">{domain.title}</div>
          <div className="flex flex-wrap gap-1 mb-3">
            {domain.subtopics.map((sub, i) => (
              <span
                key={i}
                className={`text-[11px] uppercase tracking-wide px-2 py-0.5 ${
                  progress.subtopics[i]
                    ? 'bg-[var(--teal-bg)] text-[var(--teal)]'
                    : 'bg-[var(--bg2)] text-[var(--muted)]'
                }`}
              >
                {sub}
              </span>
            ))}
          </div>
          <ProgressBar percent={percent} />
          <div className="text-[11px] text-[var(--muted)] mt-1">
            {completed}/{total} subtopics · {domain.questionCount} questions
          </div>
        </div>
      </div>
    </Link>
  )
}
