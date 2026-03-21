'use client'

// components/ResetButton.tsx
interface ResetButtonProps {
  onReset: () => void
}

export function ResetButton({ onReset }: ResetButtonProps) {
  function handleClick() {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      onReset()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="text-[11px] uppercase tracking-widest text-[var(--muted)] hover:text-red-500 transition-colors"
    >
      reset_all_progress
    </button>
  )
}
