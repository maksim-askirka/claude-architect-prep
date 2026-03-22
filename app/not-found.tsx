import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center">
      <p className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">
        status · 404
      </p>
      <h1 className="text-[36px] font-bold tracking-[-0.02em] leading-none mb-4">
        page_not_found/
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        the route you requested does not exist
      </p>
      <Link
        href="/"
        className="text-xs text-[var(--teal)] hover:underline underline-offset-4"
      >
        ← back_to_home
      </Link>
    </div>
  )
}
