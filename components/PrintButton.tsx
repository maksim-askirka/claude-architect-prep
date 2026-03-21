// components/PrintButton.tsx
'use client'
export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="hidden md:block text-[11px] uppercase tracking-widest border border-[var(--border)] px-3 py-1 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors"
    >
      print/
    </button>
  )
}
