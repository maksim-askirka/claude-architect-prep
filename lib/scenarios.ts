// lib/scenarios.ts

export interface Scenario {
  id: string
  number: number
  title: string
  domain: string
  problem: string
  steps: { stepNumber: string; title: string; detail: string }[]
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
        stepNumber: '1.', title: 'Define tools with minimum scope',
        detail:
          'Create focused tools: get_order_status(order_id), initiate_refund(order_id, reason), escalate_to_human(ticket_id, context). Each tool does one thing. Names use snake_case verb-noun. Descriptions explain WHEN to use each tool — not just what it does.',
      },
      {
        stepNumber: '2.', title: 'Return structured errors from tools',
        detail:
          'When get_order_status fails (order not found, API timeout), return { "error": "Order not found", "order_id": "..." } rather than throwing. Claude reads the error and decides whether to ask the customer to re-check the order number or escalate.',
      },
      {
        stepNumber: '3.', title: 'Configure escalation threshold',
        detail:
          'Build escalation logic into the agent\'s system prompt: "If you cannot resolve the issue within 2 tool calls, invoke escalate_to_human with the full context." Use a PreToolUse hook to log all tool calls for audit purposes.',
      },
      {
        stepNumber: '4.', title: 'Use tool_choice: "auto" for selection',
        detail:
          'Let Claude select the right tool automatically based on context. Only expose the 3 customer-support tools — not Bash, file tools, or anything unrelated. Principle of least privilege.',
      },
      {
        stepNumber: '5.', title: 'Handle multi-turn with state',
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
        stepNumber: '1.', title: 'Set up CLAUDE.md with project context',
        detail:
          'Define the project stack, testing requirements, code conventions, and what to avoid in CLAUDE.md. This injects stable context at the start of every session, so Claude doesn\'t lose project awareness across sessions.',
      },
      {
        stepNumber: '2.', title: 'Use short, focused sessions per feature',
        detail:
          'Rather than one marathon session, use --continue per feature branch. Each session has a clear scope. This keeps context fresh and avoids degradation from accumulated history.',
      },
      {
        stepNumber: '3.', title: 'Monitor for context degradation symptoms',
        detail:
          'Watch for: Claude ignoring conventions defined in CLAUDE.md, inconsistent variable naming, making mistakes it corrected earlier. These indicate the context window is filling up.',
      },
      {
        stepNumber: '4.', title: 'Use /compact before large tasks',
        detail:
          'Before starting a complex multi-file task in a long session, run /compact to summarize history. This frees context budget while preserving key decisions.',
      },
      {
        stepNumber: '5.', title: 'Configure human review checkpoints',
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
        stepNumber: '1.', title: 'Design the orchestrator',
        detail:
          'The orchestrator receives the research question, breaks it into independent subtasks (web search, database query, document scan), and dispatches subagents. It does NOT execute tasks directly — it delegates.',
      },
      {
        stepNumber: '2.', title: 'Dispatch subagents in parallel',
        detail:
          'Independent tasks (searching different sources) should run in parallel via run_in_background. The orchestrator waits for all results before synthesizing. Sequential dispatch would be unnecessarily slow.',
      },
      {
        stepNumber: '3.', title: 'Provide subagents minimal context',
        detail:
          'Each subagent receives only the context it needs: the specific query, the tools it should use, and the output format. Do NOT pass the full orchestrator conversation history — this wastes tokens and reduces focus.',
      },
      {
        stepNumber: '4.', title: 'Handle subagent errors',
        detail:
          'If a subagent returns { "error": "Source unavailable" }, the orchestrator decides: try a fallback source, proceed without that data, or report the gap in the final synthesis. Never silently ignore errors.',
      },
      {
        stepNumber: '5.', title: 'Synthesize and aggregate',
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
        stepNumber: '1.', title: 'PR review workflow',
        detail:
          'Use a custom /review command (D3) that reads the diff and checks against project conventions in CLAUDE.md. Set up a CI hook (--headless mode) that auto-runs the review on every PR and posts a comment. Configure hooks to prevent Claude from force-pushing to main.',
      },
      {
        stepNumber: '2.', title: 'Documentation generation',
        detail:
          'Use structured output (D4) with a tool that enforces the doc schema. Define what fields are required (summary, params, returns, examples). Use tool_choice to guarantee complete docs, not partial responses.',
      },
      {
        stepNumber: '3.', title: 'Debugging assistance',
        detail:
          'Use plan mode (D3) for complex debugging: Claude reads the codebase, forms a hypothesis, proposes a fix for approval before modifying files. This prevents Claude from making speculative changes that break other things.',
      },
      {
        stepNumber: '4.', title: 'Test generation',
        detail:
          'Provide few-shot examples (D4) of existing tests so Claude matches the team\'s testing conventions. Use explicit criteria: coverage requirements, what edge cases to cover, which test framework to use.',
      },
      {
        stepNumber: '5.', title: 'Context management for large codebases',
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
        stepNumber: '1.', title: 'Use --headless mode',
        detail:
          'All CI pipeline executions must use --headless (or CLAUDE_CODE_HEADLESS=true). This disables interactive prompts. Without this, Claude will hang waiting for user input that never comes.',
      },
      {
        stepNumber: '2.', title: 'Restrict tools with --allowedTools',
        detail:
          'In CI, Claude should only use the tools it needs. For code review, allow Read, Grep, Glob. For doc generation, add Write. Never allow Bash in automated pipelines unless the CI environment is sandboxed.',
      },
      {
        stepNumber: '3.', title: 'Use --output-format json for scripting',
        detail:
          'When the pipeline needs to parse Claude\'s output (e.g., extract a list of issues found), use --output-format json. This makes the output machine-parseable without fragile text parsing.',
      },
      {
        stepNumber: '4.', title: 'Configure CLAUDE.md for CI context',
        detail:
          'Add a CI-specific section to CLAUDE.md: "When running in CI, only report critical issues. Do not suggest style improvements. Output in JSON format." This ensures consistent, focused CI behavior.',
      },
      {
        stepNumber: '5.', title: 'Set up hooks for enforcement',
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
        stepNumber: '1.', title: 'Define output schema as a tool',
        detail:
          'Create a tool extract_contact with required parameters: company_name (string), email (string), phone (string, nullable), address (string, nullable). Using a tool schema guarantees field names and types at the API level.',
      },
      {
        stepNumber: '2.', title: 'Force tool use with tool_choice',
        detail:
          'Set tool_choice: { type: "tool", name: "extract_contact" }. This forces Claude to call the tool with the extracted data. The response will always be a tool_use block — never freeform text.',
      },
      {
        stepNumber: '3.', title: 'Validate the extracted data',
        detail:
          'Parse the tool_use input field. Validate: email matches regex, phone is in expected format (if provided). If validation fails, re-prompt with the specific error and the original email.',
      },
      {
        stepNumber: '4.', title: 'Implement the retry loop',
        detail:
          'On validation failure, send: original email + Claude\'s extracted data + specific error message + "please re-extract, correcting only the [field] field." Limit to 3 retries. On persistent failure, flag for human review.',
      },
      {
        stepNumber: '5.', title: 'Handle missing fields gracefully',
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
