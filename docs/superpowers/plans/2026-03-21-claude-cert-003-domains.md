# Claude Cert Prep Hub — 003 Domain Deep-Dive Pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/domains/[slug]` pages for all 5 exam domains — MDX-powered, with subtopic completion checkboxes tracked in localStorage and inline practice questions.

**Architecture:** `@next/mdx` processes `.mdx` files in `content/domains/`. The dynamic route `app/domains/[slug]/page.tsx` imports all 5 MDX files statically and maps slugs to components. `DomainPageLayout` provides shared chrome. `SubtopicSection` (client component) handles per-subtopic completion tracking. `InlinePracticeQ` renders a single practice question within MDX.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, `@next/mdx`, Jest, React Testing Library

**Prerequisite:** Plans 001 + 002 complete.

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `next.config.ts` | Enable `@next/mdx`, add `.mdx` to pageExtensions |
| Create | `mdx-components.tsx` | Required by `@next/mdx` App Router — maps HTML elements to styled components |
| Create | `components/DomainPageLayout.tsx` | Breadcrumb, domain header, D1–D5 tab nav, MDX prose wrapper |
| Create | `components/SubtopicSection.tsx` | Client component — section header + mark_complete button + localStorage write |
| Create | `components/InlinePracticeQ.tsx` | Single question card with reveal — used inside MDX files |
| Create | `content/domains/agentic-architecture.mdx` | D1 full content (4 subtopics) |
| Create | `content/domains/tool-design.mdx` | D2 full content (5 subtopics) |
| Create | `content/domains/claude-code.mdx` | D3 full content (4 subtopics) |
| Create | `content/domains/prompt-engineering.mdx` | D4 full content (4 subtopics) |
| Create | `content/domains/context-management.mdx` | D5 full content (4 subtopics) |
| Modify | `app/domains/[slug]/page.tsx` | Static import all 5 MDX files, map slug → component, generateStaticParams |
| Create | `__tests__/components/SubtopicSection.test.tsx` | Unit tests |
| Create | `__tests__/components/InlinePracticeQ.test.tsx` | Unit tests |

---

## Tasks

### Task 1: Install and configure @next/mdx

**Files:**
- Modify: `next.config.ts`
- Create: `mdx-components.tsx`

- [ ] **Step 1: Install @next/mdx**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install --save-dev @types/mdx
```

- [ ] **Step 2: Replace next.config.ts**

```typescript
// next.config.ts
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  // No remark/rehype plugins needed for v1
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

export default withMDX(nextConfig)
```

- [ ] **Step 3: Create mdx-components.tsx** (required by App Router MDX)

```tsx
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-base font-semibold uppercase tracking-wide mt-10 mb-3 text-[var(--text)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-semibold mt-6 mb-2 text-[var(--text)]">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-sm leading-7 text-[var(--text)] mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-sm leading-7 list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    li: ({ children }) => <li className="text-[var(--text)]">{children}</li>,
    code: ({ children }) => (
      <code className="text-xs bg-[var(--bg2)] px-1.5 py-0.5 font-mono text-[var(--teal)]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="text-xs bg-[var(--bg2)] border border-[var(--border)] p-4 overflow-x-auto mb-4 leading-6">
        {children}
      </pre>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    hr: () => <hr className="border-[var(--border)] my-8" />,
    ...components,
  }
}
```

- [ ] **Step 4: Verify Next.js build still works**

```bash
npm run build
```
Expected: Build succeeds (no MDX files yet, no errors)

---

### Task 2: DomainPageLayout component

**Files:**
- Create: `components/DomainPageLayout.tsx`

- [ ] **Step 1: Create components/DomainPageLayout.tsx**

```tsx
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
```

---

### Task 3: SubtopicSection component

**Files:**
- Create: `components/SubtopicSection.tsx`
- Create: `__tests__/components/SubtopicSection.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/SubtopicSection.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { SubtopicSection } from '@/components/SubtopicSection'

// Mock lib/progress
jest.mock('@/lib/progress', () => ({
  setSubtopicComplete: jest.fn(),
  getProgress: jest.fn(() => ({
    progress: {
      d1: { subtopics: [false, false, false, false], quiz: null },
      d2: { subtopics: [false, false, false, false, false], quiz: null },
      d3: { subtopics: [false, false, false, false], quiz: null },
      d4: { subtopics: [false, false, false, false], quiz: null },
      d5: { subtopics: [false, false, false, false], quiz: null },
    },
    studyPlan: {},
    lastVisited: null,
  })),
}))

describe('SubtopicSection', () => {
  it('renders the subtopic title', () => {
    render(
      <SubtopicSection domainKey="d1" index={0} title="Agentic Loops & Core API">
        <p>Content</p>
      </SubtopicSection>
    )
    expect(screen.getByText('Agentic Loops & Core API')).toBeInTheDocument()
  })

  it('shows mark_complete button initially', () => {
    render(
      <SubtopicSection domainKey="d1" index={0} title="Test">
        <p>Content</p>
      </SubtopicSection>
    )
    expect(screen.getByText(/mark_complete/i)).toBeInTheDocument()
  })

  it('switches to complete indicator after clicking mark_complete', () => {
    render(
      <SubtopicSection domainKey="d1" index={0} title="Test">
        <p>Content</p>
      </SubtopicSection>
    )
    fireEvent.click(screen.getByText(/mark_complete/i))
    expect(screen.getByText(/complete/i)).toBeInTheDocument()
    expect(screen.queryByText(/mark_complete/i)).not.toBeInTheDocument()
  })

  it('calls setSubtopicComplete with correct args', () => {
    const { setSubtopicComplete } = require('@/lib/progress')
    render(
      <SubtopicSection domainKey="d3" index={2} title="Test">
        <p>Content</p>
      </SubtopicSection>
    )
    fireEvent.click(screen.getByText(/mark_complete/i))
    expect(setSubtopicComplete).toHaveBeenCalledWith('d3', 2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/SubtopicSection.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Implement SubtopicSection**

```tsx
// components/SubtopicSection.tsx
'use client'
import { useState, useEffect } from 'react'
import { setSubtopicComplete, getProgress } from '@/lib/progress'
import { DomainKey } from '@/types'

interface SubtopicSectionProps {
  domainKey: DomainKey
  index: number
  title: string
  children: React.ReactNode
}

export function SubtopicSection({ domainKey, index, title, children }: SubtopicSectionProps) {
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const data = getProgress()
    setComplete(data.progress[domainKey].subtopics[index] ?? false)
  }, [domainKey, index])

  function handleMarkComplete() {
    setSubtopicComplete(domainKey, index)
    setComplete(true)
  }

  return (
    <section className="mb-12" id={`subtopic-${index}`}>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border)]">
        <h2 className="text-sm font-semibold uppercase tracking-wide">{title}</h2>
        {complete ? (
          <span className="text-[11px] uppercase tracking-widest text-[var(--teal)]">✓ complete</span>
        ) : (
          <button
            onClick={handleMarkComplete}
            className="text-[11px] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--teal)] transition-colors"
          >
            mark_complete
          </button>
        )}
      </div>
      <div>{children}</div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/SubtopicSection.test.tsx
```
Expected: All 4 tests PASS

---

### Task 4: InlinePracticeQ component

**Files:**
- Create: `components/InlinePracticeQ.tsx`
- Create: `__tests__/components/InlinePracticeQ.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/InlinePracticeQ.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { InlinePracticeQ } from '@/components/InlinePracticeQ'

const props = {
  question: 'What stop_reason indicates Claude wants to use a tool?',
  options: ['end_turn', 'tool_use', 'max_tokens', 'stop_sequence'],
  correct: 1,
  explanation: 'stop_reason="tool_use" means Claude wants to invoke a tool before continuing.',
}

describe('InlinePracticeQ', () => {
  it('renders the question text', () => {
    render(<InlinePracticeQ {...props} />)
    expect(screen.getByText(props.question)).toBeInTheDocument()
  })

  it('renders all 4 options', () => {
    render(<InlinePracticeQ {...props} />)
    props.options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument()
    })
  })

  it('does not show explanation before answering', () => {
    render(<InlinePracticeQ {...props} />)
    expect(screen.queryByText(props.explanation)).not.toBeInTheDocument()
  })

  it('reveals explanation after selecting correct answer', () => {
    render(<InlinePracticeQ {...props} />)
    fireEvent.click(screen.getByText('tool_use'))
    expect(screen.getByText(props.explanation)).toBeInTheDocument()
  })

  it('reveals explanation after selecting wrong answer', () => {
    render(<InlinePracticeQ {...props} />)
    fireEvent.click(screen.getByText('end_turn'))
    expect(screen.getByText(props.explanation)).toBeInTheDocument()
  })

  it('disables options after answering', () => {
    render(<InlinePracticeQ {...props} />)
    fireEvent.click(screen.getByText('end_turn'))
    // All buttons should be disabled after answer
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/InlinePracticeQ.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Implement InlinePracticeQ**

```tsx
// components/InlinePracticeQ.tsx
'use client'
import { useState } from 'react'

interface InlinePracticeQProps {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export function InlinePracticeQ({ question, options, correct, explanation }: InlinePracticeQProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null

  return (
    <div className="border border-[var(--border)] bg-[var(--bg2)] p-4 my-6">
      <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-3">
        practice question
      </div>
      <p className="text-sm font-semibold mb-4">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          let style = 'border-[var(--border)] text-[var(--text)]'
          if (answered) {
            if (i === correct) style = 'border-[var(--teal)] bg-[var(--teal-bg)] text-[var(--teal)]'
            else if (i === selected) style = 'border-red-400 text-red-600'
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`text-xs text-left px-3 py-2 border transition-colors disabled:cursor-default ${style}`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <p className="text-xs text-[var(--muted)] mt-4 border-t border-[var(--border)] pt-3">
          {explanation}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/InlinePracticeQ.test.tsx
```
Expected: All 6 tests PASS

- [ ] **Step 5: Commit infrastructure**

```bash
git add components/ __tests__/components/ mdx-components.tsx next.config.ts
git commit -m "feat: domain page infrastructure — MDX setup, DomainPageLayout, SubtopicSection, InlinePracticeQ"
```

---

### Task 5: Wire up domain page route

**Files:**
- Modify: `app/domains/[slug]/page.tsx`

- [ ] **Step 1: Replace app/domains/[slug]/page.tsx**

```tsx
// app/domains/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getDomainBySlug, DOMAINS } from '@/lib/domains'
import { DomainPageLayout } from '@/components/DomainPageLayout'

import AgenticArchitecture from '@/content/domains/agentic-architecture.mdx'
import ToolDesign from '@/content/domains/tool-design.mdx'
import ClaudeCode from '@/content/domains/claude-code.mdx'
import PromptEngineering from '@/content/domains/prompt-engineering.mdx'
import ContextManagement from '@/content/domains/context-management.mdx'

const CONTENT_MAP: Record<string, React.ComponentType> = {
  'agentic-architecture': AgenticArchitecture,
  'tool-design': ToolDesign,
  'claude-code': ClaudeCode,
  'prompt-engineering': PromptEngineering,
  'context-management': ContextManagement,
}

export function generateStaticParams() {
  return DOMAINS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const domain = getDomainBySlug(params.slug)
  if (!domain) return {}
  return {
    title: `${domain.number} — ${domain.title}`,
    description: `Deep dive into ${domain.title} (${domain.weight}% of the Claude Certified Architect exam). ${domain.subtopics.join(', ')}.`,
  }
}

export default function DomainPage({ params }: { params: { slug: string } }) {
  const domain = getDomainBySlug(params.slug)
  if (!domain) notFound()

  const Content = CONTENT_MAP[params.slug]
  if (!Content) notFound()

  return (
    <DomainPageLayout domain={domain}>
      <Content />
    </DomainPageLayout>
  )
}
```

Note: TypeScript will error until all 5 MDX content files exist. Create them in Tasks 6–10 before running the build.

---

### Task 6: D1 — Agentic Architecture content

**Files:**
- Create: `content/domains/agentic-architecture.mdx`

**Required structure and content facts** (write real prose + code examples for each):

```mdx
{/* content/domains/agentic-architecture.mdx */}
import { SubtopicSection } from '@/components/SubtopicSection'
import { InlinePracticeQ } from '@/components/InlinePracticeQ'

<SubtopicSection domainKey="d1" index={0} title="Agentic Loops & Core API">

Cover: How Claude processes tool use in the Messages API.

Required facts:
- API request includes `tools` array + `messages` array
- When Claude wants a tool: response has `stop_reason: "tool_use"` and content block `type: "tool_use"` with `id`, `name`, `input`
- Agent appends `{"role": "assistant", content: [tool_use block]}` then `{"role": "user", content: [{"type": "tool_result", "tool_use_id": ..., "content": ...}]}`
- Loop continues until `stop_reason: "end_turn"` or `stop_reason: "max_tokens"`
- `max_tokens` must be set high enough for multi-step tasks (e.g., 4096+)

Include a TypeScript code example showing the agentic loop pattern:

```typescript
async function runAgentLoop(userMessage: string): Promise<string> {
  const messages: MessageParam[] = [{ role: 'user', content: userMessage }]

  while (true) {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      tools: TOOLS,
      messages,
    })

    if (response.stop_reason === 'end_turn') {
      return response.content.find((b) => b.type === 'text')?.text ?? ''
    }

    if (response.stop_reason === 'tool_use') {
      messages.push({ role: 'assistant', content: response.content })
      const toolResults = await executeTools(response.content)
      messages.push({ role: 'user', content: toolResults })
    }
  }
}
```

Anti-patterns: Forgetting to append both assistant + tool_result turns; setting max_tokens too low; not handling stop_reason: "max_tokens"

<InlinePracticeQ
  question="Which stop_reason indicates Claude wants to invoke a tool?"
  options={["end_turn", "tool_use", "max_tokens", "stop_sequence"]}
  correct={1}
  explanation="stop_reason='tool_use' means Claude's response contains a tool_use content block. The agent must execute the tool and return a tool_result before continuing."
/>

</SubtopicSection>

<SubtopicSection domainKey="d1" index={1} title="Multi-Agent Orchestration">

Cover: Orchestrator-subagent patterns in Claude Code and the Claude API.

Required facts:
- Orchestrator agent: breaks task into subtasks, dispatches subagents, aggregates results
- Subagents: receive focused task, have limited context, return structured result
- Parallel execution: dispatch multiple subagents simultaneously for independent tasks
- In Claude Code: `Agent` tool spawns subagents; `run_in_background` for parallel work
- Subagent isolation: each subagent gets only the context it needs (reduces cost, increases focus)
- Result aggregation: orchestrator synthesizes subagent outputs into final answer
- Trust levels: orchestrators can grant subagents elevated or restricted permissions

Anti-patterns: Giving subagents the full conversation history; blocking orchestrator while waiting for serial subagent calls that could be parallel; subagents writing to shared mutable state

<InlinePracticeQ
  question="In a multi-agent system, the orchestrator receives results from subagents. What is the recommended approach for providing context to each subagent?"
  options={[
    "Pass the full conversation history to maximize context",
    "Give each subagent only the context needed for its specific subtask",
    "Share a global context object that all subagents can read and write",
    "Let subagents request additional context on demand"
  ]}
  correct={1}
  explanation="Subagents should receive only the context needed for their specific task. This reduces token costs, improves focus, and prevents information leakage between independent subtasks."
/>

</SubtopicSection>

<SubtopicSection domainKey="d1" index={2} title="Hooks & Programmatic Enforcement">

Cover: Claude Code hooks in settings.json.

Required facts:
- Hooks defined in `~/.claude/settings.json` under `"hooks"` key
- Hook types: `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `Notification`
- Hook is a shell command; receives JSON context via stdin
- Non-zero exit code = tool call BLOCKED (PreToolUse) or error surfaced to Claude
- stdout content is passed back to Claude as additional context
- Exit code 0 = allow; exit code 2 = block with explanation to user (not Claude)
- Use cases: enforce code standards (no --no-verify), block dangerous commands, log all tool calls, inject security context

Example PreToolUse hook that blocks `git push --force` to main:
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'push.*--force.*main'; then echo 'Force push to main is not allowed'; exit 2; fi"
      }]
    }]
  }
}
```

Anti-patterns: Hooks that block too broadly; hooks without clear exit messages; running slow hooks on every tool call

<InlinePracticeQ
  question="A PreToolUse hook exits with code 2. What happens?"
  options={[
    "Claude retries the tool call",
    "The tool call is blocked and the user sees the hook's stdout message",
    "The tool call is blocked and Claude sees the hook's stdout as context",
    "The process terminates"
  ]}
  correct={1}
  explanation="Exit code 2 blocks the tool call and surfaces the hook's stdout to the USER (not Claude) as a visible error message. Exit code 1 blocks the tool call and returns the output to Claude."
/>

</SubtopicSection>

<SubtopicSection domainKey="d1" index={3} title="Session Management & Workflows">

Cover: Managing long-running Claude Code sessions.

Required facts:
- `--continue` flag: resumes the last conversation (preserves context)
- `--resume <session-id>`: resumes a specific past session
- Context window limit: ~200k tokens for Claude; large sessions approach this
- When context fills: use `/compact` to summarize and compress conversation history
- `CLAUDE.md` files persist project context across sessions (don't rely on conversation memory for project facts)
- Plan mode for complex tasks: Claude explores first, then executes — reduces errors from premature action
- Batch processing: `claude -p "prompt" --output-format json` for non-interactive scripted use
- Session state: Claude doesn't persist state between sessions unless you write to files

Anti-patterns: Relying on Claude to remember project context from a previous session (use CLAUDE.md); letting context grow unbounded without /compact; running interactive commands in --headless mode

<InlinePracticeQ
  question="You want to continue yesterday's Claude Code session on a large codebase. The conversation is very long. What should you do before running more tasks?"
  options={[
    "Start a new session — old sessions can't be resumed",
    "Resume with --continue and run /compact to compress the context",
    "Manually summarize the conversation in a text file",
    "Increase the max_tokens setting"
  ]}
  correct={1}
  explanation="Use --continue to resume the last session, then run /compact to compress long conversation history. This keeps session continuity while freeing context window space for new work."
/>

</SubtopicSection>
```

- [ ] **Step 1: Create content/domains/agentic-architecture.mdx with the full content above**

All `{/* comment */}` annotations are guidance — do NOT include them in the actual MDX file. Write real prose for each section. Each SubtopicSection should have 300–500 words of real content plus code examples and the InlinePracticeQ.

- [ ] **Step 2: Verify MDX builds without errors**

```bash
npm run build
```
Expected: Build completes. If TypeScript errors about missing MDX imports, other content files are needed first (continue to Tasks 7–10, then verify build).

---

### Task 7: D2 — Tool Design & MCP content

**Files:**
- Create: `content/domains/tool-design.mdx`

**Required content structure** (5 subtopics, domainKey="d2", index 0–4):

```mdx
import { SubtopicSection } from '@/components/SubtopicSection'
import { InlinePracticeQ } from '@/components/InlinePracticeQ'
```

**Subtopic 0 — Tool Description Best Practices (required facts):**
- Tool name: snake_case, verb-noun pattern (e.g., `search_web`, `read_file`)
- Description: explain WHEN to use it (not just what it does); this is how Claude selects tools
- Parameters: each must have `description`; mark optional parameters as optional (not in `required` array)
- Keep tools focused — one tool does one thing
- Avoid overlapping tool names/descriptions (Claude gets confused)
- InlinePracticeQ on which tool description style is best

**Subtopic 1 — Structured Error Responses (required facts):**
- Tools should return structured JSON, not throw exceptions
- Error format: `{ "error": "Not found", "code": "NOT_FOUND", "details": "..." }`
- Claude reads the error and decides whether to retry, use a different tool, or escalate
- Never return `null` on error — Claude can't act on null
- Include actionable info: what went wrong, what the user/Claude can do next
- InlinePracticeQ on correct error response format

**Subtopic 2 — Tool Distribution & Selection (required facts):**
- Tools are presented to Claude in the `tools` array; Claude chooses which to use
- `tool_choice: { type: "auto" }` — Claude decides (default)
- `tool_choice: { type: "any" }` — Claude must use at least one tool
- `tool_choice: { type: "tool", name: "..." }` — force a specific tool
- Principle of least privilege: only expose tools the agent needs for the current task
- Too many tools = Claude gets confused; group related operations
- InlinePracticeQ on tool_choice usage

**Subtopic 3 — MCP Server Configuration (required facts):**
- MCP = Model Context Protocol; servers extend Claude with resources + tools
- Two transports: `stdio` (local process, most secure) and `SSE` (HTTP, remote)
- Configure in `~/.claude/settings.json` under `mcpServers`:
  ```json
  { "mcpServers": { "my-server": { "type": "stdio", "command": "node", "args": ["server.js"] } } }
  ```
- Or in project `CLAUDE.md` for project-scoped MCP servers
- MCP servers can expose tools, resources (readable data), and prompts
- Trust: confirm MCP tool use; be aware of prompt injection via MCP resources
- InlinePracticeQ on MCP transport types

**Subtopic 4 — Built-in Tools (required facts):**
- `Bash`: runs shell commands; most powerful + risky; always confirm dangerous commands
- `Read` / `Write` / `Edit`: file operations; prefer over Bash cat/echo
- `Glob` / `Grep`: search files and content; built-in, faster/safer than shell equivalents
- `WebFetch` / `WebSearch`: fetch URLs, search web; cannot access authenticated pages
- `Agent`: spawn subagents with full tool access
- Computer tool: interact with GUI, take screenshots, click, type (vision-based)
- InlinePracticeQ on which built-in tool to use for a given task

- [ ] **Step 1: Create content/domains/tool-design.mdx following the structure above**

Write real prose + code examples for each subtopic. Each subtopic: 300–400 words + code + InlinePracticeQ. Match the SubtopicSection/InlinePracticeQ pattern from agentic-architecture.mdx.

---

### Task 8: D3 — Claude Code Configuration content

**Files:**
- Create: `content/domains/claude-code.mdx`

**Required content structure** (4 subtopics, domainKey="d3", index 0–3):

**Subtopic 0 — CLAUDE.md Hierarchy & Configuration (required facts):**
- Three levels: `~/.claude/CLAUDE.md` (global), `<project-root>/CLAUDE.md` (project), `<subdir>/CLAUDE.md` (scoped)
- All three are loaded and merged — more specific = higher priority
- Content: project overview, stack, commands, conventions, what to avoid
- Injected into context at start of every Claude Code session automatically
- Keep CLAUDE.md concise — it uses context budget; avoid putting code examples there
- `@import other-file.md` syntax to pull in additional files
- InlinePracticeQ on CLAUDE.md hierarchy

**Subtopic 1 — Custom Commands & Skills (required facts):**
- Commands: markdown files in `.claude/commands/<name>.md`; invoked with `/name`
- Skills: markdown files in `.claude/skills/<name>.md` (or in plugin dirs); richer — can describe when to trigger
- Command content is the prompt injected when slash-command is run
- Skills can have `description` field — used by Claude to decide when to invoke proactively
- Global commands/skills: `~/.claude/commands/` and `~/.claude/skills/`
- Skill `Skill` tool: use to invoke skills programmatically within an agent
- InlinePracticeQ on difference between commands and skills

**Subtopic 2 — Plan Mode & Iterative Refinement (required facts):**
- Toggle: `Shift+Tab` to enter/exit plan mode
- In plan mode: Claude explores codebase, reads files, but does NOT write code
- `ExitPlanMode` tool: Claude uses this when plan is ready; shows plan to user for approval
- `AskUserQuestion` tool: Claude can ask clarifying questions in plan mode
- Best for: complex features, refactors, multi-file changes where getting the approach right matters
- Iterative refinement: after plan approval, execute → review → adjust → repeat
- InlinePracticeQ on when to use plan mode

**Subtopic 3 — CI/CD Integration & Batch Processing (required facts):**
- `--headless` flag: non-interactive mode; disables all prompts; suitable for CI
- `--print` / `-p`: print final response and exit (non-interactive single query)
- `--output-format json`: structured JSON output for scripting
- `--allowedTools`: restrict which tools CI pipeline can use (safety)
- `--no-interactive` equivalent behavior in CI: set `CLAUDE_CODE_HEADLESS=true`
- Use cases: automated code review, test generation, doc generation, PR descriptions
- MCP servers can be used in CI pipelines for tool access
- InlinePracticeQ on headless mode configuration

- [ ] **Step 1: Create content/domains/claude-code.mdx following the structure above**

---

### Task 9: D4 — Prompt Engineering content

**Files:**
- Create: `content/domains/prompt-engineering.mdx`

**Required content structure** (4 subtopics, domainKey="d4", index 0–3):

**Subtopic 0 — Explicit Criteria & Instruction Design (required facts):**
- Be specific: format, length, audience, tone, scope
- XML tags for structure: `<context>`, `<instructions>`, `<examples>`, `<output_format>`
- Separate concerns: don't mix persona, task, and output format in one paragraph
- Chain-of-thought: "Think step by step" or `<thinking>` tags improve reasoning quality
- Avoid negatives where possible ("do not include" → "only include")
- Specificity beats brevity for complex tasks
- InlinePracticeQ on XML tags in prompts

**Subtopic 1 — Few-Shot Prompting (required facts):**
- Provide 2–5 examples of input → output
- Format: `<example><input>...</input><output>...</output></example>` or H-A-H pairs
- Examples must match the target format exactly
- Cover edge cases: what to do with unusual inputs
- Position: examples after instructions, before the actual input
- Quality > quantity: 2 perfect examples beat 10 mediocre ones
- InlinePracticeQ on few-shot example placement

**Subtopic 2 — Tool Use for Structured Output (required facts):**
- Define output schema as a tool with no side effects (it won't actually be called)
- Force Claude to "call" the tool: `tool_choice: { type: "tool", name: "extract_data" }`
- Parse `tool_use` block's `input` field as structured JSON — guaranteed to match schema
- Advantage over asking for JSON in text: no markdown fences, no explanation, always valid JSON
- Define strict parameter types; use `enum` for constrained choices
- InlinePracticeQ on tool_choice for structured output

**Subtopic 3 — Validation-Retry Loops & Multi-Pass Review (required facts):**
- Parse Claude's output → validate against schema → on failure, re-prompt with specific error
- Retry prompt: include the original output + what was wrong + ask to fix just that
- Limit retries: 3 attempts max; on persistent failure, surface to human
- Multi-pass: first pass = draft, second pass = review/critique, third pass = revise
- Don't re-send full context on retry — just the diff/error
- Keep validation logic in code, not prompt ("if output doesn't match, re-ask")
- InlinePracticeQ on retry loop design

- [ ] **Step 1: Create content/domains/prompt-engineering.mdx following the structure above**

---

### Task 10: D5 — Context Management content

**Files:**
- Create: `content/domains/context-management.mdx`

**Required content structure** (4 subtopics, domainKey="d5", index 0–3):

**Subtopic 0 — Context Optimization & Positioning (required facts):**
- Claude's attention is not uniform: beginning and end of context get more weight
- Put stable, high-importance info at the TOP (system prompt, CLAUDE.md)
- Put the actual task/request JUST BEFORE the assistant turn (recency matters)
- Examples: put between stable context and task
- Trim irrelevant history: don't include old tool calls that are no longer relevant
- Summarization: for long conversations, /compact or programmatic summarization
- Token budgets: track usage with `usage.input_tokens` in API response
- InlinePracticeQ on context positioning

**Subtopic 1 — Escalation & Error Propagation (required facts):**
- Subagents should not silently swallow errors
- Return structured error up the chain: `{ "error": "...", "escalate": true }`
- Orchestrator decides: retry with different approach, ask human, or abort
- `stop_reason: "max_tokens"` = context too long — escalate immediately
- Human-in-the-loop checkpoints before irreversible actions (file deletion, DB writes, deploys)
- Don't retry indefinitely: define max_retries at orchestrator level
- InlinePracticeQ on error escalation patterns

**Subtopic 2 — Context Degradation & Extended Sessions (required facts):**
- Long sessions: Claude's accuracy and consistency degrade as context fills
- Symptoms: repeating mistakes, ignoring earlier instructions, style inconsistency
- Mitigation: /compact (Claude Code), programmatic summarization (API), fresh sessions for new tasks
- Context window: ~200k tokens; a 5k-line codebase = ~50k tokens; long conversations add up
- Extended thinking: uses hidden context; counts toward token budget but not visible in messages
- Prefer short, focused sessions over multi-hour monolithic ones
- InlinePracticeQ on context degradation symptoms

**Subtopic 3 — Human Review & Information Provenance (required facts):**
- Checkpoints: pause before write operations, API calls, or irreversible actions for human review
- In Claude Code: `AskUserQuestion` tool for explicit confirmation
- Hooks: `PreToolUse` to require human approval for sensitive tools
- Provenance: track what information Claude used to reach a conclusion
- Source attribution: have Claude cite sources when making factual claims
- Audit trail: log all tool calls and their results for post-hoc review
- InlinePracticeQ on human review checkpoints

- [ ] **Step 1: Create content/domains/context-management.mdx following the structure above**

---

### Task 11: Full build verification

- [ ] **Step 1: Run all tests**

```bash
npx jest
```
Expected: All tests pass

- [ ] **Step 2: Run full Next.js build**

```bash
npm run build
```
Expected: Build succeeds. All 5 domain routes pre-rendered. No TypeScript errors.

- [ ] **Step 3: Start dev server and verify all 5 domain routes**

```bash
npm run dev
```

Visit each route and verify:
- `http://localhost:3000/domains/agentic-architecture` — D1 content renders, all 4 subtopics visible
- `http://localhost:3000/domains/tool-design` — D2, 5 subtopics
- `http://localhost:3000/domains/claude-code` — D3, 4 subtopics
- `http://localhost:3000/domains/prompt-engineering` — D4, 4 subtopics
- `http://localhost:3000/domains/context-management` — D5, 4 subtopics

For each page verify:
- Breadcrumb shows correct path
- Domain tab nav highlights the active domain
- SubtopicSection mark_complete button works (click it, check localStorage in DevTools)
- InlinePracticeQ reveals answer on click, disables options, shows explanation
- Code blocks render with `bg-[var(--bg2)]` styling

---

### Task 12: Final commit

- [ ] **Step 1: Stage and commit**

```bash
git add content/ app/domains/
git commit -m "feat: domain pages — all 5 domains with MDX content, subtopic completion tracking, inline practice questions"
```
