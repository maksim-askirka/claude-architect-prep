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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const domain = getDomainBySlug(slug)
  if (!domain) return {}
  return {
    title: `${domain.number} — ${domain.title}`,
    description: `Deep dive into ${domain.title} (${domain.weight}% of the Claude Certified Architect exam). ${domain.subtopics.join(', ')}.`,
  }
}

export default async function DomainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const domain = getDomainBySlug(slug)
  if (!domain) notFound()

  const Content = CONTENT_MAP[slug]
  if (!Content) notFound()

  return (
    <DomainPageLayout domain={domain}>
      <Content />
    </DomainPageLayout>
  )
}
