// __tests__/components/ScoreDisplay.test.tsx
import { render, screen } from '@testing-library/react'
import { ScoreDisplay } from '@/components/ScoreDisplay'

describe('ScoreDisplay', () => {
  it('renders X / Y correct format', () => {
    render(<ScoreDisplay correct={3} total={7} />)
    expect(screen.getByText('3 / 7 correct')).toBeInTheDocument()
  })

  it('shows 0 / N when no answers given', () => {
    render(<ScoreDisplay correct={0} total={35} />)
    expect(screen.getByText('0 / 35 correct')).toBeInTheDocument()
  })

  it('renders nothing when total is 0', () => {
    const { container } = render(<ScoreDisplay correct={0} total={0} />)
    expect(container).toBeEmptyDOMElement()
  })
})
