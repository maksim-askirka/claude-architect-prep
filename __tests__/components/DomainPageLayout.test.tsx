import { render, screen } from '@testing-library/react'
import { DomainPageLayout } from '@/components/DomainPageLayout'
import type { Domain } from '@/types'

const mockDomain: Domain = {
  key: 'd1',
  slug: 'agentic-architecture',
  number: 1,
  title: 'Agentic Architecture',
  weight: 27,
  subtopics: ['Multi-agent patterns', 'Orchestration'],
  scenario: 'mock-scenario',
  questionCount: 8,
}

describe('DomainPageLayout', () => {
  it('renders the domain title in an h1', () => {
    render(
      <DomainPageLayout domain={mockDomain}>
        <p>content</p>
      </DomainPageLayout>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Agentic Architecture')
  })

  it('renders domain weight percentage', () => {
    render(
      <DomainPageLayout domain={mockDomain}>
        <p>content</p>
      </DomainPageLayout>
    )
    expect(screen.getByText(/27%/)).toBeInTheDocument()
  })

  it('renders domain number', () => {
    render(
      <DomainPageLayout domain={mockDomain}>
        <p>content</p>
      </DomainPageLayout>
    )
    expect(screen.getByText(/\b1\b/)).toBeInTheDocument()
  })

  it('renders a breadcrumb link to dashboard', () => {
    render(
      <DomainPageLayout domain={mockDomain}>
        <p>content</p>
      </DomainPageLayout>
    )
    const dashboardLink = screen.getByRole('link', { name: 'dashboard/' })
    expect(dashboardLink).toHaveAttribute('href', '/')
  })

  it('renders children content', () => {
    render(
      <DomainPageLayout domain={mockDomain}>
        <p>test children</p>
      </DomainPageLayout>
    )
    expect(screen.getByText('test children')).toBeInTheDocument()
  })

  it('renders domain tab nav with all 5 domains', () => {
    render(
      <DomainPageLayout domain={mockDomain}>
        <p>content</p>
      </DomainPageLayout>
    )
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole('link', { name: `D${i}` })).toBeInTheDocument()
    }
  })

  it('active domain tab links to its own slug', () => {
    render(
      <DomainPageLayout domain={mockDomain}>
        <p>content</p>
      </DomainPageLayout>
    )
    const activeTab = screen.getByRole('link', { name: 'D1' })
    expect(activeTab).toHaveAttribute('href', '/domains/agentic-architecture')
  })
})
