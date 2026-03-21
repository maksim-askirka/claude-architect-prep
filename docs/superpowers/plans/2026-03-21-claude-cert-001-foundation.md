# Claude Cert Prep Hub — 001 Foundation & Setup

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the Next.js 15 project with TypeScript, Tailwind CSS, IBM Plex Mono, design tokens, localStorage utility, domain config, and placeholder routes — so every subsequent phase builds on a stable, styled, typed foundation.

**Architecture:** Next.js 15 App Router with TypeScript. Design tokens as CSS custom properties in `globals.css`. localStorage abstracted in `lib/progress.ts`. Domain metadata centralized in `lib/domains.ts`. All 8 routes scaffolded as stubs. Jest + React Testing Library configured.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3, IBM Plex Mono (next/font/google), Jest, React Testing Library

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `next.config.ts` | Next.js config (baseline, MDX added in plan 003) |
| Create | `tailwind.config.ts` | Tailwind: font extension |
| Create | `jest.config.ts` | Jest with next/jest, jsdom, `@/` alias |
| Create | `app/globals.css` | CSS custom properties + Tailwind base/components/utilities |
| Create | `app/layout.tsx` | Root layout: IBM Plex Mono, Nav, `<main>` |
| Create | `app/page.tsx` | Placeholder stub |
| Create | `app/domains/[slug]/page.tsx` | Placeholder stub |
| Create | `app/practice/page.tsx` | Placeholder stub |
| Create | `app/cheatsheet/page.tsx` | Placeholder stub |
| Create | `app/study-plan/page.tsx` | Placeholder stub |
| Create | `app/scenarios/page.tsx` | Placeholder stub |
| Create | `app/exercises/page.tsx` | Placeholder stub |
| Create | `app/exam-guide/page.tsx` | Placeholder stub |
| Create | `components/Nav.tsx` | Nav bar — logo, links, register CTA, hamburger |
| Create | `lib/progress.ts` | localStorage CRUD — get, save, reset, subtopic/quiz/week setters |
| Create | `lib/domains.ts` | Domain config array (5 domains, slugs, subtopics, weights) |
| Create | `types/index.ts` | Shared TypeScript types |
| Create | `__tests__/lib/progress.test.ts` | Unit tests for localStorage utility |

---

## Tasks

### Task 1: Initialize Next.js 15 project

**Files:**
- Create: project root (via `create-next-app`)
- Create: `jest.config.ts`
- Modify: `package.json` (add test script + testing deps)

- [ ] **Step 1: Run create-next-app**

```bash
cd /Users/Maksim_Askirka/super01
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-import-alias --turbopack
```

When prompted:
- Project name: `.` (current dir)
- TypeScript: Yes
- ESLint: Yes
- Tailwind: Yes
- `src/` directory: No
- App Router: Yes
- Turbopack: Yes
- Import alias: No (we'll configure manually)

- [ ] **Step 2: Install testing dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Create jest.config.ts**

```typescript
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

export default createJestConfig(config)
```

- [ ] **Step 4: Create jest.setup.ts**

```typescript
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 6: Verify test runner works**

```bash
npx jest --passWithNoTests
```
Expected: `Test Suites: 0 passed` (no test files yet)

---

### Task 2: Configure Tailwind with IBM Plex Mono

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #f5f4f0;
  --bg2: #eeecea;
  --text: #2a2a2a;
  --muted: #8a8a8a;
  --border: #dddbd6;
  --teal: #2cb67d;
  --teal-bg: #e8f8f0;
}

* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-mono), 'IBM Plex Mono', monospace;
  -webkit-font-smoothing: antialiased;
  background-color: var(--bg);
  color: var(--text);
}
```

---

### Task 3: Create TypeScript types

**Files:**
- Create: `types/index.ts`

- [ ] **Step 1: Create types/index.ts**

```typescript
// types/index.ts

export type DomainKey = 'd1' | 'd2' | 'd3' | 'd4' | 'd5'

export interface Domain {
  key: DomainKey
  slug: string
  number: string
  title: string
  weight: number
  subtopics: string[]
  scenario: string
  questionCount: number
}

export interface DomainProgress {
  subtopics: boolean[]
  quiz: { correct: number; total: number } | null
}

export interface ProgressData {
  progress: Record<DomainKey, DomainProgress>
  studyPlan: Record<string, boolean>
  lastVisited: string | null
}
```

---

### Task 4: Create domain config

**Files:**
- Create: `lib/domains.ts`

- [ ] **Step 1: Create lib/domains.ts**

```typescript
// lib/domains.ts
import { Domain } from '@/types'

export const DOMAINS: Domain[] = [
  {
    key: 'd1',
    slug: 'agentic-architecture',
    number: 'D1',
    title: 'Agentic Architecture & Orchestration',
    weight: 27,
    subtopics: [
      'Agentic Loops & Core API',
      'Multi-Agent Orchestration',
      'Hooks & Programmatic Enforcement',
      'Session Management & Workflows',
    ],
    scenario: 'Multi-Agent Research System',
    questionCount: 6,
  },
  {
    key: 'd2',
    slug: 'tool-design',
    number: 'D2',
    title: 'Tool Design & MCP Integration',
    weight: 18,
    subtopics: [
      'Tool Description Best Practices',
      'Structured Error Responses',
      'Tool Distribution & Selection',
      'MCP Server Configuration',
      'Built-in Tools',
    ],
    scenario: 'Customer Support Resolution Agent',
    questionCount: 4,
  },
  {
    key: 'd3',
    slug: 'claude-code',
    number: 'D3',
    title: 'Claude Code Configuration & Workflows',
    weight: 20,
    subtopics: [
      'CLAUDE.md Hierarchy & Configuration',
      'Custom Commands & Skills',
      'Plan Mode & Iterative Refinement',
      'CI/CD Integration & Batch Processing',
    ],
    scenario: 'Claude Code for CI/CD',
    questionCount: 5,
  },
  {
    key: 'd4',
    slug: 'prompt-engineering',
    number: 'D4',
    title: 'Prompt Engineering & Structured Output',
    weight: 20,
    subtopics: [
      'Explicit Criteria & Instruction Design',
      'Few-Shot Prompting',
      'Tool Use for Structured Output',
      'Validation-Retry Loops & Multi-Pass Review',
    ],
    scenario: 'Structured Data Extraction',
    questionCount: 5,
  },
  {
    key: 'd5',
    slug: 'context-management',
    number: 'D5',
    title: 'Context Management & Reliability',
    weight: 15,
    subtopics: [
      'Context Optimization & Positioning',
      'Escalation & Error Propagation',
      'Context Degradation & Extended Sessions',
      'Human Review & Information Provenance',
    ],
    scenario: 'Code Generation with Claude Code',
    questionCount: 5,
  },
]

export function getDomainBySlug(slug: string): Domain | undefined {
  return DOMAINS.find((d) => d.slug === slug)
}

export function getDomainByKey(key: string): Domain | undefined {
  return DOMAINS.find((d) => d.key === key)
}
```

---

### Task 5: Write failing tests for localStorage utility

**Files:**
- Create: `__tests__/lib/progress.test.ts`

- [ ] **Step 1: Create __tests__/lib/progress.test.ts**

```typescript
// __tests__/lib/progress.test.ts
import {
  getProgress,
  saveProgress,
  resetProgress,
  setSubtopicComplete,
  setQuizResult,
  setWeekComplete,
  setLastVisited,
  getDomainCompletion,
} from '@/lib/progress'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, val: string) => { store[key] = val },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

beforeEach(() => localStorageMock.clear())

describe('getProgress', () => {
  it('returns default data when nothing stored', () => {
    const data = getProgress()
    expect(data.progress.d1.subtopics).toEqual([false, false, false, false])
    expect(data.progress.d2.subtopics).toEqual([false, false, false, false, false])
    expect(data.progress.d1.quiz).toBeNull()
    expect(data.studyPlan.week1).toBe(false)
    expect(data.lastVisited).toBeNull()
  })

  it('returns parsed data when stored', () => {
    const d = getProgress()
    d.lastVisited = '/domains/agentic-architecture'
    saveProgress(d)
    expect(getProgress().lastVisited).toBe('/domains/agentic-architecture')
  })
})

describe('setSubtopicComplete', () => {
  it('marks subtopic at index as true', () => {
    setSubtopicComplete('d1', 0)
    expect(getProgress().progress.d1.subtopics[0]).toBe(true)
    expect(getProgress().progress.d1.subtopics[1]).toBe(false)
  })

  it('does not affect other domains', () => {
    setSubtopicComplete('d1', 0)
    expect(getProgress().progress.d2.subtopics[0]).toBe(false)
  })
})

describe('setQuizResult', () => {
  it('stores correct and total for a domain', () => {
    setQuizResult('d3', 4, 5)
    expect(getProgress().progress.d3.quiz).toEqual({ correct: 4, total: 5 })
  })

  it('overwrites previous result', () => {
    setQuizResult('d3', 3, 5)
    setQuizResult('d3', 5, 5)
    expect(getProgress().progress.d3.quiz).toEqual({ correct: 5, total: 5 })
  })
})

describe('setWeekComplete', () => {
  it('marks a week complete', () => {
    setWeekComplete('week3', true)
    expect(getProgress().studyPlan.week3).toBe(true)
  })

  it('can unmark a week', () => {
    setWeekComplete('week3', true)
    setWeekComplete('week3', false)
    expect(getProgress().studyPlan.week3).toBe(false)
  })
})

describe('setLastVisited', () => {
  it('stores the path', () => {
    setLastVisited('/practice')
    expect(getProgress().lastVisited).toBe('/practice')
  })
})

describe('getDomainCompletion', () => {
  it('returns 0 when no subtopics complete', () => {
    expect(getDomainCompletion('d1')).toBe(0)
  })

  it('returns 0.5 when half complete (d1 has 4)', () => {
    setSubtopicComplete('d1', 0)
    setSubtopicComplete('d1', 1)
    expect(getDomainCompletion('d1')).toBe(0.5)
  })

  it('returns 1 when all complete', () => {
    ;[0, 1, 2, 3].forEach((i) => setSubtopicComplete('d1', i))
    expect(getDomainCompletion('d1')).toBe(1)
  })
})

describe('resetProgress', () => {
  it('clears all stored progress back to defaults', () => {
    setSubtopicComplete('d1', 0)
    setQuizResult('d2', 3, 4)
    setWeekComplete('week5', true)
    resetProgress()
    const data = getProgress()
    expect(data.progress.d1.subtopics[0]).toBe(false)
    expect(data.progress.d2.quiz).toBeNull()
    expect(data.studyPlan.week5).toBe(false)
    expect(data.lastVisited).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npx jest __tests__/lib/progress.test.ts
```
Expected: FAIL — `Cannot find module '@/lib/progress'`

---

### Task 6: Implement localStorage utility

**Files:**
- Create: `lib/progress.ts`

- [ ] **Step 1: Create lib/progress.ts**

```typescript
// lib/progress.ts
import { DomainKey, DomainProgress, ProgressData } from '@/types'

const STORAGE_KEY = 'architect-prep'

const DEFAULT: ProgressData = {
  progress: {
    d1: { subtopics: [false, false, false, false], quiz: null },
    d2: { subtopics: [false, false, false, false, false], quiz: null },
    d3: { subtopics: [false, false, false, false], quiz: null },
    d4: { subtopics: [false, false, false, false], quiz: null },
    d5: { subtopics: [false, false, false, false], quiz: null },
  },
  studyPlan: Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, false])
  ),
  lastVisited: null,
}

export function getProgress(): ProgressData {
  if (typeof window === 'undefined') return structuredClone(DEFAULT)
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : structuredClone(DEFAULT)
  } catch {
    return structuredClone(DEFAULT)
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function setSubtopicComplete(domain: DomainKey, index: number): void {
  const data = getProgress()
  data.progress[domain].subtopics[index] = true
  saveProgress(data)
}

export function setQuizResult(domain: DomainKey, correct: number, total: number): void {
  const data = getProgress()
  data.progress[domain].quiz = { correct, total }
  saveProgress(data)
}

export function setWeekComplete(week: string, complete: boolean): void {
  const data = getProgress()
  data.studyPlan[week] = complete
  saveProgress(data)
}

export function setLastVisited(path: string): void {
  const data = getProgress()
  data.lastVisited = path
  saveProgress(data)
}

export function getDomainCompletion(domain: DomainKey): number {
  const data = getProgress()
  const subtopics = data.progress[domain].subtopics
  return subtopics.filter(Boolean).length / subtopics.length
}
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
npx jest __tests__/lib/progress.test.ts
```
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add lib/progress.ts __tests__/lib/progress.test.ts types/index.ts lib/domains.ts
git commit -m "feat: add types, domain config, localStorage utility with tests"
```

---

### Task 7: Create Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create components/Nav.tsx**

```tsx
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
```

---

### Task 8: Update root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Claude Certified Architect Prep',
    template: '%s | Claude Architect Prep',
  },
  description:
    'Free exam prep for the Claude Certified Architect – Foundations certification. All 5 domains, 33+ practice questions, 12-week study plan.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body className="font-mono bg-[var(--bg)] text-[var(--text)] min-h-screen">
        <Nav />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
```

---

### Task 9: Create placeholder pages for all routes

**Files:**
- Modify: `app/page.tsx`
- Create: `app/domains/[slug]/page.tsx`
- Create: `app/practice/page.tsx`
- Create: `app/cheatsheet/page.tsx`
- Create: `app/study-plan/page.tsx`
- Create: `app/scenarios/page.tsx`
- Create: `app/exercises/page.tsx`
- Create: `app/exam-guide/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

```tsx
export default function DashboardPage() {
  return <p className="text-[var(--muted)] text-sm">dashboard/ — coming in plan 002</p>
}
```

- [ ] **Step 2: Create app/domains/[slug]/page.tsx**

```tsx
export default function DomainPage({ params }: { params: { slug: string } }) {
  return <p className="text-[var(--muted)] text-sm">domains/{params.slug} — coming in plan 003</p>
}
```

- [ ] **Step 3: Create remaining placeholder pages**

Each file follows the same pattern — copy-paste, changing the path label:

`app/practice/page.tsx`:
```tsx
export default function PracticePage() {
  return <p className="text-[var(--muted)] text-sm">practice/ — coming in plan 004</p>
}
```

`app/cheatsheet/page.tsx`:
```tsx
export default function CheatsheetPage() {
  return <p className="text-[var(--muted)] text-sm">cheatsheet/ — coming in plan 005</p>
}
```

`app/study-plan/page.tsx`:
```tsx
export default function StudyPlanPage() {
  return <p className="text-[var(--muted)] text-sm">study_plan/ — coming in plan 005</p>
}
```

`app/scenarios/page.tsx`:
```tsx
export default function ScenariosPage() {
  return <p className="text-[var(--muted)] text-sm">scenarios/ — coming in plan 005</p>
}
```

`app/exercises/page.tsx`:
```tsx
export default function ExercisesPage() {
  return <p className="text-[var(--muted)] text-sm">exercises/ — coming in plan 005</p>
}
```

`app/exam-guide/page.tsx`:
```tsx
export default function ExamGuidePage() {
  return <p className="text-[var(--muted)] text-sm">exam_guide/ — coming in plan 005</p>
}
```

---

### Task 10: Verify dev server + run all tests

- [ ] **Step 1: Run all tests**

```bash
npx jest
```
Expected: All tests pass. Test file: `__tests__/lib/progress.test.ts`

- [ ] **Step 2: Run dev server**

```bash
npm run dev
```
Expected: Server starts at `http://localhost:3000`

- [ ] **Step 3: Check routes in browser**

Visit each route and confirm the stub text renders with the correct font (IBM Plex Mono) and background (`#f5f4f0`):
- `http://localhost:3000/` — "dashboard/ — coming in plan 002"
- `http://localhost:3000/practice` — practice stub
- `http://localhost:3000/domains/agentic-architecture` — domain stub
- `http://localhost:3000/cheatsheet` — cheatsheet stub

- [ ] **Step 4: Check Nav renders with all links and teal CTA**

---

### Task 11: Final commit

- [ ] **Step 1: Stage all files**

```bash
git add -A
```

- [ ] **Step 2: Commit**

```bash
git commit -m "feat: foundation — Next.js 15, Tailwind, design tokens, Nav, localStorage utility, placeholder routes"
```
