// __tests__/components/ProgressBar.test.tsx
import { render, screen } from '@testing-library/react'
import { ProgressBar } from '@/components/ProgressBar'

describe('ProgressBar', () => {
  it('renders a bar with the given width percentage', () => {
    const { container } = render(<ProgressBar percent={60} />)
    const fill = container.querySelector('[data-testid="bar-fill"]')
    expect(fill).toHaveStyle({ width: '60%' })
  })

  it('clamps above 100 to 100%', () => {
    const { container } = render(<ProgressBar percent={150} />)
    const fill = container.querySelector('[data-testid="bar-fill"]')
    expect(fill).toHaveStyle({ width: '100%' })
  })

  it('clamps below 0 to 0%', () => {
    const { container } = render(<ProgressBar percent={-10} />)
    const fill = container.querySelector('[data-testid="bar-fill"]')
    expect(fill).toHaveStyle({ width: '0%' })
  })
})
