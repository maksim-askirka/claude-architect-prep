// lib/domains.ts
import { Domain } from '@/types'

export const DOMAINS: Domain[] = [
  {
    key: 'd1',
    slug: 'agentic-architecture',
    number: 'D1',
    title: 'Agentic Architecture & Orchestration',
    weight: 27,
    subtopics: [
      'Agentic Loops & Core API',
      'Sub-agents & Agent Teams',
      'Hooks & Programmatic Enforcement',
      'Session Management & Workflows',
    ],
    scenario: 'Multi-Agent Research System',
    questionCount: 6,
  },
  {
    key: 'd2',
    slug: 'tool-design',
    number: 'D2',
    title: 'Tool Design & MCP Integration',
    weight: 18,
    subtopics: [
      'Tool Description Best Practices',
      'Structured Error Responses',
      'Tool Distribution & Selection',
      'MCP Server Configuration',
      'Built-in Tools',
    ],
    scenario: 'Customer Support Resolution Agent',
    questionCount: 4,
  },
  {
    key: 'd3',
    slug: 'claude-code',
    number: 'D3',
    title: 'Claude Code Configuration & Workflows',
    weight: 20,
    subtopics: [
      'CLAUDE.md & Memory System',
      'Skills & Custom Commands',
      'Plan Mode & Iterative Refinement',
      'CI/CD & Batch Workflows',
    ],
    scenario: 'Claude Code for CI/CD',
    questionCount: 5,
  },
  {
    key: 'd4',
    slug: 'prompt-engineering',
    number: 'D4',
    title: 'Prompt Engineering & Structured Output',
    weight: 20,
    subtopics: [
      'Explicit Criteria & Instruction Design',
      'Few-Shot Prompting',
      'Tool Use for Structured Output',
      'Validation-Retry Loops & Multi-Pass Review',
    ],
    scenario: 'Structured Data Extraction',
    questionCount: 5,
  },
  {
    key: 'd5',
    slug: 'context-management',
    number: 'D5',
    title: 'Context Management & Reliability',
    weight: 15,
    subtopics: [
      'Context Optimization & Positioning',
      'Escalation & Error Propagation',
      'Context Degradation & Extended Sessions',
      'Human Review & Information Provenance',
    ],
    scenario: 'Code Generation with Claude Code',
    questionCount: 5,
  },
]

export function getDomainBySlug(slug: string): Domain | undefined {
  return DOMAINS.find((d) => d.slug === slug)
}

export function getDomainByKey(key: string): Domain | undefined {
  return DOMAINS.find((d) => d.key === key)
}
