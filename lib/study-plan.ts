// lib/study-plan.ts

export interface Week {
  key: string // 'week1' … 'week12'
  title: string
  hours: number
  tasks: string[]
  resources: { label: string; href: string }[]
}

export const STUDY_PLAN: Week[] = [
  {
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

export const TOTAL_HOURS = STUDY_PLAN.reduce((sum, w) => sum + w.hours, 0)
