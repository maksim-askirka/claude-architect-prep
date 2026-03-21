interface ScoreDisplayProps {
  correct: number
  total: number
}

export function ScoreDisplay({ correct, total }: ScoreDisplayProps) {
  if (total === 0) return null

  return (
    <div className="text-[11px] uppercase tracking-widest text-[var(--muted)]">
      {correct} / {total} correct
    </div>
  )
}
