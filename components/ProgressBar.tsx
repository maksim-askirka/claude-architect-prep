// components/ProgressBar.tsx
interface ProgressBarProps {
  percent: number
  className?: string
}

export function ProgressBar({ percent, className = '' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent))
  return (
    <div className={`w-full h-[2px] bg-[var(--border)] ${className}`}>
      <div
        data-testid="bar-fill"
        className="h-full bg-[var(--teal)] transition-all duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
