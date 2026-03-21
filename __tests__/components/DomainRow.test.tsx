// __tests__/components/DomainRow.test.tsx
import { render, screen } from '@testing-library/react'
import { DomainRow } from '@/components/DomainRow'
import { DOMAINS } from '@/lib/domains'

const d1 = DOMAINS[0] // D1, 4 subtopics
const emptyProgress = { subtopics: [false, false, false, false], quiz: null }
const halfProgress = { subtopics: [true, true, false, false], quiz: null }

describe('DomainRow', () => {
  it('renders domain title and weight', () => {
    render(<DomainRow domain={d1} progress={emptyProgress} />)
    expect(screen.getByText('Agentic Architecture & Orchestration')).toBeInTheDocument()
    expect(screen.getByText('27%')).toBeInTheDocument()
  })

  it('renders all subtopic tags', () => {
    render(<DomainRow domain={d1} progress={emptyProgress} />)
    expect(screen.getByText('Agentic Loops & Core API')).toBeInTheDocument()
    expect(screen.getByText('Multi-Agent Orchestration')).toBeInTheDocument()
  })

  it('shows correct completion count', () => {
    render(<DomainRow domain={d1} progress={halfProgress} />)
    expect(screen.getByText(/2\/4 subtopics/)).toBeInTheDocument()
  })

  it('links to the correct domain route', () => {
    render(<DomainRow domain={d1} progress={emptyProgress} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/domains/agentic-architecture')
  })
})
