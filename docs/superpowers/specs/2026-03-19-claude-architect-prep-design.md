# Claude Certified Architect Prep Hub — Design Spec

**Date:** 2026-03-19
**Status:** Approved
**Scope:** Approach A — Deep Exam Prep Hub (static site, free hosting)

---

## Overview

A free, open-access exam prep website for the **Claude Certified Architect – Foundations** certification (Anthropic's official credential, registered via [anthropic.skilljar.com](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request)). The site covers all 5 exam domains with deep content, 33+ practice questions, a 12-week study plan, cheatsheet, and scenario walkthroughs — with progress tracked in localStorage (no login required).

**Competitive context:** [claudecertifications.com](https://claudecertifications.com) and [claudecertificationguide.com](https://claudecertificationguide.com) exist as references. This site aims for deeper per-domain content, official PDF-sourced accuracy, a superior editorial design, and a better study experience.

---

## Exam Facts (source: official Anthropic exam guide PDF)

| Field | Value |
|---|---|
| Format | Multiple choice, scenario-based |
| Scenarios | 4 of 6 randomly selected |
| Passing score | 720 / 1000 |
| Duration | ~15 minutes |
| Cost | Free for first 5,000 partner company employees |
| Registration | anthropic.skilljar.com |

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Dashboard | Progress bars per domain, "continue where you left off", weekly plan summary, reset button |
| `/domains/[slug]` | Domain deep-dive | Full subtopic breakdown, concepts, code patterns, anti-patterns, inline practice Qs |
| `/practice` | Quiz | 33+ questions, filterable by domain, immediate answer reveal with explanation |
| `/cheatsheet` | Cheatsheet | Single-page printable/scrollable reference for all 5 domains + key terms glossary |
| `/study-plan` | 12-Week Plan | Week-by-week expandable checklist with tasks and resources |
| `/scenarios` | Exam Scenarios | All 6 scenario walkthroughs with step-by-step analysis |
| `/exercises` | Build Exercises | 4 official capstone projects from the exam guide PDF, with starter scaffolding and completion criteria |
| `/exam-guide` | Exam Guide | Format, scoring, registration link, FAQ |

### Domain slug mapping

| Domain | Slug | Route |
|---|---|---|
| D1 — Agentic Architecture | `agentic-architecture` | `/domains/agentic-architecture` |
| D2 — Tool Design & MCP | `tool-design` | `/domains/tool-design` |
| D3 — Claude Code Config | `claude-code` | `/domains/claude-code` |
| D4 — Prompt Engineering | `prompt-engineering` | `/domains/prompt-engineering` |
| D5 — Context Management | `context-management` | `/domains/context-management` |

---

## Exam Domains & Content Plan

### Domain 1 — Agentic Architecture & Orchestration (27%)
**Subtopic count:** 4
**Subtopics:** Agentic Loops & Core API · Multi-Agent Orchestration · Hooks & Programmatic Enforcement · Session Management & Workflows
**Practice questions:** 6
**Primary scenario:** Multi-Agent Research System

### Domain 2 — Tool Design & MCP Integration (18%)
**Subtopic count:** 5
**Subtopics:** Tool Description Best Practices · Structured Error Responses · Tool Distribution & Selection · MCP Server Configuration · Built-in Tools
**Practice questions:** 4
**Primary scenario:** Customer Support Resolution Agent

### Domain 3 — Claude Code Configuration & Workflows (20%)
**Subtopic count:** 4
**Subtopics:** CLAUDE.md Hierarchy & Configuration · Custom Commands & Skills · Plan Mode & Iterative Refinement · CI/CD Integration & Batch Processing
**Practice questions:** 5
**Primary scenario:** Claude Code for CI/CD

### Domain 4 — Prompt Engineering & Structured Output (20%)
**Subtopic count:** 4
**Subtopics:** Explicit Criteria & Instruction Design · Few-Shot Prompting · Tool Use for Structured Output · Validation-Retry Loops & Multi-Pass Review
**Practice questions:** 5
**Primary scenario:** Structured Data Extraction

### Domain 5 — Context Management & Reliability (15%)
**Subtopic count:** 4
**Subtopics:** Context Optimization & Positioning · Escalation & Error Propagation · Context Degradation & Extended Sessions · Human Review & Information Provenance
**Practice questions:** 5
**Primary scenario:** Code Generation with Claude Code

**All 6 exam scenarios** (the sixth — Developer Productivity with Claude — is covered on `/scenarios` as a standalone walkthrough, not tied to a specific domain):
1. Customer Support Resolution Agent (D2)
2. Code Generation with Claude Code (D5)
3. Multi-Agent Research System (D1)
4. Developer Productivity with Claude (standalone)
5. Claude Code for CI/CD (D3)
6. Structured Data Extraction (D4)

**Additional content:** Anti-patterns guide · 12-week study plan (84 hours total, ~1h/day) · 4 official capstone exercises (sourced from exam guide PDF)

---

## Visual Design System

**Aesthetic:** Monospaced editorial — typewriter/technical, warm off-white, minimal decoration. Inspired by technical blogs and zines; distinctive from the iOS/Apple dashboard aesthetic of competitors.

### Colors
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#f5f4f0` | Page background |
| `--bg2` | `#eeecea` | Card/tag backgrounds |
| `--text` | `#2a2a2a` | Primary text |
| `--muted` | `#8a8a8a` | Secondary text, metadata |
| `--border` | `#dddbd6` | Dividers, borders |
| `--teal` | `#2cb67d` | Accent — links, progress, CTAs |
| `--teal-bg` | `#e8f8f0` | Teal highlight background |

**Accessibility note:** `--muted` (#8a8a8a on #f5f4f0) achieves ~4.6:1 contrast ratio, passing WCAG AA for large text but not small. All 11px uppercase labels must be verified at build time; fallback to `#6e6e73` if needed.

### Typography
- **Font:** IBM Plex Mono (Google Fonts) — single font family throughout
- **Display:** 52px, weight 700, letter-spacing -0.03em
- **Title:** 18–20px, weight 600
- **Body:** 13–14px, weight 400, line-height 1.7
- **Caption/labels:** 11px, uppercase, letter-spacing 0.08em
- **Nav slugs:** `underscore_style` — reinforces technical character

### Key Components
- **Domain row:** left meta column (domain number + exam weight %) + right content (title, description, subtopic tags, 2px teal progress bar)
- **Week row:** `week_NN` label left + title + completion checkbox
- **Practice question card:** bordered box, domain tag, question text, 4 options. Answer revealed **immediately on click** (no end-of-session mode). Correct option gets teal fill + explanation shown inline. Wrong option gets red border + correct answer revealed. No retry on same question in a session.
- **Progress bar:** 2px line — cleaner with mono aesthetic
- **Nav:** `logo/` + lowercase underscore links + `register_for_exam →` CTA (teal border)

### Loading & Empty States
- **Loading:** All domain and cheatsheet pages are statically generated (Next.js `generateStaticParams`). No runtime data fetching — no loading spinners needed. Dashboard reads localStorage on mount; renders with zero-state defaults until hydration (no layout shift).
- **Dashboard empty state (first visit):** All progress bars at 0%, "Week 1" highlighted as current, headline reads: `start_here/ → week_01`. No onboarding modal.
- **Practice empty state (no questions match filter):** Shows: `// no questions match this filter` in muted mono text, with a "clear filter" link.
- **Quiz score display:** After each question shows running tally `3 / 7 correct` in top-right corner.

### Responsive Behavior
- **Breakpoints:** Mobile-first via Tailwind (`sm: 640px`, `md: 768px`, `lg: 1024px`)
- **Nav:** Below `md` — hamburger menu, links in dropdown. Logo and CTA always visible.
- **Domain rows:** Below `md` — meta column (domain number + weight) moves above title, stacks vertically. Two-column layouts collapse to single column.
- **Hero display type:** Scales from 52px (desktop) → 36px (`md`) → 28px (mobile)
- **Cheatsheet:** Horizontal scroll on mobile; "print" button hidden on mobile.
- **Practice quiz:** Full width on all breakpoints; options stack vertically (already single column).

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Font | IBM Plex Mono via Google Fonts |
| Content | MDX files (per domain/subtopic) |
| Progress | localStorage (no backend) |
| Hosting | Vercel free tier |
| Repo | GitHub (public) |

**No database. No authentication. No API calls.**
Pure static generation — deploys to Vercel in seconds, runs forever on free tier.

### SEO (v1 scope)
- `<title>` and `<meta name="description">` on all pages (via Next.js Metadata API)
- `og:title` and `og:description` on all pages
- `sitemap.xml` auto-generated via `next-sitemap`
- `og:image` — out of scope for v1 (use Vercel's default OG)
- Google Analytics / tracking — out of scope for v1

---

## localStorage Data Model

```json
{
  "progress": {
    "d1": { "subtopics": [true, true, false, false],    "quiz": { "correct": 4, "total": 6 } },
    "d2": { "subtopics": [false, false, false, false, false], "quiz": null },
    "d3": { "subtopics": [false, false, false, false],  "quiz": null },
    "d4": { "subtopics": [false, false, false, false],  "quiz": null },
    "d5": { "subtopics": [false, false, false, false],  "quiz": null }
  },
  "studyPlan": {
    "week1": true, "week2": true, "week3": false,
    "week4": false, "week5": false, "week6": false,
    "week7": false, "week8": false, "week9": false,
    "week10": false, "week11": false, "week12": false
  },
  "lastVisited": "/domains/agentic-architecture"
}
```

**Notes:**
- `subtopics` array length matches domain subtopic count exactly (D2 has 5 elements, all others have 4)
- `quiz` is `null` until the user attempts at least one question in that domain's filtered set
- `quiz.correct` and `quiz.total` reflect the most recent full quiz session for that domain (not cumulative)
- **Reset button** on dashboard: clears the entire localStorage key, reloads page, returns to empty state
- Works offline after first load (no network dependency for progress)

---

## Out of Scope (v1)

- User accounts / cloud sync
- AI-powered quiz generation
- Diagnostic assessment (personalized study order by weakness — v2 candidate)
- Comments or community features
- Dark mode
- Mobile app
- `og:image` generation
- Analytics/tracking

---

## Success Criteria

1. All 5 domains covered with real, accurate content (not placeholder)
2. 33+ practice questions with explanations mapped to correct domains
3. Progress persists across browser sessions via localStorage
4. Deploys successfully to Vercel free tier
5. Passes Lighthouse score ≥ 90 on performance and accessibility
6. Visually distinctive from claudecertifications.com
7. All pages render correctly on mobile (≥ 320px width)
