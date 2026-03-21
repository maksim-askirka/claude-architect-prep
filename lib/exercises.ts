// lib/exercises.ts

export interface Exercise {
  id: string
  number: number
  title: string
  goal: string
  domain: string
  estimatedTime: string
  starter: string
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
  // TODO: Check email matches basic regex /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
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
