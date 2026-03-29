// __tests__/components/DomainFilter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { DomainFilter } from '@/components/DomainFilter'

describe('DomainFilter', () => {
  it('renders All button and 5 domain buttons', () => {
    render(<DomainFilter active="all" onChange={() => {}} />)
    expect(screen.getByText('All')).toBeInTheDocument()
    ;['D1', 'D2', 'D3', 'D4', 'D5'].forEach((d) =>
      expect(screen.getByText(d)).toBeInTheDocument()
    )
  })

  it('highlights the active filter', () => {
    render(<DomainFilter active="d1" onChange={() => {}} />)
    const d1Button = screen.getByText('D1')
    expect(d1Button).toHaveClass('text-[var(--teal)]')
  })

  it('calls onChange with "all" when All clicked', () => {
    const onChange = jest.fn()
    render(<DomainFilter active="d1" onChange={onChange} />)
    fireEvent.click(screen.getByText('All'))
    expect(onChange).toHaveBeenCalledWith('all')
  })

  it('calls onChange with domain key when domain button clicked', () => {
    const onChange = jest.fn()
    render(<DomainFilter active="all" onChange={onChange} />)
    fireEvent.click(screen.getByText('D3'))
    expect(onChange).toHaveBeenCalledWith('d3')
  })
})
