import { DomainKey } from '@/types'
import { DOMAINS } from '@/lib/domains'

interface DomainFilterProps {
  active: DomainKey | 'all'
  onChange: (domain: DomainKey | 'all') => void
}

export function DomainFilter({ active, onChange }: DomainFilterProps) {
  const all = active === 'all'

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onChange('all')}
        className={`text-[11px] uppercase tracking-wide px-3 py-1 border transition-colors ${
          all
            ? 'border-[var(--teal)] text-[var(--teal)] bg-[var(--teal-bg)]'
            : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)] hover:text-[var(--text)]'
        }`}
      >
        All
      </button>
      {DOMAINS.map((d) => (
        <button
          key={d.key}
          onClick={() => onChange(d.key)}
          className={`text-[11px] uppercase tracking-wide px-3 py-1 border transition-colors ${
            active === d.key
              ? 'border-[var(--teal)] text-[var(--teal)] bg-[var(--teal-bg)]'
              : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)] hover:text-[var(--text)]'
          }`}
        >
          {d.number}
        </button>
      ))}
    </div>
  )
}
