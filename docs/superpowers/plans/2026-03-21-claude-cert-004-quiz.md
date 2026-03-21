# Claude Cert Prep Hub — 004 Practice Quiz

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/practice` quiz page — 35 questions across all 5 domains, filter by domain, immediate answer reveal on click, running score display, and localStorage persistence of quiz results.

**Architecture:** Questions defined in `lib/questions.ts` as a typed array (35 total: D1×8, D2×6, D3×7, D4×7, D5×7). `usePractice` hook manages filter, per-question answer state, and score. QuestionCard, DomainFilter, and ScoreDisplay are isolated components. Answer reveal is immediate on click — no end-of-session mode. Quiz result written to localStorage when a domain filter is active and all filtered questions answered.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Jest, React Testing Library

**Prerequisite:** Plans 001 + 002 complete.

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `lib/questions.ts` | All 35 questions with options, correct index, explanation, domain tag |
| Create | `components/QuestionCard.tsx` | Single question card — 4 options, reveal on click, correct/wrong styling |
| Create | `components/DomainFilter.tsx` | "All" + D1–D5 filter buttons |
| Create | `components/ScoreDisplay.tsx` | Running "X / Y correct" counter |
| Create | `hooks/usePractice.ts` | Filter state, answer tracking, score calc, localStorage write |
| Modify | `app/practice/page.tsx` | Full practice page assembled from above |
| Create | `__tests__/components/QuestionCard.test.tsx` | Unit tests |
| Create | `__tests__/components/DomainFilter.test.tsx` | Unit tests |
| Create | `__tests__/components/ScoreDisplay.test.tsx` | Unit tests |

---

## Tasks

### Task 1: Create questions data

**Files:**
- Create: `lib/questions.ts`

- [ ] **Step 1: Create lib/questions.ts with all 35 questions**

```typescript
// lib/questions.ts
import { DomainKey } from '@/types'

export interface Question {
  id: string
  domain: DomainKey
  question: string
  options: string[]
  correct: number // 0-based
  explanation: string
}

export const QUESTIONS: Question[] = [
  // ─── D1: Agentic Architecture (8 questions) ───────────────────────────────
  {
    id: 'd1-1',
    domain: 'd1',
    question: 'Which stop_reason indicates Claude wants to invoke a tool?',
    options: ['end_turn', 'tool_use', 'max_tokens', 'stop_sequence'],
    correct: 1,
    explanation:
      'stop_reason="tool_use" means Claude\'s response contains a tool_use content block. The agent must execute the tool and return a tool_result before continuing.',
  },
  {
    id: 'd1-2',
    domain: 'd1',
    question:
      'In an agentic loop, after Claude returns a tool_use block, what must be appended to the messages array?',
    options: [
      'Just a user turn with the tool_result',
      'The full assistant response (with tool_use), then a user turn with tool_result',
      'A new user message restating the original request',
      'Nothing — Claude automatically continues',
    ],
    correct: 1,
    explanation:
      'Both messages are required: the assistant turn (containing the tool_use block) and a user turn with type "tool_result" referencing the tool_use_id. Omitting the assistant turn causes an API error.',
  },
  {
    id: 'd1-3',
    domain: 'd1',
    question: 'What is the primary role of an orchestrator in a multi-agent system?',
    options: [
      'Execute tool calls directly',
      'Store conversation history',
      'Break tasks into subtasks, dispatch agents, and aggregate results',
      'Rate-limit API calls',
    ],
    correct: 2,
    explanation:
      'The orchestrator coordinates the system — it decomposes complex tasks, delegates to specialized subagents, and synthesizes their outputs into a final result.',
  },
  {
    id: 'd1-4',
    domain: 'd1',
    question: 'A PreToolUse hook script exits with code 1. What happens in Claude Code?',
    options: [
      'The tool runs normally',
      "The tool is blocked and the hook's stdout is passed to Claude as context",
      "The tool is blocked and the hook's stdout is shown to the user",
      'Claude Code crashes',
    ],
    correct: 1,
    explanation:
      'Exit code 1 (any non-zero, non-2) blocks the tool call and sends the hook stdout back to Claude as additional context, allowing Claude to adjust its approach. Exit code 2 surfaces the message to the user instead.',
  },
  {
    id: 'd1-5',
    domain: 'd1',
    question: 'You want to resume the most recent Claude Code session. Which flag is correct?',
    options: ['claude --new', 'claude --continue', 'claude --restore', 'claude --session-id last'],
    correct: 1,
    explanation:
      '--continue resumes the most recent conversation. --resume <session-id> resumes a specific past session. These flags preserve context from the previous session.',
  },
  {
    id: 'd1-6',
    domain: 'd1',
    question:
      'A tool returns { "error": "File not found", "path": "/tmp/data.csv" } instead of throwing an exception. How does Claude handle this?',
    options: [
      'Claude crashes with an unhandled exception',
      'Claude ignores the error and returns end_turn',
      'Claude reads the structured error and decides whether to retry, use a different approach, or report to the user',
      'The API returns a 500 error',
    ],
    correct: 2,
    explanation:
      'Structured error responses allow Claude to reason about what went wrong and act on it — something impossible if the tool throws an unhandled exception.',
  },
  {
    id: 'd1-7',
    domain: 'd1',
    question:
      'When should a multi-agent orchestrator dispatch subagents in parallel rather than sequentially?',
    options: [
      'Always — parallelism is always faster',
      'When subtasks are independent and do not share mutable state',
      'Only when the user explicitly requests it',
      'When subtasks have sequential dependencies on each other',
    ],
    correct: 1,
    explanation:
      'Parallel dispatch works well for independent tasks (e.g., searching different data sources simultaneously). Tasks with sequential dependencies must run in order.',
  },
  {
    id: 'd1-8',
    domain: 'd1',
    question:
      'What is the recommended max_tokens setting for agentic tasks with multiple sequential tool calls?',
    options: [
      '256 (minimum to save cost)',
      '1024',
      '4096 or higher — enough for multi-step reasoning and tool responses',
      'max_tokens does not apply to agentic tasks',
    ],
    correct: 2,
    explanation:
      'Agentic tasks involve multi-step reasoning. A low max_tokens will cause stop_reason="max_tokens" mid-task, cutting off the response. Set 4096+ for agentic workflows.',
  },

  // ─── D2: Tool Design & MCP (6 questions) ──────────────────────────────────
  {
    id: 'd2-1',
    domain: 'd2',
    question: 'What is the recommended naming convention for Claude tool names?',
    options: ['PascalCase (SearchWeb)', 'camelCase (searchWeb)', 'snake_case (search_web)', 'UPPER_CASE (SEARCH_WEB)'],
    correct: 2,
    explanation:
      'Tool names should use snake_case with a verb-noun pattern (e.g., search_web, read_file). This follows Anthropic tool design guidelines and is the most readable format for Claude.',
  },
  {
    id: 'd2-2',
    domain: 'd2',
    question: 'A file-reading tool fails because the file does not exist. What should it return?',
    options: [
      'null',
      'An empty string ""',
      'throw new Error("File not found")',
      '{ "error": "File not found", "path": "/requested/file.txt" }',
    ],
    correct: 3,
    explanation:
      'Tools should return structured errors, not throw exceptions or return null. A structured error gives Claude actionable information to decide its next step.',
  },
  {
    id: 'd2-3',
    domain: 'd2',
    question: 'How do you force Claude to use a specific tool named "extract_data"?',
    options: [
      'tool_choice: { type: "auto" }',
      'tool_choice: { type: "any" }',
      'tool_choice: { type: "tool", name: "extract_data" }',
      'Set that tool first in the tools array',
    ],
    correct: 2,
    explanation:
      'tool_choice: { type: "tool", name: "..." } forces Claude to use that specific tool. This is essential for structured output patterns.',
  },
  {
    id: 'd2-4',
    domain: 'd2',
    question: 'What is the key difference between stdio and SSE MCP transports?',
    options: [
      'stdio supports more tools; SSE is limited to 10',
      'stdio runs a local subprocess (secure); SSE connects to a remote HTTP server',
      'SSE is for Claude Code only; stdio is for the API',
      'They are identical in behavior',
    ],
    correct: 1,
    explanation:
      'stdio spawns a local subprocess connected via stdin/stdout — simpler, more secure for local tools. SSE connects to a remote server over HTTP, useful for shared team infrastructure.',
  },
  {
    id: 'd2-5',
    domain: 'd2',
    question: 'You want to search file contents for a regex pattern. Which built-in Claude Code tool should you prefer?',
    options: ['Bash (grep command)', 'Grep', 'WebSearch', 'Read'],
    correct: 1,
    explanation:
      'The Grep tool is the correct choice. It\'s faster and safer than running grep via Bash, and provides structured output. Reserve Bash for operations where no dedicated tool exists.',
  },
  {
    id: 'd2-6',
    domain: 'd2',
    question:
      'An agent needs to read files and search the web, but must NOT execute shell commands. What principle guides its tool configuration?',
    options: [
      'Expose all tools so Claude can choose the best one',
      'Principle of least privilege — only expose the tools the agent actually needs',
      'Always expose Bash for fallback flexibility',
      'Use the Computer tool as a universal replacement',
    ],
    correct: 1,
    explanation:
      'Agents should only have access to the tools they need for their task. Exposing unnecessary tools (especially Bash) increases blast radius and security risk.',
  },

  // ─── D3: Claude Code Configuration (7 questions) ──────────────────────────
  {
    id: 'd3-1',
    domain: 'd3',
    question: 'In what order does Claude Code apply CLAUDE.md files when multiple levels exist?',
    options: [
      'Subdirectory → project root → global (most specific wins on conflict)',
      'Global → project root → subdirectory (most specific overwrites)',
      'Only the project root CLAUDE.md is loaded',
      'The last CLAUDE.md found in the directory tree wins',
    ],
    correct: 0,
    explanation:
      'All three levels are loaded and merged. More specific files (subdirectory) take precedence over general ones (global) on conflicts. All levels are additive — not mutually exclusive.',
  },
  {
    id: 'd3-2',
    domain: 'd3',
    question: 'Where should a custom /review slash command be placed to use it in ALL projects?',
    options: [
      '<project>/.claude/commands/review.md',
      '~/.claude/commands/review.md',
      '~/.claude/skills/review.md',
      '<project>/CLAUDE.md',
    ],
    correct: 1,
    explanation:
      'Global commands go in ~/.claude/commands/. Project-scoped commands go in <project>/.claude/commands/. Global placement makes the command available in all projects.',
  },
  {
    id: 'd3-3',
    domain: 'd3',
    question: 'How do you enter plan mode in Claude Code?',
    options: ['Type /plan in chat', 'Press Shift+Tab', 'Run claude --plan', 'Invoke the ExitPlanMode tool'],
    correct: 1,
    explanation:
      'Shift+Tab toggles plan mode. In plan mode, Claude explores the codebase but does not write code until the user approves the plan via the ExitPlanMode tool.',
  },
  {
    id: 'd3-4',
    domain: 'd3',
    question: 'What does the ExitPlanMode tool do when Claude invokes it?',
    options: [
      'Terminates the Claude Code session',
      'Signals that planning is complete and presents the plan to the user for approval',
      'Switches Claude to read-only mode permanently',
      'Exports the plan to a markdown file automatically',
    ],
    correct: 1,
    explanation:
      'ExitPlanMode signals plan completion. The user sees the plan and can approve (Claude proceeds) or request changes. It is the handoff between planning and execution.',
  },
  {
    id: 'd3-5',
    domain: 'd3',
    question:
      'You are building a CI pipeline that runs Claude to auto-generate PR descriptions. Which flag must you use?',
    options: ['--verbose', '--headless', '--interactive', '--safe'],
    correct: 1,
    explanation:
      '--headless makes Claude Code fully non-interactive, disabling all confirmation prompts. This is required for automated CI pipelines where there is no human to approve prompts.',
  },
  {
    id: 'd3-6',
    domain: 'd3',
    question: 'What is the key difference between a Claude Code command and a skill?',
    options: [
      'Commands run in the terminal; skills run in the browser',
      'Commands are explicit /name invocations; skills have trigger descriptions and can be invoked proactively',
      'Skills support TypeScript; commands are markdown only',
      'There is no difference — they are synonyms',
    ],
    correct: 1,
    explanation:
      'Commands (/name) are always explicitly invoked by the user. Skills have description fields Claude uses to decide when to trigger them proactively via the Skill tool.',
  },
  {
    id: 'd3-7',
    domain: 'd3',
    question:
      'Why should you put project context in CLAUDE.md rather than explaining it in the first chat message?',
    options: [
      'CLAUDE.md is parsed faster than chat messages',
      'CLAUDE.md is injected at the start of every session — Claude always has context without the user re-explaining it',
      'Chat messages are not visible to Claude',
      'CLAUDE.md supports formatting that chat messages do not',
    ],
    correct: 1,
    explanation:
      'Claude does not remember previous conversations. CLAUDE.md is automatically injected at session start, ensuring consistent project context across all sessions without repetition.',
  },

  // ─── D4: Prompt Engineering (7 questions) ─────────────────────────────────
  {
    id: 'd4-1',
    domain: 'd4',
    question:
      'What is the main advantage of using tool_choice to force structured output vs. asking Claude to "respond with JSON"?',
    options: [
      'tool_choice is significantly faster',
      'Asking for JSON is more flexible',
      'tool_choice guarantees valid JSON matching the defined schema; asking for JSON in text can produce markdown fences or narrative',
      'tool_choice is only available in Claude 3+',
    ],
    correct: 2,
    explanation:
      "When you force a tool call via tool_choice, Claude must populate the tool's parameters according to the schema. The result is always valid parseable JSON — no markdown fences, no extra text.",
  },
  {
    id: 'd4-2',
    domain: 'd4',
    question: 'When using few-shot examples in a prompt, where should they be placed?',
    options: [
      'Before the system instructions',
      'After instructions but before the actual user input',
      'At the very end, after the user input',
      'Position does not matter for few-shot examples',
    ],
    correct: 1,
    explanation:
      'Standard placement: system/instructions → examples → actual task. Claude sees the format pattern just before the task it needs to apply it to, maximizing the few-shot effect.',
  },
  {
    id: 'd4-3',
    domain: 'd4',
    question: 'Which XML tags are most commonly used to structure Claude prompts?',
    options: [
      '<input>, <response>, <meta>',
      '<context>, <instructions>, <examples>, <output_format>',
      '<system>, <user>, <assistant>',
      'Claude ignores XML tags',
    ],
    correct: 1,
    explanation:
      'Claude is trained to attend to structured markup. Common effective tags: <context> (background), <instructions> (task), <examples> (few-shot), <output_format> (desired format).',
  },
  {
    id: 'd4-4',
    domain: 'd4',
    question:
      'In a validation-retry loop, what is the recommended maximum number of retries before escalating to a human?',
    options: ['1', '3', '10', 'Unlimited — keep retrying until success'],
    correct: 1,
    explanation:
      '3 retries is the recommended ceiling. After 3 failed attempts, the issue is likely structural and requires human intervention rather than more automated retries.',
  },
  {
    id: 'd4-5',
    domain: 'd4',
    question: 'Chain-of-thought prompting ("think step by step") is most effective for which type of task?',
    options: [
      'Simple factual lookups',
      'Code formatting and style fixes',
      'Multi-step reasoning tasks — math, logic, planning, complex analysis',
      'Generating short creative text snippets',
    ],
    correct: 2,
    explanation:
      'Chain-of-thought dramatically improves multi-step reasoning performance. For simple or creative tasks, it adds unnecessary tokens without proportional benefit.',
  },
  {
    id: 'd4-6',
    domain: 'd4',
    question: 'What should an effective retry prompt include when Claude\'s first response fails validation?',
    options: [
      'The full original prompt repeated verbatim',
      'Just "please try again"',
      'The original output + a specific description of what was wrong + instruction to fix exactly that',
      'A completely different prompt from scratch',
    ],
    correct: 2,
    explanation:
      'Effective retry prompts reference the problematic output, explain precisely what\'s wrong, and ask Claude to fix specifically that. This preserves context and provides actionable feedback.',
  },
  {
    id: 'd4-7',
    domain: 'd4',
    question:
      'You need Claude to always extract exactly three fields (name, email, phone) from freeform user text. What is the most reliable approach?',
    options: [
      'Ask Claude to "return JSON with name, email, and phone"',
      'Define a tool with required parameters name, email, phone and use tool_choice: { type: "tool" }',
      'Use few-shot examples showing the extraction pattern',
      'Ask Claude to format output as a markdown table',
    ],
    correct: 1,
    explanation:
      'Defining a tool with required parameters and forcing its use guarantees all three fields are present. The schema enforces structure at the API level, unlike free-form instructions.',
  },

  // ─── D5: Context Management (7 questions) ─────────────────────────────────
  {
    id: 'd5-1',
    domain: 'd5',
    question: 'Where should stable, high-importance context (instructions, constraints) be positioned?',
    options: [
      'At the end, just before the user request',
      'At the beginning of the context (system prompt)',
      'In the middle of the conversation history',
      'Position has no effect on Claude\'s attention',
    ],
    correct: 1,
    explanation:
      'Claude gives more weight to content at the beginning (system prompt) and end (recent turns). Stable important context belongs at the top; the specific task should come just before the assistant turn.',
  },
  {
    id: 'd5-2',
    domain: 'd5',
    question:
      'Which symptom most clearly indicates context degradation in a long Claude Code session?',
    options: [
      'Claude Code runs noticeably slower',
      'API response times increase significantly',
      'Claude starts ignoring earlier instructions or making mistakes it did not make at the session start',
      'Tool calls begin to silently fail',
    ],
    correct: 2,
    explanation:
      'Context degradation manifests as behavioral inconsistency — forgetting constraints, repeating earlier mistakes, or declining output quality. This indicates earlier content is getting less attention as context fills.',
  },
  {
    id: 'd5-3',
    domain: 'd5',
    question:
      'A subagent encounters a database timeout it cannot recover from. What is the correct action?',
    options: [
      'Retry the operation indefinitely until it succeeds',
      'Return a success response with empty data',
      'Return a structured error to the orchestrator indicating escalation is needed',
      'Terminate the entire agent session',
    ],
    correct: 2,
    explanation:
      'Subagents should propagate errors up the chain with enough context for the orchestrator to decide next steps. Silent failures or empty success responses hide problems from the system.',
  },
  {
    id: 'd5-4',
    domain: 'd5',
    question:
      'Your Claude Code session is approaching the context window limit mid-task. What is the best action?',
    options: [
      'Start a brand new session and re-explain everything from scratch',
      'Run /compact to summarize and compress conversation history',
      'Increase max_tokens in the settings',
      'Delete old files to reduce context',
    ],
    correct: 1,
    explanation:
      '/compact triggers context compression — Claude summarizes the conversation history into a compact form, freeing context window space while preserving key decisions and state.',
  },
  {
    id: 'd5-5',
    domain: 'd5',
    question:
      'Which Claude Code tool allows Claude to explicitly pause and ask the user a clarifying question?',
    options: ['UserPrompt', 'AskUserQuestion', 'RequestConfirmation', 'PauseAndAsk'],
    correct: 1,
    explanation:
      'AskUserQuestion is the correct tool for pausing to ask the user something. This is preferred over making assumptions or hallucinating answers to unclear requirements.',
  },
  {
    id: 'd5-6',
    domain: 'd5',
    question:
      'Before which type of operation should human-in-the-loop checkpoints always be configured?',
    options: [
      'Reading files',
      'Searching the web',
      'Irreversible operations — deleting data, deploying to production, sending emails',
      'Running unit tests',
    ],
    correct: 2,
    explanation:
      'Checkpoints are critical before irreversible operations where a mistake cannot be undone. File reads, web searches, and test runs are low-risk, reversible operations.',
  },
  {
    id: 'd5-7',
    domain: 'd5',
    question:
      'What does "information provenance" mean in the context of Claude-generated outputs?',
    options: [
      'The model version that generated the output',
      'The speed at which Claude generated the response',
      'Tracking and attributing which source information was used to reach each conclusion',
      'The number of tool calls made during generation',
    ],
    correct: 2,
    explanation:
      'Provenance means knowing the origin of information in Claude\'s outputs. For high-stakes applications, Claude should cite sources — enabling humans to verify the reasoning chain.',
  },
]

export function getQuestionsByDomain(domain: DomainKey | 'all'): Question[] {
  if (domain === 'all') return QUESTIONS
  return QUESTIONS.filter((q) => q.domain === domain)
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: No errors

---

### Task 2: QuestionCard component

**Files:**
- Create: `components/QuestionCard.tsx`
- Create: `__tests__/components/QuestionCard.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/QuestionCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { QuestionCard } from '@/components/QuestionCard'
import { QUESTIONS } from '@/lib/questions'

const q = QUESTIONS[0] // d1-1

describe('QuestionCard', () => {
  it('renders question text', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    expect(screen.getByText(q.question)).toBeInTheDocument()
  })

  it('renders domain tag', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    expect(screen.getByText('D1')).toBeInTheDocument()
  })

  it('renders all 4 options', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    q.options.forEach((opt) => expect(screen.getByText(opt)).toBeInTheDocument())
  })

  it('does not show explanation before answering', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    expect(screen.queryByText(q.explanation)).not.toBeInTheDocument()
  })

  it('reveals explanation after clicking an option', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    fireEvent.click(screen.getByText(q.options[0]))
    expect(screen.getByText(q.explanation)).toBeInTheDocument()
  })

  it('calls onAnswer with correct=true when correct option clicked', () => {
    const onAnswer = jest.fn()
    render(<QuestionCard question={q} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText(q.options[q.correct]))
    expect(onAnswer).toHaveBeenCalledWith(true)
  })

  it('calls onAnswer with correct=false when wrong option clicked', () => {
    const onAnswer = jest.fn()
    render(<QuestionCard question={q} onAnswer={onAnswer} />)
    const wrongOption = q.options.find((_, i) => i !== q.correct)!
    fireEvent.click(screen.getByText(wrongOption))
    expect(onAnswer).toHaveBeenCalledWith(false)
  })

  it('disables all options after answering', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    fireEvent.click(screen.getByText(q.options[0]))
    screen.getAllByRole('button').forEach((btn) => expect(btn).toBeDisabled())
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/QuestionCard.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Implement QuestionCard**

```tsx
// components/QuestionCard.tsx
'use client'
import { useState } from 'react'
import { Question } from '@/lib/questions'
import { DOMAINS } from '@/lib/domains'

interface QuestionCardProps {
  question: Question
  onAnswer: (correct: boolean) => void
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const domain = DOMAINS.find((d) => d.key === question.domain)

  function handleSelect(i: number) {
    if (answered) return
    setSelected(i)
    onAnswer(i === question.correct)
  }

  return (
    <div className="border border-[var(--border)] p-5 bg-[var(--bg)]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        {domain && (
          <span className="text-[11px] uppercase tracking-widest px-2 py-0.5 bg-[var(--bg2)] text-[var(--muted)]">
            {domain.number}
          </span>
        )}
      </div>

      {/* Question */}
      <p className="text-sm font-semibold mb-4 leading-6">{question.question}</p>

      {/* Options */}
      <div className="flex flex-col gap-2 mb-4">
        {question.options.map((opt, i) => {
          let style = 'border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg2)]'
          if (answered) {
            if (i === question.correct)
              style = 'border-[var(--teal)] bg-[var(--teal-bg)] text-[var(--teal)]'
            else if (i === selected)
              style = 'border-red-400 bg-red-50 text-red-600'
            else
              style = 'border-[var(--border)] text-[var(--muted)]'
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => handleSelect(i)}
              className={`text-xs text-left px-3 py-2 border transition-colors disabled:cursor-default ${style}`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className="text-xs text-[var(--muted)] border-t border-[var(--border)] pt-3 leading-6">
          {question.explanation}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/QuestionCard.test.tsx
```
Expected: All 8 tests PASS

---

### Task 3: DomainFilter component

**Files:**
- Create: `components/DomainFilter.tsx`
- Create: `__tests__/components/DomainFilter.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/DomainFilter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { DomainFilter } from '@/components/DomainFilter'
import { DomainKey } from '@/types'

describe('DomainFilter', () => {
  it('renders All button and 5 domain buttons', () => {
    render(<DomainFilter active="all" onChange={() => {}} />)
    expect(screen.getByText('All')).toBeInTheDocument()
    ;['D1', 'D2', 'D3', 'D4', 'D5'].forEach((d) =>
      expect(screen.getByText(d)).toBeInTheDocument()
    )
  })

  it('highlights the active filter', () => {
    render(<DomainFilter active="d1" onChange={() => {}} />)
    const d1Button = screen.getByText('D1')
    expect(d1Button).toHaveClass('text-[var(--teal)]')
  })

  it('calls onChange with "all" when All clicked', () => {
    const onChange = jest.fn()
    render(<DomainFilter active="d1" onChange={onChange} />)
    fireEvent.click(screen.getByText('All'))
    expect(onChange).toHaveBeenCalledWith('all')
  })

  it('calls onChange with domain key when domain button clicked', () => {
    const onChange = jest.fn()
    render(<DomainFilter active="all" onChange={onChange} />)
    fireEvent.click(screen.getByText('D3'))
    expect(onChange).toHaveBeenCalledWith('d3')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/DomainFilter.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Implement DomainFilter**

```tsx
// components/DomainFilter.tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/DomainFilter.test.tsx
```
Expected: All 4 tests PASS

---

### Task 4: ScoreDisplay component

**Files:**
- Create: `components/ScoreDisplay.tsx`
- Create: `__tests__/components/ScoreDisplay.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/ScoreDisplay.test.tsx
import { render, screen } from '@testing-library/react'
import { ScoreDisplay } from '@/components/ScoreDisplay'

describe('ScoreDisplay', () => {
  it('renders X / Y correct format', () => {
    render(<ScoreDisplay correct={3} total={7} />)
    expect(screen.getByText('3 / 7 correct')).toBeInTheDocument()
  })

  it('shows 0 / N when no answers given', () => {
    render(<ScoreDisplay correct={0} total={35} />)
    expect(screen.getByText('0 / 35 correct')).toBeInTheDocument()
  })

  it('renders nothing when total is 0', () => {
    const { container } = render(<ScoreDisplay correct={0} total={0} />)
    expect(container).toBeEmptyDOMElement()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/ScoreDisplay.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Implement ScoreDisplay**

```tsx
// components/ScoreDisplay.tsx
interface ScoreDisplayProps {
  correct: number
  total: number
}

export function ScoreDisplay({ correct, total }: ScoreDisplayProps) {
  if (total === 0) return null

  return (
    <div className="text-[11px] uppercase tracking-widest text-[var(--muted)]">
      {correct} / {total} correct
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/ScoreDisplay.test.tsx
```
Expected: All 3 tests PASS

- [ ] **Step 5: Commit components**

```bash
git add components/ __tests__/components/ lib/questions.ts
git commit -m "feat: practice quiz components — QuestionCard, DomainFilter, ScoreDisplay, questions data"
```

---

### Task 5: Create usePractice hook

**Files:**
- Create: `hooks/usePractice.ts`

- [ ] **Step 1: Create hooks/usePractice.ts**

```typescript
// hooks/usePractice.ts
'use client'
import { useState, useMemo, useCallback } from 'react'
import { DomainKey } from '@/types'
import { getQuestionsByDomain } from '@/lib/questions'
import { setQuizResult } from '@/lib/progress'

export function usePractice() {
  const [filter, setFilter] = useState<DomainKey | 'all'>('all')
  // Map of question id → whether answered correctly (null = not answered)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const questions = useMemo(() => getQuestionsByDomain(filter), [filter])

  const answeredCount = Object.keys(answers).length
  const correctCount = Object.values(answers).filter(Boolean).length

  const handleAnswer = useCallback(
    (questionId: string, correct: boolean) => {
      setAnswers((prev) => {
        const updated = { ...prev, [questionId]: correct }

        // If a single domain is selected and all filtered questions answered → save result
        if (filter !== 'all') {
          const filteredQuestions = getQuestionsByDomain(filter)
          const allAnswered = filteredQuestions.every((q) => q.id in updated)
          if (allAnswered) {
            const domainCorrect = filteredQuestions.filter((q) => updated[q.id]).length
            setQuizResult(filter, domainCorrect, filteredQuestions.length)
          }
        }

        return updated
      })
    },
    [filter]
  )

  const handleFilterChange = useCallback((newFilter: DomainKey | 'all') => {
    setFilter(newFilter)
    setAnswers({}) // Reset answers when filter changes
  }, [])

  return {
    filter,
    questions,
    answers,
    answeredCount,
    correctCount,
    handleAnswer,
    handleFilterChange,
  }
}
```

---

### Task 6: Assemble Practice page

**Files:**
- Modify: `app/practice/page.tsx`

- [ ] **Step 1: Replace app/practice/page.tsx**

```tsx
// app/practice/page.tsx
'use client'
import { usePractice } from '@/hooks/usePractice'
import { QuestionCard } from '@/components/QuestionCard'
import { DomainFilter } from '@/components/DomainFilter'
import { ScoreDisplay } from '@/components/ScoreDisplay'

export default function PracticePage() {
  const { filter, questions, answers, correctCount, handleAnswer, handleFilterChange } = usePractice()

  return (
    <div>
      {/* Header */}
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">
        practice/
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        {questions.length} questions · answer reveal on click
      </p>

      {/* Controls row */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <DomainFilter active={filter} onChange={handleFilterChange} />
        <ScoreDisplay correct={correctCount} total={Object.keys(answers).length} />
      </div>

      {/* Questions */}
      {questions.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">// no questions match this filter</p>
      ) : (
        <div className="flex flex-col gap-4">
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onAnswer={(correct) => handleAnswer(q.id, correct)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

---

### Task 7: Verify quiz flow + final commit

- [ ] **Step 1: Run all tests**

```bash
npx jest
```
Expected: All tests pass

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

- [ ] **Step 3: Verify at http://localhost:3000/practice**

Check:
- All 35 questions render (no filter active)
- Score shows "0 / 0 correct" initially (empty until first answer)
- Click a correct option → teal highlight, explanation appears, option disabled
- Click a wrong option → red border on selected, teal on correct, explanation appears
- Score updates: "1 / 1 correct" or "0 / 1 correct"
- Click D1 filter → shows 8 questions only
- Score resets to "0 / 0" after filter change
- "// no questions match this filter" never appears (all domains have questions)

- [ ] **Step 4: Verify localStorage write**

Filter to D1. Answer all 8 questions. Open DevTools → Application → Local Storage. Check that `architect-prep` key now has `progress.d1.quiz` with `correct` and `total` values set.

- [ ] **Step 5: Commit**

```bash
git add app/practice/ hooks/usePractice.ts
git commit -m "feat: practice quiz page — 35 questions, domain filter, immediate reveal, score tracking"
```
