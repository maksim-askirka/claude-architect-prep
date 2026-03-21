// __tests__/components/ContinueCard.test.tsx
import { render, screen } from '@testing-library/react'
import { ContinueCard } from '@/components/ContinueCard'

describe('ContinueCard', () => {
  it('shows start_here link when lastVisited is null', () => {
    render(<ContinueCard lastVisited={null} />)
    expect(screen.getByText(/start_here/)).toBeInTheDocument()
  })

  it('shows the lastVisited path as a link when set', () => {
    render(<ContinueCard lastVisited="/domains/prompt-engineering" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/domains/prompt-engineering')
    expect(screen.getByText('/domains/prompt-engineering')).toBeInTheDocument()
  })

  it('shows "continue where you left off" label when lastVisited is set', () => {
    render(<ContinueCard lastVisited="/practice" />)
    expect(screen.getByText(/continue where you left off/i)).toBeInTheDocument()
  })
})
