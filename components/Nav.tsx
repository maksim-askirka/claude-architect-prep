// components/Nav.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'dashboard/' },
  { href: '/practice', label: 'practice/' },
  { href: '/cheatsheet', label: 'cheatsheet/' },
  { href: '/study-plan', label: 'study_plan/' },
  { href: '/scenarios', label: 'scenarios/' },
  { href: '/exercises', label: 'exercises/' },
  { href: '/exam-guide', label: 'exam_guide/' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-sm font-semibold tracking-tight hover:text-[var(--teal)] transition-colors">
          claude_architect/
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs tracking-wide transition-colors ${
                pathname === href
                  ? 'text-[var(--teal)]'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs border border-[var(--teal)] text-[var(--teal)] px-3 py-1 hover:bg-[var(--teal-bg)] transition-colors"
          >
            register_for_exam →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[var(--muted)] hover:text-[var(--text)] text-lg leading-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-3 flex flex-col gap-3">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-xs tracking-wide ${
                pathname === href ? 'text-[var(--teal)]' : 'text-[var(--muted)]'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs border border-[var(--teal)] text-[var(--teal)] px-3 py-1 w-fit hover:bg-[var(--teal-bg)] transition-colors"
          >
            register_for_exam →
          </a>
        </div>
      )}
    </nav>
  )
}
