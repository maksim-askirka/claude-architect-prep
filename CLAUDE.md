# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **This is NOT the Next.js you know.** Next.js 16.2.1 has breaking changes — APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Commands

```bash
npm run dev          # start dev server on localhost:3000
npm run build        # production build (runs next-sitemap as postbuild)
npm test             # run all tests
npm test -- --testPathPattern=QuestionCard   # run a single test file
npm test -- --watch  # watch mode
npm run lint         # ESLint
npx tsc --noEmit     # type-check without emitting
```

## Architecture

**Claude Certified Architect Prep Hub** — a Next.js 16.2.1 (App Router) static exam-prep site. No backend, no database.

### Data layer (`lib/`)

All content is plain TypeScript arrays — no fetch calls, no CMS:

| File | Contents |
| ---- | -------- |
| `lib/domains.ts` | `DOMAINS` array (5 domains); `getDomainBySlug`, `getDomainByKey` |
| `lib/questions.ts` | 35 practice questions with `getQuestionsByDomain` |
| `lib/scenarios.ts` | 6 exam scenarios (steps typed as `{ stepNumber, title, detail }`) |
| `lib/exercises.ts` | 4 capstone exercises |
| `lib/study-plan.ts` | `STUDY_PLAN` (12 `Week` objects), `TOTAL_HOURS` |
| `lib/progress.ts` | localStorage read/write helpers (`getProgress`, `saveProgress`, `setWeekComplete`, etc.) |
| `lib/utils.ts` | `pad2(n)`, `isExternal(href)` |

`types/index.ts` is the single source for `Domain`, `DomainKey`, `DomainProgress`, `ProgressData`.

### Progress persistence

All user progress lives in `localStorage` under the key `architect-prep`. `lib/progress.ts` exposes low-level read/write helpers. Two hooks wrap them:

- `hooks/useProgress.ts` — full `ProgressData` with `reload` and `reset`
- `hooks/useStudyPlan.ts` — narrow slice (`studyPlan` map) with `toggleWeek`

Both hooks use a `useState({}) → useEffect(hydrate)` pattern to avoid SSR mismatches. The `react-hooks/set-state-in-effect` lint rule fires on the `setState` call inside the effect body — suppress it with `// eslint-disable-next-line react-hooks/set-state-in-effect` on the line immediately before the `setState` call (not before `useEffect`).

### `'use client'` pages need a layout.tsx for metadata

Next.js cannot export `metadata` from a `'use client'` component. Pages that need both client state and SEO metadata (currently `practice/` and `study-plan/`) solve this with a co-located `layout.tsx` that exports only `metadata` and returns `<>{children}</>`.

### Domain pages (MDX + static)

`app/domains/[slug]/page.tsx` is a static server component. It maps each slug to a pre-imported MDX file from `content/domains/`. To add a domain: add an entry to `DOMAINS`, create the MDX file, and register it in `CONTENT_MAP`.

### Styling

Tailwind CSS v4 (`@import "tailwindcss"` syntax — not `@tailwind base/components/utilities`). Design tokens are CSS variables defined in `app/globals.css`:

```
--bg, --bg2, --text, --muted, --border, --teal, --teal-bg
```

Always use `var(--token)` for colors, never hard-code hex values.

### Tests

`__tests__/components/` (React Testing Library), `__tests__/lib/` (pure unit tests), and `__tests__/hooks/` (renderHook tests). Jest + jsdom. `@/` path alias resolves to the repo root.

Jest config is `jest.config.mjs` (ESM). Do not use `.ts` (requires `ts-node`, not installed) or `.js` (`require()` is forbidden by ESLint).

Run `npm test` before marking any task complete.

## Do not

- **Never hardcode hex colors** — always use `var(--token)` CSS variables defined in `app/globals.css`
- **Never add API routes or server actions** — this is a static, client-only app
- **Never fetch data at runtime** — all content lives in `lib/*.ts` TypeScript arrays
- **Never add `'use client'` to `layout.tsx` files** — use the layout.tsx (metadata only) + page.tsx (client) pattern described above
