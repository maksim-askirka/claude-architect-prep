// __tests__/components/SubtopicSection.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { SubtopicSection } from '@/components/SubtopicSection'
import { setSubtopicComplete } from '@/lib/progress'

// Mock lib/progress
jest.mock('@/lib/progress', () => ({
  setSubtopicComplete: jest.fn(),
  getProgress: jest.fn(() => ({
    progress: {
      d1: { subtopics: [false, false, false, false], quiz: null },
      d2: { subtopics: [false, false, false, false, false], quiz: null },
      d3: { subtopics: [false, false, false, false], quiz: null },
      d4: { subtopics: [false, false, false, false], quiz: null },
      d5: { subtopics: [false, false, false, false], quiz: null },
    },
    studyPlan: {},
    lastVisited: null,
  })),
}))

describe('SubtopicSection', () => {
  it('renders the subtopic title', () => {
    render(
      <SubtopicSection domainKey="d1" index={0} title="Agentic Loops & Core API">
        <p>Content</p>
      </SubtopicSection>
    )
    expect(screen.getByText('Agentic Loops & Core API')).toBeInTheDocument()
  })

  it('shows mark_complete button initially', () => {
    render(
      <SubtopicSection domainKey="d1" index={0} title="Test">
        <p>Content</p>
      </SubtopicSection>
    )
    expect(screen.getByText(/mark_complete/i)).toBeInTheDocument()
  })

  it('switches to complete indicator after clicking mark_complete', () => {
    render(
      <SubtopicSection domainKey="d1" index={0} title="Test">
        <p>Content</p>
      </SubtopicSection>
    )
    fireEvent.click(screen.getByText(/mark_complete/i))
    expect(screen.getByText(/complete/i)).toBeInTheDocument()
    expect(screen.queryByText(/mark_complete/i)).not.toBeInTheDocument()
  })

  it('calls setSubtopicComplete with correct args', () => {
    render(
      <SubtopicSection domainKey="d3" index={2} title="Test">
        <p>Content</p>
      </SubtopicSection>
    )
    fireEvent.click(screen.getByText(/mark_complete/i))
    expect(setSubtopicComplete).toHaveBeenCalledWith('d3', 2)
  })
})
