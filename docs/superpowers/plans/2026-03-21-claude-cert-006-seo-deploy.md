# Claude Cert Prep Hub — 006 SEO & Deployment

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Metadata API to all remaining pages, generate sitemap.xml via next-sitemap, write README, deploy to Vercel, verify Lighthouse scores ≥ 90 on performance and accessibility.

**Architecture:** Next.js Metadata API — static `metadata` exports on server components, `generateMetadata` on dynamic routes (already done in plan 003 for domain pages). Client pages (`/practice`, `/study-plan`) get metadata via a thin server-component `layout.tsx` wrapper. `next-sitemap` runs post-build to emit `sitemap.xml` and `robots.txt`. Deploy to Vercel via CLI or GitHub integration (no `vercel.json` needed — Vercel auto-detects Next.js).

**Tech Stack:** Next.js 15, next-sitemap, Vercel CLI

**Prerequisite:** Plans 001–005 complete. All pages built and tested.

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `app/practice/layout.tsx` | Server wrapper that exports metadata for the client `/practice` page |
| Create | `app/study-plan/layout.tsx` | Server wrapper that exports metadata for the client `/study-plan` page |
| Create | `next-sitemap.config.js` | Sitemap config: siteUrl, robotsTxt |
| Create | `README.md` | Project description, stack, local dev, deploy instructions |
| Modify | `package.json` | Add `postbuild` script to run next-sitemap |

---

## Tasks

### Task 1: Add metadata to remaining pages

**Files:**
- Create: `app/practice/layout.tsx`
- Create: `app/study-plan/layout.tsx`

Background: `/practice` and `/study-plan` are `'use client'` pages and cannot export `metadata` directly. In Next.js App Router, metadata in a `layout.tsx` at the same level is applied to the route.

- [ ] **Step 1: Create app/practice/layout.tsx**

```tsx
// app/practice/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Practice Quiz',
  description:
    '35 practice questions across all 5 Claude Certified Architect exam domains. Filter by domain. Immediate answer reveal.',
}

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 2: Create app/study-plan/layout.tsx**

```tsx
// app/study-plan/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '12-Week Study Plan',
  description:
    'A 12-week study plan for the Claude Certified Architect – Foundations exam. ~84 hours total. Track your weekly progress.',
}

export default function StudyPlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 3: Verify metadata renders correctly**

```bash
npm run build && npm run start
```

In a browser, visit each page and inspect `<title>` and `<meta name="description">`:
- `http://localhost:3000/` → "Claude Certified Architect Prep"
- `http://localhost:3000/practice` → "Practice Quiz | Claude Architect Prep"
- `http://localhost:3000/study-plan` → "12-Week Study Plan | Claude Architect Prep"
- `http://localhost:3000/cheatsheet` → "Cheatsheet | Claude Architect Prep"
- `http://localhost:3000/domains/agentic-architecture` → "D1 — Agentic Architecture & Orchestration | Claude Architect Prep"
- `http://localhost:3000/scenarios` → "Exam Scenarios | Claude Architect Prep"
- `http://localhost:3000/exercises` → "Build Exercises | Claude Architect Prep"
- `http://localhost:3000/exam-guide` → "Exam Guide | Claude Architect Prep"

Expected: All pages have correct title + description meta tags.

---

### Task 2: Add OpenGraph metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update metadata in app/layout.tsx to include OpenGraph**

Find the existing `metadata` export in `app/layout.tsx` and replace it:

```tsx
export const metadata: Metadata = {
  title: {
    default: 'Claude Certified Architect Prep',
    template: '%s | Claude Architect Prep',
  },
  description:
    'Free exam prep for the Claude Certified Architect – Foundations certification. All 5 domains, 35+ practice questions, 12-week study plan.',
  openGraph: {
    title: 'Claude Certified Architect Prep',
    description:
      'Free exam prep for the Claude Certified Architect – Foundations certification.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Claude Certified Architect Prep',
    description: 'Free exam prep. All 5 domains, 35+ questions, 12-week plan.',
  },
}
```

---

### Task 3: Install and configure next-sitemap

**Files:**
- Create: `next-sitemap.config.js`
- Modify: `package.json`

- [ ] **Step 1: Install next-sitemap**

```bash
npm install next-sitemap
```

- [ ] **Step 2: Create next-sitemap.config.js**

```javascript
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://claude-architect-prep.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
```

- [ ] **Step 3: Add postbuild script to package.json**

In `package.json`, in the `"scripts"` section, add:
```json
"postbuild": "next-sitemap"
```

Result: `scripts` should contain:
```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "postbuild": "next-sitemap",
  "start": "next start",
  "lint": "next lint",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

- [ ] **Step 4: Run build and verify sitemap**

```bash
npm run build
```
Expected:
- Build completes
- `public/sitemap.xml` is generated
- `public/robots.txt` is generated

Verify `public/sitemap.xml` contains entries for all routes:
```bash
cat public/sitemap.xml
```
Expected: Entries for `/`, `/practice`, `/study-plan`, `/cheatsheet`, `/scenarios`, `/exercises`, `/exam-guide`, `/domains/agentic-architecture`, `/domains/tool-design`, `/domains/claude-code`, `/domains/prompt-engineering`, `/domains/context-management`

---

### Task 4: Write README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README.md**

```markdown
# Claude Certified Architect Prep Hub

Free, open-access exam prep for the [Claude Certified Architect – Foundations](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request) certification (Anthropic's official credential).

## What's inside

- **5 domain deep-dives** — Agentic Architecture, Tool Design & MCP, Claude Code Config, Prompt Engineering, Context Management
- **35 practice questions** — filterable by domain, immediate answer reveal
- **12-week study plan** — ~84 hours, with per-week tasks and resources
- **6 exam scenario walkthroughs** — step-by-step analysis
- **4 build exercises** — hands-on practice
- **Cheatsheet** — printable quick reference
- **Progress tracking** — localStorage (no login required)

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Font | IBM Plex Mono |
| Content | MDX (per domain) |
| Progress | localStorage |
| Hosting | Vercel |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running tests

```bash
npm test
```

## Deploy

This project deploys to Vercel automatically on push to `main`. To deploy manually:

```bash
npx vercel --prod
```

Set `SITE_URL` environment variable in Vercel dashboard to your production URL for correct sitemap generation.

## Exam facts

| Field | Value |
|-------|-------|
| Format | Multiple choice + scenario-based |
| Scenarios | 4 of 6 randomly selected |
| Passing score | 720 / 1000 |
| Duration | ~15 minutes |
| Cost | Free for first 5,000 partner employees |

## License

MIT
```

---

### Task 5: Lighthouse audit

- [ ] **Step 1: Start production server**

```bash
npm run build && npm run start
```

- [ ] **Step 2: Run Lighthouse on the dashboard**

In Chrome: open `http://localhost:3000` → DevTools (F12) → Lighthouse tab → check "Performance", "Accessibility", "Best Practices", "SEO" → Analyze page load.

Target scores: **Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90**

- [ ] **Step 3: Fix accessibility issues if Lighthouse flags them**

Most likely issue: `--muted` (#8a8a8a on #f5f4f0) contrast ratio ~4.6:1 — passes WCAG AA for large text but may fail for small text at 11px.

If Lighthouse flags contrast on 11px uppercase labels:
- Change `--muted` to `#6e6e73` (passes AA at all sizes)
- Update in `app/globals.css`:
  ```css
  --muted: #6e6e73;
  ```
- Re-run Lighthouse to confirm fix

- [ ] **Step 4: Fix any Performance issues**

Common issues and fixes:
- **"Eliminate render-blocking resources"** — IBM Plex Mono uses `display: 'swap'` already (done in plan 001)
- **"Serve images in next-gen formats"** — no images in v1, skip
- **"Reduce unused JavaScript"** — Next.js code splitting handles this automatically

- [ ] **Step 5: Run Lighthouse on /domains/agentic-architecture and /practice**

These are the heaviest pages. Verify scores ≥ 90 on both.

- [ ] **Step 6: Check mobile layout at 320px**

In Chrome DevTools → Device toolbar → set to 320px width. Verify:
- No horizontal overflow
- Nav hamburger appears and functions
- Hero text scales down correctly
- Domain rows stack vertically
- Quiz options are full width and tappable

---

### Task 6: Deploy to Vercel

- [ ] **Step 1: Initialize Vercel project (first deploy)**

```bash
npx vercel
```

Follow prompts:
- Log in to Vercel
- Set up and deploy: Yes
- Which scope: select your account
- Link to existing project: No
- Project name: `claude-architect-prep` (or preferred name)
- Directory: `./`
- Override settings: No

Expected: Preview URL printed, e.g. `https://claude-architect-prep-abc123.vercel.app`

- [ ] **Step 2: Set SITE_URL environment variable in Vercel**

After first deploy, get the production URL. In Vercel dashboard:
- Project → Settings → Environment Variables
- Add: `SITE_URL` = `https://<your-project>.vercel.app`
- Apply to: Production, Preview, Development

- [ ] **Step 3: Redeploy to production with SITE_URL set**

```bash
npx vercel --prod
```

Expected: Production URL printed, e.g. `https://claude-architect-prep.vercel.app`

- [ ] **Step 4: Verify production deployment**

Visit the production URL. Check:
- Dashboard loads with IBM Plex Mono font
- `/practice` quiz loads and works
- `/domains/agentic-architecture` renders MDX content
- `<production-url>/sitemap.xml` returns valid XML with all routes
- `<production-url>/robots.txt` returns `Allow: /`

---

### Task 7: Final commit and verification

- [ ] **Step 1: Run full test suite one final time**

```bash
npm test
```
Expected: All tests pass

- [ ] **Step 2: Run full build**

```bash
npm run build
```
Expected: Build succeeds, sitemap generated, no TypeScript errors, no ESLint errors

- [ ] **Step 3: Verify success criteria from spec**

Check each item from the spec's Success Criteria:

| Criterion | How to verify |
|-----------|---------------|
| All 5 domains covered with real content | Visit each `/domains/[slug]` — no placeholder text |
| 33+ practice questions with explanations | Go to `/practice` — count visible questions (should be 35) |
| Progress persists across browser sessions | Check a subtopic, close browser, reopen, visit dashboard — progress shows |
| Deploys to Vercel free tier | Production URL loads |
| Lighthouse ≥ 90 performance + accessibility | Run Lighthouse on production URL |
| Visually distinctive from claudecertifications.com | Compare side-by-side — monospaced editorial vs. their iOS-style UI |
| All pages render correctly at ≥ 320px | Test in DevTools at 320px width |

- [ ] **Step 4: Commit everything**

```bash
git add -A
git commit -m "feat: SEO metadata, sitemap, README, Lighthouse fixes — production ready"
```

- [ ] **Step 5: Push to GitHub (if not already connected to Vercel via GitHub)**

```bash
git remote add origin https://github.com/<username>/claude-architect-prep.git
git branch -M main
git push -u origin main
```
