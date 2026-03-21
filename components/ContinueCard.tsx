// components/ContinueCard.tsx
import Link from 'next/link'

interface ContinueCardProps {
  lastVisited: string | null
}

export function ContinueCard({ lastVisited }: ContinueCardProps) {
  if (!lastVisited) {
    return (
      <div className="border border-[var(--border)] p-4 text-sm">
        <span className="text-[var(--teal)] font-semibold">start_here/</span>
        {' → '}
        <Link href="/domains/agentic-architecture" className="text-[var(--teal)] hover:underline">
          week_01
        </Link>
      </div>
    )
  }

  return (
    <div className="border border-[var(--border)] p-4 text-sm">
      <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-1">
        continue where you left off
      </div>
      <Link href={lastVisited} className="text-[var(--teal)] hover:underline">
        {lastVisited}
      </Link>
    </div>
  )
}
