import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WeekRow } from '@/components/WeekRow'
import type { Week } from '@/lib/study-plan'

const mockWeek: Week = {
  key: 'week3',
  title: 'Prompt Engineering Fundamentals',
  hours: 6,
  tasks: ['Read the prompt engineering guide', 'Complete 10 practice questions'],
  resources: [
    { label: 'Docs', href: 'https://docs.anthropic.com' },
    { label: 'Internal', href: '/cheatsheet' },
  ],
}

describe('WeekRow', () => {
  it('renders week label from key', () => {
    render(<WeekRow week={mockWeek} complete={false} onToggle={jest.fn()} />)
    expect(screen.getByText('week_03')).toBeInTheDocument()
  })

  it('renders week title and hours', () => {
    render(<WeekRow week={mockWeek} complete={false} onToggle={jest.fn()} />)
    expect(screen.getByText('Prompt Engineering Fundamentals')).toBeInTheDocument()
    expect(screen.getByText('6h')).toBeInTheDocument()
  })

  it('checkbox reflects complete prop', () => {
    const { rerender } = render(<WeekRow week={mockWeek} complete={false} onToggle={jest.fn()} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()

    rerender(<WeekRow week={mockWeek} complete={true} onToggle={jest.fn()} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onToggle with key and new value when checkbox changes', async () => {
    const user = userEvent.setup()
    const onToggle = jest.fn()
    render(<WeekRow week={mockWeek} complete={false} onToggle={onToggle} />)

    await user.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('week3', true)
  })

  it('applies line-through to title when complete', () => {
    render(<WeekRow week={mockWeek} complete={true} onToggle={jest.fn()} />)
    const title = screen.getByText('Prompt Engineering Fundamentals')
    expect(title).toHaveClass('line-through')
  })

  it('hides tasks and resources initially (collapsed)', () => {
    render(<WeekRow week={mockWeek} complete={false} onToggle={jest.fn()} />)
    expect(screen.queryByText('Read the prompt engineering guide')).not.toBeInTheDocument()
  })

  it('shows tasks and resources after clicking expand button', async () => {
    const user = userEvent.setup()
    render(<WeekRow week={mockWeek} complete={false} onToggle={jest.fn()} />)

    await user.click(screen.getByRole('button', { name: /toggle details/i }))
    expect(screen.getByText('Read the prompt engineering guide')).toBeInTheDocument()
    expect(screen.getByText('Complete 10 practice questions')).toBeInTheDocument()
  })

  it('external resource links get target="_blank"', async () => {
    const user = userEvent.setup()
    render(<WeekRow week={mockWeek} complete={false} onToggle={jest.fn()} />)

    await user.click(screen.getByRole('button', { name: /toggle details/i }))
    const externalLink = screen.getByRole('link', { name: 'Docs' })
    expect(externalLink).toHaveAttribute('target', '_blank')
  })

  it('internal resource links do not get target="_blank"', async () => {
    const user = userEvent.setup()
    render(<WeekRow week={mockWeek} complete={false} onToggle={jest.fn()} />)

    await user.click(screen.getByRole('button', { name: /toggle details/i }))
    const internalLink = screen.getByRole('link', { name: 'Internal' })
    expect(internalLink).not.toHaveAttribute('target', '_blank')
  })
})
