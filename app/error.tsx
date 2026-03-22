'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col justify-center">
      <p className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">
        status · runtime_error
      </p>
      <h1 className="text-[36px] font-bold tracking-[-0.02em] leading-none mb-6">
        something_went_wrong/
      </h1>

      <div className="border border-[var(--border)] bg-[var(--bg2)] p-4 mb-6 text-xs text-[var(--text)] font-mono">
        <span className="text-[var(--muted)]">error: </span>
        {error.message || 'an unexpected error occurred'}
        {error.digest && (
          <div className="mt-2 text-[var(--muted)]">digest: {error.digest}</div>
        )}
      </div>

      <div>
        <button
          onClick={reset}
          className="border border-[var(--border)] px-4 py-2 text-xs hover:border-[var(--teal)] hover:text-[var(--teal)] transition-colors cursor-pointer bg-transparent"
        >
          → try_again
        </button>
      </div>
    </div>
  )
}
