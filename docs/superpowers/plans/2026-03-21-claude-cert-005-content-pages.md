# Claude Cert Prep Hub — 005 Content Pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all five supporting pages with real, complete content: `/cheatsheet`, `/study-plan`, `/scenarios`, `/exercises`, `/exam-guide`.

**Architecture:** All pages statically generated. `/study-plan` uses a client component (`'use client'`) with `useStudyPlan` hook for localStorage-backed week checkboxes. All other pages are pure server components. Content data lives in `lib/study-plan.ts`, `lib/scenarios.ts`, and `lib/exercises.ts`. Cheatsheet includes a print button (hidden on mobile).

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS

**Prerequisite:** Plans 001 + 002 complete.

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `lib/study-plan.ts` | 12-week plan data (title, hours, tasks, resources) |
| Create | `lib/scenarios.ts` | 6 scenario definitions (title, domain, problem, steps, tips) |
| Create | `lib/exercises.ts` | 4 exercise definitions (title, goal, starter, criteria) |
| Create | `components/WeekRow.tsx` | Expandable week row with checkbox, title, tasks list |
| Create | `hooks/useStudyPlan.ts` | localStorage-backed week completion state |
| Modify | `app/cheatsheet/page.tsx` | Full printable cheatsheet — all 5 domains + glossary |
| Modify | `app/study-plan/page.tsx` | 12-week expandable plan with localStorage checkboxes |
| Modify | `app/scenarios/page.tsx` | 6 exam scenario walkthroughs |
| Modify | `app/exercises/page.tsx` | 4 capstone exercises with starter code |
| Modify | `app/exam-guide/page.tsx` | Exam format, scoring, FAQ, registration link |

---

## Tasks

### Task 1: Create study plan data

**Files:**
- Create: `lib/study-plan.ts`

- [ ] **Step 1: Create lib/study-plan.ts**

```typescript
// lib/study-plan.ts

export interface Week {
  number: number
  key: string // 'week1' … 'week12'
  title: string
  hours: number
  tasks: string[]
  resources: { label: string; href: string }[]
}

export const STUDY_PLAN: Week[] = [
  {
    number: 1,
    key: 'week1',
    title: 'Foundation — Exam Format & Registration',
    hours: 5,
    tasks: [
      'Read the official exam guide at anthropic.skilljar.com',
      'Register for the exam (free for the first 5,000 partner employees)',
      'Review all 5 domain names and weights: D1 27%, D2 18%, D3 20%, D4 20%, D5 15%',
      'Take the Practice Quiz (All filter) to establish a baseline score',
      'Note your weakest domain — prioritize it in upcoming weeks',
    ],
    resources: [
      { label: 'Exam registration', href: 'https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request' },
      { label: 'exam_guide/', href: '/exam-guide' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 2,
    key: 'week2',
    title: 'D1 — Agentic Loops & Core API',
    hours: 7,
    tasks: [
      'Read D1 subtopic: Agentic Loops & Core API on the domain page',
      'Trace the message flow: request → tool_use block → tool_result → end_turn',
      'Write a minimal agentic loop in code (or pseudocode) from memory',
      'Review anti-patterns: forgetting to append assistant turn, max_tokens too low',
      'Complete D1 practice questions',
    ],
    resources: [
      { label: 'D1 domain page', href: '/domains/agentic-architecture' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 3,
    key: 'week3',
    title: 'D1 — Multi-Agent, Hooks & Sessions',
    hours: 7,
    tasks: [
      'Read D1 subtopics: Multi-Agent Orchestration, Hooks & Programmatic Enforcement, Session Management',
      'Sketch an orchestrator-subagent diagram for a parallel research task',
      'Memorize PreToolUse exit code behavior: 0=allow, 1=block+send to Claude, 2=block+send to user',
      'Understand --continue vs --resume; know when to run /compact',
      'Complete all D1 practice questions',
    ],
    resources: [
      { label: 'D1 domain page', href: '/domains/agentic-architecture' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 4,
    key: 'week4',
    title: 'D2 — Tool Design & Error Responses',
    hours: 7,
    tasks: [
      'Read D2 subtopics: Tool Description Best Practices, Structured Error Responses',
      'Write tool definitions for 3 example tools following snake_case verb-noun naming',
      'Practice: return a structured error vs. throw — why does it matter?',
      'Complete D2 tool design practice questions',
    ],
    resources: [
      { label: 'D2 domain page', href: '/domains/tool-design' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 5,
    key: 'week5',
    title: 'D2 — MCP & Built-in Tools',
    hours: 7,
    tasks: [
      'Read D2 subtopics: Tool Distribution & Selection, MCP Server Configuration, Built-in Tools',
      'Compare stdio vs SSE transports: when would you use each?',
      'List all Claude Code built-in tools (Bash, Read, Write, Edit, Glob, Grep, Agent, WebFetch, WebSearch)',
      'Review principle of least privilege: why limit which tools an agent can access?',
      'Complete remaining D2 practice questions',
    ],
    resources: [
      { label: 'D2 domain page', href: '/domains/tool-design' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 6,
    key: 'week6',
    title: 'D3 — Claude Code Configuration',
    hours: 7,
    tasks: [
      'Read all 4 D3 subtopics: CLAUDE.md hierarchy, commands/skills, plan mode, CI/CD',
      'Write a sample CLAUDE.md for a hypothetical Next.js project from memory',
      'Understand the merge order: global → project → subdirectory',
      'Know: what is --headless, when is ExitPlanMode invoked, how does /plan differ from editing mode',
      'Complete all D3 practice questions',
    ],
    resources: [
      { label: 'D3 domain page', href: '/domains/claude-code' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 7,
    key: 'week7',
    title: 'D4 — Explicit Criteria & Few-Shot',
    hours: 7,
    tasks: [
      'Read D4 subtopics: Explicit Criteria & Instruction Design, Few-Shot Prompting',
      'Rewrite a vague prompt with XML tags (<context>, <instructions>, <output_format>)',
      'Write a few-shot prompt with 3 examples using the <example> pattern',
      'Complete D4 practice questions on criteria design and few-shot',
    ],
    resources: [
      { label: 'D4 domain page', href: '/domains/prompt-engineering' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 8,
    key: 'week8',
    title: 'D4 — Structured Output & Retry Loops',
    hours: 7,
    tasks: [
      'Read D4 subtopics: Tool Use for Structured Output, Validation-Retry Loops',
      'Write a tool definition for extracting name, email, phone from freeform text',
      'Design a 3-step retry loop: what does each retry prompt contain?',
      'Complete remaining D4 practice questions',
    ],
    resources: [
      { label: 'D4 domain page', href: '/domains/prompt-engineering' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 9,
    key: 'week9',
    title: 'D5 — Context Management & Reliability',
    hours: 7,
    tasks: [
      'Read all 4 D5 subtopics',
      'Understand positioning: system prompt at top, task just before assistant turn',
      'List 3 symptoms of context degradation and their mitigations',
      'Design an escalation path for a subagent that hits an unrecoverable error',
      'Complete all D5 practice questions',
    ],
    resources: [
      { label: 'D5 domain page', href: '/domains/context-management' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 10,
    key: 'week10',
    title: 'Anti-Patterns & Cross-Domain Review',
    hours: 7,
    tasks: [
      'Review the cheatsheet end-to-end — mark every concept you are unsure about',
      'Take the full Practice Quiz (All filter) — target 80%+ correct',
      'For every wrong answer, re-read the relevant domain subtopic',
      'List the top 3 anti-patterns per domain from memory, then verify against domain pages',
    ],
    resources: [
      { label: 'cheatsheet/', href: '/cheatsheet' },
      { label: 'practice/', href: '/practice' },
    ],
  },
  {
    number: 11,
    key: 'week11',
    title: 'Exam Scenarios Walkthrough',
    hours: 7,
    tasks: [
      'Work through all 6 exam scenarios on the scenarios page',
      'For each scenario: identify the domains involved, key decision points, and recommended patterns',
      'Build exercises 1 and 2 from the exercises page',
      'Take the practice quiz filtered to your weakest domain — target 85%',
    ],
    resources: [
      { label: 'scenarios/', href: '/scenarios' },
      { label: 'exercises/', href: '/exercises' },
    ],
  },
  {
    number: 12,
    key: 'week12',
    title: 'Final Review & Exam',
    hours: 7,
    tasks: [
      'Complete all 4 build exercises',
      'Final practice quiz: target 90%+ on All questions',
      'Read through the cheatsheet one final time',
      'Review exam logistics: ~15 minutes, 720/1000 to pass, 4 of 6 scenarios selected randomly',
      'Take the exam — you are ready',
    ],
    resources: [
      { label: 'exercises/', href: '/exercises' },
      { label: 'cheatsheet/', href: '/cheatsheet' },
      { label: 'exam_guide/', href: '/exam-guide' },
    ],
  },
]
```

---

### Task 2: Create scenarios data

**Files:**
- Create: `lib/scenarios.ts`

- [ ] **Step 1: Create lib/scenarios.ts**

```typescript
// lib/scenarios.ts

export interface Scenario {
  id: string
  number: number
  title: string
  domain: string // e.g., 'D2', 'D1', 'standalone'
  problem: string
  steps: { heading: string; detail: string }[]
  examTips: string[]
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'customer-support',
    number: 1,
    title: 'Customer Support Resolution Agent',
    domain: 'D2 — Tool Design & MCP',
    problem:
      'Design a Claude-powered agent that handles customer support tickets end-to-end: looks up order status, processes refund requests, and escalates to human agents when needed.',
    steps: [
      {
        heading: '1. Define tools with minimum scope',
        detail:
          'Create focused tools: get_order_status(order_id), initiate_refund(order_id, reason), escalate_to_human(ticket_id, context). Each tool does one thing. Names use snake_case verb-noun. Descriptions explain WHEN to use each tool — not just what it does.',
      },
      {
        heading: '2. Return structured errors from tools',
        detail:
          'When get_order_status fails (order not found, API timeout), return { "error": "Order not found", "order_id": "..." } rather than throwing. Claude reads the error and decides whether to ask the customer to re-check the order number or escalate.',
      },
      {
        heading: '3. Configure escalation threshold',
        detail:
          'Build escalation logic into the agent\'s system prompt: "If you cannot resolve the issue within 2 tool calls, invoke escalate_to_human with the full context." Use a PreToolUse hook to log all tool calls for audit purposes.',
      },
      {
        heading: '4. Use tool_choice: "auto" for selection',
        detail:
          'Let Claude select the right tool automatically based on context. Only expose the 3 customer-support tools — not Bash, file tools, or anything unrelated. Principle of least privilege.',
      },
      {
        heading: '5. Handle multi-turn with state',
        detail:
          'The agent may need multiple tool calls per ticket. Build the agentic loop: run until stop_reason="end_turn". Append both the assistant turn (with tool_use blocks) and user turns (with tool_result blocks) correctly.',
      },
    ],
    examTips: [
      'Key domain: D2 Tool Design — tool naming, error responses, tool selection',
      'The exam will test: structured error returns vs. exceptions; tool scope (least privilege)',
      'Watch for: "what should the tool return when the order is not found?" — always structured error, never null',
      'Cross-domain: D1 agentic loop (tool_use/tool_result flow), D5 escalation patterns',
    ],
  },
  {
    id: 'code-generation',
    number: 2,
    title: 'Code Generation with Claude Code',
    domain: 'D5 — Context Management & Reliability',
    problem:
      'A team uses Claude Code for day-to-day code generation. Over long sessions, Claude\'s output quality declines. Design a workflow that maintains reliability across extended use.',
    steps: [
      {
        heading: '1. Set up CLAUDE.md with project context',
        detail:
          'Define the project stack, testing requirements, code conventions, and what to avoid in CLAUDE.md. This injects stable context at the start of every session, so Claude doesn\'t lose project awareness across sessions.',
      },
      {
        heading: '2. Use short, focused sessions per feature',
        detail:
          'Rather than one marathon session, use --continue per feature branch. Each session has a clear scope. This keeps context fresh and avoids degradation from accumulated history.',
      },
      {
        heading: '3. Monitor for context degradation symptoms',
        detail:
          'Watch for: Claude ignoring conventions defined in CLAUDE.md, inconsistent variable naming, making mistakes it corrected earlier. These indicate the context window is filling up.',
      },
      {
        heading: '4. Use /compact before large tasks',
        detail:
          'Before starting a complex multi-file task in a long session, run /compact to summarize history. This frees context budget while preserving key decisions.',
      },
      {
        heading: '5. Configure human review checkpoints',
        detail:
          'Use AskUserQuestion tool for confirmation before writing to production files. Configure PreToolUse hooks to require approval for file writes outside the working directory.',
      },
    ],
    examTips: [
      'Key domain: D5 Context Management — degradation, /compact, session management',
      'The exam will test: symptoms of degradation; when to use /compact; CLAUDE.md purpose',
      'Cross-domain: D3 CLAUDE.md (project context), D1 session management (--continue, --resume)',
      'Watch for: "what should you do when Claude starts ignoring its instructions?" — /compact or new session',
    ],
  },
  {
    id: 'multi-agent-research',
    number: 3,
    title: 'Multi-Agent Research System',
    domain: 'D1 — Agentic Architecture',
    problem:
      'Build a research system where an orchestrator Claude dispatches multiple specialized subagents to gather information from different sources in parallel, then synthesizes a final report.',
    steps: [
      {
        heading: '1. Design the orchestrator',
        detail:
          'The orchestrator receives the research question, breaks it into independent subtasks (web search, database query, document scan), and dispatches subagents. It does NOT execute tasks directly — it delegates.',
      },
      {
        heading: '2. Dispatch subagents in parallel',
        detail:
          'Independent tasks (searching different sources) should run in parallel via run_in_background. The orchestrator waits for all results before synthesizing. Sequential dispatch would be unnecessarily slow.',
      },
      {
        heading: '3. Provide subagents minimal context',
        detail:
          'Each subagent receives only the context it needs: the specific query, the tools it should use, and the output format. Do NOT pass the full orchestrator conversation history — this wastes tokens and reduces focus.',
      },
      {
        heading: '4. Handle subagent errors',
        detail:
          'If a subagent returns { "error": "Source unavailable" }, the orchestrator decides: try a fallback source, proceed without that data, or report the gap in the final synthesis. Never silently ignore errors.',
      },
      {
        heading: '5. Synthesize and aggregate',
        detail:
          'The orchestrator receives all subagent results, deduplicates, resolves conflicts, and writes a coherent final report. It tracks information provenance — which claim came from which source.',
      },
    ],
    examTips: [
      'Key domain: D1 Multi-Agent Orchestration',
      'The exam will test: when to use parallel vs. sequential dispatch; what context to give subagents',
      'Watch for: "subagents should receive the full conversation history" — FALSE, give minimal context',
      'Cross-domain: D5 context management (provenance), D2 tool design (subagent tools)',
    ],
  },
  {
    id: 'developer-productivity',
    number: 4,
    title: 'Developer Productivity with Claude',
    domain: 'Standalone (all domains)',
    problem:
      'A development team integrates Claude into their daily workflow: PR reviews, documentation generation, debugging assistance, and test generation. Define best practices for each workflow.',
    steps: [
      {
        heading: '1. PR review workflow',
        detail:
          'Use a custom /review command (D3) that reads the diff and checks against project conventions in CLAUDE.md. Set up a CI hook (--headless mode) that auto-runs the review on every PR and posts a comment. Configure hooks to prevent Claude from force-pushing to main.',
      },
      {
        heading: '2. Documentation generation',
        detail:
          'Use structured output (D4) with a tool that enforces the doc schema. Define what fields are required (summary, params, returns, examples). Use tool_choice to guarantee complete docs, not partial responses.',
      },
      {
        heading: '3. Debugging assistance',
        detail:
          'Use plan mode (D3) for complex debugging: Claude reads the codebase, forms a hypothesis, proposes a fix for approval before modifying files. This prevents Claude from making speculative changes that break other things.',
      },
      {
        heading: '4. Test generation',
        detail:
          'Provide few-shot examples (D4) of existing tests so Claude matches the team\'s testing conventions. Use explicit criteria: coverage requirements, what edge cases to cover, which test framework to use.',
      },
      {
        heading: '5. Context management for large codebases',
        detail:
          'For large repos, use CLAUDE.md to point Claude to the relevant directories. Use SubAgent dispatching to process different parts of the codebase in parallel. Avoid loading entire files when a targeted read suffices.',
      },
    ],
    examTips: [
      'This scenario is standalone — it tests cross-domain integration',
      'The exam will test: how different domains work together in a real workflow',
      'Know: D3 (CLAUDE.md, commands), D4 (structured output, few-shot), D1 (orchestration), D5 (context)',
      'Watch for questions that require combining multiple domain concepts in one answer',
    ],
  },
  {
    id: 'claude-code-cicd',
    number: 5,
    title: 'Claude Code for CI/CD',
    domain: 'D3 — Claude Code Configuration',
    problem:
      'Integrate Claude Code into a CI/CD pipeline to automate: code quality checks, documentation generation, and changelog writing on every merge to main.',
    steps: [
      {
        heading: '1. Use --headless mode',
        detail:
          'All CI pipeline executions must use --headless (or CLAUDE_CODE_HEADLESS=true). This disables interactive prompts. Without this, Claude will hang waiting for user input that never comes.',
      },
      {
        heading: '2. Restrict tools with --allowedTools',
        detail:
          'In CI, Claude should only use the tools it needs. For code review, allow Read, Grep, Glob. For doc generation, add Write. Never allow Bash in automated pipelines unless the CI environment is sandboxed.',
      },
      {
        heading: '3. Use --output-format json for scripting',
        detail:
          'When the pipeline needs to parse Claude\'s output (e.g., extract a list of issues found), use --output-format json. This makes the output machine-parseable without fragile text parsing.',
      },
      {
        heading: '4. Configure CLAUDE.md for CI context',
        detail:
          'Add a CI-specific section to CLAUDE.md: "When running in CI, only report critical issues. Do not suggest style improvements. Output in JSON format." This ensures consistent, focused CI behavior.',
      },
      {
        heading: '5. Set up hooks for enforcement',
        detail:
          'Use PreToolUse hooks to block any write operations outside the designated output directory. Use PostToolUse hooks to log all file writes for the CI audit trail.',
      },
    ],
    examTips: [
      'Key domain: D3 Claude Code — CI/CD, --headless, CLAUDE.md',
      'The exam will test: what flag is required for CI? Which tools should be restricted?',
      'Watch for: "Claude Code requires interactive approval in CI" — FALSE, use --headless',
      'Cross-domain: D2 (tool restriction/least privilege), D5 (hooks for audit)',
    ],
  },
  {
    id: 'structured-extraction',
    number: 6,
    title: 'Structured Data Extraction',
    domain: 'D4 — Prompt Engineering',
    problem:
      'Build a pipeline that extracts structured data (company name, contact email, phone, address) from freeform customer inquiry emails — with guaranteed schema compliance and validation.',
    steps: [
      {
        heading: '1. Define output schema as a tool',
        detail:
          'Create a tool extract_contact with required parameters: company_name (string), email (string), phone (string, nullable), address (string, nullable). Using a tool schema guarantees field names and types at the API level.',
      },
      {
        heading: '2. Force tool use with tool_choice',
        detail:
          'Set tool_choice: { type: "tool", name: "extract_contact" }. This forces Claude to call the tool with the extracted data. The response will always be a tool_use block — never freeform text.',
      },
      {
        heading: '3. Validate the extracted data',
        detail:
          'Parse the tool_use input field. Validate: email matches regex, phone is in expected format (if provided). If validation fails, re-prompt with the specific error and the original email.',
      },
      {
        heading: '4. Implement the retry loop',
        detail:
          'On validation failure, send: original email + Claude\'s extracted data + specific error message + "please re-extract, correcting only the [field] field." Limit to 3 retries. On persistent failure, flag for human review.',
      },
      {
        heading: '5. Handle missing fields gracefully',
        detail:
          'Mark phone and address as optional (not in required array). If not present in the email, Claude returns null for those fields. Never hallucinate missing data — instruct Claude explicitly: "if a field is not present, use null."',
      },
    ],
    examTips: [
      'Key domain: D4 Prompt Engineering — tool_choice, structured output, retry loops',
      'The exam will test: why tool_choice is better than asking for JSON; how many retries before escalation',
      'Watch for: "asking Claude to respond with JSON is equivalent to tool_choice" — FALSE',
      'Cross-domain: D1 (tool_use/tool_result flow), D5 (escalation on repeated failure)',
    ],
  },
]
```

---

### Task 3: Create exercises data

**Files:**
- Create: `lib/exercises.ts`

- [ ] **Step 1: Create lib/exercises.ts**

```typescript
// lib/exercises.ts

export interface Exercise {
  id: string
  number: number
  title: string
  goal: string
  domain: string
  estimatedTime: string
  starter: string // Code scaffold
  criteria: string[]
}

export const EXERCISES: Exercise[] = [
  {
    id: 'agentic-loop',
    number: 1,
    title: 'Build an Agentic Tool-Use Loop',
    goal: 'Implement a complete agentic loop using the Anthropic Messages API — Claude selects and calls tools, the agent executes them, and the loop continues until end_turn.',
    domain: 'D1 — Agentic Architecture',
    estimatedTime: '45 minutes',
    starter: `import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

// 1. Define your tools
const TOOLS: Anthropic.Tool[] = [
  {
    name: 'get_weather',
    description: 'Get current weather for a city. Use this when the user asks about weather.',
    input_schema: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'City name' },
      },
      required: ['city'],
    },
  },
]

// 2. Implement tool execution
function executeTool(name: string, input: Record<string, unknown>): string {
  if (name === 'get_weather') {
    // TODO: Implement or mock weather lookup
    return JSON.stringify({ city: input.city, temp: '22°C', condition: 'sunny' })
  }
  return JSON.stringify({ error: 'Unknown tool', tool: name })
}

// 3. Implement the agentic loop
async function runAgent(userMessage: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: userMessage }]

  while (true) {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      tools: TOOLS,
      messages,
    })

    // TODO: Handle stop_reason === 'end_turn'
    // TODO: Handle stop_reason === 'tool_use'
    // TODO: Execute tools and append results
    // TODO: Handle unexpected stop_reason

    break // Remove this when you implement the loop
  }

  return 'Not implemented yet'
}

// Test it
runAgent('What is the weather in Tokyo?').then(console.log)`,
    criteria: [
      'Loop terminates correctly when stop_reason is "end_turn"',
      'Tool calls are executed and results appended as tool_result blocks',
      'Both the assistant turn (tool_use) and user turn (tool_result) are appended to messages',
      'Loop handles stop_reason "max_tokens" without crashing',
      'Multiple sequential tool calls work correctly',
    ],
  },
  {
    id: 'mcp-tools',
    number: 2,
    title: 'Design MCP-Compatible Tools',
    goal: 'Define and implement two MCP tools following best practices: snake_case naming, clear when-to-use descriptions, structured error returns, and appropriate parameter schemas.',
    domain: 'D2 — Tool Design & MCP',
    estimatedTime: '30 minutes',
    starter: `// Tool 1: Search a database of products
// TODO: Name this tool correctly (snake_case, verb-noun)
// TODO: Write a description that explains WHEN to use it
// TODO: Define parameters with descriptions
// TODO: Return structured errors on failure

const productSearchTool = {
  name: '', // Fill in
  description: '', // Fill in — explain WHEN to use it
  input_schema: {
    type: 'object',
    properties: {
      // TODO: Add query parameter
      // TODO: Add optional limit parameter
    },
    required: [],
  },
}

function searchProducts(query: string, limit = 10): unknown {
  // Simulate database lookup
  if (!query.trim()) {
    // TODO: Return a structured error (not throw, not null)
    return null // Fix this
  }
  return { results: [{ id: '1', name: 'Widget', price: 9.99 }], total: 1 }
}

// Tool 2: Send a notification email
// TODO: Follow the same naming and description pattern
// TODO: Include required parameters: recipient_email, subject, body
// TODO: Return structured error if email is invalid

const emailNotificationTool = {
  // TODO: Complete this tool definition
}`,
    criteria: [
      'Both tools use snake_case verb-noun naming',
      'Descriptions explain WHEN to use each tool, not just what they do',
      'All parameters have descriptions',
      'Invalid input returns a structured error object: { error: "...", field: "..." }',
      'Optional parameters are NOT in the required array',
    ],
  },
  {
    id: 'claude-code-setup',
    number: 3,
    title: 'Configure Claude Code for a Project',
    goal: 'Create a complete Claude Code configuration for a TypeScript project: CLAUDE.md, a custom /review command, and a PreToolUse hook that prevents force-pushing to main.',
    domain: 'D3 — Claude Code Configuration',
    estimatedTime: '30 minutes',
    starter: `# Exercise: Create these files in a new directory

# File 1: CLAUDE.md
# Must include: stack, test command, conventions, what NOT to do
# Limit to ~50 lines — context budget matters

# File 2: .claude/commands/review.md
# A slash command that reviews changed files for:
# - TypeScript type safety issues
# - Missing test coverage
# - Violations of conventions defined in CLAUDE.md

# File 3: ~/.claude/settings.json (or project settings.json)
# Add a PreToolUse hook that:
# - Matches the Bash tool
# - Blocks any command containing 'push' AND '--force' AND 'main'
# - Returns exit code 2 with a clear message to the user

# Checklist (verify each):
# [ ] CLAUDE.md covers: project purpose, tech stack, test command, 3+ coding conventions, what to avoid
# [ ] /review command prompt specifies what to check and output format
# [ ] Hook blocks 'git push --force origin main' but allows 'git push origin feature/my-branch'
# [ ] Hook uses exit code 2 (user-visible message), not exit code 1 (Claude-visible context)`,
    criteria: [
      'CLAUDE.md is under 60 lines and covers stack, test command, conventions, and anti-patterns',
      '/review command produces a structured review with specific actionable findings',
      'Hook correctly blocks force pushes to main (exit code 2)',
      'Hook does NOT block normal git pushes to feature branches',
      'Settings file follows the correct JSON schema for hooks',
    ],
  },
  {
    id: 'structured-extraction',
    number: 4,
    title: 'Structured Data Extraction with Validation',
    goal: 'Use tool_choice to force structured output, then validate the result and implement a 3-retry loop that re-prompts Claude with specific error feedback on schema violations.',
    domain: 'D4 — Prompt Engineering',
    estimatedTime: '45 minutes',
    starter: `import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

// Step 1: Define the extraction tool
const extractContactTool: Anthropic.Tool = {
  name: 'extract_contact',
  description: 'Extract contact information from text',
  input_schema: {
    type: 'object',
    properties: {
      company_name: { type: 'string', description: 'Company or organization name' },
      email: { type: 'string', description: 'Primary contact email address' },
      phone: { type: 'string', description: 'Phone number, or null if not present' },
    },
    required: ['company_name', 'email'],
  },
}

// Step 2: Validate extracted data
function validateExtraction(data: Record<string, unknown>): string | null {
  // TODO: Check email matches basic regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // TODO: Return null if valid, or a specific error message if invalid
  return null
}

// Step 3: Implement extraction with retry
async function extractContact(text: string, maxRetries = 3): Promise<Record<string, unknown>> {
  let messages: Anthropic.MessageParam[] = [
    { role: 'user', content: \`Extract contact info from this text:\\n\\n\${text}\` },
  ]

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      tools: [extractContactTool],
      // TODO: Add tool_choice to force the extract_contact tool
      messages,
    })

    // TODO: Find the tool_use block in response.content
    // TODO: Parse the input as the extracted data
    // TODO: Run validateExtraction on the data
    // TODO: If valid, return the data
    // TODO: If invalid, build a retry message that includes:
    //       - The extracted data Claude returned
    //       - The specific validation error
    //       - Instruction to re-extract correcting only the invalid field

    break // Remove when implemented
  }

  throw new Error(\`Extraction failed after \${maxRetries} retries\`)
}

// Test with sample text
const sampleEmail = \`
Hi, I'm Sarah from Acme Corp.
Please reach me at sarah.jones@acme-corp.com or call 555-867-5309.
\`

extractContact(sampleEmail).then(console.log).catch(console.error)`,
    criteria: [
      'tool_choice forces the extract_contact tool on every call',
      'Validation catches invalid email format and returns a specific error message',
      'Retry prompt includes the previous (invalid) extraction and the specific error',
      'Loop stops at maxRetries and throws, rather than retrying indefinitely',
      'Valid extraction is returned on first successful attempt without unnecessary retries',
    ],
  },
]
```

---

### Task 4: WeekRow component + useStudyPlan hook

**Files:**
- Create: `hooks/useStudyPlan.ts`
- Create: `components/WeekRow.tsx`

- [ ] **Step 1: Create hooks/useStudyPlan.ts**

```typescript
// hooks/useStudyPlan.ts
'use client'
import { useState, useEffect, useCallback } from 'react'
import { getProgress, setWeekComplete } from '@/lib/progress'

export function useStudyPlan() {
  const [completedWeeks, setCompletedWeeks] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setCompletedWeeks(getProgress().studyPlan)
  }, [])

  const toggleWeek = useCallback((weekKey: string, complete: boolean) => {
    setWeekComplete(weekKey, complete)
    setCompletedWeeks((prev) => ({ ...prev, [weekKey]: complete }))
  }, [])

  return { completedWeeks, toggleWeek }
}
```

- [ ] **Step 2: Create components/WeekRow.tsx**

```tsx
// components/WeekRow.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

interface WeekRowProps {
  number: number
  weekKey: string
  title: string
  hours: number
  tasks: string[]
  resources: { label: string; href: string }[]
  complete: boolean
  onToggle: (key: string, complete: boolean) => void
}

export function WeekRow({ number, weekKey, title, hours, tasks, resources, complete, onToggle }: WeekRowProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`border border-[var(--border)] ${complete ? 'bg-[var(--teal-bg)]' : 'bg-[var(--bg)]'}`}>
      {/* Row header */}
      <div className="flex items-center gap-4 p-4">
        <input
          type="checkbox"
          checked={complete}
          onChange={(e) => onToggle(weekKey, e.target.checked)}
          className="accent-[var(--teal)] w-4 h-4 flex-shrink-0"
          aria-label={`Mark week ${number} complete`}
        />
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 text-left flex items-center justify-between gap-4"
        >
          <span className={`text-[11px] uppercase tracking-widest flex-shrink-0 ${complete ? 'text-[var(--teal)]' : 'text-[var(--muted)]'}`}>
            week_{String(number).padStart(2, '0')}
          </span>
          <span className={`text-sm font-semibold flex-1 ${complete ? 'line-through text-[var(--muted)]' : ''}`}>
            {title}
          </span>
          <span className="text-[11px] text-[var(--muted)] flex-shrink-0">{hours}h</span>
          <span className="text-[var(--muted)] text-xs flex-shrink-0">{expanded ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-[var(--border)]">
          <ul className="mt-3 space-y-2 mb-4">
            {tasks.map((task, i) => (
              <li key={i} className="text-xs text-[var(--text)] flex gap-2">
                <span className="text-[var(--teal)] flex-shrink-0">→</span>
                {task}
              </li>
            ))}
          </ul>
          {resources.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {resources.map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  target={r.href.startsWith('http') ? '_blank' : undefined}
                  rel={r.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-[11px] uppercase tracking-wide text-[var(--teal)] hover:underline"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

---

### Task 5: Build Cheatsheet page

**Files:**
- Modify: `app/cheatsheet/page.tsx`

- [ ] **Step 1: Replace app/cheatsheet/page.tsx**

The cheatsheet is a server component — no client state needed. Write it as a static page with all 5 domain summaries and a key terms glossary.

```tsx
// app/cheatsheet/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cheatsheet',
  description: 'Quick reference for all 5 Claude Certified Architect exam domains — key concepts, patterns, anti-patterns, and glossary.',
}

const DOMAIN_SUMMARIES = [
  {
    number: 'D1',
    title: 'Agentic Architecture & Orchestration',
    weight: '27%',
    keyFacts: [
      'stop_reason="tool_use" → execute tool, append tool_result, continue loop',
      'stop_reason="end_turn" → final response, exit loop',
      'Always append BOTH: assistant turn (tool_use) + user turn (tool_result)',
      'max_tokens must be ≥4096 for multi-step tasks',
      'Orchestrator: delegates to subagents; does not execute directly',
      'Parallel dispatch: use for independent tasks; sequential for dependencies',
      'Subagents: give minimal context only — not the full conversation history',
      '--continue: resume last session | --resume <id>: resume specific session',
      '/compact: compress context when window fills',
      'Hooks: PreToolUse exit 0=allow, exit 1=block+context to Claude, exit 2=block+message to user',
    ],
    antiPatterns: [
      'Forgetting to append the assistant turn before tool_result',
      'Setting max_tokens too low (causes stop_reason="max_tokens" mid-task)',
      'Passing full conversation history to subagents (wasteful, unfocused)',
      'Running independent tasks sequentially instead of in parallel',
    ],
  },
  {
    number: 'D2',
    title: 'Tool Design & MCP Integration',
    weight: '18%',
    keyFacts: [
      'Tool names: snake_case verb-noun (search_web, get_order_status)',
      'Description: explain WHEN to use the tool — this is how Claude selects it',
      'Errors: return { "error": "...", "details": "..." } — never throw, never return null',
      'tool_choice: "auto" (Claude decides) | "any" (must use a tool) | "tool" (force specific)',
      'Least privilege: only expose tools the agent needs for its specific task',
      'MCP stdio: local subprocess (secure) | SSE: remote HTTP server',
      'mcpServers config: ~/.claude/settings.json or project CLAUDE.md',
      'Built-in tools: Bash, Read, Write, Edit, Glob, Grep, Agent, WebFetch, WebSearch',
      'Prefer dedicated tools over Bash where available (Grep > bash grep)',
    ],
    antiPatterns: [
      'Tool descriptions that explain what it does instead of when to use it',
      'Returning null or throwing exceptions from tools',
      'Exposing Bash to agents that only need file read access',
      'Overlapping tool names/descriptions causing Claude confusion',
    ],
  },
  {
    number: 'D3',
    title: 'Claude Code Configuration & Workflows',
    weight: '20%',
    keyFacts: [
      'CLAUDE.md levels: ~/.claude/CLAUDE.md (global) → <project>/CLAUDE.md → <subdir>/CLAUDE.md',
      'All levels loaded and merged; more specific = higher priority on conflicts',
      'CLAUDE.md content: stack, commands, conventions, what to avoid — keep concise',
      'Commands: .claude/commands/<name>.md → invoked with /name',
      'Skills: .claude/skills/<name>.md → description field for proactive triggering',
      'Global commands/skills: ~/.claude/commands/ and ~/.claude/skills/',
      'Plan mode: Shift+Tab toggle | ExitPlanMode = plan done, awaiting approval',
      'AskUserQuestion: Claude asks user for clarification mid-task',
      '--headless: non-interactive, required for CI pipelines',
      '--output-format json: machine-parseable output for scripting',
      '--allowedTools: restrict tool access in CI for safety',
    ],
    antiPatterns: [
      'Explaining project context in first chat message instead of CLAUDE.md',
      'CLAUDE.md files that are too long (wastes context budget)',
      'Running Claude Code in CI without --headless (hangs on prompts)',
      'Assuming Claude remembers context from previous sessions',
    ],
  },
  {
    number: 'D4',
    title: 'Prompt Engineering & Structured Output',
    weight: '20%',
    keyFacts: [
      'XML tags: <context>, <instructions>, <examples>, <output_format> — Claude is trained on these',
      'Few-shot placement: instructions → examples → actual task (not examples first)',
      'Few-shot quality: 2 perfect examples beat 10 mediocre ones',
      'Structured output: define schema as a tool + tool_choice: { type: "tool" }',
      'tool_choice guarantees valid JSON matching schema — "respond with JSON" does not',
      'Chain-of-thought ("think step by step"): effective for multi-step reasoning tasks',
      'Validation-retry: parse output → validate → re-prompt with specific error + original output',
      'Max retries: 3 before escalating to human',
      'Retry prompt: include original (wrong) output + specific error + instruction to fix only that field',
      'Use null for missing optional fields — never hallucinate absent data',
    ],
    antiPatterns: [
      'Asking Claude to "respond with JSON" instead of using tool_choice',
      'Vague retry prompts ("please try again")',
      'Retrying more than 3 times without escalating',
      'Putting examples before instructions in the prompt',
    ],
  },
  {
    number: 'D5',
    title: 'Context Management & Reliability',
    weight: '15%',
    keyFacts: [
      'Context positioning: important/stable → beginning (system prompt); task → just before assistant',
      'Context window: ~200k tokens; large sessions approach this limit',
      'Degradation symptoms: ignoring earlier instructions, inconsistent output, repeated mistakes',
      'Mitigation: /compact (Claude Code) | programmatic summarization (API) | fresh session',
      'Subagent errors: return structured error to orchestrator with escalate info — never swallow',
      'stop_reason="max_tokens" from subagent = escalate immediately',
      'Human checkpoints: required before irreversible ops (delete, deploy, send email)',
      'AskUserQuestion: correct tool for Claude to pause and confirm with user',
      'Information provenance: track which source each conclusion came from',
      'Escalation: orchestrator decides retry vs. fallback vs. human review — subagent does not decide',
    ],
    antiPatterns: [
      'Subagents silently swallowing errors or returning empty success',
      'Letting context grow without /compact on long sessions',
      'Making irreversible changes without human review checkpoints',
      'Giving subagents full orchestrator context (use minimal context)',
    ],
  },
]

const GLOSSARY = [
  { term: 'Agentic loop', def: 'Cycle of: send messages → Claude returns tool_use → execute tool → append tool_result → repeat until end_turn' },
  { term: 'stop_reason', def: 'Why Claude stopped: end_turn (done), tool_use (wants tool), max_tokens (cut off), stop_sequence (hit stop pattern)' },
  { term: 'tool_use block', def: 'Content block in Claude\'s response containing: type, id, name, input — triggers tool execution' },
  { term: 'tool_result', def: 'User-turn content block returned after executing a tool; references tool_use_id' },
  { term: 'Orchestrator', def: 'Claude agent that decomposes tasks, dispatches subagents, and aggregates results' },
  { term: 'Subagent', def: 'Claude agent that executes a focused subtask with minimal context' },
  { term: 'MCP', def: 'Model Context Protocol — standard for extending Claude with external tools, resources, and prompts' },
  { term: 'stdio transport', def: 'MCP connection via stdin/stdout to a local subprocess — most secure' },
  { term: 'SSE transport', def: 'MCP connection via HTTP Server-Sent Events to a remote server' },
  { term: 'tool_choice', def: 'API parameter controlling tool selection: auto | any | { type: "tool", name: "..." }' },
  { term: 'CLAUDE.md', def: 'Markdown file injected into context at session start — defines project conventions, stack, commands' },
  { term: 'Plan mode', def: 'Claude Code mode (Shift+Tab) where Claude explores before writing code; ExitPlanMode presents plan for approval' },
  { term: '--headless', def: 'Claude Code flag that disables interactive prompts — required for CI pipelines' },
  { term: 'ExitPlanMode', def: 'Tool invoked by Claude to signal plan completion and request user approval' },
  { term: 'AskUserQuestion', def: 'Tool invoked by Claude to pause and ask the user a clarifying question' },
  { term: 'PreToolUse hook', def: 'Hook that runs before a tool call; exit 0 = allow, exit 1 = block (context to Claude), exit 2 = block (message to user)' },
  { term: 'Context degradation', def: 'Quality decline in long sessions as context fills — Claude ignores earlier instructions, makes repeated mistakes' },
  { term: '/compact', def: 'Claude Code command that summarizes and compresses conversation history to free context budget' },
  { term: 'Information provenance', def: 'Tracking which source each piece of information in Claude\'s output came from' },
  { term: 'Least privilege', def: 'Security principle: only expose tools/permissions an agent actually needs for its specific task' },
]

export default function CheatsheetPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-1">cheatsheet/</h1>
          <p className="text-sm text-[var(--muted)]">all 5 domains · key terms glossary · printable</p>
        </div>
        <button
          onClick={() => window.print()}
          className="hidden md:block text-[11px] uppercase tracking-widest border border-[var(--border)] px-3 py-1 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors"
        >
          print/
        </button>
      </div>

      {/* Domain summaries */}
      <div className="space-y-8 mb-12">
        {DOMAIN_SUMMARIES.map((d) => (
          <div key={d.number} className="border border-[var(--border)] p-5">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-[11px] uppercase tracking-widest text-[var(--teal)]">{d.number} · {d.weight}</span>
              <h2 className="text-sm font-semibold">{d.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">key facts</div>
                <ul className="space-y-1">
                  {d.keyFacts.map((f, i) => (
                    <li key={i} className="text-xs text-[var(--text)] flex gap-2">
                      <span className="text-[var(--teal)] flex-shrink-0">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">anti-patterns</div>
                <ul className="space-y-1">
                  {d.antiPatterns.map((a, i) => (
                    <li key={i} className="text-xs text-red-600 flex gap-2">
                      <span className="flex-shrink-0">✗</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Glossary */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4">key_terms/</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="border border-[var(--border)] px-3 py-2">
              <span className="text-xs font-semibold text-[var(--teal)]">{g.term}</span>
              <span className="text-[var(--muted)] mx-2">—</span>
              <span className="text-xs text-[var(--text)]">{g.def}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

Note: The `onClick={() => window.print()}` button must be in a client component. Wrap just the print button in a `'use client'` component called `PrintButton` to avoid making the entire page a client component.

- [ ] **Step 2: Create components/PrintButton.tsx**

```tsx
// components/PrintButton.tsx
'use client'
export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="hidden md:block text-[11px] uppercase tracking-widest border border-[var(--border)] px-3 py-1 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors"
    >
      print/
    </button>
  )
}
```

Then update cheatsheet/page.tsx to import and use `<PrintButton />` instead of the inline button.

---

### Task 6: Build Study Plan page

**Files:**
- Modify: `app/study-plan/page.tsx`

- [ ] **Step 1: Replace app/study-plan/page.tsx**

```tsx
// app/study-plan/page.tsx
'use client'
import { STUDY_PLAN } from '@/lib/study-plan'
import { WeekRow } from '@/components/WeekRow'
import { useStudyPlan } from '@/hooks/useStudyPlan'

export default function StudyPlanPage() {
  const { completedWeeks, toggleWeek } = useStudyPlan()
  const completedCount = Object.values(completedWeeks).filter(Boolean).length
  const totalHours = STUDY_PLAN.reduce((sum, w) => sum + w.hours, 0)

  return (
    <div>
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">study_plan/</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        12 weeks · ~{totalHours} hours total · {completedCount}/12 complete
      </p>

      <div className="flex flex-col gap-2">
        {STUDY_PLAN.map((week) => (
          <WeekRow
            key={week.key}
            number={week.number}
            weekKey={week.key}
            title={week.title}
            hours={week.hours}
            tasks={week.tasks}
            resources={week.resources}
            complete={completedWeeks[week.key] ?? false}
            onToggle={toggleWeek}
          />
        ))}
      </div>
    </div>
  )
}
```

---

### Task 7: Build Scenarios page

**Files:**
- Modify: `app/scenarios/page.tsx`

- [ ] **Step 1: Replace app/scenarios/page.tsx**

```tsx
// app/scenarios/page.tsx
import type { Metadata } from 'next'
import { SCENARIOS } from '@/lib/scenarios'

export const metadata: Metadata = {
  title: 'Exam Scenarios',
  description: 'All 6 Claude Certified Architect exam scenario walkthroughs with step-by-step analysis and exam tips.',
}

export default function ScenariosPage() {
  return (
    <div>
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">scenarios/</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        all 6 exam scenarios · 4 of 6 randomly selected on exam day
      </p>

      <div className="flex flex-col gap-8">
        {SCENARIOS.map((s) => (
          <div key={s.id} className="border border-[var(--border)] p-6">
            {/* Header */}
            <div className="mb-4">
              <div className="text-[11px] uppercase tracking-widest text-[var(--teal)] mb-1">
                scenario_{String(s.number).padStart(2, '0')} · {s.domain}
              </div>
              <h2 className="text-base font-semibold">{s.title}</h2>
            </div>

            {/* Problem */}
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">problem</div>
              <p className="text-sm text-[var(--text)] leading-7">{s.problem}</p>
            </div>

            {/* Steps */}
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-3">walkthrough</div>
              <div className="space-y-4">
                {s.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-xs font-semibold text-[var(--teal)] flex-shrink-0 mt-0.5">
                      {step.heading.split(' ')[0]}
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-1">{step.heading.substring(step.heading.indexOf(' ') + 1)}</div>
                      <p className="text-xs text-[var(--text)] leading-6">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam tips */}
            <div className="bg-[var(--bg2)] border border-[var(--border)] p-4">
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">exam tips</div>
              <ul className="space-y-1">
                {s.examTips.map((tip, i) => (
                  <li key={i} className="text-xs text-[var(--text)] flex gap-2">
                    <span className="text-[var(--teal)] flex-shrink-0">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### Task 8: Build Exercises page

**Files:**
- Modify: `app/exercises/page.tsx`

- [ ] **Step 1: Replace app/exercises/page.tsx**

```tsx
// app/exercises/page.tsx
import type { Metadata } from 'next'
import { EXERCISES } from '@/lib/exercises'

export const metadata: Metadata = {
  title: 'Build Exercises',
  description: '4 capstone build exercises from the Claude Certified Architect exam guide.',
}

export default function ExercisesPage() {
  return (
    <div>
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">exercises/</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        4 capstone projects · hands-on practice for the exam
      </p>

      <div className="flex flex-col gap-8">
        {EXERCISES.map((ex) => (
          <div key={ex.id} className="border border-[var(--border)] p-6">
            {/* Header */}
            <div className="mb-4">
              <div className="text-[11px] uppercase tracking-widest text-[var(--teal)] mb-1">
                exercise_{ex.number.toString().padStart(2, '0')} · {ex.domain} · ~{ex.estimatedTime}
              </div>
              <h2 className="text-base font-semibold">{ex.title}</h2>
            </div>

            {/* Goal */}
            <p className="text-sm text-[var(--text)] leading-7 mb-6">{ex.goal}</p>

            {/* Starter code */}
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">starter_code/</div>
              <pre className="text-xs bg-[var(--bg2)] border border-[var(--border)] p-4 overflow-x-auto leading-6">
                <code>{ex.starter}</code>
              </pre>
            </div>

            {/* Completion criteria */}
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-2">completion_criteria/</div>
              <ul className="space-y-1">
                {ex.criteria.map((c, i) => (
                  <li key={i} className="text-xs text-[var(--text)] flex gap-2">
                    <span className="text-[var(--teal)] flex-shrink-0">[ ]</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### Task 9: Build Exam Guide page

**Files:**
- Modify: `app/exam-guide/page.tsx`

- [ ] **Step 1: Replace app/exam-guide/page.tsx**

```tsx
// app/exam-guide/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Exam Guide',
  description: 'Claude Certified Architect – Foundations exam format, scoring, registration, and FAQ.',
}

const EXAM_FACTS = [
  { label: 'Format', value: 'Multiple choice + scenario-based questions' },
  { label: 'Scenarios', value: '4 of 6 randomly selected' },
  { label: 'Passing score', value: '720 / 1000' },
  { label: 'Duration', value: '~15 minutes' },
  { label: 'Cost', value: 'Free for the first 5,000 partner company employees' },
  { label: 'Registration', value: 'anthropic.skilljar.com' },
]

const DOMAIN_WEIGHTS = [
  { name: 'D1 — Agentic Architecture & Orchestration', weight: 27 },
  { name: 'D2 — Tool Design & MCP Integration', weight: 18 },
  { name: 'D3 — Claude Code Configuration & Workflows', weight: 20 },
  { name: 'D4 — Prompt Engineering & Structured Output', weight: 20 },
  { name: 'D5 — Context Management & Reliability', weight: 15 },
]

const FAQ = [
  {
    q: 'How long does it take to prepare?',
    a: 'The 12-week study plan on this site is structured for ~7 hours/week (~84 hours total). If you already use Claude Code daily, you may need only 3–4 weeks.',
  },
  {
    q: 'What resources does Anthropic provide?',
    a: 'The official exam guide PDF (available at anthropic.skilljar.com) covers the exam format, domain breakdown, and 4 capstone exercises. All exercises on this site\'s /exercises page are sourced from that PDF.',
  },
  {
    q: 'Are the 6 scenarios all tested?',
    a: 'No — 4 of the 6 scenarios are randomly selected on exam day. You cannot predict which 4 will appear, so prepare all 6.',
  },
  {
    q: 'Is the exam timed strictly?',
    a: 'The exam takes approximately 15 minutes. There is no per-question timer — the 15-minute limit applies to the entire exam.',
  },
  {
    q: 'Can I retake the exam if I fail?',
    a: 'Check anthropic.skilljar.com for the current retake policy. As of the exam launch, retakes were permitted after a waiting period.',
  },
  {
    q: 'What does the credential prove?',
    a: 'The Claude Certified Architect – Foundations credential validates understanding of agentic systems, MCP, Claude Code configuration, prompt engineering, and context management at a practitioner level.',
  },
]

export default function ExamGuidePage() {
  return (
    <div>
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">exam_guide/</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        format · scoring · registration · faq
      </p>

      {/* Exam facts */}
      <div className="border border-[var(--border)] p-5 mb-8">
        <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-4">exam_facts/</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {EXAM_FACTS.map((f) => (
            <div key={f.label} className="flex gap-3">
              <span className="text-[11px] uppercase tracking-widest text-[var(--muted)] w-28 flex-shrink-0">{f.label}</span>
              <span className="text-xs text-[var(--text)]">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Domain weights */}
      <div className="border border-[var(--border)] p-5 mb-8">
        <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-4">domain_weights/</div>
        <div className="space-y-3">
          {DOMAIN_WEIGHTS.map((d) => (
            <div key={d.name} className="flex items-center gap-4">
              <span className="text-xs text-[var(--text)] w-64 flex-shrink-0">{d.name}</span>
              <div className="flex-1 h-[2px] bg-[var(--border)]">
                <div className="h-full bg-[var(--teal)]" style={{ width: `${d.weight * (100 / 27)}%` }} />
              </div>
              <span className="text-[11px] text-[var(--teal)] w-8 text-right">{d.weight}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Registration CTA */}
      <div className="border border-[var(--teal)] bg-[var(--teal-bg)] p-5 mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-sm font-semibold mb-1">Ready to register?</div>
          <div className="text-xs text-[var(--muted)]">Free for the first 5,000 partner employees</div>
        </div>
        <a
          href="https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs border border-[var(--teal)] text-[var(--teal)] px-4 py-2 hover:bg-white transition-colors"
        >
          register_for_exam →
        </a>
      </div>

      {/* FAQ */}
      <div>
        <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-4">faq/</div>
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-[var(--border)] p-4">
              <div className="text-sm font-semibold mb-2">{item.q}</div>
              <p className="text-xs text-[var(--text)] leading-6">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

### Task 10: Verify all pages + final commit

- [ ] **Step 1: Run all tests**

```bash
npx jest
```
Expected: All tests pass

- [ ] **Step 2: Run full build**

```bash
npm run build
```
Expected: All 8 routes pre-rendered successfully, no TypeScript errors

- [ ] **Step 3: Start dev server and verify all 5 new pages**

Visit and check each:
- `http://localhost:3000/cheatsheet` — 5 domain blocks render, print button visible on desktop
- `http://localhost:3000/study-plan` — 12 week rows render, clicking checkbox toggles completion and persists to localStorage
- `http://localhost:3000/scenarios` — 6 scenarios render with walkthrough steps and exam tips
- `http://localhost:3000/exercises` — 4 exercises with starter code and criteria
- `http://localhost:3000/exam-guide` — exam facts, domain weight bars, register CTA, FAQ

- [ ] **Step 4: Test study plan localStorage**

Check a week in /study-plan. Open DevTools → Application → Local Storage. Verify `architect-prep` key updates `studyPlan.week1` to `true`. Refresh page — checkbox should still be checked.

- [ ] **Step 5: Commit**

```bash
git add lib/study-plan.ts lib/scenarios.ts lib/exercises.ts components/WeekRow.tsx components/PrintButton.tsx hooks/useStudyPlan.ts app/cheatsheet/ app/study-plan/ app/scenarios/ app/exercises/ app/exam-guide/
git commit -m "feat: content pages — cheatsheet, 12-week plan, 6 scenarios, 4 exercises, exam guide"
```
