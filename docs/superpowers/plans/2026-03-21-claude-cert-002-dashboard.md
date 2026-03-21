# Claude Cert Prep Hub — 002 Dashboard Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/` dashboard — per-domain progress bars, "continue where you left off" card, weekly plan summary widget, and reset button — all driven by localStorage state from Plan 001.

**Architecture:** `app/page.tsx` is a client component (`'use client'`). A `useProgress` hook wraps `getProgress()` from `lib/progress.ts` and manages state. Five standalone components (ProgressBar, DomainRow, ContinueCard, WeekSummary, ResetButton) are tested independently with React Testing Library.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Jest, React Testing Library

**Prerequisite:** Plan 001 complete — `lib/progress.ts`, `lib/domains.ts`, `types/index.ts` all exist.

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `components/ProgressBar.tsx` | 2px teal progress line (0–100%) |
| Create | `components/DomainRow.tsx` | Domain card with meta, subtopic tags, progress bar, link |
| Create | `components/ContinueCard.tsx` | "Continue where you left off" or "start_here" first-visit state |
| Create | `components/WeekSummary.tsx` | Current week label + completion count out of 12 |
| Create | `components/ResetButton.tsx` | Confirm + clear all localStorage |
| Create | `hooks/useProgress.ts` | Client hook: reads localStorage, exposes data + reset |
| Modify | `app/page.tsx` | Full dashboard assembled from above components |
| Create | `__tests__/components/ProgressBar.test.tsx` | Unit tests |
| Create | `__tests__/components/DomainRow.test.tsx` | Unit tests |
| Create | `__tests__/components/ContinueCard.test.tsx` | Unit tests |
| Create | `__tests__/components/WeekSummary.test.tsx` | Unit tests |
| Create | `__tests__/components/ResetButton.test.tsx` | Unit tests |

---

## Tasks

### Task 1: ProgressBar component

**Files:**
- Create: `components/ProgressBar.tsx`
- Create: `__tests__/components/ProgressBar.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/ProgressBar.test.tsx
import { render, screen } from '@testing-library/react'
import { ProgressBar } from '@/components/ProgressBar'

describe('ProgressBar', () => {
  it('renders a bar with the given width percentage', () => {
    const { container } = render(<ProgressBar percent={60} />)
    const fill = container.querySelector('[data-testid="bar-fill"]')
    expect(fill).toHaveStyle({ width: '60%' })
  })

  it('clamps above 100 to 100%', () => {
    const { container } = render(<ProgressBar percent={150} />)
    const fill = container.querySelector('[data-testid="bar-fill"]')
    expect(fill).toHaveStyle({ width: '100%' })
  })

  it('clamps below 0 to 0%', () => {
    const { container } = render(<ProgressBar percent={-10} />)
    const fill = container.querySelector('[data-testid="bar-fill"]')
    expect(fill).toHaveStyle({ width: '0%' })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/ProgressBar.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/ProgressBar'`

- [ ] **Step 3: Implement ProgressBar**

```tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/ProgressBar.test.tsx
```
Expected: All 3 tests PASS

---

### Task 2: DomainRow component

**Files:**
- Create: `components/DomainRow.tsx`
- Create: `__tests__/components/DomainRow.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/DomainRow.test.tsx
import { render, screen } from '@testing-library/react'
import { DomainRow } from '@/components/DomainRow'
import { DOMAINS } from '@/lib/domains'

const d1 = DOMAINS[0] // D1, 4 subtopics
const emptyProgress = { subtopics: [false, false, false, false], quiz: null }
const halfProgress = { subtopics: [true, true, false, false], quiz: null }

describe('DomainRow', () => {
  it('renders domain title and weight', () => {
    render(<DomainRow domain={d1} progress={emptyProgress} />)
    expect(screen.getByText('Agentic Architecture & Orchestration')).toBeInTheDocument()
    expect(screen.getByText('27%')).toBeInTheDocument()
  })

  it('renders all subtopic tags', () => {
    render(<DomainRow domain={d1} progress={emptyProgress} />)
    expect(screen.getByText('Agentic Loops & Core API')).toBeInTheDocument()
    expect(screen.getByText('Multi-Agent Orchestration')).toBeInTheDocument()
  })

  it('shows correct completion count', () => {
    render(<DomainRow domain={d1} progress={halfProgress} />)
    expect(screen.getByText(/2\/4 subtopics/)).toBeInTheDocument()
  })

  it('links to the correct domain route', () => {
    render(<DomainRow domain={d1} progress={emptyProgress} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/domains/agentic-architecture')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/DomainRow.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/DomainRow'`

- [ ] **Step 3: Implement DomainRow**

```tsx
// components/DomainRow.tsx
import Link from 'next/link'
import { Domain, DomainProgress } from '@/types'
import { ProgressBar } from './ProgressBar'

interface DomainRowProps {
  domain: Domain
  progress: DomainProgress
}

export function DomainRow({ domain, progress }: DomainRowProps) {
  const completed = progress.subtopics.filter(Boolean).length
  const total = progress.subtopics.length
  const percent = (completed / total) * 100

  return (
    <Link
      href={`/domains/${domain.slug}`}
      className="block border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg2)] transition-colors p-4"
    >
      <div className="flex gap-6">
        {/* Left meta */}
        <div className="shrink-0 w-14">
          <div className="text-[11px] uppercase tracking-widest text-[var(--muted)]">{domain.number}</div>
          <div className="text-[11px] uppercase tracking-widest text-[var(--teal)]">{domain.weight}%</div>
        </div>

        {/* Right content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold mb-2">{domain.title}</div>
          <div className="flex flex-wrap gap-1 mb-3">
            {domain.subtopics.map((sub, i) => (
              <span
                key={i}
                className={`text-[11px] uppercase tracking-wide px-2 py-0.5 ${
                  progress.subtopics[i]
                    ? 'bg-[var(--teal-bg)] text-[var(--teal)]'
                    : 'bg-[var(--bg2)] text-[var(--muted)]'
                }`}
              >
                {sub}
              </span>
            ))}
          </div>
          <ProgressBar percent={percent} />
          <div className="text-[11px] text-[var(--muted)] mt-1">
            {completed}/{total} subtopics · {domain.questionCount} questions
          </div>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/DomainRow.test.tsx
```
Expected: All 4 tests PASS

---

### Task 3: ContinueCard component

**Files:**
- Create: `components/ContinueCard.tsx`
- Create: `__tests__/components/ContinueCard.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/ContinueCard.test.tsx
import { render, screen } from '@testing-library/react'
import { ContinueCard } from '@/components/ContinueCard'

describe('ContinueCard', () => {
  it('shows start_here link when lastVisited is null', () => {
    render(<ContinueCard lastVisited={null} />)
    expect(screen.getByText(/start_here/)).toBeInTheDocument()
  })

  it('shows the lastVisited path as a link when set', () => {
    render(<ContinueCard lastVisited="/domains/prompt-engineering" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/domains/prompt-engineering')
    expect(screen.getByText('/domains/prompt-engineering')).toBeInTheDocument()
  })

  it('shows "continue where you left off" label when lastVisited is set', () => {
    render(<ContinueCard lastVisited="/practice" />)
    expect(screen.getByText(/continue where you left off/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/ContinueCard.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Implement ContinueCard**

```tsx
// components/ContinueCard.tsx
import Link from 'next/link'

interface ContinueCardProps {
  lastVisited: string | null
}

export function ContinueCard({ lastVisited }: ContinueCardProps) {
  if (!lastVisited) {
    return (
      <div className="border border-[var(--border)] p-4 text-sm">
        <span className="text-[var(--teal)] font-semibold">start_here/</span>
        {' → '}
        <Link href="/domains/agentic-architecture" className="text-[var(--teal)] hover:underline">
          week_01
        </Link>
      </div>
    )
  }

  return (
    <div className="border border-[var(--border)] p-4 text-sm">
      <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-1">
        continue where you left off
      </div>
      <Link href={lastVisited} className="text-[var(--teal)] hover:underline">
        {lastVisited}
      </Link>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/ContinueCard.test.tsx
```
Expected: All 3 tests PASS

---

### Task 4: WeekSummary component

**Files:**
- Create: `components/WeekSummary.tsx`
- Create: `__tests__/components/WeekSummary.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/WeekSummary.test.tsx
import { render, screen } from '@testing-library/react'
import { WeekSummary } from '@/components/WeekSummary'

const allFalse = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, false]))
const week1Done = { ...allFalse, week1: true }
const allDone = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, true]))

describe('WeekSummary', () => {
  it('shows week_01 as current when nothing complete', () => {
    render(<WeekSummary studyPlan={allFalse} />)
    expect(screen.getByText(/week_01/)).toBeInTheDocument()
  })

  it('shows 0/12 complete when all false', () => {
    render(<WeekSummary studyPlan={allFalse} />)
    expect(screen.getByText(/0\/12/)).toBeInTheDocument()
  })

  it('advances current week when week 1 complete', () => {
    render(<WeekSummary studyPlan={week1Done} />)
    expect(screen.getByText(/week_02/)).toBeInTheDocument()
    expect(screen.getByText(/1\/12/)).toBeInTheDocument()
  })

  it('shows week_12 when all complete', () => {
    render(<WeekSummary studyPlan={allDone} />)
    expect(screen.getByText(/week_12/)).toBeInTheDocument()
    expect(screen.getByText(/12\/12/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/WeekSummary.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Implement WeekSummary**

```tsx
// components/WeekSummary.tsx
interface WeekSummaryProps {
  studyPlan: Record<string, boolean>
}

export function WeekSummary({ studyPlan }: WeekSummaryProps) {
  const weeks = Object.entries(studyPlan)
  const completedCount = weeks.filter(([, v]) => v).length
  const currentWeekIndex = weeks.findIndex(([, v]) => !v)
  const currentWeek = currentWeekIndex === -1 ? 12 : currentWeekIndex + 1

  return (
    <div className="border border-[var(--border)] p-4">
      <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">
        12-week study plan
      </div>
      <div className="text-sm font-semibold">
        week_{String(currentWeek).padStart(2, '0')}
        <span className="text-[var(--muted)] font-normal ml-2">
          ({completedCount}/12 weeks complete)
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/WeekSummary.test.tsx
```
Expected: All 4 tests PASS

---

### Task 5: ResetButton component

**Files:**
- Create: `components/ResetButton.tsx`
- Create: `__tests__/components/ResetButton.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/ResetButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ResetButton } from '@/components/ResetButton'

describe('ResetButton', () => {
  it('renders reset label', () => {
    render(<ResetButton onReset={() => {}} />)
    expect(screen.getByRole('button')).toHaveTextContent(/reset_all_progress/i)
  })

  it('calls onReset when confirmed', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true)
    const onReset = jest.fn()
    render(<ResetButton onReset={onReset} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('does NOT call onReset when cancelled', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false)
    const onReset = jest.fn()
    render(<ResetButton onReset={onReset} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onReset).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/ResetButton.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Implement ResetButton**

```tsx
// components/ResetButton.tsx
'use client'

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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/ResetButton.test.tsx
```
Expected: All 3 tests PASS

- [ ] **Step 5: Commit components**

```bash
git add components/ __tests__/components/
git commit -m "feat: add ProgressBar, DomainRow, ContinueCard, WeekSummary, ResetButton with tests"
```

---

### Task 6: Create useProgress hook

**Files:**
- Create: `hooks/useProgress.ts`

- [ ] **Step 1: Create hooks/useProgress.ts**

```typescript
// hooks/useProgress.ts
'use client'
import { useState, useEffect, useCallback } from 'react'
import { getProgress, resetProgress as resetLib } from '@/lib/progress'
import { ProgressData } from '@/types'

export function useProgress() {
  const [data, setData] = useState<ProgressData>(() => getProgress())

  const reload = useCallback(() => {
    setData(getProgress())
  }, [])

  const reset = useCallback(() => {
    resetLib()
    setData(getProgress())
  }, [])

  // Re-read on mount (handles SSR/hydration)
  useEffect(() => {
    reload()
  }, [reload])

  return { data, reload, reset }
}
```

---

### Task 7: Assemble Dashboard page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx with full dashboard**

```tsx
// app/page.tsx
'use client'
import { useProgress } from '@/hooks/useProgress'
import { DOMAINS } from '@/lib/domains'
import { DomainRow } from '@/components/DomainRow'
import { ContinueCard } from '@/components/ContinueCard'
import { WeekSummary } from '@/components/WeekSummary'
import { ResetButton } from '@/components/ResetButton'

export default function DashboardPage() {
  const { data, reset } = useProgress()

  const totalSubtopics = DOMAINS.reduce((sum, d) => sum + d.subtopics.length, 0)
  const completedSubtopics = DOMAINS.reduce(
    (sum, d) => sum + data.progress[d.key].subtopics.filter(Boolean).length,
    0
  )
  const overallPercent = Math.round((completedSubtopics / totalSubtopics) * 100)

  return (
    <div>
      {/* Hero */}
      <h1 className="text-[52px] md:text-[52px] text-[36px] font-bold tracking-[-0.03em] leading-none mb-2">
        claude_architect/
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        certified architect exam prep · {overallPercent}% complete
      </p>

      {/* Top cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <ContinueCard lastVisited={data.lastVisited} />
        <WeekSummary studyPlan={data.studyPlan} />
      </div>

      {/* Domain rows */}
      <div className="flex flex-col gap-3 mb-8">
        {DOMAINS.map((domain) => (
          <DomainRow
            key={domain.key}
            domain={domain}
            progress={data.progress[domain.key]}
          />
        ))}
      </div>

      {/* Reset */}
      <div className="pt-4 border-t border-[var(--border)]">
        <ResetButton onReset={reset} />
      </div>
    </div>
  )
}
```

---

### Task 8: Verify in browser + run all tests

- [ ] **Step 1: Run all tests**

```bash
npx jest
```
Expected: All tests pass (progress.test + 5 component tests)

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

- [ ] **Step 3: Verify dashboard at http://localhost:3000**

Check:
- Hero text "claude_architect/" renders at ~52px in IBM Plex Mono
- Both cards (ContinueCard shows "start_here/", WeekSummary shows "week_01")
- All 5 domain rows render with correct titles, weights, subtopic tags
- Progress bars show 0% (2px teal line at 0 width)
- "0% complete" in subtitle
- Reset button visible at bottom

- [ ] **Step 4: Manually test reset flow**

Open DevTools → Application → localStorage. Note it's empty. Refresh. Still empty state (default). Click reset button — confirm dialog appears. Click Cancel — nothing happens. Click OK — progress cleared (already empty but no error).

- [ ] **Step 5: Check mobile layout at 375px**

In DevTools, toggle mobile view (375px). Verify:
- Hero text scales down (class `text-[36px]` on mobile via Tailwind responsive)
- 2-column top cards stack to single column
- Nav hamburger appears

---

### Task 9: Final commit

- [ ] **Step 1: Stage and commit**

```bash
git add app/page.tsx hooks/useProgress.ts
git commit -m "feat: dashboard page — progress overview, domain rows, continue card, week summary, reset"
```
