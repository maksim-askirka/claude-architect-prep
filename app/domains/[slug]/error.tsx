'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function DomainError({
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
    <div className="min-h-[40vh] flex flex-col justify-center">
      <p className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">status · domain_error</p>
      <h1 className="text-[28px] font-bold tracking-[-0.02em] leading-none mb-6">failed_to_load_domain/</h1>
      <div className="border border-[var(--border)] bg-[var(--bg2)] p-4 mb-6 text-xs text-[var(--text)] font-mono">
        <span className="text-[var(--muted)]">error: </span>
        {error.message || 'could not load domain content'}
        {error.digest && <div className="mt-2 text-[var(--muted)]">digest: {error.digest}</div>}
      </div>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="border border-[var(--border)] px-4 py-2 text-xs hover:border-[var(--teal)] hover:text-[var(--teal)] transition-colors cursor-pointer bg-transparent"
        >
          → try_again
        </button>
        <Link href="/" className="text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors self-center">
          ← back_to_home
        </Link>
      </div>
    </div>
  )
}
