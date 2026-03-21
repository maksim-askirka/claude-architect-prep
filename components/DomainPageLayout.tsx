// components/DomainPageLayout.tsx
import Link from 'next/link'
import { Domain } from '@/types'
import { DOMAINS } from '@/lib/domains'

interface Props {
  domain: Domain
  children: React.ReactNode
}

export function DomainPageLayout({ domain, children }: Props) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--teal)] transition-colors">
          dashboard/
        </Link>
        {' → '}
        <span>domains/</span>
        {' → '}
        <span className="text-[var(--text)]">{domain.slug}/</span>
      </div>

      {/* Domain header */}
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-widest text-[var(--teal)] mb-1">
          {domain.number} · {domain.weight}% of exam · {domain.questionCount} practice questions
        </div>
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] leading-tight">
          {domain.title}
        </h1>
      </div>

      {/* Domain tab nav */}
      <div className="flex gap-2 flex-wrap mb-8 pb-6 border-b border-[var(--border)]">
        {DOMAINS.map((d) => (
          <Link
            key={d.key}
            href={`/domains/${d.slug}`}
            className={`text-[11px] uppercase tracking-wide px-3 py-1 border transition-colors ${
              d.key === domain.key
                ? 'border-[var(--teal)] text-[var(--teal)] bg-[var(--teal-bg)]'
                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)] hover:text-[var(--text)]'
            }`}
          >
            {d.number}
          </Link>
        ))}
        <Link
          href="/practice"
          className="text-[11px] uppercase tracking-wide px-3 py-1 border border-[var(--border)] text-[var(--muted)] hover:border-[var(--teal)] hover:text-[var(--teal)] transition-colors ml-auto"
        >
          practice/
        </Link>
      </div>

      {/* MDX content */}
      <div>{children}</div>
    </div>
  )
}
