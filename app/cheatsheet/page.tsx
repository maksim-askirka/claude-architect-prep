// app/cheatsheet/page.tsx
import type { Metadata } from 'next'
import { PrintButton } from '@/components/PrintButton'

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
  { term: 'tool_use block', def: "Content block in Claude's response containing: type, id, name, input — triggers tool execution" },
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
  { term: 'Information provenance', def: "Tracking which source each piece of information in Claude's output came from" },
  { term: 'Least privilege', def: "Security principle: only expose tools/permissions an agent actually needs for its specific task" },
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
        <PrintButton />
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
